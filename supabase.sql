-- Chạy toàn bộ file này trong Supabase > SQL Editor.
-- Bật trước: Authentication > Sign In / Providers > "Allow anonymous sign-ins".
create table if not exists profiles(id uuid primary key references auth.users on delete cascade,name text not null check(char_length(name) between 1 and 16),gender text check(gender in('nam','nu')),root int default 0,created_at timestamptz default now());
create table if not exists player_stats(id uuid primary key references profiles on delete cascade,realm int default 0,layer int default 0,qi numeric default 0,power int default 10,secs bigint default 0,updated_at timestamptz default now());
create table if not exists player_locations(id uuid primary key references profiles on delete cascade,loc int default 0,updated_at timestamptz default now());
create table if not exists cultivation_records(id bigserial primary key,player uuid references profiles on delete cascade,event text,realm int,layer int,at timestamptz default now());
create table if not exists server_announcements(id bigserial primary key,msg text not null,at timestamptz default now());
alter table profiles enable row level security;alter table player_stats enable row level security;alter table player_locations enable row level security;alter table cultivation_records enable row level security;alter table server_announcements enable row level security;
create policy "read all" on profiles for select using(true);
create policy "own insert" on profiles for insert with check(id=auth.uid());
create policy "own update" on profiles for update using(id=auth.uid()) with check(id=auth.uid());
create policy "read all" on player_stats for select using(true);       -- không có policy ghi: chỉ sync_player() được ghi
create policy "read all" on player_locations for select using(true);
create policy "own loc" on player_locations for all using(id=auth.uid()) with check(id=auth.uid() and loc between 0 and 9);
create policy "own read" on cultivation_records for select using(player=auth.uid());
create policy "read all" on server_announcements for select using(true);
create or replace view leaderboard as select p.id,p.name,p.gender,s.realm,s.layer,s.qi,s.power,s.secs from profiles p join player_stats s on s.id=p.id;
grant select on leaderboard to anon,authenticated;
create or replace function sync_player(p_name text,p_g text,p_root int,p_realm int,p_layer int,p_qi numeric,p_power int,p_secs bigint,p_loc int) returns void language plpgsql security definer set search_path=public as $$
declare u uuid:=auth.uid(); o player_stats; el numeric; np int; op int; begin
 if u is null then raise exception 'auth'; end if;
 p_realm:=least(greatest(p_realm,0),13);p_layer:=least(greatest(p_layer,0),8);p_loc:=least(greatest(p_loc,0),9);
 insert into profiles(id,name,gender,root) values(u,left(p_name,16),case when p_g='nu' then 'nu' else 'nam' end,p_root) on conflict(id) do update set name=excluded.name,gender=excluded.gender;
 select * into o from player_stats where id=u;
 if not found then insert into player_stats(id,realm,layer,qi,power,secs) values(u,p_realm,p_layer,p_qi,p_power,least(p_secs,86400*30)); insert into player_locations(id,loc) values(u,p_loc) on conflict(id) do nothing; return; end if;
 el:=greatest(extract(epoch from now()-o.updated_at),1); np:=p_realm*9+p_layer; op:=o.realm*9+o.layer;
 if np>op+1+el/5 then np:=op; p_realm:=o.realm; p_layer:=o.layer; end if;   -- giới hạn tốc độ thăng cấp
 p_secs:=least(greatest(p_secs,o.secs),o.secs+el);                          -- thời gian tu luyện không vượt thời gian thực
 update player_stats set realm=p_realm,layer=p_layer,qi=p_qi,power=p_power,secs=p_secs,updated_at=now() where id=u;
 insert into player_locations(id,loc) values(u,p_loc) on conflict(id) do update set loc=p_loc,updated_at=now();
 if np>op then insert into cultivation_records(player,event,realm,layer) values(u,'breakthrough',p_realm,p_layer);
  if p_realm>o.realm then insert into server_announcements(msg) values(left(p_name,16)||' đã đột phá lên cảnh giới mới!'); end if;
  if p_realm>=10 and o.realm<10 then insert into server_announcements(msg) values('✦ '||left(p_name,16)||' đã phi thăng thành Chân Tiên!'); end if; end if;
end $$;
revoke all on function sync_player from public; grant execute on function sync_player to authenticated;
alter publication supabase_realtime add table server_announcements;
