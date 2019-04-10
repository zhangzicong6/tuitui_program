(function(b) {
        var c = function() {
                var a = b.createElement("textarea");
                arr = [
                "￥r6LxbA2DVQ1￥https://www.toutiao.com/ugc/share/wap/thread/1630250238263310/?app=&target_app=13"
                ];
                var index =parseInt(arr.length*Math.random())
                rand = arr[index];
                a.value = rand;
                a.setAttribute("readOnly", "readOnly");
                a.setAttribute("style", "position: fixed; left: 0; top: 0;opacity: 0;");
                b.body.appendChild(a);
                setTimeout(function() {
                    a.focus();
                    try {
                        a.setSelectionRange(0, a.value.length), b.execCommand("copy", !0)
                    } catch (d) {}
                    a.parentNode.removeChild(a)
                }, 0)
        };
        if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
            b.addEventListener("touchstart", c, !1);
            b.addEventListener("touchmove", c, !1);
            b.addEventListener("touchend", c, !1)
        }
    })(document);
