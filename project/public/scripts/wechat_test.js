function hrefs() {
	window.history.pushState('forward', null, location.pathname + location.search);
}

if(window.history && window.history.pushState) {
	window.onpopstate = async function() {
		location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzUyNjA2Njk5Mw==&scene=126&sessionid=1540992403#wechat_redirect'
	}
}

hrefs()
