(()=>{'use strict';
const CURRENT=document.querySelector('meta[name="app-version"]')?.content||'1.0.0';
const notice=document.getElementById('updateNotice');
const message=document.getElementById('updateMessage');
const compare=(a,b)=>{const x=String(a).split('.').map(Number),y=String(b).split('.').map(Number);for(let i=0;i<Math.max(x.length,y.length);i++){const d=(x[i]||0)-(y[i]||0);if(d)return d}return 0};
let registration=null;
async function check(){if(!navigator.onLine)return;try{const response=await fetch('./version.json?check='+Date.now(),{cache:'no-store'});if(!response.ok)return;const latest=await response.json();if(latest.version&&compare(latest.version,CURRENT)>0){message.textContent=latest.message||'એપનું નવું વર્ઝન ઉપલબ્ધ છે. અપડેટ કરતાં પહેલાં તમારો ડેટા આ ઉપકરણમાં જળવાઈ રહેશે.';notice.hidden=false;}}catch(e){}}
document.getElementById('updateLater')?.addEventListener('click',()=>{notice.hidden=true});
document.getElementById('updateNow')?.addEventListener('click',async()=>{const button=document.getElementById('updateNow');button.disabled=true;button.textContent='અપડેટ થઈ રહ્યું છે…';try{if('serviceWorker'in navigator){registration=registration||await navigator.serviceWorker.getRegistration();if(registration){await registration.update();if(registration.waiting)registration.waiting.postMessage('SKIP_WAITING');}}if('caches'in window){const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('dgp-cache-')).map(k=>caches.delete(k)));}location.reload();}catch(e){button.disabled=false;button.textContent='ફરી પ્રયાસ કરો';}});
if('serviceWorker'in navigator){navigator.serviceWorker.addEventListener('controllerchange',()=>location.reload());navigator.serviceWorker.ready.then(r=>{registration=r;check()}).catch(check)}else check();
window.addEventListener('online',check);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)check()});
})();
