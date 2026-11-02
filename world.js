'use strict';
/* ===== Dữ liệu ===== */
const LOC=[
["Thanh Vân Sơn",0,1.0,["#0a0f2e","#13405a","#1d6a68"],"cloud","Núi cao, mây trắng, linh khí tự nhiên."],
["Vạn Trúc Lâm",1,1.2,["#0f2a14","#2b6a35","#8fd07a"],"leaf","Rừng trúc xanh, lá trúc bay."],
["Hàn Băng Động",2,1.3,["#02102a","#0b3a6b","#4fc3e8"],"snow","Hang băng giá, tinh thể sáng xanh."],
["Linh Tuyền Thác",3,1.5,["#031a24","#0a4a5a","#2fb7c0"],"mist","Tu luyện dưới thác nước."],
["U Minh Cốc",4,1.7,["#10051f","#2a0f4a","#6a2fa0"],"wisp","Thung lũng tối, ánh sáng tím."],
["Dao Trì",6,2.0,["#05081c","#14214a","#3b4f8f"],"petal","Hồ sen dưới ánh trăng."],
["Tử Trúc Động",5,2.4,["#120a24","#3a1f5a","#7b4fa8"],"wisp","Động phủ yên tĩnh, linh khí dày đặc."],
["Hỏa Diệm Sơn",7,3.0,["#1a0500","#5a1500","#e0560a"],"ember","Núi lửa, dung nham, hỏa năng."],
["Thiên Kiếm Phong",8,3.8,["#0a1020","#2a3a5a","#8aa0c8"],"wind","Đỉnh núi kiếm khí, gió mạnh."],
["Cửu Trọng Thiên",10,5.0,["#2a1a05","#8a6420","#ffe58a"],"cloud","Tiên giới, mây vàng, cung điện."]];
const PAL=["#8a7a62","#cfd8dc","#2fa58f","#e0b84a","#8fd6ff","#5b3a9e","#2c6fb0","#8a2fb0","#d8e2ff","#4a4aa0","#f0f4ff","#ffd86a","#ff9ad5","#fff3b0"];
const TRIM=["#5a4a36","#6b7a8a","#c9f4e8","#fff2b0","#fff","#d9b45a","#bfe","#f6c","#ffd86a","#9ff","#d9b45a","#fff","#fff","#ff8"];
const AURA=["#8a7a62","#9fd","#3fc9b4","#ffd86a","#8fd6ff","#8b5cf6","#4aa0ff","#c04aff","#fff","#ffcc33","#cfe","#ffd86a","#ff9ad5","#fff3b0"];
const HAIR=["#14182a","#4a2f1a","#e8e8f0","#5b2a8a"],ACC=["#1b4f73","#a03a3a","#2d7a4f","#6a4aa8"];
const skin="#f0d9b5";
/* ===== Nhân vật nam / nữ (SVG riêng) ===== */
function look(g,r,hair,acc){const m=g=='nam',c1=PAL[r],c2=TRIM[r];
 let s=`<defs><linearGradient id="g${g}${r}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${acc}"/></linearGradient></defs>`;
 if(r>=10)s+=`<path class="wing" d="M100 110C40 40 0 70 5 120C30 100 60 120 90 140zM100 110C160 40 200 70 195 120C170 100 140 120 110 140z" fill="#fff" opacity=".35"/>`;
 if(r>=5)s+=`<circle cx="100" cy="62" r="40" fill="none" stroke="${c2}" stroke-width="3" opacity=".7"/>`;
 s+=m?`<path d="M82 52Q62 112 76 150L96 70zM118 52Q138 112 124 150L104 70z" fill="${hair}"/>`:`<path d="M77 50Q52 120 64 192L86 160zM123 50Q148 120 136 192L114 160z" fill="${hair}"/>`;
 s+=m?`<path d="M100 95C72 97 54 110 46 135L12 205Q100 226 188 205L154 135C146 110 128 97 100 95z" fill="url(#g${g}${r})" stroke="${c2}" stroke-width="2"/>`
  :`<path d="M100 98C80 100 66 110 58 130C40 150 14 185 6 206Q100 226 194 206C186 185 160 150 142 130C134 110 120 100 100 98z" fill="url(#g${g}${r})" stroke="${c2}" stroke-width="2"/><path d="M58 128Q14 138 20 182Q48 166 72 150zM142 128Q186 138 180 182Q152 166 128 150z" fill="${c1}" opacity=".85" stroke="${c2}"/>`;
 s+=`<path d="M84 98L100 142L116 98" fill="#e9ecd9" stroke="${c2}"/><path d="M${m?62:70} 162Q100 174 ${m?138:130} 162" stroke="${c2}" stroke-width="${m?6:4}" fill="none"/>`;
 if(!m)s+=`<path d="M100 166l-14 18l14-6l14 6z" fill="${c2}"/>`;
 for(let i=0;i<Math.min(r,8);i++)s+=`<path d="M${26+i*18} 198q9-11 18 0" stroke="${c2}" fill="none" opacity=".8"/>`;
 s+=`<path d="M62 152q18-22 38-8M138 152q-18-22-38-8" fill="none" stroke="${c1}" stroke-width="11" stroke-linecap="round"/><circle cx="100" cy="146" r="9" fill="#fff6c0" class="orb"/>`;
 s+=m?`<path d="M81 56Q81 38 100 38Q119 38 119 56L119 62Q119 84 100 84Q81 84 81 62z" fill="${skin}"/><path d="M80 56Q82 32 100 32Q118 32 120 56Q112 44 100 44Q88 44 80 56z" fill="${hair}"/><circle cx="100" cy="27" r="8" fill="${hair}"/><path d="M90 28h20" stroke="#d9b45a" stroke-width="3"/><path d="M86 56l11 -2M103 54l11 2" stroke="#111" stroke-width="3"/><path d="M89 62h8M103 62h8" stroke="#222" stroke-width="2.5"/><path d="M95 75h10" stroke="#a5604a" stroke-width="2"/>`
  :`<path d="M83 55Q83 38 100 38Q117 38 117 55L117 64Q117 82 100 84Q83 82 83 64z" fill="${skin}"/><path d="M79 58Q80 32 100 32Q120 32 121 58Q110 44 100 44Q90 44 79 58z" fill="${hair}"/><circle cx="84" cy="38" r="3.5" fill="#ffd86a"/><circle cx="116" cy="38" r="3.5" fill="#ffd86a"/><path d="M96 33q4-8 8 0z" fill="#e05a8a"/><path d="M87 56q5-4 10-1M103 55q5-3 10 1" stroke="#222" fill="none" stroke-width="1.6"/><ellipse cx="92" cy="62" rx="3.2" ry="2.2" fill="#222"/><ellipse cx="108" cy="62" rx="3.2" ry="2.2" fill="#222"/><circle cx="88" cy="70" r="3.5" fill="#f08a8a" opacity=".5"/><circle cx="112" cy="70" r="3.5" fill="#f08a8a" opacity=".5"/><path d="M96 75q4 3 8 0" stroke="#c0405a" stroke-width="2" fill="none"/>`;
 if(r>=3)s+=`<path d="M86 34l6-14 8 9 8-9 6 14z" fill="#ffd86a" stroke="#a37a1a"/>`;
 if(r>=13)s+=`<circle cx="100" cy="14" r="5" fill="#fff" class="orb"/>`;
 return s}
const myLook=()=>look(S.g,S.r,S.hair||HAIR[0],S.acc||ACC[0]);
function applyLook(morph){const h=$('#hero');h.innerHTML=myLook();$('#aura').style.background=`radial-gradient(${AURA[S.r]}66,${AURA[S.r]}22 50%,transparent 70%)`;
 const a=$('#array');a.querySelectorAll('.ex').forEach(e=>e.remove());const n=3+Math.floor(S.r/2);let pts=[];for(let i=0;i<n;i++){const t=i/n*6.283;pts.push((150*Math.sin(t)).toFixed(0)+","+(-150*Math.cos(t)).toFixed(0))}
 a.insertAdjacentHTML('beforeend',`<g class="ex r2"><polygon points="${pts}" fill="none" stroke="${AURA[S.r]}" stroke-width="2"/></g><g class="ex r1" style="animation-duration:${60-S.r*3}s"><circle r="130" fill="none" stroke="${AURA[S.r]}" stroke-dasharray="${2+S.r} 8"/></g>`);
 if(morph){h.classList.remove('morph');void h.offsetWidth;h.classList.add('morph')}}
/* ===== Tạo nhân vật ===== */
function creator(){if($('#creator'))return;let g=S.g||'nam',hi=0,ai=0;const d=document.createElement('div');d.id='creator';document.body.appendChild(d);
 const draw=()=>{d.innerHTML=`<h1>THIÊN ĐẠO KHAI MỞ – LỰA CHỌN TIÊN THỂ</h1><div class="picks">${['nam','nu'].map(x=>`<div class="pick ${g==x?'on':''}" data-g="${x}"><svg viewBox="0 0 200 230">${look(x,0,HAIR[hi],ACC[ai])}</svg><b>${x=='nam'?'Nam tu':'Nữ tu'}</b></div>`).join('')}</div>
 <p>Tóc: ${HAIR.map((c,i)=>`<span class="sw ${i==hi?'on':''}" data-h="${i}" style="background:${c}"></span>`).join('')} Y phục: ${ACC.map((c,i)=>`<span class="sw ${i==ai?'on':''}" data-a="${i}" style="background:${c}"></span>`).join('')}</p>
 <p><input id="cn" maxlength="16" placeholder="Đạo hiệu" value="${(S.name!='Vô Danh'?S.name:'')}"></p><button id="cgo">Bước vào tiên đồ</button>`};
 draw();d.onclick=e=>{const t=e.target.closest('[data-g],[data-h],[data-a],#cgo');if(!t)return;const n=$('#cn')?$('#cn').value:'';
  if(t.id=='cgo'){S.name=(n.trim()||'Vô Danh');S.g=g;S.hair=HAIR[hi];S.acc=ACC[ai];S.loc=S.loc||0;d.remove();applyLook();render();save();netJoin();return}
  if(t.dataset.g)g=t.dataset.g;if(t.dataset.h)hi=+t.dataset.h;if(t.dataset.a)ai=+t.dataset.a;S.name=n||S.name;draw()}}
/* ===== Độ kiếp bắt buộc ===== */
let TK;
window.openTrib=function(){const major=S.l==8;TK={major,n:major?9:3,b:0};T={hp:100+Math.floor(power()/20),sh:40};T.max=T.hp;T.shm=T.sh;
 $('#trib').hidden=false;document.body.classList.toggle('major',major);$('#trib h2').textContent=major?'ĐẠI THIÊN KIẾP':'Tiểu Kiếp';
 $('#tmsg').textContent=`${TK.n} đạo thiên lôi sẽ giáng xuống. Hộ Thiên Đan còn ${S.items.ht} (tự dùng khi nghênh kiếp).`;
 $('#tgo').textContent='Nghênh kiếp';$('#tgo').disabled=false;$('#tgo').onclick=tgo;tribBar()};
function tgo(){if(S.items.ht>0){S.items.ht--;T.sh+=60;T.shm+=60;}$('#tgo').disabled=true;tribRun=true;beep(80,.5);
 const iv=setInterval(()=>{TK.b++;const d=Math.floor((10+S.r*4+S.l*1.5)*(TK.major?1.8:1)*(.7+Math.random()*.6)*(1+TK.b*.08)/(1+techSum()*.3));
  const t=$('#trib');t.classList.add('flash');setTimeout(()=>t.classList.remove('flash'),TK.major?160:80);beep(90,.3);
  const a=Math.min(T.sh,d);T.sh-=a;T.hp-=d-a;tribBar();$('#tmsg').textContent=`Thiên lôi ${TK.b}/${TK.n} giáng xuống! -${d}`;
  if(T.hp<=0||TK.b>=TK.n){clearInterval(iv);tribRun=false;endTrib(T.hp>0)}},1000)}
window.endTrib=function(ok){const t=$('#trib'),M=TK.major;
 if(ok){S.qi-=need();if(M){S.r++;S.l=0;S.items.tl++;S.stone+=500*S.r}else{S.l++;S.stone+=50*(S.r+1)}t.hidden=true;document.body.classList.remove('major');
  fx(M?`ĐẠI THIÊN KIẾP ĐÃ QUA!<br>${REALMS[S.r]}`:`Tiểu kiếp đã qua!<br>${REALMS[S.r]} tầng ${S.l+1}`,()=>{applyLook(M);render();save();syncNow();toast(M?'Đạo bào mới hiển hiện!':'Thưởng linh thạch')})}
 else{const lose=Math.floor(S.qi*(M?.3:.15));S.qi-=lose;S.fails++;S.tcd=Date.now()+60000;$('#hero').classList.add('hit');setTimeout(()=>$('#hero').classList.remove('hit'),1000);
  $('#tmsg').textContent=`Độ kiếp thất bại! Mất ${fmt(lose)} tu vi. Hồi phục 60 giây rồi có thể thỉnh kiếp lại.`;$('#tgo').textContent='Đóng';$('#tgo').disabled=false;
  $('#tgo').onclick=()=>{t.hidden=true;document.body.classList.remove('major');render();save()};beep(110,.8)}};
$('#bBreak').onclick=()=>{if(S.qi<need())return;if((S.tcd||0)>Date.now())return toast('Đang hồi phục sau thiên kiếp');openTrib()};
setInterval(()=>{const b=$('#bBreak'),c=Math.ceil(((S.tcd||0)-Date.now())/1000);b.textContent=c>0?`Hồi phục ${c}s`:(S.l==8?'THỈNH ĐẠI THIÊN KIẾP':'THỈNH THIÊN KIẾP');b.disabled=c>0;S.secs=(S.secs||0)+1},1000);
/* ===== Địa điểm ===== */
window.locMul=()=>LOC[S.loc||0][2];
function goLoc(k){const L=LOC[k];if(S.r<L[1])return toast('Cần đạt '+REALMS[L[1]]);const t=document.createElement('div');t.id='tr';document.body.appendChild(t);requestAnimationFrame(()=>t.classList.add('on'));
 setTimeout(()=>{S.loc=k;initD();t.classList.remove('on');netTrack();drawOthers();render();save()},550);setTimeout(()=>t.remove(),1200)}
/* ===== Cảnh nền theo địa điểm ===== */
let D=[];window.NOBG=true;
function initD(){const ty=LOC[S.loc||0][4];D=Array.from({length:ty=='wind'?25:60},()=>({x:Math.random()*W,y:Math.random()*H,v:.4+Math.random()*1.2,s:Math.random()*6}))}
function scene(){if(!S||!S.g&&0)return;const t=Date.now()/1000,k=S.loc||0,L=LOC[k],ty=L[4];const g=cx.createLinearGradient(0,0,0,H);L[3].forEach((c,i)=>g.addColorStop(i/2,c));cx.fillStyle=g;cx.fillRect(0,0,W,H);
 const dark=L[3][0];
 if(k==5||k==4){cx.fillStyle='#fff8d8';cx.beginPath();cx.arc(W*.78,H*.2,k==5?42:24,0,7);cx.fill()}
 if(k==9||k==0||k==8){ridge(H*.62,H*.28,k==9?'#a8802a':'#14304a',1)}
 if(k==0||k==9||k==8||k==5)pagoda(W*(k==5?.25:.2),H*.52,k==9?55:36);if(k==9)pagoda(W*.82,H*.5,45);
 if(k==7||k==4||k==6||k==2||k==1)ridge(H*.6,H*.3,k==7?'#2a0a00':k==1?'#6fb8d8':'#0d1a2e',2);
 if(k==1)for(let i=0;i<6;i++){const x=W*(.1+i*.16),h=H*(.25+.15*Math.sin(i*2)),w=30;cx.fillStyle='#bfefff66';cx.beginPath();cx.moveTo(x-w,H*.8);cx.lineTo(x,H*.8-h);cx.lineTo(x+w,H*.8);cx.fill();cx.strokeStyle='#fff9';cx.stroke()}
 if(k==3){for(let i=0;i<14;i++){cx.fillStyle='#e8ffff'+(i%2?'55':'33');cx.fillRect(W*.55+i*14,0,8+i%3*4,H*.7)}cx.fillStyle='#bff7ff';for(let i=0;i<30;i++)cx.fillRect(W*.55+(i*7)%200,(t*300+i*53)%(H*.7),2,18)}
 if(k==1||k==3||k==5){cx.fillStyle='#1d4a6a99';cx.fillRect(0,H*.78,W,H*.22)}
 if(k==5)for(let i=0;i<8;i++){cx.fillStyle='#ffc6e0';cx.beginPath();cx.ellipse(W*(.1+i*.12),H*(.84+.04*Math.sin(i)),30,9,0,0,7);cx.fill();cx.fillStyle='#fff6';cx.fillRect(W*.78-3,H*.3+i*14,6+i,3)}
 if(k==2){for(let i=0;i<28;i++){const x=W*(i/28)+Math.sin(t+i)*6;cx.fillStyle='#2e9a3a'+(i%3?'cc':'77');cx.fillRect(x,0,6+i%4*2,H);cx.fillStyle='#1b5a22';cx.fillRect(x,((i*97)%H),8,3)}}
 if(k==6)for(let i=0;i<9;i++){cx.fillStyle='#1a0f30';cx.beginPath();cx.moveTo(W*i/8-30,0);cx.lineTo(W*i/8,H*(.15+.1*Math.sin(i*3)));cx.lineTo(W*i/8+30,0);cx.fill()}
 if(k==7){const lg=cx.createLinearGradient(0,H*.7,0,H);lg.addColorStop(0,'#ff6a00');lg.addColorStop(1,'#ffcc33');cx.fillStyle=lg;cx.globalAlpha=.6+.2*Math.sin(t*3);cx.fillRect(0,H*.82,W,H*.18);cx.globalAlpha=1}
 if(k==8)for(let i=0;i<5;i++){const x=W*(.1+i*.2),h=H*(.3+.1*(i%2));cx.fillStyle='#c8d8f0';cx.beginPath();cx.moveTo(x-10,H*.85);cx.lineTo(x,H*.85-h);cx.lineTo(x+10,H*.85);cx.fill()}
 clouds.forEach(c=>{c.x+=c.v*(ty=='wind'?4:1);if(c.x>W+200)c.x=-200;cx.fillStyle=k==9?'#fff3a044':'#ffffff12';for(let j=0;j<4;j++){cx.beginPath();cx.ellipse(c.x+j*c.s*.4,c.y+Math.sin(j)*10,c.s*.5,c.s*.18,0,0,7);cx.fill()}});
 const col={leaf:'#7fe05a',snow:'#ffffff',mist:'#bff',wisp:'#c58cff',petal:'#ffb7d5',ember:'#ffa030',wind:'#ffffff88',cloud:'#fff6'}[ty];cx.fillStyle=col;
 D.forEach(p=>{if(ty=='snow'||ty=='mist'&&0){p.y+=p.v;p.x+=Math.sin(t+p.s)}else if(ty=='ember'||ty=='mist'||ty=='wisp'){p.y-=p.v*.6;p.x+=Math.sin(t+p.s)*.5}else if(ty=='wind'){p.x+=p.v*14}else{p.x+=p.v*.6;p.y+=p.v*.7+Math.sin(t+p.s)*.3}
  if(p.y>H)p.y=-5;if(p.y<-5)p.y=H;if(p.x>W)p.x=0;if(ty=='wind')cx.fillRect(p.x,p.y,30,1.5);else if(ty=='leaf')cx.fillRect(p.x,p.y,7,3);else{cx.beginPath();cx.arc(p.x,p.y,ty=='wisp'?3:2,0,7);cx.fill()}});
 if(Math.random()<.35)burst(1);P=P.filter(p=>p.l>0);P.forEach(p=>{p.x+=(W/2-p.x)*.03;p.y+=(H*.55-p.y)*.03;p.l-=.012;cx.fillStyle=`rgba(${p.c},${p.l})`;cx.beginPath();cx.arc(p.x,p.y,2.2,0,7);cx.fill()});
 requestAnimationFrame(scene)}
/* ===== Mạng (Supabase) ===== */
let sb=null,ch=null,peers=[],myId=null;
const net=document.createElement('div');net.id='net';net.className='off';net.textContent='DEMO / OFFLINE';document.body.appendChild(net);
const cnt=document.createElement('small');cnt.id='cnt';$('#info').prepend(cnt);
const me=()=>({id:myId,name:S.name,g:S.g,r:S.r,l:S.l,root:S.root,pw:power(),loc:S.loc||0,hair:S.hair,acc:S.acc});
const here=()=>peers.filter(p=>p.loc==(S.loc||0));
function netTrack(){if(ch)ch.track(me());drawOthers()}
async function syncNow(){if(!sb)return;const{error}=await sb.rpc('sync_player',{p_name:S.name,p_g:S.g,p_root:S.root,p_realm:S.r,p_layer:S.l,p_qi:Math.floor(S.qi),p_power:power(),p_secs:S.secs||0,p_loc:S.loc||0});if(error)console.warn(error.message);netTrack()}
async function netJoin(){if(sb||!S.g)return;const c=window.SB_CONFIG;if(!c||!c.url||!c.key)return;
 try{await new Promise((ok,no)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js';s.onload=ok;s.onerror=no;document.head.appendChild(s)});
  const cl=supabase.createClient(c.url,c.key);let{data:{session}}=await cl.auth.getSession();if(!session){const r=await cl.auth.signInAnonymously();if(r.error)throw r.error;session=r.data.session}
  sb=cl;myId=session.user.id;net.textContent='ONLINE';net.className='on';
  ch=sb.channel('world',{config:{presence:{key:myId}}});
  ch.on('presence',{event:'sync'},()=>{peers=Object.values(ch.presenceState()).map(a=>a[0]).filter(p=>p.id&&p.id!==myId);drawOthers()});
  ch.on('broadcast',{event:'greet'},({payload})=>{if(payload.to===myId)toast(payload.name+' chắp tay chào bạn')});
  ch.subscribe(s=>{if(s==='SUBSCRIBED')ch.track(me())});
  sb.channel('ann').on('postgres_changes',{event:'INSERT',schema:'public',table:'server_announcements'},p=>toast('📜 '+p.new.msg)).subscribe();
  syncNow();setInterval(syncNow,20000)}catch(e){console.warn(e);net.textContent='LỖI KẾT NỐI – DEMO';}}
function drawOthers(){const o=$('#others')||(()=>{const d=document.createElement('div');d.id='others';$('#stage').appendChild(d);return d})();const h=here().slice(0,8);
 cnt.textContent=sb?`Đạo hữu tại ${LOC[S.loc||0][0]}: ${h.length+1}`:`${LOC[S.loc||0][0]} · chế độ DEMO, chưa có đạo hữu thực`;
 o.innerHTML=h.map((p,i)=>`<div class="peer" data-id="${p.id}" style="left:${i%2?58+Math.floor(i/2)*10:34-Math.floor(i/2)*10}%;animation-delay:-${i}s"><svg viewBox="0 0 200 230">${look(p.g||'nam',Math.min(13,p.r||0),p.hair||HAIR[0],p.acc||ACC[0])}</svg>${p.name}</div>`).join('')}
document.addEventListener('click',e=>{const p=e.target.closest('.peer');if(!p)return;const x=peers.find(q=>q.id==p.dataset.id);if(!x)return;
 $('#pbody').innerHTML=`<h3>${x.name}</h3><div class="card"><p>${x.g=='nu'?'Nữ tu':'Nam tu'} · ${REALMS[x.r]} tầng ${x.l+1}</p><p>Linh căn: ${ROOTS[x.root||0][0]} · Chiến lực: ${fmt(x.pw||0)}</p><p>Đang tu luyện tại ${LOC[x.loc][0]}</p><button data-a="greet" data-k="${x.id}">Chắp tay chào</button></div>`;$('#panel').hidden=false});
let lastG=0;
/* ===== Panel Tiên vực & Đạo hữu ===== */
const _panel=panel;let rk='realm';
window.panel=function(i){if(i!=4&&i!=5)return _panel(i);tab=i;document.querySelectorAll('#nav button').forEach((b,j)=>b.classList.toggle('on',j==i));$('#panel').hidden=false;
 if(i==4){const cnts={};peers.forEach(p=>cnts[p.loc]=(cnts[p.loc]||0)+1);$('#pbody').innerHTML='<h3>Địa điểm tu luyện</h3><div class="grid">'+LOC.map((l,k)=>{const ok=S.r>=l[1];return`<div class="card ${ok?'':'dim'}"><div class="loc" style="background:linear-gradient(${l[3]})"></div><b>${l[0]}</b> x${l[2].toFixed(1)}<br>${l[5]}<br>Yêu cầu: ${REALMS[l[1]]}${sb?` · ${(cnts[k]||0)+((S.loc||0)==k?1:0)} đạo hữu`:''}<br>${(S.loc||0)==k?'<i>Đang tu luyện</i>':ok?`<button data-a="go" data-k="${k}">Đến đây</button>`:'Chưa mở khóa'}</div>`}).join('')+'</div>'}
 else rankPanel()};
async function rankPanel(){const B=[['realm','Cảnh giới'],['power','Chiến lực'],['qi','Tu vi'],['secs','Thời gian'],['asc','Phi thăng']];
 let h='<h3>Bảng xếp hạng toàn server</h3>'+B.map(b=>`<button data-a="rk" data-k="${b[0]}" ${rk==b[0]?'disabled':''}>${b[1]}</button> `).join('');
 if(!sb){$('#pbody').innerHTML=h+'<p class="note">DEMO / OFFLINE: chưa kết nối Supabase nên chưa có bảng xếp hạng thật và chưa thấy người chơi khác. Xem supabase.sql và supabase-config.js.</p>';return}
 let q=sb.from('leaderboard').select('*');q=rk=='realm'?q.order('realm',{ascending:false}).order('layer',{ascending:false}):rk=='asc'?q.gte('realm',10).order('realm',{ascending:false}):q.order(rk,{ascending:false});
 const{data,error}=await q.limit(20);if(error)return $('#pbody').innerHTML=h+'<p class="note">Lỗi: '+error.message+'</p>';
 $('#pbody').innerHTML=h+'<table>'+data.map((p,i)=>`<tr><td>${i+1}</td><td>${p.name}${p.id==myId?' (Bạn)':''}</td><td>${p.gender=='nu'?'Nữ':'Nam'}</td><td>${REALMS[p.realm]} t${p.layer+1}</td><td>${fmt(p.power)} · ${fmt(p.qi)} · ${Math.floor(p.secs/60)}p</td></tr>`).join('')+'</table>'}
$('#pbody').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const a=b.dataset.a,k=b.dataset.k;
 if(a=='go'){panel(0);goLoc(+k)}
 if(a=='rk'){rk=k;rankPanel()}
 if(a=='greet'&&ch&&Date.now()-lastG>10000){lastG=Date.now();ch.send({type:'broadcast',event:'greet',payload:{to:k,name:S.name}});toast('Đã chắp tay chào đạo hữu');panel(0)}});
/* ===== Khởi động ===== */
if(S.loc==null)S.loc=0;if(!S.secs)S.secs=0;
initD();scene();
if(!S.g)creator();else{applyLook();netJoin()}
setInterval(()=>{if(!S.g)creator()},700);
