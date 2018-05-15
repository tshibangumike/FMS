if (typeof (fms) == "undefined") {
    fms = {};
};

fms.Routes = {
    GetSideMenuRouteView: function () {
        return {
            templateUrl: "/components/sidemenu/sidemenu.html",
            controller: "SideMenuController"
        };
    },
    GetToolbarRouteView: function () {
        return {
            templateUrl: "/components/toolbar/toolbar.html",
            controller: "ToolbarController",
        };
    },
    GetBaseRouteView: function () {
        return {
            templateUrl: "/components/base/base.html",
            controller: "BaseController",
            resolve: {}
        };
    },
    SetRoutes: function () {

        if (arguments.length === 0) return null;

        var entityName = arguments[0] == null ? null : arguments[0];
        var routeName = arguments[1] == null ? null : arguments[1];

        switch (entityName) {
            case "account":
                switch (routeName) {
                    case "login":
                        return {
                            name: "login",
                            url: "/login",
                            views: {
                                "": {
                                    templateUrl: "/components/account/login.html",
                                    controller: "LoginController"
                                }
                                //"": fms.Routes.GetBaseRouteView(),
                                //"toolbar@login": fms.Routes.GetToolbarRouteView(),
                                //"sidemenu@login": fms.Routes.GetSideMenuRouteView(),
                                //"body@login": {
                                //    templateUrl: "/components/account/login.html",
                                //    controller: "LoginController"
                                //}
                            }
                        };
                    default:
                }
            case "funeral":
                switch (routeName) {
                    case "list":
                        return {
                            name: "listfuneral",
                            url: "/listfuneral",
                            views: {
                                "": fms.Routes.GetBaseRouteView(),
                                "toolbar@listfuneral": fms.Routes.GetToolbarRouteView(),
                                "sidemenu@listfuneral": fms.Routes.GetSideMenuRouteView(),
                                "body@listfuneral": {
                                    templateUrl: "/components/funeral/list-funeral.html",
                                    controller: "ListFuneralController"
                                }
                            }
                        };
                    case "add":
                        return {
                            name: "addfuneral",
                            url: "/addfuneral",
                            views: {
                                "": fms.Routes.GetBaseRouteView(),
                                "toolbar@addfuneral": fms.Routes.GetToolbarRouteView(),
                                "sidemenu@addfuneral": fms.Routes.GetSideMenuRouteView(),
                                "body@addfuneral": {
                                    templateUrl: "/components/funeral/add-funeral.html",
                                    controller: "AddFuneralController"
                                }
                            }
                        };
                    default:
                }
            case "member":
                switch (routeName) {
                    case "list":
                        return {
                            name: "listmember",
                            url: "/listmember",
                            views: {
                                "": fms.Routes.GetBaseRouteView(),
                                "toolbar@listmember": fms.Routes.GetToolbarRouteView(),
                                "sidemenu@listmember": fms.Routes.GetSideMenuRouteView(),
                                "body@listmember": {
                                    templateUrl: "/components/member/list-member.html",
                                    controller: "ListMemberController"
                                }
                            }
                        };
                    case "add":
                        return {
                            name: "addmember",
                            url: "/addmember",
                            views: {
                                "": fms.Routes.GetBaseRouteView(),
                                "toolbar@addmember": fms.Routes.GetToolbarRouteView(),
                                "sidemenu@addmember": fms.Routes.GetSideMenuRouteView(),
                                "body@addmember": {
                                    templateUrl: "/components/member/add-member.html",
                                    controller: "ListMemberController"
                                }
                            }
                        };
                    default:
                }
                return null;
        }
    }
};

//tca.Functions = {
//    SplitObjectIntoArray: function () {
//        if (arguments.length === 0) return null;
//        var record = arguments[0] == null ? null : arguments[0];
//        var keyValues = [];
//        _.forEach(record, function (value, key) {
//            if (key.indexOf("Time") > 0 || key.indexOf("Date") > 0 || key.indexOf("Day") > 0) {
//                if (!_.isNull(value)) {
//                    var values = value.split("/");
//                    var day = values[0];
//                    var month = values[1];
//                    var yeartime = values[2].split(" ");
//                    var year = yeartime[0];
//                    var time = yeartime[1];
//                    value = year + "-" + month + "-" + day + " " + time;
//                    keyValues.push({ Key: key, Value: value });
//                }
//            } else {
//                keyValues.push({ Key: key, Value: value });
//            }
//        });
//        return keyValues;
//    }
//};

//tca.Notifications = {
//    Toastr: {
//        SetToastrOption: function () {
//            toastr.options = {
//                "debug": false,
//                "positionClass": "toast-top-center",
//                "progressBar": true,
//                "onclick": null,
//                "fadeIn": 300,
//                "fadeOut": 1000,
//                "timeOut": 5000,
//                "extendedTimeOut": 1000
//            }
//        },
//        CreateSuccessNotification: function () {
//            tca.Notifications.Toastr.SetToastrOption();
//            toastr.success("L'enregistrement a été sauvegardé avec success!", "Confirmation");
//        },
//        ShowErrorNotification: function (message) {
//            tca.Notifications.Toastr.SetToastrOption();
//            toastr.error("L'enregistrement n'a pas été sauvegardé avec success!", "Erreur");
//        },
//        CreateErrorNotification: function (message) {
//            tca.Notifications.Toastr.SetToastrOption();
//            toastr.error("L'enregistrement n'a pas été sauvegardé avec success!", "Erreur");
//        },
//        UpdateSuccessNotification: function () {
//            tca.Notifications.Toastr.SetToastrOption();
//            toastr.success("L'enregistrement a été modifié avec success!", "Confirmation");
//        },

//    },
//    Notify: {
//        CreateSuccessNotification: function () {
//            $.notify(
//                "L'enregistrement a sauvegardé avec success!",
//                { position: "top center" }
//            );
//        },
//        UpdateSuccessNotification: function () {
//            $.notify(
//                "L'enregistrement a modifié avec success!",
//                { position: "top center" }
//            );
//        }
//    }
//}

//tca.Loading = {
//    Start: function (message) {
//        if (message == null)
//            return $("body").loading({
//                message: "Opération en cours..."
//            });
//        else
//            return $("body").loading({
//                message: message
//            });
//    },
//    Stop: function () {
//        return $("body").loading("stop");
//    }
//};

//tca.SessionService = {
//    User: {
//        getCurrentUser: function () {
//            return JSON.parse(sessionStorage.getItem("session.user"));
//        },
//        setCurrentUser: function (user) {
//            sessionStorage.setItem("session.user", JSON.stringify(user));
//        },
//        logout: function (user) {
//            sessionStorage.clear();
//        }
//    },
//    clearAll: function () {
//        sessionStorage.clear();
//    },
//    setItem: function (key, data) {
//        sessionStorage.setItem(key, data);
//    },
//    getItem: function (key) {
//        return sessionStorage.getItem(key);
//    },
//    DeleteItem: function (key) {
//        sessionStorage.removeItem(key);
//    }
//};


