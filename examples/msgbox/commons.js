$(document).ready(function() {
    $("#alert").bind("tap", function() {
        $.alert('The quick brown fox jumped over the lazy dog.');
    });

    $("#confirm").bind("tap", function() {
        $.confirm('The quick brown fox jumped over the lazy dog.');
    });

    $("#prompt").bind("tap", function() {
        $.prompt('The quick brown fox jumped over the lazy dog.', function(text) {
            $("section input").val(text);
        }, "password", "输入密码");
    });

    $("#actionSheet").bind("tap", function() {
        $.actionSheet({
            title: "Move to",
            list: [
                { value: "Compoundee", action: function() { alert($(this).text()) } },
                { value: "Noodles", action: function() { alert($(this).text()) } },
                { value: "More ...", action: function() { alert($(this).text()) } },
                { value: "Trash", highlight: true, action: function() { alert($(this).text()) } }
            ]
        });
    });
});