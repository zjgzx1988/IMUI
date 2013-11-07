$(document).ready(function() {
    var container = $("#droppable");

    $("#draggable").drag({
        container: container,
        data: "for test",
        drag: function() {
            container.addClass("x-drop-active");
            this.css("backgroundColor", "#2066C2");
        },
        dragend: function() {
            container.removeClass("x-drop-active");
            this.removeStyle("background-color");
        }
    });

    $("#invalid").drag({
        drag: function() {
            container.addClass("x-drop-invalid");
            this.css("backgroundColor", "#2066C2");
        },
        dragend: function() {
            container.removeClass("x-drop-invalid");
            this.removeStyle("background-color");
        }
    });

    container.drop({
        dragenter: function() {
            container.addClass("x-drop-hover");
        },
        "drop": function(params) {
            params.dragElement.html(params.data);
            container.removeClass("x-drop-hover");
        },
        "dragleave": function() {
            container.removeClass("x-drop-hover");
        }
    });

    //PC端用于外部文件拖拽进来时触发事件
    //    $("body").drop({
    //        "dragenter": function(e) {
    //            container.show();
    //        }
    //    });
});