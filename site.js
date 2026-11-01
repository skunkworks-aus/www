/* Skunkworks Australia site behaviour */
(function(){
  'use strict';
  var root=document.documentElement; root.classList.add('js');
  var studio=document.getElementById('studio');
  var hero=document.querySelector('.hero');
  var bands=[].slice.call(document.querySelectorAll('.band'));
  var meter=[].slice.call(document.querySelectorAll('.meter b'));
  var nav=document.getElementById('nav');
  var smooth=function(p,e0,e1){var t=Math.min(1,Math.max(0,(p-e0)/(e1-e0)));return t*t*(3-2*t)};
  var clamp=function(v,a,b){return Math.min(b,Math.max(a,v))};

  // Split headlines into word spans for the assembly entrance (screen readers get the plain text).
  document.querySelectorAll('.split').forEach(function(el){
    var text=el.textContent.trim(); var words=text.split(/\s+/);
    el.setAttribute('aria-label',text);
    el.innerHTML=words.map(function(w,i){return '<span class="w" aria-hidden="true" style="--i:'+i+'">'+w+'</span>'}).join(' ');
  });

  // Hero gates: must match the CSS media query list exactly.
  var GATES=['(max-width: 720px)','(orientation: portrait) and (max-width: 1024px)','(orientation: portrait) and (pointer: coarse)','(orientation: landscape) and (pointer: coarse) and (max-height: 560px)','(prefers-reduced-motion: reduce)'];
  var MQLS=GATES.map(function(q){return matchMedia(q)});
  var scrubOn=false, rafId=null, target=0, shown=0, lastTick=0, heroOnScreen=true, loadK=0, loadStart=0;
  bands.forEach(function(b){b.a=+b.dataset.a;b.b=+b.dataset.b;b.op=-1;b.k=-1});
  var last={sx:'',lit:'',p:'',meter:-1};

  function heroProgress(){
    var r=hero.getBoundingClientRect(); var range=hero.offsetHeight-innerHeight;
    return range>0?clamp(-r.top/range,0,1):0;
  }
  function render(p){
    // Light sweep crosses the mark between 4% and 58%, then the studio lights come up.
    var sweep=smooth(p,0.04,0.58), lit=smooth(p,0.5,0.86);
    var sx=(-130+sweep*300).toFixed(1)+'%';
    if(sx!==last.sx){studio.style.setProperty('--sx',sx);last.sx=sx}
    var l=lit.toFixed(3); if(l!==last.lit){studio.style.setProperty('--lit',l);last.lit=l}
    var pp=p.toFixed(3); if(pp!==last.p){document.getElementById('stage').style.setProperty('--p',pp);last.p=pp}
    var active=0;
    bands.forEach(function(b,n){
      var a=b.a,e=b.b,f=Math.min(0.025,(e-a)/3);
      var op=(n===0?1:smooth(p,a,a+f))*(n===bands.length-1?1:(1-smooth(p,e-f,e)));
      var k=clamp((p-a)/Math.min(0.06,(e-a)*0.4),0,1);
      if(n===0) k=Math.max(k,loadK); // band one assembles on load, then holds
      if(Math.abs(op-b.op)>0.004){b.style.opacity=op.toFixed(3);b.op=op;b.style.visibility=op<0.01?'hidden':'visible'}
      if(Math.abs(k-b.k)>0.008){b.style.setProperty('--k',k.toFixed(3));b.k=k}
      if(p>=a) active=n;
    });
    if(active!==last.meter){meter.forEach(function(m,i){m.classList.toggle('on',i<=active)});last.meter=active}
  }
  function tick(now){
    var dt=Math.min(100,now-(lastTick||now)); lastTick=now;
    if(loadK<1){loadK=clamp((now-loadStart)/1100,0,1);loadK=1-Math.pow(1-loadK,3)}
    shown+=(target-shown)*(1-Math.pow(1-0.14,dt/16.667));
    if(Math.abs(target-shown)<0.0004 && loadK>=1){shown=target;rafId=null;lastTick=0}
    else rafId=requestAnimationFrame(tick);
    render(shown);
  }
  function kick(){if(rafId===null && heroOnScreen && scrubOn) rafId=requestAnimationFrame(tick)}
  function onScroll(){target=heroProgress();kick()}
  function enableScrub(){
    if(scrubOn) return; scrubOn=true;
    bands.forEach(function(b){b.op=-1;b.k=-1;b.style.visibility=''});
    last={sx:'',lit:'',p:'',meter:-1};
    addEventListener('scroll',onScroll,{passive:true});
    target=shown=heroProgress(); loadStart=performance.now(); kick();
  }
  function disableScrub(){
    if(!scrubOn) return; scrubOn=false;
    removeEventListener('scroll',onScroll);
    if(rafId!==null){cancelAnimationFrame(rafId);rafId=null}
    // Hand control back to CSS: the static hero is fully lit and settled.
    ['--sx','--lit','--p'].forEach(function(v){studio.style.removeProperty(v);document.getElementById('stage').style.removeProperty(v)});
    bands.forEach(function(b){b.style.removeProperty('opacity');b.style.removeProperty('visibility');b.style.removeProperty('--k')});
  }
  function applyHeroMode(){ if(MQLS.some(function(m){return m.matches})) disableScrub(); else enableScrub() }
  MQLS.forEach(function(m){m.addEventListener('change',applyHeroMode)});
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){heroOnScreen=es[0].isIntersecting;kick()}).observe(hero);
  }
  applyHeroMode();

  // Nav turns solid once past the top of the hero.
  var navSolid=null;
  function navState(){var s=scrollY>innerHeight*0.6;if(s!==navSolid){nav.classList.toggle('solid',s);navSolid=s}}
  addEventListener('scroll',navState,{passive:true}); navState();

  // Section entrances: once, then retire the stagger so hovers are instant.
  var rv=[].slice.call(document.querySelectorAll('.rv'));
  if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){
      if(!e.isIntersecting) return; var el=e.target; el.classList.add('in'); io.unobserve(el);
      setTimeout(function(){el.classList.add('settled')},1400);
    })},{rootMargin:'0px 0px -12% 0px'});
    rv.forEach(function(el){io.observe(el)});
  } else rv.forEach(function(el){el.classList.add('in','settled')});

  // Pause looping animations on hidden tabs.
  document.addEventListener('visibilitychange',function(){document.body.classList.toggle('paused',document.hidden)});

  matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',function(e){ if(e.matches) rv.forEach(function(el){el.classList.add('in','settled')}) });

  // Mobile menu
  var mb=document.querySelector('[data-menu-button]'), mm=document.querySelector('[data-mobile-menu]');
  function setMenu(open){mb.setAttribute('aria-expanded',open);mb.setAttribute('aria-label',open?'Close menu':'Open menu');mm.hidden=!open;if(open)nav.classList.add("solid");else{navSolid=null;navState()}}
  mb.addEventListener('click',function(){setMenu(mm.hidden)});
  mm.addEventListener('click',function(e){if(e.target.closest('a'))setMenu(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!mm.hidden){setMenu(false);mb.focus()}});
  matchMedia('(min-width: 901px)').addEventListener('change',function(e){if(e.matches)setMenu(false)});

  // Check-up topics: jump to the form with the topic filled in
  document.querySelectorAll('[data-topic]').forEach(function(a){
    a.addEventListener('click',function(){
      var m=document.getElementById('m'), t=a.getAttribute('data-topic');
      var line='I’d like help with: '+t+'.';
      if(m.value.indexOf(t)===-1) m.value=m.value?(m.value+'\n'+line):line;
    });
  });

  // Booking form: builds an email to info@ (no backend on this site).
  var form=document.getElementById('form'), err=document.getElementById('err');
  form.addEventListener('submit',function(e){
    e.preventDefault(); err.textContent='';
    var missing=[].slice.call(form.querySelectorAll('[required]')).filter(function(i){return !i.value.trim()});
    if(missing.length){err.textContent='Please fill in your name, business and a way to reach you.';missing[0].focus();return}
    var v=function(id){return document.getElementById(id).value.trim()};
    var body='Hi Skunkworks,\n\nI\'d like to book a free tech check-up.\n\nName: '+v('n')+'\nBusiness: '+v('b')+'\nContact: '+v('c')+'\nBest time: '+v('t')+(v('m')?'\n\nWhat\'s on my mind:\n'+v('m'):'')+'\n';
    location.href='mailto:info@skunkworksau.com.au?subject='+encodeURIComponent('Free tech check-up: '+v('b'))+'&body='+encodeURIComponent(body);
    document.getElementById('bookwrap').classList.add('done');
    document.getElementById('sent').focus();
  });
})();
