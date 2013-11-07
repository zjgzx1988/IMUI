$(document).ready(function() {
    $("div.x-list-item").bind("tap", function() {
        var listItem = $(this);

        listItem.addClass("x-item-selected");
        setTimeout(function() {
            listItem.removeClass("x-item-selected");
        }, 200);
    });
});