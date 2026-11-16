// Keep earlier bookmarks useful after moving long explanations off the home page.
(()=>{
const destinations={'#faq':'services.html#faq','#family':'about.html#partners','#partners':'about.html#partners','#company':'about.html'};
const followBookmark=()=>{const target=destinations[location.hash];if(target)location.replace(target)};
followBookmark();window.addEventListener('hashchange',followBookmark);
})();

// The light-theme orbit is decorative and can be paused independently.
(()=>{
const scene=document.querySelector('.landing-orbit');
const toggle=scene?.querySelector('.orbit-motion-toggle');
if(!toggle)return;
toggle.hidden=false;
toggle.addEventListener('click',()=>{
const paused=scene.classList.toggle('orbit-paused');
toggle.setAttribute('aria-pressed',String(paused));
toggle.textContent=paused?'Resume animation':'Pause animation';
});
})();
