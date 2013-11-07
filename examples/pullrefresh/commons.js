$(document).ready(function() {
    var container = $(".x-content");

    $.getFileDate({
        url: "../../datas/Contect.json",
        success: function(data) {
            var dataList = eval('(' + data + ')');

            var list = new $.pullrefresh({
                container: container,
                data: dataList.data,
                itemTpl: '<div class="contact" ontap="myalert"><strong>{$firstName}</strong> {$lastName}</div>',
                dataTpl: { tel: '{$tel}' },
                getNewerAjax: {
                    url: "tttt/third",
                    data: { "id": 1, "name": 4 },
                    timeout: 3000,
                    before: function() { },
                    success: function() { },
                    error: function() { },
                    complete: function() { }
                },
                getOlderAjax: {
                    url: "tttt/second",
                    data: { "id": 1, "name": 2 },
                    timeout: 2000,
                    before: null,
                    success: null,
                    error: null,
                    complete: null
                },
                tap: function() {
                    var that = $(this);
                    var hidenData = eval('(' + that.data("datatran") + ')');
                    $.alert(hidenData.tel);
                }
            });
        },
        error: function() {
            alert("数据获取失败");
        }
    });
});

var myalert = function(txt) {
    //alert(txt ? txt : "hello");
}
