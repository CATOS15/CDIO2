//HTML Dokumentet er loaded og tingene er klar til at blive brugt
$( document ).ready(function() {
    //Vælger alle de DIVs som skal stå for de forskellige sider
    var page_home = $("#home");
    var page_user_find = $("#user_find");
    var page_user_create = $("#user_create");
    var page_user_edit = $("#user_edit");

    //Vælger alle de DIVs som er knappen for at skifte side
    var btn_go_home = $("#btn_go_home");
    var btn_go_user_find = $("#btn_go_user_find");
    var btn_go_user_create = $("#btn_go_user_create");
    var btn_go_user_edit = $("#btn_go_user_edit");

    var init = function () {
        initEvents();

        //Start siden er page_home
        page_home.show();
    }

    //Funktioner
    var hidePages = function(){
        page_home.hide();
        page_user_find.hide();
        page_user_create.hide();
        page_user_edit.hide();
    };

    //Events
    var initEvents = function(){
        btn_go_home.click(function(){
            hidePages();
            page_home.show();
        });
        btn_go_user_find.click(function(){
            hidePages();
            page_user_find.show();
        });
        btn_go_user_create.click(function(){
            hidePages();
            page_user_create.show();
        });
        btn_go_user_edit.click(function(){
            hidePages();
            page_user_edit.show();
        });
    };

    //Inititialize scriptet
    init();
});