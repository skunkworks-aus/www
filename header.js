(()=>{
const header=document.querySelector('.brand-header');if(!header)return;
const panels=[...header.querySelectorAll('details')];
panels.forEach(panel=>panel.addEventListener('toggle',()=>{if(panel.open)panels.filter(p=>p!==panel).forEach(p=>p.open=false)}));
document.addEventListener('click',e=>{if(!header.contains(e.target))panels.forEach(p=>p.open=false)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const active=panels.find(p=>p.open);panels.forEach(p=>p.open=false);if(active)active.querySelector('summary').focus()}});
const theme=header.querySelector('[data-theme-toggle]');
function updateTheme(){const light=document.documentElement.dataset.theme==='light';theme.setAttribute('aria-label',light?'Switch to dark theme':'Switch to light theme');theme.setAttribute('aria-pressed',String(light))}
theme.onclick=()=>{panels.forEach(p=>p.open=false);const next=document.documentElement.dataset.theme==='light'?'dark':'light';document.documentElement.dataset.theme=next;try{localStorage.setItem('skunkworks-theme',next)}catch{}updateTheme()};updateTheme();
header.querySelector('.menu-toggle').addEventListener('click',()=>panels.forEach(p=>p.open=false));
const dialog=document.querySelector('#site-search'),input=document.querySelector('#site-search-input'),rows=[...dialog.querySelectorAll('[data-search]')],empty=document.querySelector('#search-empty');
const normalize=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
function filter(){const terms=normalize(input.value).split(' ').filter(Boolean);rows.forEach(row=>row.hidden=!terms.every(term=>normalize(row.dataset.search).includes(term)));empty.hidden=rows.some(row=>!row.hidden)}
function openSearch(){if(dialog.open)return;panels.forEach(p=>p.open=false);header.querySelector('.menu-toggle').setAttribute('aria-expanded','false');document.querySelector('#site-navigation').classList.remove('open');dialog.showModal();input.focus()}
header.querySelector('[data-open-search]').onclick=openSearch;
dialog.querySelector('[data-close-search]').onclick=()=>dialog.close();
input.addEventListener('input',filter);
dialog.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();dialog.close()}});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch()}});
})();
