'use strict';
const $=s=>document.querySelector(s),KEY='tutien_v1';
const REALMS=["Phàm Nhân","Luyện Khí","Trúc Cơ","Kim Đan","Nguyên Anh","Hóa Thần","Luyện Hư","Hợp Thể","Đại Thừa","Độ Kiếp","Chân Tiên","Kim Tiên","Đại La Kim Tiên","Tiên Đế"];
const ROOTS=[["Kim",20,1.1,"Phổ thông"],["Mộc",20,1.1,"Phổ thông"],["Thủy",20,1.1,"Phổ thông"],["Hỏa",20,1.1,"Phổ thông"],["Thổ",20,1.1,"Phổ thông"],["Phong",12,1.3,"Hiếm"],["Lôi",8,1.5,"Hiếm"],["Băng",5,1.6,"Cực hiếm"],["Hỗn Độn",1,2.2,"Truyền thuyết"]];
const TECH=[
["Dẫn Khí Quyết","Công pháp",0,150,.15],["Thanh Tâm Chú","Tâm pháp",0,300,.10],["Ngự Phong Bộ","Thân pháp",0,400,.05],
["Hỏa Cầu Thuật","Bí thuật",1,800,.10],["Thái Ất Luyện Khí","Công pháp",1,2500,.35],["Kim Cang Tâm Kinh","Tâm pháp",1,4000,.30],
["Súc Địa Thành Thốn","Thân pháp",2,9000,.20],["Cửu Thiên Lôi Pháp","Bí thuật",2,20000,.40],["Hỗn Nguyên Công","Công pháp",3,90000,1],["Đại Đạo Thiên Âm","Tâm pháp",3,300000,1.5]];
const TR=["Phổ thông","Hiếm","Sử thi","Truyền thuyết"],TRC=["r-th","r-hi","r-ep","r-le"];
const ITEMS={tk:["Tụ Khí Đan","+20% tu vi tầng hiện tại",40],tc:["Trúc Cơ Đan","+60% tu vi tầng hiện tại",150],kn:["Kim Nguyên Đan","+150% tu vi tầng hiện tại",500],tl:["Tiên Linh Đan","+500% tu vi tầng hiện tại",2500],ht:["Hộ Thiên Đan","Tăng 60 chống chịu khi độ kiếp",300]};
const MAP=[["Thanh Vân Sơn",0,"Núi mây xanh, linh khí loãng.","#2f7f6f,#9fd8c0"],["Vạn Yêu Lâm",2,"Rừng yêu thú, nhiều đan dược.","#274a2a,#6bb04a"],["Thiên Kiếm Tông",4,"Kiếm tu tụ hội trên đỉnh núi.","#2a3b6b,#9bb8ff"],["Cửu U Ma Vực",6,"Vực sâu ma khí cuồn cuộn.","#2b1038,#9b3fa0"],["Dao Trì Tiên Cảnh",10,"Tiên cảnh của Tây Vương Mẫu.","#6b4a8a,#f3c6e8"],["Cửu Trọng Thiên",12,"Tầng trời cao nhất, gần Tiên Đế.","#6b5a1a,#ffe58a"]];
const NAV=["Tu luyện","Nhân vật","Công pháp","Túi đồ","Tiên vực","Đạo hữu"];
let S,boost=0,tribRun=false,tab=0;
const fresh=()=>{const w=ROOTS.reduce((a,r)=>a+r[1],0);let x=Math.random()*w,i=0;for(;i<ROOTS.length-1&&(x-=ROOTS[i][1])>=0;i++);
 return{name:"Vô Danh",root:i,r:0,l:0,qi:0,stone:100,items:{tk:3,tc:0,kn:0,tl:0,ht:0},tech:[],up:{click:0,auto:0},cd:{},last:Date.now(),fails:0}};
const need=(r=S.r,l=S.l)=>Math.floor(60*Math.pow(2.6,r)*Math.pow(1.28,l));
const techSum=()=>S.tech.reduce((a,i)=>a+TECH[i][4],0);
const mul=()=>ROOTS[S.root][2]*(1+techSum())*(window.locMul?locMul():1)*(boost>Date.now()?2:1);
const clickQi=()=>Math.max(1,Math.floor((1+S.up.click*2)*mul()*(1+S.r*S.r*2)));
const autoQi=()=>Math.floor(S.up.auto*1.5*mul()*(1+S.r*S.r*2)*10)/10;
const power=()=>Math.floor((10+(S.r*9+S.l)*12*(1+S.r))*(1+techSum()));
const life=()=>100+S.r*120+S.l*5;
const isMax=()=>S.r==13&&S.l==8;
const fmt=n=>n>=1e9?(n/1e9).toFixed(2)+"B":n>=1e6?(n/1e6).toFixed(2)+"M":n>=1e4?(n/1e3).toFixed(1)+"K":Math.floor(n).toString();
const save=()=>{S.last=Date.now();localStorage.setItem(KEY,JSON.stringify(S))};
function load(){try{const d=JSON.parse(localStorage.getItem(KEY));return d&&d.root!=null?d:null}catch(e){return null}}
function toast(t){const d=document.createElement('div');d.textContent=t;$('#ticker').prepend(d);setTimeout(()=>d.remove(),6000);while($('#ticker').children.length>5)$('#ticker').lastChild.remove()}
function addQi(n){S.qi+=n;}
function render(){
 $('#tName').textContent=S.name+" ("+ROOTS[S.root][0]+" linh căn)";$('#tRealm').textContent=REALMS[S.r]+" tầng "+(S.l+1);
 $('#tStone').textContent=fmt(S.stone);$('#tLife').textContent=life()+" năm";$('#tPower').textContent=fmt(power());
 $('#rname').textContent=REALMS[S.r];$('#rlayer').textContent="Tầng "+(S.l+1)+" / 9";
 const n=need(),p=Math.min(1,S.qi/n);$('#xpbar').style.width=p*100+"%";$('#xptxt').textContent=fmt(S.qi)+" / "+fmt(n)+" tu vi";
 $('#qirate').textContent="Linh khí: "+fmt(S.qi)+" · +"+fmt(clickQi())+"/click · +"+autoQi()+"/giây"+(boost>Date.now()?" · Thiên đạo ban phúc x2":"");
 $('#bBreak').hidden=!(S.qi>=n&&!isMax());$('#bClick').hidden=false;
}
function floatText(x,y,t){const d=document.createElement('div');d.className='fl';d.textContent=t;d.style.left=x+'px';d.style.top=y+'px';document.body.appendChild(d);setTimeout(()=>d.remove(),1100)}
function beep(f,t=.15){try{const a=beep.c||(beep.c=new AudioContext()),o=a.createOscillator(),g=a.createGain();o.frequency.value=f;g.gain.value=.05;o.connect(g);g.connect(a.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,a.currentTime+t);o.stop(a.currentTime+t)}catch(e){}}
$('#bClick').onclick=e=>{const q=clickQi();addQi(q);if(Math.random()<.15){S.stone++;}floatText(e.clientX||innerWidth/2,(e.clientY||innerHeight/2)-20,"+"+fmt(q)+" linh khí");burst(18);beep(520+Math.random()*200,.08);render()};
function fx(text,after){const f=$('#fx');$('#fxt').innerHTML=text;f.hidden=false;f.style.animation='none';f.offsetWidth;f.style.animation='';burst(120);beep(220,.6);setTimeout(()=>{f.hidden=true;after&&after()},2600)}
$('#bBreak').onclick=()=>{if(S.qi<need())return;
 if(S.l<8){S.qi-=need();S.l++;fx(`Đột phá thành công!<br>${REALMS[S.r]} tầng ${S.l+1}`,()=>{render();save()});}
 else if(S.r>=3)openTrib();
 else{S.qi-=need();S.r++;S.l=0;fx(`Đột phá cảnh giới!<br>${REALMS[S.r]}`,()=>{render();save();toast("Bạn đã đạt "+REALMS[S.r]+"!")});}};
/* Độ kiếp */
let T;
function openTrib(){$('#trib').hidden=false;T={hp:100+Math.floor(power()/20),sh:40+(S.items.ht>0?0:0),b:0,max:0};T.max=T.hp;T.shm=T.sh;
 $('#tmsg').textContent=`Cảnh giới tiếp theo: ${REALMS[S.r+1]}. Có ${S.items.ht} Hộ Thiên Đan. Chín đạo thiên lôi sắp giáng.`;
 $('#tgo').textContent="Nghênh kiếp";$('#tgo').disabled=false;tribBar()}
function tribBar(){$('#hp').style.width=T.hp/T.max*100+"%";$('#hpt').textContent="HP "+Math.max(0,Math.floor(T.hp));$('#sh').style.width=Math.min(100,T.sh/Math.max(T.shm,1)*100)+"%";$('#sht').textContent="Chống chịu "+Math.max(0,Math.floor(T.sh))}
$('#tgo').onclick=()=>{
 if($('#tgo').textContent==="Nghênh kiếp"){ // dùng đan
  if(S.items.ht>0){S.items.ht--;T.sh+=60;T.shm+=60;tribBar();$('#tmsg').textContent="Hộ Thiên Đan phát sáng, chống chịu +60!";}
  $('#tgo').disabled=true;tribRun=true;
  const iv=setInterval(()=>{T.b++;const d=Math.floor((15+S.r*4)*(0.7+Math.random()*.6)*(1+T.b*.08)/(1+techSum()*.3));
   $('#trib').classList.add('flash');setTimeout(()=>$('#trib').classList.remove('flash'),90);beep(90,.3);
   const a=Math.min(T.sh,d);T.sh-=a;T.hp-=d-a;tribBar();$('#tmsg').textContent=`Thiên lôi thứ ${T.b}/9 giáng xuống! -${d}`;
   if(T.hp<=0||T.b>=9){clearInterval(iv);tribRun=false;endTrib(T.hp>0)}},1000);}
};
function endTrib(ok){const t=$('#trib');
 if(ok){S.qi-=need();S.r++;S.l=0;S.stone+=500*S.r;S.items.tl++;t.hidden=true;fx(`Độ kiếp thành công!<br>${REALMS[S.r]}`,()=>{render();save();toast("Phần thưởng: Tiên Linh Đan + linh thạch")})}
 else{const lose=Math.floor(S.qi*.3);S.qi-=lose;S.fails++;$('#tmsg').textContent=`Độ kiếp thất bại! Mất ${fmt(lose)} tu vi. Hãy chuẩn bị thêm Hộ Thiên Đan rồi thử lại.`;$('#tgo').textContent="Đóng";$('#tgo').disabled=false;$('#tgo').onclick=()=>{t.hidden=true;$('#tgo').onclick=tribHandlerBack;render();save()};beep(110,.8)}}
const tribHandlerBack=$('#tgo').onclick;
/* Panels */
const NAMEFAKE=["Lăng Tiêu","Vân Hạc","Mặc Thanh","Thanh Phong","Tử Yên","Bạch Liên","Hàn Nguyệt","Diệp Phàm","Thạch Hạo","Lâm Động","Tiêu Viêm","Hàn Lập","Ninh Phàm","Vương Lâm","Lý Thất Dạ","Cổ Thanh","Dạ Vũ","Kiếm Trần","Huyền Cơ","Trầm Ngư"];
const rivals=NAMEFAKE.map((n,i)=>({n,s:Math.floor((20-i)*6.1+Math.sin(i)*5)}));
const SECT=[["Thiên Kiếm Tông","Kiếm tu","Chính đạo"],["Dao Trì Cung","Nữ tu & đan sư","Chính đạo"],["Vạn Yêu Điện","Ngự thú","Trung lập"],["Cửu U Ma Giáo","Ma công","Ma đạo"],["Thanh Vân Môn","Đạo gia","Chính đạo"]];
function panel(i){
 tab=i;document.querySelectorAll('#nav button').forEach((b,j)=>b.classList.toggle('on',j==i));
 if(i==0){$('#panel').hidden=true;return}
 let h="";
 if(i==1){const r=ROOTS[S.root];h=`<h3>Đạo hữu ${S.name}</h3><div class="card"><p>Cảnh giới: <b>${REALMS[S.r]} tầng ${S.l+1}</b></p><p>Linh căn: <b>${r[0]}</b> (${r[3]}) · hệ số tu luyện x${r[2]}</p><p>Chiến lực: ${fmt(power())} · Thọ nguyên: ${life()} năm</p><p>Công pháp đã học: ${S.tech.length}/10 · Tổng tăng tu luyện: +${Math.round(techSum()*100)}%</p><p>Số lần độ kiếp thất bại: ${S.fails}</p></div>
 <h3>Nâng cấp tu luyện</h3><div class="grid"><div class="card"><b>Tụ Linh Trận</b> (cấp ${S.up.click})<br>Tăng linh khí mỗi lần Vận Công<br><button data-a="up" data-k="click">Nâng cấp – ${fmt(upCost('click'))} linh thạch</button></div><div class="card"><b>Tụ Khí Thạch</b> (cấp ${S.up.auto})<br>Tự hấp thụ linh khí mỗi giây<br><button data-a="up" data-k="auto">Nâng cấp – ${fmt(upCost('auto'))} linh thạch</button></div></div>
 <h3>Hệ thống</h3><button data-a="save">LƯU GAME</button> <button data-a="reload">TẢI LẠI GAME</button> <button data-a="reset">RESET GAME</button> <button data-a="rename">Đổi tên</button>`}
 if(i==2){h=`<h3>Công pháp</h3><div class="grid">`+TECH.map((t,k)=>{const own=S.tech.includes(k);return`<div class="card ${own?'':''}"><b>${t[0]}</b><br><span class="${TRC[t[2]]}">${TR[t[2]]}</span> · ${t[1]}<br>Tăng tu luyện & chiến lực +${t[4]*100}%<br>${own?'<i>Đã lĩnh ngộ</i>':`<button data-a="tech" data-k="${k}">Lĩnh ngộ – ${fmt(t[3])} linh thạch</button>`}</div>`}).join("")+`</div>`}
 if(i==3){h=`<h3>Túi đồ</h3><p>Linh thạch: <b>${fmt(S.stone)}</b></p><div class="grid">`+Object.keys(ITEMS).map(k=>`<div class="card"><b>${ITEMS[k][0]}</b> ×${S.items[k]}<br>${ITEMS[k][1]}<br>${k=='ht'?'<i>Dùng tự động khi độ kiếp</i><br>':`<button data-a="use" data-k="${k}" ${S.items[k]?'':'disabled'}>Sử dụng</button> `}<button data-a="buy" data-k="${k}">Mua – ${fmt(ITEMS[k][2]*(1+S.r))} linh thạch</button></div>`).join("")+`</div><h3>Pháp bảo</h3><div class="card">Chưa có pháp bảo. Hộ Thiên Đan đóng vai trò hộ thân khi độ kiếp.</div>`}
 if(i==4){h=`<h3>Tiên vực</h3><div class="grid">`+MAP.map((m,k)=>{const ok=S.r>=m[1],cd=(S.cd[k]||0)>Date.now();return`<div class="card ${ok?'':'dim'}"><div class="loc" style="background:linear-gradient(160deg,${m[3]})"></div><b>${m[0]}</b><br>${m[2]}<br>Yêu cầu: ${REALMS[m[1]]}<br>${ok?`<button data-a="explore" data-k="${k}" ${cd?'disabled':''}>${cd?'Đang hồi phục':'Thám hiểm'}</button>`:'🔒 Chưa mở khóa'}</div>`}).join("")+`</div>`}
 if(i==5){const all=[...rivals,{n:S.name+" (Bạn)",s:S.r*9+S.l}].sort((a,b)=>b.s-a.s);
 h=`<p class="note">⚠ Dữ liệu giả lập, không phải multiplayer thực sự.</p><h3>Bảng xếp hạng</h3><table>`+all.map((p,k)=>`<tr><td>${k+1}</td><td>${p.n}</td><td>${REALMS[Math.min(13,Math.floor(p.s/9))]} tầng ${p.s%9+1}</td></tr>`).join("")+`</table><h3>Tông môn</h3><div class="grid">`+SECT.map(s=>`<div class="card"><b>${s[0]}</b><br>${s[1]} · ${s[2]}<br><button data-a="join" data-k="${s[0]}">Bái nhập</button></div>`).join("")+`</div><h3>Thông báo phi thăng</h3><div id="asc" class="card">Lăng Tiêu đã phi thăng Tiên Giới!</div><h3>Chat thế giới (NPC)</h3><div id="chat" class="card"></div>`;}
 $('#pbody').innerHTML=h;$('#panel').hidden=false;
}
const upCost=k=>Math.floor((k=='click'?30:80)*Math.pow(1.6,S.up[k]));
$('#pbody').onclick=e=>{const b=e.target.closest('button');if(!b)return;const a=b.dataset.a,k=b.dataset.k;
 if(a=='up'){const c=upCost(k);if(S.stone<c)return toast("Không đủ linh thạch");S.stone-=c;S.up[k]++}
 if(a=='tech'){const t=TECH[k];if(S.stone<t[3])return toast("Không đủ linh thạch");S.stone-=t[3];S.tech.push(+k);toast("Lĩnh ngộ "+t[0])}
 if(a=='buy'){const c=Math.floor(ITEMS[k][2]*(1+S.r));if(S.stone<c)return toast("Không đủ linh thạch");S.stone-=c;S.items[k]++}
 if(a=='use'&&S.items[k]>0){const m={tk:.2,tc:.6,kn:1.5,tl:5}[k];S.items[k]--;const g=Math.floor(need()*m);addQi(g);burst(80);beep(700,.3);toast(ITEMS[k][0]+": +"+fmt(g)+" tu vi")}
 if(a=='explore'){const m=MAP[k];S.cd[k]=Date.now()+30000;const g=Math.floor(40*Math.pow(2.2,m[1])*(1+Math.random()));S.stone+=g;let t="Thám hiểm "+m[0]+": +"+fmt(g)+" linh thạch";if(Math.random()<.5){const ks=Object.keys(ITEMS),x=ks[Math.floor(Math.random()*ks.length)];S.items[x]++;t+=", nhặt được "+ITEMS[x][0]}toast(t);burst(60)}
 if(a=='join')toast("Bạn đã bái nhập "+k+" (mô phỏng)");
 if(a=='save'){save();toast("Đã lưu game")}
 if(a=='reload'){const d=load();if(d){S=d;toast("Đã tải lại game")}}
 if(a=='rename'){const n=prompt("Tên đạo hiệu:",S.name);if(n)S.name=n.slice(0,16)}
 if(a=='reset'){if(confirm("Xóa toàn bộ tiến trình?")&&confirm("Xác nhận lần hai: không thể khôi phục!")){localStorage.removeItem(KEY);S=fresh();toast("Đã reset")}}
 render();panel(tab)};
$('#pclose').onclick=()=>panel(0);
$('#nav').innerHTML=NAV.map((n,i)=>`<button>${n}</button>`).join("");
document.querySelectorAll('#nav button').forEach((b,i)=>b.onclick=()=>panel(i));
/* Cộng đồng giả lập */
const CHAT=["Có ai tìm đội đi Vạn Yêu Lâm không?","Vừa đột phá Kim Đan, mừng quá!","Bán Trúc Cơ Đan giá rẻ.","Thiên Kiếm Tông đang tuyển đệ tử.","Ma tu xuất hiện ở Cửu U!","Linh căn Hỗn Độn là có thật sao?"];
setInterval(()=>{const c=$('#chat');if(c){const d=document.createElement('div');d.textContent=NAMEFAKE[Math.random()*20|0]+": "+CHAT[Math.random()*CHAT.length|0];c.prepend(d);if(c.children.length>8)c.lastChild.remove()}},5000);
setInterval(()=>{if(Math.random()<.4){boost=Date.now()+30000;toast("✦ Thiên đạo giáng phúc: linh khí x2 trong 30 giây!")}},60000);
/* Vòng lặp */
let lt=Date.now();
setInterval(()=>{const n=Date.now(),dt=(n-lt)/1000;lt=n;if(!tribRun){addQi(autoQi()*dt)}render()},500);
setInterval(save,15000);addEventListener('beforeunload',save);
/* Offline */
function boot(){S=load();if(!S){S=fresh();setTimeout(()=>toast("Linh căn của bạn: "+ROOTS[S.root][0]+" ("+ROOTS[S.root][3]+")"),500)}
 else{const sec=Math.min(8*3600,(Date.now()-S.last)/1000);if(sec>60){const g=Math.floor(autoQi()*sec*.5);if(g>0){addQi(g);setTimeout(()=>{$('#pbody').innerHTML=`<h3>Tu luyện ngoại tuyến</h3><p>Bạn đã bế quan ${Math.floor(sec/60)} phút và hấp thụ <b>${fmt(g)}</b> tu vi (hiệu suất 50%, tối đa 8 giờ).</p>`;$('#panel').hidden=false},300)}}}
 S.cd=S.cd||{};render()}
/* Đồ họa nền */
const cv=$('#bg'),cx=cv.getContext('2d');let P=[],W,H,clouds=[];
function size(){W=cv.width=innerWidth;H=cv.height=innerHeight;clouds=Array.from({length:7},(_,i)=>({x:Math.random()*W,y:H*(.2+Math.random()*.5),s:80+Math.random()*120,v:.1+Math.random()*.3}))}
addEventListener('resize',size);size();
function burst(n){for(let i=0;i<n;i++){const a=Math.random()*6.28,d=Math.max(W,H)*(.3+Math.random()*.4);P.push({x:W/2+Math.cos(a)*d,y:H*.55+Math.sin(a)*d*.6,l:1,c:Math.random()<.3?'217,180,90':'111,227,208'})}}
function ridge(y,amp,col,off){cx.fillStyle=col;cx.beginPath();cx.moveTo(0,H);for(let x=0;x<=W;x+=20)cx.lineTo(x,y-Math.abs(Math.sin(x*.004+off))*amp-Math.sin(x*.013+off)*amp*.3);cx.lineTo(W,H);cx.fill()}
function pagoda(x,y,s){cx.fillStyle='#0d1a2e';for(let i=0;i<4;i++){const w=s*(1-i*.18);cx.beginPath();cx.moveTo(x-w,y-i*s*.4);cx.lineTo(x,y-i*s*.4-s*.25);cx.lineTo(x+w,y-i*s*.4);cx.fill();cx.fillRect(x-w*.6,y-i*s*.4,w*1.2,s*.15)}cx.fillStyle='#d9b45a99';cx.fillRect(x-2,y-s*1.8,4,s*.3)}
function draw(){const g=cx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#0a0f2e');g.addColorStop(.5,'#13405a');g.addColorStop(1,'#1d6a68');cx.fillStyle=g;cx.fillRect(0,0,W,H);
 cx.fillStyle='#d9b45a22';cx.beginPath();cx.arc(W*.75,H*.25,70,0,7);cx.fill();
 ridge(H*.6,H*.3,'#14304a',1);pagoda(W*.2,H*.5,40);pagoda(W*.82,H*.48,30);ridge(H*.75,H*.2,'#0d2236',3);
 cx.fillStyle='#8fe8ff55';cx.fillRect(W*.1,H*.6,3,H*.2);
 const t=Date.now()/1000;clouds.forEach(c=>{c.x+=c.v;if(c.x>W+200)c.x=-200;cx.fillStyle='#ffffff14';for(let k=0;k<4;k++){cx.beginPath();cx.ellipse(c.x+k*c.s*.4,c.y+Math.sin(k)*10,c.s*.5,c.s*.18,0,0,7);cx.fill()}});
 if(Math.random()<.35)burst(1);
 P=P.filter(p=>p.l>0);P.forEach(p=>{const dx=W/2-p.x,dy=H*.55-p.y;p.x+=dx*.03;p.y+=dy*.03;p.l-=.012;cx.fillStyle=`rgba(${p.c},${p.l})`;cx.beginPath();cx.arc(p.x,p.y,2.2,0,7);cx.fill()});
 for(let i=0;i<10;i++){const a=t*.3+i*2.1;cx.fillStyle='#ffb7d588';cx.fillRect((W*(i/10)+a*40)%W,(a*30+i*90)%H,5,3)}
 if(!window.NOBG)requestAnimationFrame(draw)}
boot();draw();
