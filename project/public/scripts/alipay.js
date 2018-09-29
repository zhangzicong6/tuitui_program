function hrefs() {
	window.history.pushState('forward', null, location.pathname);
}
if(window.history && window.history.pushState) {
	window.onpopstate = function() {
		// if(!returnCitySN["cname"].startsWith("北京")){ 
		if(!getCookie('mingxingshuo_alipay_xiaoshuo')) {
			var qrs = [
				"https://qr.alipay.com/c1x06364ngnlmjhckkntq33",
				"https://qr.alipay.com/c1x003292s5ob0pbmd3ceae",
				"https://qr.alipay.com/c1x04011nalgfalptge2wc1",
				"https://qr.alipay.com/c1x02503i2gftzldufvba81",
				"https://render.alipay.com/p/f/fd-j6lzqrgm/guiderofmklvtvw.html?channel=qrCode&shareId=2088402029799363&sign=vWdKNye%2B3KlYGpkBk9YqacP5wCNzIKetcNldSheRUWI%3D&scene=offlinePaymentNewSns&campStr=p1j%2BdzkZl018zOczaHT4Z5CLdPVCgrEXq89JsWOx1gdt05SIDMPg3PTxZbdPw9dL&token=c1x09226hlteb1by2u1dj3e", // 孙琪
				"https://render.alipay.com/p/f/fd-j6lzqrgm/guiderofmklvtvw.html?channel=qrCode&shareId=2088122731294605&sign=DfJZo9YKEHmbVklWmfJZvEh9e2whA0MmBRceEJuZiuE%3D&scene=offlinePaymentNewSns&campStr=p1j%2BdzkZl018zOczaHT4Z5CLdPVCgrEXq89JsWOx1gdt05SIDMPg3PTxZbdPw9dL&token=c1x00986aldkpaioc1dr1f5" // 刘佳伟
			]
			var index = parseInt(Math.random() * qrs.length)
			setCookie('mingxingshuo_alipay_xiaoshuo', 'wonazhidaoshinage')
			location.href = qrs[index]
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