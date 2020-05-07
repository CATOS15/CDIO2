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

    var showError = function(resp){
        if(resp && resp.responseText){
            alert(resp.responseText);
        }else{
            alert("Data kunne ikke hentes fra backend!");
        }
    };

    var checkDTO = function (DTO) {
        for (var key in DTO) {
            if (!DTO[key]) {
                alert("Udfyld venligst " + key);
                return false;
            }
        }
        return true;
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

            var url = api_url + "bruger";
            if(input_username.val()){
                url += "/" + input_username.val();
            }
            $.ajax({
                url: url,
                type: "GET"
            }).done(function(resp) {
                response_user.html(resp);
                //TODO: FORMATTER KODEN SÅ DEN ER PÆN
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
        var input_username = $("#createName");
        var input_password = $("#createPassword");
        var input_cpr = $("#createCPR");
        var roller = [];

        var btn_user_create = $("#btn_user_create")
        var response_create_user = $("#response_create_user");

        var roles = $("#createRole span");
        roles.click(function () {
            if ($(this).css("font-weight") !== "700") {
                $(this).css("font-weight", "700");
                roller.push($(this).text());
            } else {
                $(this).css("font-weight", "400");

                roller.splice(roller.indexOf($(this).text()));
            }
        });

        var api_create_user = function(){
            //Det er vigtigt at de keys som er skrevet her matcher Mapper.java!
            var DTO = {
                username : input_username.val(),
                password : input_password.val(),
                cpr : input_cpr.val(),
                roles : roller
            };
            if(!checkDTO(DTO))return;

            loading.show();
            $.ajax({
                url: api_url + "bruger",
                type: "POST",
                data: JSON.stringify(DTO) //Bliver blot sendt som en string og så konventeret i backend
            }).done(function(resp) {
                response_create_user.html(resp);
                //TODO: FORMATTER KODEN SÅ DEN ER PÆN
            }).fail(function(resp){
                showError(resp);
            }).always(function(){
                loading.hide();
            });
        };

        btn_user_create.click(function () {
            api_create_user();
        });
    };

    var user_edit = function() {
        //current user
        var input_selectUsername = $("#name");

        //change to
        var input_username = $("#editName");
        var input_password = $("#editPassword");
        var input_cpr = $("#editCPR");
        var roller = [];

        var btn_user_edit = $("#btn_user_edit");
        var response_edit_user = $("#response_edit_user");

        var roles = $("#editRole span");
        roles.click(function () {
            if ($(this).css("font-weight") !== "700") {
                $(this).css("font-weight", "700");
                roller.push($(this).text());
            } else {
                $(this).css("font-weight", "400");

                roller.splice(roller.indexOf($(this).text()));
            }
        });

        var api_edit_user = function () {
            var DTO = {
                username: input_username.val(),
                password: input_password.val(),
                cpr: input_cpr.val(),
                roles: roller
            };
            if(!checkDTO(DTO))return;

            loading.show();
            $.ajax({
                url: api_url + "bruger/" + input_selectUsername.val(),
                type: "PUT",
                data: JSON.stringify(DTO) //Bliver blot sendt som en string og så konventeret i backend
            }).done(function (resp) {
                response_edit_user.html(resp);
                //TODO: FORMATTER KODEN SÅ DEN ER PÆN
            }).fail(function (resp) {
                showError(resp);
            }).always(function () {
                loading.hide();
            });
        };

        btn_user_edit.click(function () {
            api_edit_user();
        });
    };

    var user_delete = function(){
        // Variables
        var input_username = $("#deleteName");
        var btn_user_delete = $("#btn_user_delete");
        var response_delete_user = $("#response_delete_user");

        var api_delete_user = function() {
            $.ajax({
                url: api_url + "bruger/" + input_username.val(),
                type: "DELETE",
            }).done(function (resp) {
                response_delete_user.html(resp);
                //TODO: FORMATTER KODEN SÅ DEN ER PÆN
            }).fail(function (resp) {
                showError(resp);
            }).always(function () {
                loading.hide();
            })
        };

        btn_user_delete.click(function (){
        api_delete_user();
        });
    };


    //Inititialize scriptet
    init();
});


