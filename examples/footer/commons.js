$(document).ready(function() {
    //footer
    var footerItemList = [
        {
            title: "Calendar",
            iconClass: "time",
            active: true,
            href: "#calendar",
            tran: "none"
        },
        {
            title: "Contacts",
            iconClass: "team1",
            href: "#contacts"
        },
        {
            title: "Location",
            iconClass: "locate",
            href: "#location",
            tran: "pop"
        },
        {
            title: "Message",
            iconClass: "msg",
            href: "#message",
            tran: "flip"
        },
        {
            title: "Others",
            iconClass: "info",
            href: "#others",
            tran: "swap"
        }
    ];

    $.footer(footerItemList);
});