(()=>{
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('#site-navigation'),services=document.querySelector('.services-menu');
const close=()=>{toggle.setAttribute('aria-expanded','false');nav.classList.remove('open');if(services)services.open=false};
toggle.onclick=()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',open);nav.classList.toggle('open',open)};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const wasOpen=toggle.getAttribute('aria-expanded')==='true';close();if(wasOpen)toggle.focus()}});
document.addEventListener('click',e=>{if(!document.querySelector('.site-header').contains(e.target))close()});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
const form=document.querySelector('#enquiry-form');if(!form)return;
const topic=document.querySelector('#topic'),requested=new URLSearchParams(location.search).get('topic'),defaultTopic=document.body.dataset.defaultTopic;
if(defaultTopic)topic.value=defaultTopic;
if(requested){if([...topic.options].some(o=>o.value===requested))topic.value=requested;else{topic.value=defaultTopic||'Business IT';form.elements.message.value='I would like help with: '+requested.slice(0,300)+'.';}}
const visit=document.querySelector('#visit-preference');const updateVisit=()=>{visit.hidden=topic.value!=='Free check-up'};topic.addEventListener('change',updateVisit);updateVisit();
const context=document.querySelector('#enquiry-context');
const updateContext=()=>{context.hidden=topic.value==='Not sure';context.textContent='Enquiry about: '+topic.value};topic.addEventListener('change',updateContext);updateContext();
const result=document.querySelector('#enquiry-result'),errors=document.querySelector('#form-error'),submit=form.querySelector('button[type="submit"]');
const originalLabel=submit.textContent;let sending=false,completed=false;
form.addEventListener('input',()=>{if(!completed){result.hidden=true;errors.textContent=''}});
form.addEventListener('submit',async e=>{
 e.preventDefault();if(sending||completed)return;errors.textContent='';result.hidden=true;
 if(!form.reportValidity())return;
 const missing=[...form.querySelectorAll('[required]')].find(el=>!el.value.trim());
 if(missing){errors.textContent='Please enter your name, a way to contact you and a short message.';missing.focus();return;}
 const v=new FormData(form);if(v.get('_honey'))return;
 const contact=String(v.get('contact')).trim(),isVisit=topic.value==='Free check-up';
 const payload={name:String(v.get('name')).trim(),contact,message:String(v.get('message')).trim()||'Please contact me to discuss a free tech check-up.',topic:topic.value,_subject:isVisit?'Free tech check-up request':'Skunkworks enquiry — '+topic.value,_template:'table',_honey:''};
 if(v.get('business')?.trim())payload.business=String(v.get('business')).trim();
 if(isVisit)payload.time=String(v.get('time'));
 if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact))payload._replyto=contact;
 sending=true;submit.disabled=true;submit.textContent='Sending…';form.setAttribute('aria-busy','true');
 const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),20000);
 try{
  const response=await fetch('https://formsubmit.co/ajax/info@skunkworksau.com',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(payload),signal:controller.signal});
  if(!response.ok)throw new Error('service-unavailable');const data=await response.json();
  if(data.success!==true&&data.success!=='true')throw new Error('not-accepted');
  completed=true;result.textContent=isVisit?'Thanks — your check-up request has been sent. We will contact you to agree a visit time.':'Thanks — your enquiry has been sent. We will get back to you to discuss the next step.';result.hidden=false;result.focus();submit.textContent='Enquiry sent';
 }catch(error){
  errors.textContent=error.name==='AbortError'?'We could not confirm delivery. Your details are still here. Please call 0493 240 070 or email info@skunkworksau.com before trying again.':'Your enquiry could not be confirmed. Your details are still here. Please try again, call 0493 240 070 or email info@skunkworksau.com.';
  submit.disabled=false;submit.textContent=originalLabel;
 }finally{clearTimeout(timeout);sending=false;form.removeAttribute('aria-busy')}
});
})();
