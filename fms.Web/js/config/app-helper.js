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
                                    controller: "ListFuneralController",
                                    resolve: {
                                        funerals: [
                                            "appService", function (appService) {
                                                return appService.GetData("/Funeral/GetActiveFunerals");
                                            }
                                        ]
                                    }
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
                    case "edit":
                        return {
                            name: "editfuneral",
                            url: "/editfuneral?funeralid",
                            views: {
                                "": fms.Routes.GetBaseRouteView(),
                                "toolbar@editfuneral": fms.Routes.GetToolbarRouteView(),
                                "sidemenu@editfuneral": fms.Routes.GetSideMenuRouteView(),
                                "body@editfuneral": {
                                    templateUrl: "/components/funeral/edit-funeral.html",
                                    controller: "EditFuneralController",
                                    resolve: {
                                        funeral: [
                                            "$stateParams", "appService", function ($stateParams, appService) {
                                                return appService.GetData("/" + fms.Entity.Funeral.EntityName + "/GetFuneralById", { funeralId: $stateParams.funeralid });
                                            }
                                        ],
                                        deceased: [
                                            "$stateParams", "appService", function ($stateParams, appService) {
                                                return appService.GetData("/Deceased/GetDeceasedByFuneralId", { funeralId: $stateParams.funeralid });
                                            }
                                        ],
                                        informant: [
                                            "$stateParams", "appService", function ($stateParams, appService) {
                                                return appService.GetData("/Informant/GetInformantByFuneralId", { funeralId: $stateParams.funeralid });
                                            }
                                        ],
                                        nextOfKin: [
                                            "$stateParams", "appService", function ($stateParams, appService) {
                                                return appService.GetData("/NextOfKin/GetNextOfKinByFuneralId", { funeralId: $stateParams.funeralid });
                                            }
                                        ],
                                        doctor: [
                                            "$stateParams", "appService", function ($stateParams, appService) {
                                                return appService.GetData("/" + fms.Entity.Doctor.EntityName + "/GetDoctorByFuneralId", { funeralId: $stateParams.funeralid });
                                            }
                                        ],
                                        homeAffairsOfficer: [
                                            "$stateParams", "appService", function ($stateParams, appService) {
                                                return appService.GetData("/" + fms.Entity.HomeAffairsOfficer.EntityName + "/GetHomeAffairsOfficerByFuneralId", { funeralId: $stateParams.funeralid });
                                            }
                                        ],
                                        funeralBoughtItems: [
                                            "$stateParams", "appService", function ($stateParams, appService) {
                                                return appService.GetData("/" + fms.Entity.FuneralBoughtItem.EntityName + "/GetFuneralBoughtItemsByFuneralId", { funeralId: $stateParams.funeralid });
                                            }
                                        ],
                                    }
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

fms.Functions = {
    SplitObjectIntoArray: function () {
        if (arguments.length === 0) return null;
        var record = arguments[0] == null ? null : arguments[0];
        var keyValues = [];
        _.forEach(record, function (value, key) {
            if (key.indexOf("Time") > 0 || key.indexOf("Date") > 0 || key.indexOf("Day") > 0) {
                if (!_.isNull(value)) {
                    var values = value.split("/");
                    var day = values[0];
                    var month = values[1];
                    var yeartime = values[2].split(" ");
                    var year = yeartime[0];
                    var time = yeartime[1];
                    value = year + "-" + month + "-" + day + " " + time;
                    keyValues.push({ Key: key, Value: value });
                }
            } else {
                keyValues.push({ Key: key, Value: value });
            }
        });
        return keyValues;
    }
};

fms.Entity = {
    Deceased: { EntityName: "Deceased" },
    Doctor: { EntityName: "Doctor" },
    Funeral: { EntityName: "Funeral" },
    HomeAffairsOfficer: { EntityName: "HomeAffairsOfficer" },
    Informant: { EntityName: "Informant" },
    NextOfKin: { EntityName: "NextOfKin" },
    FuneralBoughtItem: { EntityName: "FuneralBoughtItem" }
}