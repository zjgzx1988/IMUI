$(document).ready(function() {
    var geo;
    var content = $(".x-content");
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
});