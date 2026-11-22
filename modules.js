// ગ્રામ પંચાયત પત્રવ્યવહાર આવક-જાવક રજિસ્ટર અને ઠરાવ મોડ્યુલ
(()=>{
 const nav=document.querySelector('nav'), main=document.querySelector('main');
 const addTab=(id,label,html)=>{
  const b=document.createElement('button');b.dataset.tab=id;b.textContent=label;nav.append(b);
  const s=document.createElement('section');s.id=id;s.className='tab';s.innerHTML=html;main.append(s);
  b.addEventListener('click',()=>{nav.querySelectorAll('button').forEach(x=>x.classList.remove('active'));main.querySelectorAll('.tab').forEach(x=>x.classList.remove('show'));b.classList.add('active');s.classList.add('show')});
 };
 const inwardHTML=`
 <h2>આવક રજિસ્ટર — મળેલ પત્રો / અરજીઓ</h2>
 <p class="hint">ગ્રામ પંચાયતને મળેલ પત્રો અને અરજીઓની નોંધણી.</p>
 <label>મળ્યાની તારીખ<input type="date" id="inDate"></label>
 <label>મૂળ પત્રની તારીખ<input type="date" id="inLetterDate"></label>
 <label>મોકલનારનો પત્ર નંબર<input id="inLetterNo"></label>
 <label>અરજદાર / મોકલનારનું નામ<input id="inFrom"></label>
 <label>સરનામું<input id="inAddress"></label>
 <label>વિષય<input id="inSubject"></label>
 <label>અરજી / પત્રનો પ્રકાર<input id="inType" placeholder="અરજી, સરકારી પત્ર, જાણ, ફરિયાદ વગેરે"></label>
 <label>મૂળ અરજી / પત્રની PDF અથવા ફોટો<input type="file" id="inFile" accept="application/pdf,image/*"></label>
 <label>કાર્યવાહી માટે કોને મોકલ્યું<input id="inAssigned" placeholder="નામ / હોદ્દો"></label>
 <label>કરેલ કાર્યવાહી<textarea id="inAction" rows="3"></textarea></label>
 <label>સ્થિતિ<select id="inStatus"><option>બાકી</option><option>ચાલુ</option><option>પૂર્ણ</option></select></label>
 <label>જવાબની તારીખ<input type="date" id="inReplyDate"></label>
 <label>જવાબનો પત્ર નંબર<input id="inReplyNo"></label>
 <label>જવાબની નકલ PDF / ફોટો<input type="file" id="inReplyFile" accept="application/pdf,image/*"></label>
 <button id="inSave">આવક નોંધ સાચવો</button>
 <h3>જૂની આવક નોંધ શોધો</h3><input id="inSearch" placeholder="નોંધ નંબર, નામ, વિષય અથવા પત્ર નંબરથી શોધો">
 <div id="inRows"></div>`;
 const outwardHTML=`
 <h2>જાવક રજિસ્ટર — મોકલેલ પત્રો</h2>
 <p class="hint">ગ્રામ પંચાયત તરફથી મોકલેલ પત્રો / જવાબોની નોંધણી.</p>
 <label>મોકલ્યાની તારીખ<input type="date" id="outDate"></label>
 <label>જાવક પત્ર નંબર<input id="outLetterNo"></label>
 <label>મેળવનારનું નામ<input id="outTo"></label>
 <label>સરનામું<input id="outAddress"></label>
 <label>વિષય<input id="outSubject"></label>
 <label>પત્રનો પ્રકાર<input id="outType" placeholder="જવાબ, નોટિસ, જાણ, ભલામણ વગેરે"></label>
 <label>પત્રની PDF / ફોટો<input type="file" id="outFile" accept="application/pdf,image/*"></label>
 <label>નોંધ / મોકલવાની રીત<input id="outMode" placeholder="રૂબરૂ, ટપાલ, ઈ-મેઇલ વગેરે"></label>
 <button id="outSave">જાવક નોંધ સાચવો</button>
 <h3>જૂની જાવક નોંધ શોધો</h3><input id="outSearch" placeholder="નોંધ નંબર, નામ, વિષય અથવા પત્ર નંબરથી શોધો">
 <div id="outRows"></div>`;
 addTab('inward','આવક રજિસ્ટર',inwardHTML);
 addTab('outward','જાવક રજિસ્ટર',outwardHTML);
 addTab('leave','રજા અહેવાલ',`
 <h2>રજા અહેવાલ / રજા અરજી</h2>
 <label>પ્રતિ<input id="leaveTo" value="તાલુકા વિકાસ અધિકારી, તાલુકા પંચાયત લુણાવાડા"></label>
 <label>અરજદારનું નામ<input id="leaveName" value="એ. આર. સુથાર"></label>
 <label>હોદ્દો<input id="leaveRole" value="તલાટી કમ મંત્રી"></label>
 <label>ગ્રામ પંચાયત<input id="leaveGp" value="દલુખડિયા ગ્રુપ ગ્રામ પંચાયત"></label>
 <label>રજાની તારીખ<input type="date" id="leaveDate"></label>
 <label>રજાનો સમયગાળો<input id="leaveDuration" placeholder="એક દિવસ"></label>
 <label>રજાનું કારણ<textarea id="leaveReason" rows="3" placeholder="રજાનું કારણ લખો"></textarea></label>
 <button id="leaveGenerate">રજા અહેવાલ તૈયાર કરો</button>
 <label>તૈયાર લખાણ<textarea id="leaveOutput" rows="10"></textarea></label>
 <button id="leaveSave">દસ્તાવેજોમાં સાચવો</button>
 <p class="hint">સહી માટે એપના “સહી” વિભાગમાં દોરેલી અથવા અપલોડ કરેલી સહીનો ઉપયોગ કરી શકો છો. આ ડ્રાફ્ટ છે; સત્તાવાર રીતે મોકલતા પહેલાં વિગતો તપાસો.</p>
 `);
 addTab('resolutions','ઠરાવ તૈયાર કરો',`
 <h2>ગ્રામ પંચાયત ઠરાવ ડ્રાફ્ટ</h2><p class="hint">વિગતો ભરીને પ્રાથમિક ડ્રાફ્ટ બનાવો. સત્તાવાર ઉપયોગ પહેલાં અધિનિયમ/નિયમો મુજબ ચકાસણી કરવી.</p>
 <label>ગ્રામ પંચાયતનું નામ<input id="resGp" value="દલુખડિયા ગ્રુપ ગ્રામ પંચાયત"></label><label>તાલુકો અને જિલ્લો<input id="resPlace" value="તા. લુણાવાડા, જી. મહીસાગર"></label>
 <label>સભાનો પ્રકાર<input id="resMeeting" value="સામાન્ય સભા"></label><label>તારીખ<input type="date" id="resDate"></label>
 <label>વિષય<input id="resSubject"></label><label>દરખાસ્ત/ઠરાવ નંબર<input id="resNo"></label><label>વિગતો અને ચર્ચા<textarea id="resDetails" rows="4"></textarea></label><label>ઠરાવનો નિર્ણય<textarea id="resDecision" rows="4"></textarea></label>
 <button id="resGenerate">ઠરાવનો ડ્રાફ્ટ બનાવો</button><label>તૈયાર લખાણ<textarea id="resOutput" rows="12"></textarea></label><button id="resSave">દસ્તાવેજોમાં સાચવો</button>
 <h3>જૂના ઠરાવમાંથી જરૂરી ભાગની અલગ નકલ</h3><label>મૂળ લખાણ<textarea id="extractSource" rows="5"></textarea></label><label>અલગ નકલમાં રાખવાનો જરૂરી ભાગ<textarea id="extractPart" rows="4"></textarea></label><button id="extractSave">અલગ નકલ દસ્તાવેજોમાં સાચવો</button>`);
 const $=id=>document.getElementById(id);
 const read=(k,d=[])=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
 const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
 const today=new Date().toISOString().slice(0,10);
 $('inDate').value=today;$('outDate').value=today;
 const loadFile=id=>new Promise(resolve=>{const f=$(id).files[0];if(!f)return resolve(null);if(f.size>1*1024*1024){alert('ફાઇલ 1 MB કરતાં નાની રાખો');return resolve(undefined)}const r=new FileReader();r.onload=()=>resolve({name:f.name,type:f.type,data:r.result});r.onerror=()=>resolve(undefined);r.readAsDataURL(f)});
 const nextNo=(arr,prefix)=>prefix+String(arr.reduce((m,x)=>Math.max(m,Number(x.noSeq)||0),0)+1).padStart(4,'0');
 let inward=read('dgp_inward',[]),outward=read('dgp_outward',[]);
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function renderList(kind){
  const arr=kind==='in'?inward:outward,box=$(kind+'Rows'),q=$(kind+'Search').value.trim().toLowerCase();box.replaceChildren();
  [...arr].reverse().filter(x=>!q||[x.no,x.name,x.subject,x.letterNo,x.address].some(v=>String(v||'').toLowerCase().includes(q))).forEach(x=>{
   const d=document.createElement('div');d.className='item';
   const line=document.createElement('div');line.innerHTML='<b>'+esc(x.no)+'</b> • '+esc(x.date)+' • '+esc(x.name)+'<br>પત્ર નં.: '+esc(x.letterNo)+'<br>વિષય: '+esc(x.subject)+(kind==='in'?'<br>સ્થિતિ: '+esc(x.status)+' • કાર્યવાહી: '+esc(x.assigned):'<br>મોકલવાની રીત: '+esc(x.mode));
   d.append(line);
   [x.file,x.replyFile].filter(Boolean).forEach(f=>{const a=document.createElement('a');a.href=f.data;a.download=f.name;a.textContent=' • '+f.name+' ડાઉનલોડ';a.style.display='inline-block';d.append(a)});
   const del=document.createElement('button');del.className='secondary';del.textContent='નોંધ કાઢી નાખો';del.onclick=()=>{if(!confirm('આ નોંધ કાઢી નાખવી છે?'))return;const i=arr.findIndex(y=>y.id===x.id);if(i>=0)arr.splice(i,1);write(kind==='in'?'dgp_inward':'dgp_outward',arr);renderList(kind)};d.append(del);box.append(d);
  });
 }
 $('inSearch').oninput=() => renderList('in');$('outSearch').oninput=()=>renderList('out');
 $('inSave').onclick=async()=>{
  const name=$('inFrom').value.trim(),subject=$('inSubject').value.trim();if(!name||!subject||!$('inDate').value){alert('મળ્યાની તારીખ, મોકલનારનું નામ અને વિષય જરૂરી છે');return}
  const file=await loadFile('inFile'),replyFile=await loadFile('inReplyFile');if(file===undefined||replyFile===undefined)return;
  const x={id:Date.now()+'-'+Math.random(),no:nextNo(inward,'આવક-'),date:$('inDate').value,letterDate:$('inLetterDate').value,letterNo:$('inLetterNo').value.trim(),name,address:$('inAddress').value.trim(),subject,type:$('inType').value.trim(),file,assigned:$('inAssigned').value.trim(),action:$('inAction').value.trim(),status:$('inStatus').value,replyDate:$('inReplyDate').value,replyNo:$('inReplyNo').value.trim(),replyFile};
  inward.push(x);write('dgp_inward',inward);['inLetterDate','inLetterNo','inFrom','inAddress','inSubject','inType','inAssigned','inAction','inReplyDate','inReplyNo','inFile','inReplyFile'].forEach(id=>$(id).value='');$('inStatus').value='બાકી';$('inDate').value=today;renderList('in');alert('આવક નોંધ '+x.no+' સાચવાઈ');
 };
 $('outSave').onclick=async()=>{
  const name=$('outTo').value.trim(),subject=$('outSubject').value.trim();if(!name||!subject||!$('outDate').value){alert('મોકલ્યાની તારીખ, મેળવનારનું નામ અને વિષય જરૂરી છે');return}
  const file=await loadFile('outFile');if(file===undefined)return;
  const x={id:Date.now()+'-'+Math.random(),no:nextNo(outward,'જાવક-'),date:$('outDate').value,letterNo:$('outLetterNo').value.trim(),name,address:$('outAddress').value.trim(),subject,type:$('outType').value.trim(),file,mode:$('outMode').value.trim()};
  outward.push(x);write('dgp_outward',outward);['outLetterNo','outTo','outAddress','outSubject','outType','outFile','outMode'].forEach(id=>$(id).value='');$('outDate').value=today;renderList('out');alert('જાવક નોંધ '+x.no+' સાચવાઈ');
 };
 const v=id=>$(id).value.trim();
 $('leaveDate').value=today;
 $('leaveGenerate').onclick=()=>{if(!v('leaveDate')||!v('leaveReason')||!v('leaveDuration')){alert('રજાની તારીખ, સમયગાળો અને કારણ લખો');return}const date=new Date(v('leaveDate')+'T00:00:00').toLocaleDateString('gu-IN');$('leaveOutput').value='પ્રતિ,\\n'+v('leaveTo')+'\\n\\nવિષય: રજા મંજૂર કરવા બાબત.\\n\\nસવિનય જણાવવાનું કે હું '+v('leaveGp')+' ખાતે '+v('leaveRole')+' તરીકે ફરજ બજાવું છું. અંગત/સામાજિક કારણોસર તા. '+date+' ના રોજ '+v('leaveDuration')+' ની રજા મંજૂર કરવા વિનંતી છે. રજાના સમયગાળા દરમિયાન જરૂરી કામગીરીની વ્યવસ્થા નિયમ મુજબ રાખવામાં આવશે.\\n\\nઆપશ્રી રજા મંજૂર કરશો તેવી વિનંતી.\\n\\nઆભાર.\\n\\nઆપનો વિશ્વાસુ,\\n'+v('leaveName')+'\\n'+v('leaveRole')+'\\n'+v('leaveGp')+'\\nતા. લુણાવાડા, જી. મહીસાગર\\nસહી: __________________'};
 $('leaveSave').onclick=()=>{const val=$('leaveOutput').value.trim();if(!val){alert('પહેલાં રજા અહેવાલ તૈયાર કરો');return}const docs=read('dgp_docs',[]);docs.unshift({title:'રજા અહેવાલ — '+v('leaveDate'),body:val,date:new Date().toISOString()});write('dgp_docs',docs);alert('રજા અહેવાલ દસ્તાવેજોમાં સાચવાયો')};

 $('resGenerate').onclick=()=>{if(!v('resSubject')||!v('resDecision')){alert('વિષય અને ઠરાવનો નિર્ણય લખો');return}const date=v('resDate')?new Date(v('resDate')+'T00:00:00').toLocaleDateString('gu-IN'):'________';$('resOutput').value=v('resGp')+'\n'+v('resPlace')+'\n'+v('resMeeting')+' — તા. '+date+'\n\n'+v('resNo')+'\nવિષય: '+v('resSubject')+'\n\nચર્ચા/વિગતો: '+(v('resDetails')||'—')+'\n\nઠરાવ: '+v('resDecision')+'\n\nસર્વાનુમતે/બહુમતીથી ઠરાવ કરવામાં આવે છે.\n\nસરપંચની સહી: __________    તલાટી કમ મંત્રીની સહી: __________'};
 $('resSave').onclick=()=>{const val=$('resOutput').value.trim();if(!val){alert('પહેલાં ડ્રાફ્ટ બનાવો');return}const docs=read('dgp_docs',[]);docs.unshift({title:'ગ્રામ પંચાયત ઠરાવ — '+v('resSubject'),body:val,date:new Date().toISOString()});write('dgp_docs',docs);alert('ઠરાવ દસ્તાવેજોમાં સાચવાયો')};
 $('extractSave').onclick=()=>{const part=v('extractPart');if(!part){alert('અલગ નકલ માટેનો જરૂરી ભાગ લખો');return}const docs=read('dgp_docs',[]);docs.unshift({title:'જૂના ઠરાવમાંથી અલગ નકલ',body:part,date:new Date().toISOString()});write('dgp_docs',docs);alert('અલગ નકલ દસ્તાવેજોમાં સાચવાઈ')};
 function renderAccountsCompat(){renderList('in');renderList('out')}
 renderAccountsCompat();
})();
