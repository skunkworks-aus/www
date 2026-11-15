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
const result=document.querySelector('#draft-result'),errors=document.createElement('p');errors.className='form-error';errors.setAttribute('role','alert');form.querySelector('button[type="submit"]').before(errors);
let prepared='';form.addEventListener('input',e=>{if(!e.target.closest('#draft-result'))result.hidden=true;errors.textContent=''});
form.addEventListener('submit',e=>{e.preventDefault();errors.textContent='';if(!form.reportValidity())return;const missing=[...form.querySelectorAll('[required]')].find(el=>!el.value.trim());if(missing){errors.textContent='Please enter your name, a way to contact you and the details of your enquiry.';missing.focus();return;}
 const v=new FormData(form),isVisit=topic.value==='Free check-up';prepared=['Hi Skunkworks,','',isVisit?'I would like to arrange a free tech check-up.':'I would like help with: '+topic.value+'.','','Name: '+v.get('name'),'Business: '+(v.get('business')||'Not supplied'),'Email or phone: '+v.get('contact'),...(isVisit?['Preferred time for a visit: '+v.get('time')]:[]),'','What is on my mind:',v.get('message')||'Please contact me to discuss.'].join('\n');
 document.querySelector('#draft-text').value=prepared;result.hidden=false;document.querySelector('#copy-status').textContent='';document.querySelector('#open-email').href='mailto:info@skunkworksau.com?subject='+encodeURIComponent(isVisit?'Free tech check-up request':'Skunkworks enquiry — '+topic.value)+'&body='+encodeURIComponent(prepared);result.querySelector('h3').setAttribute('tabindex','-1');result.querySelector('h3').focus();
});
document.querySelector('#copy-draft').onclick=async()=>{const status=document.querySelector('#copy-status');try{await navigator.clipboard.writeText(prepared);status.textContent='Enquiry copied.'}catch{document.querySelector('#draft-text').focus();document.querySelector('#draft-text').select();status.textContent='Select and copy the prepared enquiry above.'}};
})();
