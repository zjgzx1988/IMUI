$(document).ready(function() {
    //footer
    var footerItemList = [
        {
            title: "Calendar",
            iconClass: "time",
            active: true,
            href: "#calendar",
            tran: "none"
        },
        {
            title: "Contacts",
            iconClass: "team1",
            href: "#contacts",
            tran: "none"
        },
        {
            title: "Location",
            iconClass: "locate",
            href: "templates/location.html",
            tran: "none",
            fn: "setLocation",
            id: "location"
        },
        {
            title: "Others",
            iconClass: "info",
            href: "#others",
            tran: "none"
        }
    ];

    $.footer(footerItemList);

    //Calendar

    var containerList;
    var containerNote = $("#calendar .x-container-list");

    $.ajax({
        url: "../../datas/Calendar.json",
        dataType: 'text',
        success: function(data) {
            var dataList = eval('(' + data + ')');

            $.Calendar($("#calendar .x-content .x-container"), function(selectedDate) {
                if (!containerList) {
                    containerList = $.list({ //todo 修改成创建实例，增加刷新删除功能
                        container: containerNote,
                        data: dataList[selectedDate],
                        itemTpl: '<div class="noteTime"><strong>{$time}</strong></div><span class="name">{$type}<br><span class="tertiary">{$des}</span></span>'
                    });
                }
                else {
                    if (containerList.replace) {
                        containerList.replace(dataList[selectedDate]);
                    }
                }
            }, dataList);
            //to do 样式加载完成后设置数据

            containerNote.css("height", $("#calendar .x-content").height() - $("#calendar .x-container").height());
        },
        error: function(res) {
            alert("数据获取失败");
        }
    });

    //Contacts

    var listObject;

    $.ajax({
        url: "../../datas/Contect.json",
        dataType: 'text',
        success: function(data) {
            var list = eval('(' + data + ')');

            listObject = new $.list({
                container: $("#contacts .x-content"),
                data: list.data,
                sort: true, //可写可不写，grouped为true的话则必定会进行排序
                sorters: "firstName",
                itemTpl: '<div class="contact"><strong>{$firstName}</strong> {$lastName}</div>',
                grouped: true,
                indexBar: true,
                taphold: function() {
                    var that = $(this);
                    $.actionSheet({
                        title: "Move to",
                        list: [
                            { value: "拨打电话", highlight: true, action: function() { } },
                            { value: "发送短信", action: function() { } },
                            { value: "编辑联系人", action: function() { listObject.update(that, { firstName: 'Fulio', lastName: 'Burgoyne', tel: 1234567890 }); } },
                            { value: "删除联系人", action: function() { listObject.remove(that); } }
                        ]
                    });
                },
                dataTpl: {
                    href: "templates/contacter.html",
                    json: "../../datas/Contect.json",
                    params: "tel={$tel}&name={$firstName} {$lastName}"
                }
            });
        },
        error: function(res) {
            alert("数据获取失败");
        }
    });

    $(".addBtn").bind("tap", function() {
        if (listObject.add) {
            listObject.add({ firstName: 'File', lastName: 'Clark', tel: '0987654321' });
        }
    });

    //Others

    var picker = new $.picker(["baidu", "google", "microsoft", "apple"], function(params) {
        $("#others .x-field-select span").html(params[0]);
        changeThemes(params[0]);
    });

    $("#others div.js-switch").imSwitch("off");

    $("#others div.x-list-item").bind("tap", function() {
        var listItem = $(this);

        if (listItem.data("href")) {
            listItem.addClass("x-item-selected");
            setTimeout(function() {
                listItem.removeClass("x-item-selected");
            }, 200);
        }
    });

    $("#others .x-field-select").bind("tap", function() {
        picker.show();
    });

    $(window).resize(function() {
        containerNote.css("height", $("#calendar .x-content").height() - $("#calendar .x-container").height());
    });
});

var setLocation = function() {
    //Location
    var geo;
    var current = $("section>div.current");
    var content = $(".x-content", current);
    var loading = new $.loadingInContainer(content, "Loading");

    window.mapInit = function() {
        geo = new $.geoLocation({
            success: function(position) {
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                var myOptions = {
                    zoom: 15,
                    center: latlng,
                    mapTypeControl: false,
                    navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL },
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(content[0], myOptions); //取的是当前屏幕显示的那个div

                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    title: "You are here! (at least within a " + position.coords.accuracy + " meter radius)"
                });

                loading.hide();
            },
            error: function(msg) {
                $.alert($.typesOf(msg, "string") ? msg : "failed");
                // console.log(arguments);
            }
        });
    };

    $.getScript("http://maps.google.com/maps/api/js?sensor=false&callback=mapInit"); //动态加载google地图js

    $(".refreshBtn").bind("tap", function() {
        if (geo.refresh && $.isFunction(geo.refresh)) {
            geo.refresh();
        }
    });
}

var createCarousel = function() {
    var carousel = $("#carousel");
    carousel.css({ "height": $(window).height() - $(".x-header").height() - $("footer").height(), "width": $(window).width() });
    $.Carousel(carousel);

    $(window).resize(function() {
        var carousel = $("#carousel");
        carousel.css({ "height": $(window).height() - $(".x-header").height() - $("footer").height(), "width": $(window).width() });
    });
}

var createVideos = function() {
    var video = new $.media({
        container: $("#video"),
        url: "../media/resource/space.mp4",
        loop: true,
        posterUrl: '../media/resource/Screenshot.png'
    });

    //to do 优化
    $(window).bind("hashchange", function() {
        if (String(video.paused) !== "undefined" && !video.paused) {
            video.pause();
        }
    })
}

var createSession = function() {
    var current = $("section>div.current");
    var log = $('.x-html', current);
    var chat = $('.x-inputArea input', current);
    var entities = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;'
    };

    var loadingBox = new $.loadingInContainer($("div.scroll", current), "正在连接，请稍等");

    var conn = $.webSocket({
        url: 'ws://node.remysharp.com:8001',
        open: function() {
            $("#footer .x-toolbar-title").html("已连接");
            loadingBox.hide();
        },
        close: function() {
            $("#footer .x-toolbar-title").html("已断开连接"); ;
        },
        message: function(message, e) {
            if (!(/^\d+$/).test(message)) {
                message = message.substring(1, message.length - 1);
                var sms = $(">div", log);
                var time = new Date(e.timeStamp).toLocaleTimeString();
                if (sms.length) {
                    sms.eq(0).before('<div class="them-line"><div class="them x-changeLine">' + message.replace(/[<>&]/g, function(m) { return entities[m]; })
                                        + '<div class="x-time">' + $.todayDate + " " + time + '</div></div><div>');
                }
                else {
                    log.html('<div class="them-line"><div class="them x-changeLine">' + message.replace(/[<>&]/g, function(m) { return entities[m]; })
                                        + '<div class="x-time">' + $.todayDate + " " + time + '</div></div><div>');
                }
            } else {
                $("#footer .x-toolbar-title").html("当前在线人数  " + message);
            }
        }
    });

    if (!conn || $.isEmptyObject(conn)) {
        loadingBox.hide();
        $("#footer .x-toolbar-title").html('该设备不支持websocket');
    } else {

        $(".x-button.refreshBtn", current).bind("tap", function() {
            conn.reconnect();
        })

        $(".x-inputArea .x-button", current).bind('tap', function(event) {
            event.preventDefault();

            // if we're connected
            if (conn.getStatus().status === 1) {
                conn.send(chat.val());

                var sms = $(">div", log);
                var time = new Date().toLocaleTimeString();

                if (sms.length) {
                    sms.eq(0).before('<div class="me-line"><div class="me x-changeLine">' + chat.val().replace(/[<>&]/g, function(m) { return entities[m]; }) +
                                    '<div class="x-time">' + $.todayDate + " " + time + '</div></div><div>')
                }
                else {
                    log.html('<div class="me-line"><div class="me x-changeLine">' + chat.val().replace(/[<>&]/g, function(m) { return entities[m]; }) +
                                    '<div class="x-time">' + $.todayDate + " " + time + '</div></div><div>');
                }

                chat.val('');
            }
        });
    }
}

var changeThemes = function(cssName) {
    var cssJson = {
        "baidu": "defalut",
        "google": "purple",
        "microsoft": "red",
        "apple": "pink"
    };
    var cssPath = "../../themes/css/theme/" + cssJson[cssName] + ".css";
    var cssObject = $("#color");
    if (!cssObject.length) {
        cssObject = $("<link href='' id='color' rel='stylesheet' type='text/css' />").appendTo($("head"));
    }
    $.changeCss(cssPath, cssObject);
}

var callContacter = function(tel) {
    $.alert('在手机终端将会对该手机号码进行电话联系');
}

var msgContacter = function(tel) {
    $.alert('在手机终端将会对该手机号码进行短信发送');
}