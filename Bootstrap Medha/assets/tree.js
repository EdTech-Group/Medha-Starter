(function(){
// ---- Tree view ----
var tv=document.getElementById('tv');
if(tv){
var items=function(){return [].slice.call(tv.querySelectorAll('.tv-li')).filter(function(li){return !li.classList.contains('hide')&&!li.parentElement.closest('.tv-group.d-none')}).map(function(li){return li.querySelector('.tv-label')})};
function setOpen(li,open){var g=li.querySelector(':scope>.tv-group'),l=li.querySelector(':scope>.tv-row .tv-label'),t=li.querySelector(':scope>.tv-row .tv-toggle');if(!g)return;g.classList.toggle('d-none',!open);l.setAttribute('aria-expanded',open);t.classList.toggle('open',open)}
tv.querySelectorAll('.tv-li').forEach(function(li){var l=li.querySelector(':scope>.tv-row .tv-label');if(l.hasAttribute('aria-expanded'))setOpen(li,l.getAttribute('aria-expanded')=='true')});
tv.querySelector('.tv-label').tabIndex=0;
function count(){var n=tv.querySelectorAll('.tv-check:checked').length;document.getElementById('tv-sel').textContent=n+' selected'}
function focusItem(el){tv.querySelectorAll('.tv-label').forEach(function(x){x.tabIndex=-1});el.tabIndex=0;el.focus()}
tv.addEventListener('click',function(e){var t=e.target.closest('.tv-toggle:not(.ph)'),lab=e.target.closest('.tv-label');
if(t){var li=t.closest('.tv-li');setOpen(li,li.querySelector(':scope>.tv-group').classList.contains('d-none'))}
else if(lab){tv.querySelectorAll('.tv-label.sel').forEach(function(x){x.classList.remove('sel')});lab.classList.add('sel');focusItem(lab);if(e.detail==2){var li2=lab.closest('.tv-li');if(li2.querySelector(':scope>.tv-group'))setOpen(li2,li2.querySelector(':scope>.tv-group').classList.contains('d-none'))}}});
tv.addEventListener('change',function(e){var cb=e.target;if(!cb.classList.contains('tv-check'))return;var li=cb.closest('.tv-li');li.querySelectorAll('.tv-check').forEach(function(c){c.checked=cb.checked;c.indeterminate=false});
var p=li.parentElement.closest('.tv-li');while(p){var all=[].slice.call(p.querySelectorAll(':scope>.tv-group .tv-check')),on=all.filter(function(c){return c.checked}).length,pc=p.querySelector(':scope>.tv-row .tv-check');pc.checked=on==all.length;pc.indeterminate=on>0&&on<all.length;p=p.parentElement.closest('.tv-li')}count()});
tv.addEventListener('keydown',function(e){var lab=e.target.closest('.tv-label');if(!lab)return;var li=lab.closest('.tv-li'),list=items(),i=list.indexOf(lab),g=li.querySelector(':scope>.tv-group'),k=e.key;
if(k=='ArrowDown'){e.preventDefault();if(list[i+1])focusItem(list[i+1])}
else if(k=='ArrowUp'){e.preventDefault();if(list[i-1])focusItem(list[i-1])}
else if(k=='Home'){e.preventDefault();focusItem(list[0])}else if(k=='End'){e.preventDefault();focusItem(list[list.length-1])}
else if(k=='ArrowRight'){e.preventDefault();if(g){if(g.classList.contains('d-none'))setOpen(li,true);else focusItem(g.querySelector('.tv-label'))}}
else if(k=='ArrowLeft'){e.preventDefault();if(g&&!g.classList.contains('d-none'))setOpen(li,false);else{var par=li.parentElement.closest('.tv-li');if(par)focusItem(par.querySelector(':scope>.tv-row .tv-label'))}}
else if(k=='Enter'||k==' '){e.preventDefault();var cb=li.querySelector(':scope>.tv-row .tv-check');cb.checked=!cb.checked;cb.dispatchEvent(new Event('change',{bubbles:true}))}});
document.getElementById('tv-expand').onclick=function(){tv.querySelectorAll('.tv-li').forEach(function(li){setOpen(li,true)})};
document.getElementById('tv-collapse').onclick=function(){tv.querySelectorAll('.tv-li').forEach(function(li,i){if(i>0)setOpen(li,false)});setOpen(tv.querySelector('.tv-li'),true)};
document.getElementById('tv-search').addEventListener('input',function(e){var q=e.target.value.trim().toLowerCase();
tv.querySelectorAll('.tv-text').forEach(function(s){s.innerHTML=s.textContent.replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})});
tv.querySelectorAll('.tv-li').forEach(function(li){li.classList.remove('hide')});
if(!q)return;
var lis=[].slice.call(tv.querySelectorAll('.tv-li')).reverse();
lis.forEach(function(li){var s=li.querySelector(':scope>.tv-row .tv-text'),txt=s.textContent,hit=txt.toLowerCase().indexOf(q)>-1,kidHit=[].some.call(li.querySelectorAll(':scope>.tv-group>.tv-li'),function(k){return !k.classList.contains('hide')});
if(hit){var idx=txt.toLowerCase().indexOf(q);s.innerHTML=txt.slice(0,idx).replace(/</g,'&lt;')+'<mark>'+txt.slice(idx,idx+q.length).replace(/</g,'&lt;')+'</mark>'+txt.slice(idx+q.length).replace(/</g,'&lt;')}
if(!hit&&!kidHit)li.classList.add('hide');else if(kidHit)setOpen(li,true)})});
}
// ---- Organisation chart ----
var oc=document.querySelector('.oc');
if(oc){oc.addEventListener('click',function(e){var n=e.target.closest('.oc-node');if(!n)return;var li=n.parentElement;if(!li.querySelector(':scope>ul'))return;var c=li.classList.toggle('collapsed');n.setAttribute('aria-expanded',!c)});
document.getElementById('oc-expand').onclick=function(){oc.querySelectorAll('li.collapsed').forEach(function(li){li.classList.remove('collapsed');li.querySelector(':scope>.oc-node').setAttribute('aria-expanded','true')})};
document.getElementById('oc-collapse').onclick=function(){oc.querySelectorAll('.oc-node.lvl1').forEach(function(n){n.parentElement.classList.add('collapsed');n.setAttribute('aria-expanded','false')})}}
})();
