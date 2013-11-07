$(document).ready(function() {
    var component = $(".x-component");
    var transitionContainer = $(".x-transition-container", component);

    component.css({ "width": $(window).width(), "height": $(window).height() - component.offset().top });


    $("#tabs").tabs(["Simple", "Sort", "Grouped"], function(i, oldIndex) {
        var toList = transitionContainer.eq(i);
        var fromList = transitionContainer.eq(oldIndex);
        var isback = (i < oldIndex);

        toList.css("webkitTransform", "translateX(" + (isback ? "-100%)" : "100%)")).removeClass("x-hide").transition({ "-webkit-transform": "translateX(0%)" });
        fromList.transition({ "-webkit-transform": "translateX(" + (isback ? "100%)" : "-100%)") }, function() {
            fromList.addClass("x-hide");
            fromList.removeStyle("-webkit-transform");
            toList.removeStyle("-webkit-transform");
        });

    }, "width: 80%", 0);

    $.ajax({
        url: "../../datas/Contect.json",
        dataType: 'text',
        success: function(data) {
            var list = eval('(' + data + ')');

            var list1 = new $.list({
                container: $("#simple"),
                data: list.data,
                itemTpl: '<div class="contact" ontap="myalert"><strong>{$firstName}</strong> {$lastName}</div>'
            });

            var list2 = new $.list({
                container: $("#sort"),
                data: list.data,
                sort: true,
                sorters: "firstName",
                itemTpl: '<div class="contact" ontap="myalert(\'{$firstName}\')"><strong>{$firstName}</strong> {$lastName}</div>',
                arrows: true
            });

            var list3 = new $.list({
                container: $("#grouped"),
                data: list.data,
                sort: true, //可写可不写，grouped为true的话则必定会进行排序
                sorters: "firstName",
                itemTpl: '<div class="contact"><strong>{$firstName}</strong> {$lastName}</div>',
                grouped: true,
                indexBar: true
            });

            $(".x-transition-container:not(:first)", component).addClass("x-hide");
        },
        error: function(res) {
            alert("数据获取失败");
        }
    });


    $(window).bind("resize", function() {
        component.css({ "width": $(window).width(), "height": $(window).height() - component.offset().top });
    });
});

var myalert = function(txt) {
    //alert(txt ? txt : "hello");
}
