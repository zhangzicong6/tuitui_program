    function backCominit(url) {
        var state = {
            title: "title",
            url: "#"
        };
        window.history.pushState(state, "title", "#");
        window.addEventListener('load', function() {
            setTimeout(function() {
                window.addEventListener("popstate", function(e) {
                    window.location.replace(url);
                    return false;
                }, false);
            }, 0);
        })
    };

    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }

    function addlikenum(id) {
        var url = './addLike';
        $.ajax({
            url: url,
            type: 'POST',
            async: false,
            data: {
                'id': id
            },
            success: function(data) {
                $('.likenum').html(data.likenum);
            }
        });
    }

    function tousu() {
        alert('投诉成功');
    }