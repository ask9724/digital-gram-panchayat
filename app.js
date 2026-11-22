const $=id=>document.getElementById(id);
const read=(k,d=[])=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
let docs=read('dgp_docs'), notes=read('dgp_notes');
function render(){ $('docCount').textContent=docs.length; $('noteCount').textContent=notes.length;
$('docList').innerHTML=''; docs.forEach((x,i)=>{const el=document.createElement('div');el.className='item';el.textContent=x.title+'\n'+x.body;const b=document.createElement('button');b.textContent='કાઢી નાખો';b.className='secondary';b.onclick=()=>{docs.splice(i,1);write('dgp_docs',docs);render()};el.append(b);$('docList').append(el)});
$('noteList').innerHTML=''; notes.forEach((x,i)=>{const el=document.createElement('div');el.className='item';el.textContent=x;const b=document.createElement('button');b.textContent='કાઢી નાખો';b.className='secondary';b.onclick=()=>{notes.splice(i,1);write('dgp_notes',notes);render()};el.append(b);$('noteList').append(el)})}
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{document.querySelectorAll('nav button').forEach(x=>x.classList.remove('active'));document.querySelectorAll('.tab').forEach(x=>x.classList.remove('show'));b.classList.add('active');$(b.dataset.tab).classList.add('show')});
$('saveDoc').onclick=()=>{const title=$('docTitle').value.trim(),body=$('docBody').value.trim();if(!title){alert('દસ્તાવેજનું નામ લખો');return}docs.unshift({title,body,date:new Date().toISOString()});write('dgp_docs',docs);$('docTitle').value='';$('docBody').value='';render()};
$('saveNote').onclick=()=>{const v=$('noteText').value.trim();if(!v)return;notes.unshift(v);write('dgp_notes',notes);$('noteText').value='';render()};
const c=$('signCanvas'),ctx=c.getContext('2d');ctx.lineWidth=3;ctx.lineCap='round';let drawing=false;
function pos(e){const r=c.getBoundingClientRect(),p=e.touches?e.touches[0]:e;return{x:(p.clientX-r.left)*c.width/r.width,y:(p.clientY-r.top)*c.height/r.height}}
function start(e){drawing=true;const p=pos(e);ctx.beginPath();ctx.moveTo(p.x,p.y);e.preventDefault()}
function move(e){if(!drawing)return;const p=pos(e);ctx.lineTo(p.x,p.y);ctx.stroke();e.preventDefault()}
function stop(){drawing=false}
c.addEventListener('pointerdown',start);c.addEventListener('pointermove',move);window.addEventListener('pointerup',stop);
$('clearSign').onclick=()=>ctx.clearRect(0,0,c.width,c.height);
$('saveSign').onclick=()=>{localStorage.setItem('dgp_signature',c.toDataURL());alert('સહી સાચવાઈ')};
$('signImage').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{localStorage.setItem('dgp_signature_image',r.result);$('signPreview').src=r.result};r.readAsDataURL(f)};
const saved=localStorage.getItem('dgp_signature_image');if(saved)$('signPreview').src=saved;
$('exportData').onclick=()=>{const data={docs,notes,signature:localStorage.getItem('dgp_signature'),signatureImage:localStorage.getItem('dgp_signature_image')};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='digital-gram-panchayat-backup.json';a.click();URL.revokeObjectURL(a.href)};
$('importData').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);docs=d.docs||[];notes=d.notes||[];write('dgp_docs',docs);write('dgp_notes',notes);if(d.signature)localStorage.setItem('dgp_signature',d.signature);if(d.signatureImage){localStorage.setItem('dgp_signature_image',d.signatureImage);$('signPreview').src=d.signatureImage}render();$('backupStatus').textContent='બેકઅપ સફળતાપૂર્વક પુનઃસ્થાપિત થયો.'}catch{$('backupStatus').textContent='આ બેકઅપ ફાઇલ યોગ્ય નથી.'}};r.readAsText(f)};
render();
if('serviceWorker' in navigator && location.protocol.startsWith('http'))navigator.serviceWorker.register('./sw.js').catch(()=>{});
