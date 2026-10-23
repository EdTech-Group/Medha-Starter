(function(){
var P=window.parent,$=function(i){return document.getElementById(i)};
function post(o){try{P.postMessage(o,'*')}catch(e){}}
function sleep(ms){return new Promise(function(r){setTimeout(r,ms)})}
var inlBtn=document.querySelector('[data-mx="inl"]');
function setInline(v){if(inlBtn&&(inlBtn.getAttribute('aria-pressed')=='true')!==!!v)inlBtn.click()}
function setStatus(t,bad){var s=$('me-msg');s.textContent=t;s.className='me-msg'+(bad?' bad':'')}
window.addEventListener('message',function(e){if(e.source!==P)return;var d=e.data||{};if(d.type!='medha-math-load')return;
var tex=$('mx-tex');
if(d.tex){tex.value=d.tex;tex.dispatchEvent(new Event('input',{bubbles:true}))}
else if(d.mathml){$('mx-src').value=d.mathml;var ap=document.querySelector('[data-mx="apply"]');if(ap)ap.click()}
else{tex.value='';tex.dispatchEvent(new Event('input',{bubbles:true}))}
setInline(d.inline);tex.focus()});
async function ins(){
var tex=$('mx-tex'),latexMode=$('mx-mode').hidden;
if(latexMode){tex.dispatchEvent(new Event('input',{bubbles:true}));await sleep(300)}
var m=document.querySelector('#mx-prev math');
if(!m||(latexMode&&!tex.value.trim())||!(m.textContent||'').trim()&&!m.querySelector('mtable,mspace')){setStatus('Type or build an equation first.',true);tex.focus();return}
post({type:'medha-math-insert',mathml:m.outerHTML,tex:latexMode?tex.value:'',inline:inlBtn&&inlBtn.getAttribute('aria-pressed')=='true'})}
$('me-ins').onclick=ins;$('me-cancel').onclick=function(){post({type:'medha-math-cancel'})};
document.addEventListener('keydown',function(e){if(e.key=='Escape')post({type:'medha-math-cancel'});if((e.ctrlKey||e.metaKey)&&e.key=='Enter'){e.preventDefault();ins()}});
post({type:'medha-math-ready'});
})();
