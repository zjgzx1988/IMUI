$(document).ready(function() {
    var carousel = $("#carousel");
    var carousel2 = $("#carousel2");

    $("div.x-panel-body").css({ "line-height": carousel.height() + "px" });

    $.Carousel(carousel);
    $.Carousel(carousel2, "vertical");
});