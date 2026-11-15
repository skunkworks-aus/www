let reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,timer=0,playing=false;
const q=s=>document.querySelector(s),flow=q('.automation-showcase'),play=q('#play-flow');
if(flow && play){
function stop(){clearTimeout(timer);playing=false;flow.classList.remove('flow-playing');play.textContent='Play workflow ▶';q('#flow-status').textContent='Example of a connected workflow'}
function process(which){stop();document.querySelectorAll('[data-process]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.process===which));document.querySelectorAll('.process').forEach(panel=>panel.hidden=!panel.classList.contains(which));}
document.querySelectorAll('[data-process]').forEach(button=>button.onclick=()=>process(button.dataset.process));
play.onclick=()=>{if(playing){stop();return}process('after');if(reduced){q('#flow-status').textContent='Enquiry received, record created, reply and task prepared.';return}playing=true;play.textContent='Finish animation ■';q('#flow-status').textContent='Following an enquiry through the workflow…';flow.classList.remove('flow-playing');void flow.offsetWidth;flow.classList.add('flow-playing');timer=setTimeout(()=>{stop();q('#flow-status').textContent='Ready for your team to review and follow up.'},2600)};
function motion(){stop();document.body.classList.toggle('reduced',reduced);document.documentElement.style.scrollBehavior=reduced?'auto':'';q('#motion').textContent=reduced?'Enable motion':'Reduce motion';q('#motion').setAttribute('aria-pressed',reduced)}q('#motion').onclick=()=>{reduced=!reduced;motion()};document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)stop()},{threshold:.1}).observe(flow);motion();

}
document.querySelectorAll('[data-device]').forEach(button=>button.onclick=()=>{document.querySelectorAll('[data-device]').forEach(b=>b.setAttribute('aria-pressed',b===button));q('.device-preview').classList.toggle('phone-view',button.dataset.device==='phone')});
