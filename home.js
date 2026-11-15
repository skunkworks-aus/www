// Keep earlier bookmarks useful after moving long explanations off the home page.
(()=>{
const destinations={'#faq':'services.html#faq','#family':'about.html#partners','#partners':'about.html#partners','#company':'about.html'};
const followBookmark=()=>{const target=destinations[location.hash];if(target)location.replace(target)};
followBookmark();window.addEventListener('hashchange',followBookmark);
})();
