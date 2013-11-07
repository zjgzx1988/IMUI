$(document).ready(function() {
    $("div.x-list-item").bind("tap", function() {
        var listItem = $(this);
        if (listItem.hasClass("x-item-selected")) {
            listItem.removeClass("x-item-selected");
        }
        else {
            $("div.x-list-item.x-item-selected").removeClass("x-item-selected");
            listItem.addClass("x-item-selected");
        }
    });
});

var changeThemes = function(cssName) {
    var cssPath = "../../themes/css/theme/" + cssName + ".css";
    var cssObject = $("#color");
    if (!cssObject.length) {
        cssObject = $("<link href='' id='color' rel='stylesheet' type='text/css' />").appendTo($("head"));
    }
    $.changeCss(cssPath, cssObject);
}