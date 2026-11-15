import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync(new URL('../site-navigation.js',import.meta.url),'utf8');
function node(value=''){
 return {value,textContent:'',hidden:false,disabled:false,listeners:{},attributes:{},classList:{remove(){},toggle(){}},
 addEventListener(type,fn){this.listeners[type]=fn},setAttribute(k,v){this.attributes[k]=v},getAttribute(k){return this.attributes[k]},removeAttribute(k){delete this.attributes[k]},focus(){this.focused=true},querySelectorAll(){return []},contains(){return false}};
}
function setup({response={ok:true,json:async()=>({success:'true'})},fetcher,contact='0400 000 000',query='',book=false,message='Help with our business website.'}={}){
 const fields={name:node('Setup test'),contact:node(contact),business:node(''),message:node(message),time:node('Afternoons'),_honey:node('')};
 const form=node(),topic=node('Not sure'),submit=node();submit.textContent='Send enquiry ↗';
 topic.options=['Not sure','Website','Automation','Business IT','Free check-up'].map(value=>({value}));fields.topic=topic;
 form.elements=fields;form.reportValidity=()=>true;form.querySelector=()=>submit;
 form.querySelectorAll=()=>book?[fields.name,fields.contact]:[fields.name,fields.contact,fields.message];
 const elements={'.menu-toggle':node(),'#site-navigation':node(),'.services-menu':node(),'#enquiry-form':form,'#topic':topic,'#visit-preference':node(),'#enquiry-context':node(),'#enquiry-result':node(),'#form-error':node(),'.site-header':node()};
 const calls=[];
 const context={document:{querySelector:s=>elements[s],body:{dataset:book?{defaultTopic:'Free check-up'}:{}},addEventListener(){}},location:{search:query},URLSearchParams,AbortController,setTimeout:()=>1,clearTimeout(){},FormData:class{get(k){return fields[k]?.value??null}},fetch:async(url,options)=>{calls.push({url,payload:JSON.parse(options.body)});return fetcher?fetcher():response}};
 vm.runInNewContext(source,context);
 return {fields,form,topic,submit,elements,calls,send:()=>form.listeners.submit({preventDefault(){}})};
}
test('phone-only enquiry sends directly once and confirms only on provider acceptance',async()=>{
 const s=setup();await s.send();await s.send();assert.equal(s.calls.length,1);assert.equal(s.calls[0].payload.contact,'0400 000 000');assert.equal(s.calls[0].payload._replyto,undefined);assert.equal(s.elements['#enquiry-result'].hidden,false);assert.match(s.elements['#enquiry-result'].textContent,/has been sent/);assert.equal(s.submit.disabled,true);
});
test('email contact supplies Reply-To and carries the selected service',async()=>{
 const s=setup({contact:'setup@example.com',query:'?topic=Website'});await s.send();assert.equal(s.calls[0].payload._replyto,'setup@example.com');assert.equal(s.calls[0].payload.topic,'Website');assert.equal(s.elements['#enquiry-context'].hidden,false);assert.equal(s.elements['#visit-preference'].hidden,true);
});
test('legacy booking topic and visit preference survive with optional message and business',async()=>{
 const s=setup({book:true,query:'?topic=Backups',message:''});await s.send();assert.equal(s.calls[0].payload.topic,'Free check-up');assert.equal(s.calls[0].payload.time,'Afternoons');assert.match(s.calls[0].payload.message,/Backups/);assert.equal(s.calls[0].payload.business,undefined);assert.equal(s.elements['#visit-preference'].hidden,false);
});
for(const [label,response] of [['activation required',{ok:true,json:async()=>({success:'false',message:'Needs activation'})}],['HTTP error',{ok:false}]]){
 test(label+' never reports success or loses the customer details',async()=>{
  const s=setup({response});await s.send();assert.equal(s.elements['#enquiry-result'].hidden,true);assert.match(s.elements['#form-error'].textContent,/could not be confirmed/);assert.equal(s.fields.message.value,'Help with our business website.');assert.equal(s.submit.disabled,false);
 });
}
test('network timeout offers direct contact without pretending delivery failed definitively',async()=>{
 const error=new Error('timeout');error.name='AbortError';const s=setup({fetcher:async()=>{throw error}});await s.send();assert.match(s.elements['#form-error'].textContent,/could not confirm delivery/);assert.equal(s.submit.disabled,false);assert.equal(s.elements['#enquiry-result'].hidden,true);
});
test('repeated clicks during an in-flight request cannot send twice',async()=>{
 let finish;const s=setup({fetcher:()=>new Promise(resolve=>finish=resolve)});const pending=s.send();await s.send();assert.equal(s.calls.length,1);finish({ok:true,json:async()=>({success:true})});await pending;assert.equal(s.elements['#enquiry-result'].hidden,false);
});
test('blank required values and honeypot entries are not sent',async()=>{
 const s=setup();s.fields.name.value='   ';await s.send();assert.equal(s.calls.length,0);assert.equal(s.fields.name.focused,true);s.fields.name.value='Test';s.fields._honey.value='bot';await s.send();assert.equal(s.calls.length,0);
});
