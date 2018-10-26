function hrefs() {
	window.history.pushState('forward', null, location.pathname + location.search);
}
var qrs = [];

(function() {
	$.ajax({
		url: '/alipayLink',
		method: 'get',
		success: function(res) {
			qrs = res.data
		}
	})
})()
if(window.history && window.history.pushState) {
	window.onpopstate = function() {
		// if(!returnCitySN["cname"].startsWith("北京")){ 
			if(!getCookie('mingxingshuo_alipay_xiaoshuo')) {
				var index = parseInt(Math.random() * qrs.length)
				setCookie('mingxingshuo_alipay_xiaoshuo', 'wonazhidaoshinage')
				location.href = qrs[index].link
			} else {
				console.log('history back')
				history.back()
			}
		
		// }else{
		// 	console.log('history back')
		//  history.back()
		// }
	}
}

function setCookie(cookieName, cookieValue) {
	//当前日期
	var curDate = new Date();
	//当前时间戳
	var curTamp = curDate.getTime();
	//当日凌晨的时间戳,减去一毫秒是为了防止后续得到的时间不会达到00:00:00的状态
	var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1;
	//当日已经过去的时间（毫秒）
	var passedTamp = curTamp - curWeeHours;
	//当日剩余时间
	var leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
	var leftTime = new Date();
	leftTime.setTime(leftTamp + curTamp);
	//创建cookie
	document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + leftTime.toGMTString();
}

// 功能：获取cookies函数  
// 参数：name，cookie名字 

function getCookie(name) {   
	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));   
	if(arr != null)    {       
		return unescape(arr[2]);   
	} else    {       
		return null;   
	}
}
hrefs()

// if(!returnCitySN["cname"].startsWith("北京")){ 
//     hrefs()    
// }else{
//     console.log('北京')
// }