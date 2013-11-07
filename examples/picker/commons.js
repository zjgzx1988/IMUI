$(document).ready(function() {
    var picker = new $.picker([{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] }, { data: ["A", "F", "B", "I", "U", "W", "N", "C", "M"]}], function(params) {
        $.alert(String(params));
    });

    var datePicker;

    $("#picker").bind("tap", function() {
        picker.show("2");
    });

    $("#dataPicker").bind("tap", function() {
        if (!datePicker) {
            datePicker = new $.datePicker(function(params) {
                $.alert(params);
            });
        }
        datePicker.show([1, "12", "1988"]);
    });
});