(()=>{'use strict';
const $=id=>document.getElementById(id),KEY='dgp_login_v1';
const gate=$('loginGate'),form=$('loginForm'),title=$('loginTitle'),msg=$('loginMessage'),submit=$('loginSubmit'),err=$('loginError');
let cfg=null;
const enc=new TextEncoder();
function randomSalt(){const a=new Uint8Array(16);crypto.getRandomValues(a);return Array.from(a,x=>x.toString(16).padStart(2,'0')).join('')}
async function digest(pin,salt){if(!crypto.subtle)throw new Error('આ ઉપકરણમાં સુરક્ષિત પાસવર્ડ સુવિધા ઉપલબ્ધ નથી.');const b=await crypto.subtle.digest('SHA-256',enc.encode(salt+':'+pin));return Array.from(new Uint8Array(b),x=>x.toString(16).padStart(2,'0')).join('')}
function validPin(v){return /^[0-9]{4}$/.test(v)}
function show(){gate.hidden=false;document.body.classList.add('auth-locked')}
function unlock(){gate.hidden=true;document.body.classList.remove('auth-locked')}
async function save(id,pin){const salt=randomSalt();cfg={id:id.trim(),salt,hash:await digest(pin,salt)};localStorage.setItem(KEY,JSON.stringify(cfg))}
async function init(){try{cfg=JSON.parse(localStorage.getItem(KEY)||'null')}catch{cfg=null}
if(!cfg){title.textContent='પ્રથમ વખત સેટઅપ';msg.textContent='તમારી પસંદગીની લોગિન ID અને ૪ અંકનો પાસવર્ડ બનાવો.';submit.textContent='પાસવર્ડ સેટ કરો';$('loginId').placeholder='તમારી પસંદગીની ID';$('loginPin').autocomplete='new-password'}else{title.textContent='ડિજિટલ ગ્રામ પંચાયત';msg.textContent='તમારી લોગિન ID અને ૪ અંકનો પાસવર્ડ દાખલ કરો.';submit.textContent='લોગિન કરો';$('loginId').value=cfg.id}
show()}
form.addEventListener('submit',async e=>{e.preventDefault();err.textContent='';const id=$('loginId').value.trim(),pin=$('loginPin').value;if(!id){err.textContent='લોગિન ID લખો.';return}if(!validPin(pin)){err.textContent='પાસવર્ડ બરાબર ૪ અંકનો હોવો જોઈએ.';return}submit.disabled=true;try{if(!cfg){await save(id,pin);unlock()}else if(id===cfg.id&&await digest(pin,cfg.salt)===cfg.hash){unlock()}else{err.textContent='લોગિન ID અથવા પાસવર્ડ ખોટો છે.'}}catch(ex){err.textContent=ex.message||'કંઈક ભૂલ થઈ.'}finally{submit.disabled=false}});
const change=$('changeLogin');if(change)change.addEventListener('click',async()=>{const status=$('loginChangeStatus'),id=$('newLoginId').value.trim(),pin=$('newLoginPin').value,current=$('currentLoginPin').value;status.textContent='';if(!cfg){status.textContent='પહેલા લોગિન સેટ કરો.';return}if(!id){status.textContent='નવી લોગિન ID લખો.';return}if(!validPin(pin)){status.textContent='નવો પાસવર્ડ બરાબર ૪ અંકનો હોવો જોઈએ.';return}try{if(await digest(current,cfg.salt)!==cfg.hash){status.textContent='હાલનો પાસવર્ડ ખોટો છે.';return}await save(id,pin);$('loginId').value=id;$('newLoginId').value='';$('newLoginPin').value='';$('currentLoginPin').value='';status.textContent='લોગિન ID અને પાસવર્ડ સફળતાપૂર્વક બદલાયા.'}catch(ex){status.textContent=ex.message}});
init();
})();