/*
    Der er udelukkende blevet udviklet i en .js fil og det er bare for at simplificere noget af arbejdet.
    Hvis projektet var større ville det selvfølgelig give mening at have en .js fil til hver side der var (hjem, find bruger, opret bruger, rediger bruger, mm)
    Evt. havde et bibliotek som Angular, VUE eller andet hjulpet til meget her. Specielt når det kommer til single page applikationer.
 */


//HTML Dokumentet er loaded og tingene er klar til at blive brugt
$( document ).ready(function() {
    //Vælger alle de DIVs som skal stå for de forskellige sider
    var page_home = $("#home");
    var page_user_find = $("#user_find");
    var page_user_create = $("#user_create");
    var page_user_edit = $("#user_edit");
    var page_user_delete = $("#user_delete");


    //Vælger alle de DIVs som er knappen for at skifte side
    var btn_go_home = $("#btn_go_home");
    var btn_go_user_find = $("#btn_go_user_find");
    var btn_go_user_create = $("#btn_go_user_create");
    var btn_go_user_edit = $("#btn_go_user_edit");
    var btn_go_user_delete = $("#btn_go_user_delete");
    //Loading div der ligger i bunden af index.html
    var loading = $("#loading");

    //Base api urlen
    var api_url = "api/";

    var init = function () {
        initEvents();

        //Start siden er page_home
        page_home.show();
        home();
    };

    //Funktioner
    var hidePages = function(){
        page_home.hide();
        page_user_find.hide();
        page_user_create.hide();
        page_user_edit.hide();
        page_user_delete.hide();

    };

    var showError = function(){
        alert("Data kunne ikke hentes fra backend!");
    };

    //Events
    var initEvents = function(){
        btn_go_home.click(function(){
            hidePages();
            page_home.show();
            home();
        });
        btn_go_user_find.click(function(){
            hidePages();
            page_user_find.show();
            user_find();
        });
        btn_go_user_create.click(function(){
            hidePages();
            page_user_create.show();
            user_create();
        });
        btn_go_user_edit.click(function(){
            hidePages();
            page_user_edit.show();
            user_edit();
        });
        btn_go_user_delete.click(function(){
            hidePages();
            page_user_delete.show();
            user_delete();
        });
    };

    //Scripts for hver side
    var home = function(){
        //Der sker ikke rigtigt noget her på hjemme siden
    };


    var user_find = function(){
        var response_user = $("#response_user");
        var input_username = $("#input_username");
        var btn_user_search = $("#btn_user_search");

        var api_user_find = function(){
            loading.show();

            $.ajax({
                url: api_url + "bruger/" + input_username.val(),
                type: "GET"
            }).done(function(resp) {
                response_user.html(resp);
            }).fail(function(){
                showError();
            }).always(function(){
                loading.hide();
            });
        };

        btn_user_search.click(function () {
            api_user_find();
        });
    };

    var user_create = function(){

    };

    var user_edit = function(){

    };
    var user_delete = function(){

    };
    //Inititialize scriptet
    init();
});