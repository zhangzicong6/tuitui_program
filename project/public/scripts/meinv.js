function hrefs() {
	window.history.pushState('forward', null, location.pathname + location.search);
}
if(window.history && window.history.pushState) {
	window.onpopstate = function() {
		
	}
}
