$(document).ready(function() {
    var transitionContainer = $(".x-transition-container");

    $("#tabs").tabs(["Video", "Audio"], function(i, oldIndex) {
        var toList = transitionContainer.eq(i);
        var fromList = transitionContainer.eq(oldIndex);
        var isback = (i < oldIndex);

        toList.css("webkitTransform", "translateX(" + (isback ? "-100%)" : "100%)")).removeClass("x-hide").transition({ "-webkit-transform": "translateX(0%)" });
        fromList.transition({ "-webkit-transform": "translateX(" + (isback ? "100%)" : "-100%)") }, function() {
            fromList.addClass("x-hide");
            fromList.removeStyle("-webkit-transform");
            toList.removeStyle("-webkit-transform");
        });

    }, "width: 60%", 0);

    var video = new $.media({
        container: $("#video"),
        url: "resource/space.mp4",
        loop: true,
        posterUrl: 'resource/Screenshot.png'
    });

    var audio = new $.media({
        container: $("#audio"),
        type: 'audio',
        url: 'resource/crash.mp3',
        loop: true
    });
});