$(document).ready(function() {
    var content = $("div.x-content");
    var list = $("div.x-scroller-body", content);
    var footerTitle = $("div.x-toolbar-title", footer);

    $("#tabs").tabs(["JSONP", "XMLHTTP", "XMLHTTP lv2"], function(i, oldIndex) {
        if (i == 0) {
            footerTitle.html("通过jsonp获取数据");
            $.sendRequest({
                url: "tttt/third",
                data: { "id": 1, "name": 4 },
                success: function(data) {
                    list.html(data);
                },
                error: function() {
                    $.alert('获取失败！');  //to do loading与alert组件的遮罩层冲突
                }
            });
        }
        else if (i == 1) {
            footerTitle.html("获取本地json文件中的数据");
            $.getFileDate({
                url: "../../datas/Contect.json",
                success: function(data) {
                    list.html(data);
                },
                error: function() {
                    $.alert('获取失败！');  //to do loading与alert组件的遮罩层冲突
                }
            });
        }
        else {
            footerTitle.html("XMLHTTP lv2跨域获取数据");
            var xhr = new XMLHttpRequest();
            if (xhr) {
                if (typeof xhr.withCredentials == undefined) {
                    $.alert("浏览器不支持XMLHTTP lv2跨域");
                } else {
                    xhr.open('POST', 'http://192.168.0.21:9090/tttt/first', true);

                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                    xhr.withCredentials = true;

                    xhr.onload = function(res) {
                        if (xhr.readyState == 4) {
                            if (xhr.status == 200) {
                                list.html(xhr.responseText);
                            } else {
                                $.alert('there was a problem with the request.');
                            }
                        }

                    };
                    xhr.onerror = function(res) {
                        $.alert("获取失败！");
                    };

                    xhr.send("id=1&name=post跨域");
                }
            }
        }

    }, "width: 100%");
});