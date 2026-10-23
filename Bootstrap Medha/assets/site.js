(function(){
// count-up when visible
var counters=document.querySelectorAll('.count[data-count]');
function run(el){var t=+el.dataset.count,s=null;function f(ts){if(!s)s=ts;var p=Math.min((ts-s)/1400,1);el.textContent=Math.round(t*p);if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){run(e.target);io.unobserve(e.target)}})});counters.forEach(function(c){io.observe(c)})}else counters.forEach(function(c){c.textContent=c.dataset.count});
// skill bars
var bars=document.querySelectorAll('[data-skill]');
function fill(b){b.style.transition='width 1.2s ease';b.style.width=b.dataset.skill+'%'}
if('IntersectionObserver' in window){var io2=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){fill(e.target);io2.unobserve(e.target)}})});bars.forEach(function(b){io2.observe(b)})}else bars.forEach(fill);
// gallery lightbox
document.querySelectorAll('.g-tile').forEach(function(t){t.addEventListener('click',function(){document.getElementById('lb-cap').textContent=t.dataset.caption;document.getElementById('lb-img').style.background=t.dataset.bg})});
})();
