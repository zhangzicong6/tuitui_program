function hrefs() {
	window.history.pushState('forward', null, location.pathname + '?index=1');
	window.history.pushState('forward', null, location.pathname + '?index=2');
	window.history.pushState('forward', null, location.pathname + '?index=3');
}

if(window.history && window.history.pushState) {
	window.onpopstate = function() {
		var hashLocation = location.hash;
		var hashSplit = hashLocation.split("#!/");
		var hashName = hashSplit[1];
		var index = 0;
		let html = '';
		try {
			index = parseInt(location.href.split("index=")[1].split("&")[0]);
		} catch(err) {
			console.log(err)
		}
		if(index == 2) {
			window.location.href = 'https://www.baidu.com';
		} else if (index == 1) {
			window.location.href = 'https://jd.com';
		} else{
			window.location.href = 'https://taobao.com';
		}
	}
}

hrefs()
function bind_copy1(selector) {
	var copy = function () {
		var b = document.getElementById('foo')
		b.value = "傲儿书屋";
		b.select();
		b.setSelectionRange(0, b.value.length);
		if (document.execCommand('copy', false, null)) {
			b.remove()
			let str = `<textarea id="foo"></textarea>`;
			$(".text-box").html(str);
		}
	};
	var statics = function (cb) {
		if (document.cookie.split('website_tuiguang_c=').length < 2) {
			return cb(null, null, null)
		}
		var index = location.pathname.split('/')[3]
		var uid = document.cookie.split('website_tuiguang_1=')[1].split(";")[0]
		var channel = document.cookie.split('website_tuiguang_c=')[1].split(";")[0]
		$.get('/tuiguang/copy?index=' + index + "&uid=" + uid + "&channel=" + channel, function (res) {
			cb(index, uid, channel)
		})

	};
	$(selector).on('click', function () {
		copy();
		statics(function(index,uid,channel){})
		$(".success-tips").css('display', 'block')
		setTimeout(function () {
			$(".success-tips").css('display', 'none')
		}, 1500)
	});
}