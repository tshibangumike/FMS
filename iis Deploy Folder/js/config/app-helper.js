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
                                                return appService.GetData(fms.Entity.Funeral.Urls.GetActiveFunerals);
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
                                                return appService.GetData(fms.Entity.Funeral.Urls.GetFuneralById, { funeralId: $stateParams.funeralid });
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
            case "deceased":
                switch (routeName) {
                    case "list":
                        return {
                            name: "listdeceased",
                            url: "/listdeceased",
                            views: {
                                "": fms.Routes.GetBaseRouteView(),
                                "toolbar@listdeceased": fms.Routes.GetToolbarRouteView(),
                                "sidemenu@listdeceased": fms.Routes.GetSideMenuRouteView(),
                                "body@listdeceased": {
                                    templateUrl: "/components/deceased/list-deceased.html",
                                    controller: "ListDeceasedController",
                                    resolve: {
                                        deceaseds: [
                                            "appService", function (appService) {
                                                return appService.GetData(fms.Entity.Deceased.Urls.GetActiveDeceaseds);
                                            }
                                        ]
                                    }
                                }
                            }
                        };
                    default:
                }
            case "informant":
                switch (routeName) {
                    case "list":
                        return {
                            name: "listinformant",
                            url: "/listinformant",
                            views: {
                                "": fms.Routes.GetBaseRouteView(),
                                "toolbar@listinformant": fms.Routes.GetToolbarRouteView(),
                                "sidemenu@listinformant": fms.Routes.GetSideMenuRouteView(),
                                "body@listinformant": {
                                    templateUrl: "/components/informant/list-informant.html",
                                    controller: "ListInformantController",
                                    resolve: {
                                        informants: [
                                            "appService", function (appService) {
                                                return appService.GetData(fms.Entity.Informant.Urls.GetActiveInformants);
                                            }
                                        ]
                                    }
                                }
                            }
                        };
                    default:
                }
            case "nextofkin":
                switch (routeName) {
                    case "list":
                        return {
                            name: "listnextofkin",
                            url: "/listnextofkin",
                            views: {
                                "": fms.Routes.GetBaseRouteView(),
                                "toolbar@listnextofkin": fms.Routes.GetToolbarRouteView(),
                                "sidemenu@listnextofkin": fms.Routes.GetSideMenuRouteView(),
                                "body@listnextofkin": {
                                    templateUrl: "/components/nextofkin/list-nextofkin.html",
                                    controller: "ListNextOfKinController",
                                    resolve: {
                                        nextOfKins: [
                                            "appService", function (appService) {
                                                return appService.GetData(fms.Entity.NextOfKin.Urls.GetActiveNextOfKins);
                                            }
                                        ]
                                    }
                                }
                            }
                        };
                    default:
                }
            case "doctor":
                switch (routeName) {
                    case "list":
                        return {
                            name: "listdoctor",
                            url: "/listdoctor",
                            views: {
                                "": fms.Routes.GetBaseRouteView(),
                                "toolbar@listdoctor": fms.Routes.GetToolbarRouteView(),
                                "sidemenu@listdoctor": fms.Routes.GetSideMenuRouteView(),
                                "body@listdoctor": {
                                    templateUrl: "/components/doctor/list-doctor.html",
                                    controller: "ListDoctorController",
                                    resolve: {
                                        doctors: [
                                            "appService", function (appService) {
                                                return appService.GetData(fms.Entity.Doctor.Urls.GetActiveDoctors);
                                            }
                                        ]
                                    }
                                }
                            }
                        };
                    default:
                }
            case "homeaffairsofficer":
                switch (routeName) {
                    case "list":
                        return {
                            name: "listhomeaffairsofficer",
                            url: "/listhomeaffairsofficer",
                            views: {
                                "": fms.Routes.GetBaseRouteView(),
                                "toolbar@listhomeaffairsofficer": fms.Routes.GetToolbarRouteView(),
                                "sidemenu@listhomeaffairsofficer": fms.Routes.GetSideMenuRouteView(),
                                "body@listhomeaffairsofficer": {
                                    templateUrl: "/components/homeaffairsofficer/list-homeaffairsofficer.html",
                                    controller: "ListHomeAffairsOfficerController",
                                    resolve: {
                                        homeAffairsOfficers: [
                                            "appService", function (appService) {
                                                return appService.GetData(fms.Entity.HomeAffairsOfficer.Urls.GetActiveHomeAffairsOfficers);
                                            }
                                        ]
                                    }
                                }
                            }
                        };
                    default:
                }
                return null;
        }
    },
    SetListLookup: function () {

        if (arguments.length === 0) return null;

        var uibModal = arguments[0] == null ? null : arguments[0];
        var appService = arguments[1] == null ? null : arguments[1];
        var templateUrl = arguments[2] == null ? null : arguments[2];
        var controllerName = arguments[3] == null ? null : arguments[3];
        var resolve = arguments[4] == null ? null : arguments[4];
        var setSelectedObject = arguments[5] == null ? null : arguments[5];

        var modalInstance = uibModal.open({
            animation: true,
            ariaLabelledBy: "modal-title",
            ariaDescribedBy: "modal-body",
            templateUrl: templateUrl,
            controller: controllerName,
            size: "lg",
            resolve: resolve
        });

        modalInstance.result.then(function (selectedRecord) {
            setSelectedObject(selectedRecord);
        });

        return null;

    },
    SetAddLookup: function () {

        if (arguments.length === 0) return null;

        var uibModal = arguments[0] == null ? null : arguments[0];
        var appService = arguments[1] == null ? null : arguments[1];
        var templateUrl = arguments[2] == null ? null : arguments[2];
        var controllerName = arguments[3] == null ? null : arguments[3];
        var getRecords = arguments[4] == null ? null : arguments[4];

        var modalInstance = uibModal.open({
            animation: true,
            ariaLabelledBy: "modal-title",
            ariaDescribedBy: "modal-body",
            templateUrl: templateUrl,
            controller: controllerName,
            size: "lg"
        });

        modalInstance.result.then(function () {
            getRecords();
        });

    },
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
    },
    AddToOrRemoveFromArray: function () {
        if (_.isEqual(arguments.length, 0)) return null;
        var _idArray = _.isNull(arguments[0], 0) ? null : arguments[0];
        var _record = _.isNull(arguments[1], 1) ? null : arguments[1];
        if (_record.Selected) {
            _idArray.push(_record);
        }
        else {
            _.remove(_idArray, function (x) {
                return _.isEqual(x.Id, _record.Id);
            });
        }
    },
    generateLuhnDigit: function () {
        if (arguments.length === 0) return null;
        var inputString = arguments[0] == null ? null : arguments[0];

        var total = 0;
        var count = 0;
        for (var i = 0; i < inputString.length; i++) {
            var multiple = count % 2 + 1;
            count++;
            var temp = multiple * +inputString[i];
            temp = Math.floor(temp / 10) + (temp % 10);
            total += temp;
        }
        total = (total * 9) % 10;
        return total;
    },
    ExtractFromIdNunmber: function () {
        if (arguments.length === 0) return null;
        var idNumber = arguments[0] == null ? null : arguments[0];

        var checkIDNumber = function (idNumber) {
            var number = idNumber.substring(0, idNumber.length - 1);
            return fms.Functions.generateLuhnDigit(number) === +idNumber[idNumber.length - 1];
        };

        var getBirthdate = function (idNumber) {
            var year = idNumber.substring(0, 2);
            var currentYear = new Date().getFullYear() % 100;

            var prefix = "19";
            if (+year < currentYear)
                prefix = "20";

            var month = idNumber.substring(2, 4);
            var day = idNumber.substring(4, 6);
            return new Date(prefix + year + "/" + month + "/" + day);
        };

        var getGender = function (idNumber) {
            return +idNumber.substring(6, 7) < 5 ? "female" : "male";
        };

        var getCitizenship = function (idNumber) {
            return +idNumber.substring(10, 11) === 0 ? "citizen" : "resident";
        };

        var result = {};
        result.valid = checkIDNumber(idNumber);
        result.birthdate = getBirthdate(idNumber);
        result.gender = getGender(idNumber);
        result.citizen = getCitizenship(idNumber);
        return result;
    },
};

fms.Entity = {
    Deceased: {
        EntityName: "Deceased",
        Urls: {
            GetActiveDeceaseds: "/Deceased/GetActiveDeceaseds",
            GetDeceasedById: "/Deceased/GetDeceasedById",
            GetDeceasedByFuneralId: "/Deceased/GetDeceasedByFuneralId"
        }
    },
    Doctor: {
        EntityName: "Doctor",
        Urls: {
            GetActiveDoctors: "/Doctor/GetActiveDoctors",
            GetDoctorById: "/Doctor/GetDoctorById",
            AddDoctor: "/Doctor/AddDoctor"
        }
    },
    Funeral: {
        EntityName: "Funeral",
        Urls: {
            GetActiveFunerals: "/Funeral/GetActiveFunerals",
            GetFuneralById: "/Funeral/GetFuneralById"
        }},
    HomeAffairsOfficer: {
        EntityName: "HomeAffairsOfficer",
        Urls: {
            GetActiveHomeAffairsOfficers: "/HomeAffairsOfficer/GetActiveHomeAffairsOfficers",
            GetHomeAffairsOfficerById: "/HomeAffairsOfficer/GetHomeAffairsOfficerById",
            AddHomeAffairsOfficer: "/HomeAffairsOfficer/AddHomeAffairsOfficer"
        }
    },
    Hospital: {
        EntityName: "Hospital",
        Urls: {
            GetActiveHospitals: "/Hospital/GetActiveHospitals",
            GetHospitalById: "/Hospital/GetHospitalById",
            AddHospital: "/Hospital/AddHospital"
        }
    },
    Informant: {
        EntityName: "Informant",
        Urls: {
            GetActiveInformants: "/Informant/GetActiveInformants"
        }
    },
    Cemetery: {
        EntityName: "Cemetery",
        Urls: {
            GetActiveCemeteries: "/Cemetery/GetActiveCemteries",
            GetCemeteryById: "/Cemetery/GetCemeteryById"
        }
    },
    Mortuary: {
        EntityName: "Mortuary",
        Urls: {
            GetActiveMortuaries: "/Mortuary/GetActiveMortuaries",
            GetMortuaryById: "/Mortuary/GetMortuaryById"
        }
    },
    NextOfKin: {
        EntityName: "NextOfKin",
        Urls: {
            GetActiveNextOfKins: "/NextOfKin/GetActiveNextOfKins"
        }
    },
    FuneralBoughtItem: { EntityName: "FuneralBoughtItem" },
    Supplier: {
        EntityName: "Supplier",
        Urls: {
            GetActiveSuppliers: "/Supplier/GetActiveSuppliers",
            GetSupplierById: "Supplier/GetSupplierById",
            AddSupplier: "/Supplier/AddSupplier"
        }}
};

fms.Notifications = {
    Toastr: {
        SetToastrOption: function () {
            toastr.options = {
                "debug": false,
                "positionClass": "toast-top-center",
                "progressBar": true,
                "onclick": null,
                "fadeIn": 300,
                "fadeOut": 1000,
                "timeOut": 5000,
                "extendedTimeOut": 1000
            }
        },
        CreateSuccessNotification: function () {
            fms.Notifications.Toastr.SetToastrOption();
            toastr.success("The record has been created successfully!", "Success");
        },
        ShowErrorNotification: function (message) {
            fms.Notifications.Toastr.SetToastrOption();
            toastr.error("Something wrong occured while saving this record!", "Error");
        },
        CreateErrorNotification: function (message) {
            fms.Notifications.Toastr.SetToastrOption();
            toastr.error("Something wrong occured while creating this record!", "Error");
        },
        UpdateSuccessNotification: function () {
            fms.Notifications.Toastr.SetToastrOption();
            toastr.success("The record has been successfully modified!", "Success");
        },
        UpdateErrorNotification: function () {
            fms.Notifications.Toastr.SetToastrOption();
            toastr.success("Something wrong occured while saving this record!", "Error");
        },
    }
};

fms.Loading = {
    Start: function (message) {
        if (message == null)
            return $("body").loading({
                message: "Working..."
            });
        else
            return $("body").loading({
                message: message
            });
    },
    Stop: function () {
        return $("body").loading("stop");
    }
};
