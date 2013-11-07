$(document).ready(function() {
    var current = $("section>div.current");
    var log = $('.x-html', current);
    var chat = $('.x-inputArea input', current);
    var entities = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;'
    };

    var loadingBox = new $.loadingInContainer($("div.scroll", current), "正在连接，请稍等");

    var conn = new $.webSocket({
        url: 'ws://node.remysharp.com:8001',
        open: function() {
            $("#footer .x-toolbar-title").html("已连接");
            loadingBox.hide();
        },
        close: function() {
            $("#footer .x-toolbar-title").html("已断开连接");
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
                if (!chat.val()) {
                    return;
                }
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
});