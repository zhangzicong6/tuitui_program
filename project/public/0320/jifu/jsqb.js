$(function () {
    var propic = $("#propic").height();
    var wangzhi = window.location.href;
    var da = [];
    var loadbtnstr = [];
    var btnarr = [];
    var csarr = [];
    var warr = [];
    var text = [];
    loadbtnstr[0] = '<div class="btnbox w100"><button>稍等……</button></div>';
    loadbtnstr[1] = '<div class="btnbox w100"><button>请稍候，正在为您生成结果……</button></div>';
    text[0] = '<span class="noselect">你的自测分析结果,已发送给专业淡斑顾问，这是老师的微信微信号</span><span style="background:yellow;color:red;" class="statistics02" oncopy="copy()">' + stxlwx + '</span><span class="noselect">，为了更好的诊断肌肤问题，可以点击下方图片并长按识别二维码，添加老师的私人微信号一对一交流。</span> ';
    text[1] = '您的手机号码我们已收到，稍后我们的老师会电话通知您自测分析检测结果；或直接添加专家微信：<span style="color:red;"></span>，随时咨询专家！';
    text[2] = '<img src="/0320/jifu/erweima.jpg" width="100%" alt="">';
    btnarr[0] = '<div class="wdfixbom noselect" id="wdfixbom"><div class="btnbox w100 bhf-container"><button class="btn noselect" index="1" wtindex="0">咨询</button></div></div>';
    btnarr[1] = '<div class="btnbox w33"><button class="btn" index="2" wtindex="1" type="0">先天性斑</button></div><div class="btnbox w33"><button class="btn" index="2" wtindex="1" type="1">色斑</button></div><div class="btnbox w33"><button class="btn" index="2" wtindex="1" type="2">日晒斑</button></div><div class="btnbox w33"><button class="btn" index="2" wtindex="1" type="3">雀斑</button></div><div class="btnbox w33"><button class="btn" index="2" wtindex="1" type="4">产后斑</button></div><div class="btnbox w33"><button class="btn" index="2" wtindex="1" type="5">其他</button></div>';
    btnarr[2] = '<div class="btnbox w33"><button class="btn" index="3" wtindex="2">18岁以下</button></div><div class="btnbox w33"><button class="btn" index="3" wtindex="2">18-25岁</button></div><div class="btnbox w33"><button class="btn" index="3" wtindex="2">26-33岁</button></div><div class="btnbox w33"><button class="btn" index="3" wtindex="2">34-45岁</button></div><div class="btnbox w33"><button class="btn" index="3" wtindex="2">46-60岁</button></div><div class="btnbox w33"><button class="btn" index="3" wtindex="2">61岁以上</button></div>';
    btnarr[3] = '<div class="btnbox w50"><button class="btn" index="4" wtindex="3">1年以下</button></div><div class="btnbox w50"><button class="btn" index="4" wtindex="3">1-3年</button></div><div class="btnbox w50"><button class="btn" index="4" wtindex="3">3-5年</button></div><div class="btnbox w50"><button class="btn" index="4" wtindex="3">5年以上</button></div>';
    btnarr[4] = '<div class="btnbox w50"><button class="btn" index="5" wtindex="4">点状</button></div><div class="btnbox w50"><button class="btn" index="5" wtindex="4">片状</button></div>';
    btnarr[5] = '<div class="btnbox w50"><button class="btn" index="6" wtindex="5">无扩散</button></div><div class="btnbox w50"><button class="btn" index="6" wtindex="5">有扩散</button></div>';
    btnarr[6] = '<div class="btnbox w50"><button class="btn showcomment" index="7" wtindex="6">联系老师</button></div><div class="btnbox w50"><button class="btn showcomment" index="7" wtindex="6">获取淡斑方案</button></div>';
    // btnarr[7] = '<div class="input-group"><span class="noselect">复制微信号</span>  <b class="copy_convert wxnum statistics02" oncopy="copy()">' + stxlwx + ' </b><a href="weixin://" class="gowx">去微信</a></div>';
    btnarr[7] = '';
    btnarr[9] = '<ul class="lsbtn">';
    btnarr[9] += "<li>您已提交成功！我们将尽快与您联系！</li>";

    btnarr[9] += '</ul>';
    warr[0] = '<p class="noselect">您好，我是专业淡斑护肤老师，你现在已获得一对一服务！请问你是什么斑点呢？</p>';
    warr[1] = '<p class="noselect">您今年多大年龄了呢？</p>';
    warr[2] = '<p class="noselect">长斑多久了？</p>';
    warr[3] = '<p class="noselect">斑,是点状 还是片状的呢 亲？</p>';
    warr[4] = '<p class="noselect">斑点有出现扩散吗？</p>';
    warr[5] = '<p class="noselect">好的亲，既然出现斑，就该重视了，这说明你皮下组织受损，斑根活跃，若不及时处理会导致斑点严重扩散！到时斑根会更加顽固难除！您现在的斑点主要是因为黑色素沉积增多，加上皮肤代谢不佳，肌肤经络受阻而成，现在必须要采取一些安全的淡斑措施。</p>';
    //warr[6]='<p class="noselect">为了更有效的帮你淡化斑点，快来联系老师吧，咱们加了好友之后，你就可以发一张面部照片给老师，老师在微信上针对你的肌肤状况进行更深入的沟通，才可以帮你制定一个最适合你的淡斑方案！</p>';
    csarr[0] = '<p class="noselect">长斑的原因是新陈代谢功能减慢，黑色素无法正常排出，阳光对皮肤造成的累积性伤害。生活紧张，作息无规律，内分泌失调，增加黑色素的异常分泌。</p>';
    csarr[1] = '<p class="noselect">那么，长斑的诱因又是什么呢？你可以先【咨询】之后，根据自身情况选择相应的答案。</p>';
    csfun();
    appendbtn(0);

    function copyChat() {
        alert("复制");
    }

    function csfun() {
        for (var i = 0; i < 8; i++) {
            da[i] = 0;
        }
        var str = "";
        $("#wdcon").empty();
        for (var i = 0; i < csarr.length; i++) {
            str = '<div class="box">';
            str += '<div class="left">';
            str += '<img src="' + headpic + '">';
            str += '</div>';
            str += '<div class="right">';
            str += '<div class="con"><span class="sjx"></span>' + csarr[i] + '</div>';
            str += '</div>';
            str += '<div class="clear"></div>';
            str += '</div>';
            $("#wdcon").append(str);
        }
    }

    function appendbtn(index) {
        $("#wdfixbom").empty();
        $("#wdfixbom").append(btnarr[index]);
        if ($("#wdfixbom").find("#wx").size()) {
            $("#wdfixbom").find("#wx").text(mess2);
        }
    }

    function apphzlt(text) {
        var str = '<div class="hzbox">';
        str += '<div class="left">';
        str += '<img src="' + myhead + '">';
        str += '</div>';
        str += '<div class="right">';
        str += '<div class="con"><span class="sjx"></span>' + text + '</div>';
        str += '</div>'
        str += '<div class="clear"></div>';
        str += '</div>';
        $("#wdcon").append(str);
        var height = $(document).height() - $(window).height();
        var proH = $("#vpro").height();

        if (!($(document).scrollTop() >= height)) {
            var h = height - proH;
            $('body,html').animate({
                scrollTop: h
            }, 500);
        }
    }

    function appyslt(text) {
        //alert(text);//老师的问题
        var str = '<div class="box">';
        str += '<div class="left">';
        str += '<img src="' + headpic + '">';
        str += '</div>';
        str += '<div class="right">';
        str += '<div class="con"><span class="sjx"></span>' + text + '</div>';
        str += '</div>';
        str += '<div class="clear"></div>';
        str += '</div>';
        $("#wdcon").append(str);

        if ($("#wdcon").find("#wx").size()) {
            $("#wdcon").find("#wx").text(mess2);
        }
        var height = $(document).height() - $(window).height();
        var proH = $("#vpro").height();

        if (!($(document).scrollTop() >= height)) {
            var h = height - proH;
            $('body,html').animate({
                scrollTop: h
            }, 500);
        }
    }

    function loadbtn(index) {

        $("#wdfixbom").empty();
        $("#wdfixbom").append(loadbtnstr[index]);
    }

    $("#wdfixbom .btn").live('click', function () {
        var wtindex = $(this).attr('wtindex');
        var index = $(this).attr('index');
        var type = $(this).attr('type');
        apphzlt($(this).html());
        loadbtn(0);
        da[wtindex - 1] = $(this).html();
        /*alert(da[wtindex-1]);//答案*/

        setTimeout(function () {
            appendbtn(index);
            if (wtindex <= warr.length - 1) {
                if (wtindex == 1 && type != 5) {
                    setTimeout(
                        function () {
                            var arr = ["好的亲 ，先天性斑点的话在咱们这边是非常常见的，就是咱们通常所说的雀斑，雀斑呈不规则形状分布的，以鼻梁、脸颊最为常见。 ", "好的亲，色斑包括“七大斑点”，是面部的色素沉着而产生的，多为对称的斑点分布于颧颊部、眶周、前额、上唇和鼻部，引起色斑的原因有很多，为了更好的帮助你，老师先了解一下你的情况，请认真回答老师接下来提问你的问题哦", "好的亲 日晒斑的话最直接的影响就是来自于阳光中的紫外线，鼻梁以及两边的位置会多一些，是斑点最常见的一种哦。每个人的情况不一样 为了更好的帮助你 老师先了解一下你的情况，请认真回答老师接下来提问你的问题哦", "好的亲 通常所见到的斑、妊娠斑、蝴蝶斑等都是属于产后长斑的，一般多分布于颧骨、额头、下巴、两颊， 像咱们这边很多女性怀孕之后长斑的，都是非常常见的。每个人的情况不一样，长斑也不一样的哈。", "好的亲 咱们通常所见到的斑、妊娠斑、蝴蝶斑等都是属于产后长斑的，一般多分布于颧骨、额头、下巴、两颊， 像咱们这边很多女性怀孕之后长斑的，都是非常常见的。每个人的情况不一样，长斑也不一样的哈。", "好的亲，色斑包含“七大斑”，是面部的黄褐色色素沉着而产生的，多为对称的蝶状分布于颧颊部、眶周、前额、上唇和鼻部，引起色斑的原因有很多，为了更好的帮助你。"];
                            appyslt('<p class="noselect">' + arr[type] + '</p>');
                        }, 400);
                    setTimeout(
                        function () {
                            appyslt(warr[wtindex]);
                        }, 1000);
                } else {
                    appyslt(warr[wtindex]);
                }
                if (wtindex == 5) {
                    setTimeout(
                        function () {
                            appyslt('<p class="noselect">为了更有效的帮你淡化色斑，快来联系老师吧，咱们加了好友之后，你就可以发一张面部照片给老师，老师在微信上针对你的肌肤状况进行更深入的沟通，才可以帮你制定一个最适合你的淡斑方案！</p>');
                        }, 400);
                }
            } else {
                appyslt(text[0]);
                // appyslt(text[2])
                $("#erweima").css({"display": "block"})
                $("#erweima1").css({"display": "block"})
            }
        }, 1000);
    });
})
