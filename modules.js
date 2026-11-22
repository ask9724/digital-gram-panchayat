// વધારાના મોડ્યુલ: આવક-જાવક રજિસ્ટર અને ઠરાવ ડ્રાફ્ટ
(()=>{
 const nav=document.querySelector('nav'), main=document.querySelector('main');
 const addTab=(id,label,html)=>{
   const b=document.createElement('button'); b.dataset.tab=id; b.textContent=label; nav.append(b);
   const s=document.createElement('section'); s.id=id; s.className='tab'; s.innerHTML=html; main.append(s);
   b.addEventListener('click',()=>{nav.querySelectorAll('button').forEach(x=>x.classList.remove('active'));main.querySelectorAll('.tab').forEach(x=>x.classList.remove('show'));b.classList.add('active');s.classList.add('show')});
 };
 addTab('accounts','આવક-જાવક',`
 <h2>આવક-જાવક રજિસ્ટર</h2>
 <label>તારીખ<input type="date" id="accDate"></label>
 <label>પ્રકાર<select id="accType"><option value="આવક">આવક</option><option value="જાવક">જાવક</option></select></label>
 <label>વિગત<input id="accDesc" placeholder="રકમ શેના માટે છે?"></label>
 <label>રકમ (₹)<input id="accAmount" type="number" min="0.01" step="0.01"></label>
 <label>રસીદ/વાઉચર નંબર<input id="accRef"></label>
 <button id="accSave">નોંધણી સાચવો</button>
 <div class="stats"><div><b id="incomeTotal">₹0</b><span>કુલ આવક</span></div><div><b id="expenseTotal">₹0</b><span>કુલ જાવક</span></div><div><b id="balanceTotal">₹0</b><span>બાકી સિલક</span></div></div>
 <div id="accRows"></div>`);
 addTab('resolutions','ઠરાવ તૈયાર કરો',`
 <h2>ગ્રામ પંચાયત ઠરાવ ડ્રાફ્ટ</h2>
 <p class="hint">વિગતો ભરીને પ્રાથમિક ડ્રાફ્ટ બનાવો. સત્તાવાર ઉપયોગ પહેલાં અધિનિયમ/નિયમો મુજબ ચકાસણી કરવી.</p>
 <label>ગ્રામ પંચાયતનું નામ<input id="resGp" value="દલુખડિયા ગ્રુપ ગ્રામ પંચાયત"></label>
 <label>તાલુકો અને જિલ્લો<input id="resPlace" value="તા. લુણાવાડા, જી. મહીસાગર"></label>
 <label>સભાનો પ્રકાર<input id="resMeeting" value="સામાન્ય સભા"></label>
 <label>તારીખ<input type="date" id="resDate"></label>
 <label>વિષય<input id="resSubject" placeholder="ઠરાવનો વિષય"></label>
 <label>દરખાસ્ત/ઠરાવ નંબર<input id="resNo" placeholder="દરખાસ્ત નં. ૧ / ઠરાવ નં. ૧"></label>
 <label>વિગતો અને ચર્ચા<textarea id="resDetails" rows="4"></textarea></label>
 <label>ઠરાવનો નિર્ણય<textarea id="resDecision" rows="4"></textarea></label>
 <button id="resGenerate">ઠરાવનો ડ્રાફ્ટ બનાવો</button>
 <label>તૈયાર લખાણ<textarea id="resOutput" rows="12"></textarea></label>
 <button id="resSave">દસ્તાવેજોમાં સાચવો</button>
 <h3>જૂના ઠરાવમાંથી જરૂરી ભાગની અલગ નકલ</h3>
 <label>મૂળ લખાણ<textarea id="extractSource" rows="5" placeholder="જૂના ઠરાવનું લખાણ અહીં પેસ્ટ કરો"></textarea></label>
 <label>જરૂરી ભાગ<textarea id="extractPart" rows="4" placeholder="અલગ નકલમાં રાખવાનો ભાગ અહીં પેસ્ટ કરો"></textarea></label>
 <button id="extractSave">અલગ નકલ દસ્તાવેજોમાં સાચવો</button>`);
 const read=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
 const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
 let rows=read('dgp_accounts',[]);
 const fmt=n=>'₹'+Number(n||0).toLocaleString('en-IN',{maximumFractionDigits:2});
 function renderAccounts(){
  const inc=rows.filter(x=>x.type==='આવક').reduce((a,x)=>a+x.amount,0), out=rows.filter(x=>x.type==='જાવક').reduce((a,x)=>a+x.amount,0);
  document.getElementById('incomeTotal').textContent=fmt(inc);document.getElementById('expenseTotal').textContent=fmt(out);document.getElementById('balanceTotal').textContent=fmt(inc-out);
  const box=document.getElementById('accRows');box.replaceChildren();
  [...rows].reverse().forEach((x,i)=>{const d=document.createElement('div');d.className='item';d.textContent=x.date+' • '+x.type+' • '+x.desc+' • '+fmt(x.amount)+' • '+(x.ref||'');
   const b=document.createElement('button');b.className='secondary';b.textContent='કાઢી નાખો';b.onclick=()=>{rows.splice(rows.length-1-i,1);write('dgp_accounts',rows);renderAccounts()};d.append(b);box.append(d)});
 }
 document.getElementById('accDate').value=new Date().toISOString().slice(0,10);
 document.getElementById('accSave').onclick=()=>{const amount=Number(document.getElementById('accAmount').value),desc=document.getElementById('accDesc').value.trim();if(!amount||amount<=0||!desc){alert('વિગત અને યોગ્ય રકમ દાખલ કરો');return}
 rows.push({date:document.getElementById('accDate').value,type:document.getElementById('accType').value,desc,amount,ref:document.getElementById('accRef').value.trim()});write('dgp_accounts',rows);document.getElementById('accDesc').value='';document.getElementById('accAmount').value='';document.getElementById('accRef').value='';renderAccounts()};
 document.getElementById('resGenerate').onclick=()=>{
  const v=id=>document.getElementById(id).value.trim();
  if(!v('resSubject')||!v('resDecision')){alert('વિષય અને ઠરાવનો નિર્ણય લખો');return}
  const date=v('resDate')?new Date(v('resDate')+'T00:00:00').toLocaleDateString('gu-IN'):'________';
  document.getElementById('resOutput').value=v('resGp')+'\n'+v('resPlace')+'\n'+v('resMeeting')+' — તા. '+date+'\n\n'+v('resNo')+'\nવિષય: '+v('resSubject')+'\n\nચર્ચા/વિગતો: '+(v('resDetails')||'—')+'\n\nઠરાવ: '+v('resDecision')+'\n\nસર્વાનુમતે/બહુમતીથી ઠરાવ કરવામાં આવે છે.\n\nસરપંચની સહી: __________    તલાટી કમ મંત્રીની સહી: __________';
 };
 document.getElementById('resSave').onclick=()=>{const val=document.getElementById('resOutput').value.trim();if(!val){alert('પહેલાં ડ્રાફ્ટ બનાવો');return}const docs=read('dgp_docs',[]);docs.unshift({title:'ગ્રામ પંચાયત ઠરાવ — '+(document.getElementById('resSubject').value||''),body:val,date:new Date().toISOString()});write('dgp_docs',docs);alert('ઠરાવ દસ્તાવેજોમાં સાચવાયો')};
 document.getElementById('extractSave').onclick=()=>{const part=document.getElementById('extractPart').value.trim();if(!part){alert('અલગ નકલ માટેનો જરૂરી ભાગ લખો');return}const docs=read('dgp_docs',[]);docs.unshift({title:'જૂના ઠરાવમાંથી અલગ નકલ',body:part,date:new Date().toISOString()});write('dgp_docs',docs);alert('અલગ નકલ દસ્તાવેજોમાં સાચવાઈ')};
 renderAccounts();
})();