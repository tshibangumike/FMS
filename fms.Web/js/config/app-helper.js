if (typeof (fms) == "undefined") {
    fms = {};
};

fms.Routes = {
    GetSideMenuRouteView: function() {
        return {
            templateUrl: "/components/sidemenu/sidemenu.html",
            controller: "SideMenuController"
        };
    },
    GetToolbarRouteView: function() {
        return {
            templateUrl: "/components/toolbar/toolbar.html",
            controller: "ToolbarController",
            resolve: {
                currentUser: [
                    "appService", function(appService) {
                        return appService.GetData("Account/GetCurrentUser");
                    }
                ]
            }
        };
    },
    GetBaseRouteView: function() {
        return {
            templateUrl: "/components/base/base.html",
            controller: "BaseController",
            resolve: {}
        };
    },
    SetRoutes: function() {

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
                                    "appService", function(appService) {
                                        return appService.GetData(fms.Entity.Funeral.Urls.GetActiveFunerals,
                                            { pageNumber: 1, listType: 1 });
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
                                    "$stateParams", "appService", function($stateParams, appService) {
                                        return appService.GetData(fms.Entity.Funeral.Urls.GetFuneralById,
                                            { funeralId: $stateParams.funeralid });
                                    }
                                ],
                                deceased: [
                                    "$stateParams", "appService", function($stateParams, appService) {
                                        return appService.GetData("/Deceased/GetDeceasedByFuneralId",
                                            { funeralId: $stateParams.funeralid });
                                    }
                                ],
                                informant: [
                                    "$stateParams", "appService", function($stateParams, appService) {
                                        return appService.GetData("/Informant/GetInformantByFuneralId",
                                            { funeralId: $stateParams.funeralid });
                                    }
                                ],
                                nextOfKin: [
                                    "$stateParams", "appService", function($stateParams, appService) {
                                        return appService.GetData("/NextOfKin/GetNextOfKinByFuneralId",
                                            { funeralId: $stateParams.funeralid });
                                    }
                                ],
                                doctor: [
                                    "$stateParams", "appService", function($stateParams, appService) {
                                        return appService.GetData(
                                            "/" + fms.Entity.Doctor.EntityName + "/GetDoctorByFuneralId",
                                            { funeralId: $stateParams.funeralid });
                                    }
                                ],
                                homeAffairsOfficer: [
                                    "$stateParams", "appService", function($stateParams, appService) {
                                        return appService.GetData(
                                            "/" +
                                            fms.Entity.HomeAffairsOfficer.EntityName +
                                            "/GetHomeAffairsOfficerByFuneralId",
                                            { funeralId: $stateParams.funeralid });
                                    }
                                ],
                                funeralBoughtItems: [
                                    "$stateParams", "appService", function($stateParams, appService) {
                                        return appService.GetData(
                                            fms.Entity.FuneralBoughtItem.Urls.GetFuneralBoughtItemsByFuneralId,
                                            { funeralId: $stateParams.funeralid });
                                    }
                                ],
                                funeralDocuments: [
                                    "$stateParams", "appService", function($stateParams, appService) {
                                        return appService.GetData(
                                            fms.Entity.FuneralDocument.Urls.GetFuneralDocumentsByFuneralId,
                                            { funeralId: $stateParams.funeralid });
                                    }
                                ]
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
                            controller: "ListMemberController",
                            resolve: {
                                records: [
                                    "appService", function(appService) {
                                        return appService.GetData(fms.Entity.Member.Urls.GetActiveMembers,
                                            { pageNumber: 1, listType: 1 });
                                    }
                                ]
                            }
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
                            controller: "AddMemberController"
                        }
                    }
                };
            case "edit":
                return {
                    name: "editmember",
                    url: "/editmember?memberid",
                    views: {
                        "": fms.Routes.GetBaseRouteView(),
                        "toolbar@editmember": fms.Routes.GetToolbarRouteView(),
                        "sidemenu@editmember": fms.Routes.GetSideMenuRouteView(),
                        "body@editmember": {
                            templateUrl: "/components/member/edit-member.html",
                            controller: "EditMemberController",
                            resolve: {
                                record: [
                                    "$stateParams", "appService", function($stateParams, appService) {
                                        return appService.GetData(fms.Entity.Member.Urls.GetMemberById,
                                            { memberId: $stateParams.memberid });
                                    }
                                ],
                                payments: [
                                    "$stateParams", "appService", function($stateParams, appService) {
                                        return appService.GetData(fms.Entity.Payment.Urls.GetPaymentsByMemberId,
                                            { memberId: $stateParams.memberid });
                                    }
                                ],
                                paymentPeriods: [
                                    "appService", function(appService) {
                                        return appService.GetData("/PaymentPeriod/GetActivePaymentPeriods");
                                    }
                                ]
                            }
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
                                    "appService", function(appService) {
                                        return appService.GetData(fms.Entity.Deceased.Urls.GetActiveDeceaseds,
                                            { pageNumber: 1, listType: 1 });
                                    }
                                ]
                            }
                        }
                    }
                };
            case "edit":
                return {
                    name: "editdeceased",
                    url: "/editdeceased?deceasedid",
                    views: {
                        "": fms.Routes.GetBaseRouteView(),
                        "toolbar@editdeceased": fms.Routes.GetToolbarRouteView(),
                        "sidemenu@editdeceased": fms.Routes.GetSideMenuRouteView(),
                        "body@editdeceased": {
                            templateUrl: "/components/deceased/edit-deceased.html",
                            controller: "EditDeceasedController",
                            resolve: {
                                record: [
                                    "$stateParams", "appService", function($stateParams, appService) {
                                        return appService.GetData(fms.Entity.Deceased.Urls.GetDeceasedById,
                                            { deceasedId: $stateParams.deceasedid });
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
                                    "appService", function(appService) {
                                        return appService.GetData(fms.Entity.Informant.Urls.GetActiveInformants,
                                            { pageNumber: 1, listType: 1 });
                                    }
                                ]
                            }
                        }
                    }
                };
            case "edit":
                return {
                    name: "editinformant",
                    url: "/editinformant?informantid",
                    views: {
                        "": fms.Routes.GetBaseRouteView(),
                        "toolbar@editinformant": fms.Routes.GetToolbarRouteView(),
                        "sidemenu@editinformant": fms.Routes.GetSideMenuRouteView(),
                        "body@editinformant": {
                            templateUrl: "/components/informant/edit-informant.html",
                            controller: "EditInformantController",
                            resolve: {
                                record: [
                                    "$stateParams", "appService", function($stateParams, appService) {
                                        return appService.GetData(fms.Entity.Informant.Urls.GetInformantById,
                                            { informantId: $stateParams.informantid });
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
                                    "appService", function(appService) {
                                        return appService.GetData(fms.Entity.NextOfKin.Urls.GetActiveNextOfKins,
                                            { pageNumber: 1, listType: 1 });
                                    }
                                ]
                            }
                        }
                    }
                };
            case "edit":
                return {
                    name: "editnextofkin",
                    url: "/editnextofkin?nextofkinid",
                    views: {
                        "": fms.Routes.GetBaseRouteView(),
                        "toolbar@editnextofkin": fms.Routes.GetToolbarRouteView(),
                        "sidemenu@editnextofkin": fms.Routes.GetSideMenuRouteView(),
                        "body@editnextofkin": {
                            templateUrl: "/components/nextofkin/edit-nextofkin.html",
                            controller: "EditNextOfKinController",
                            resolve: {
                                record: [
                                    "$stateParams", "appService", function($stateParams, appService) {
                                        return appService.GetData(fms.Entity.NextOfKin.Urls.GetNextOfKinById,
                                            { nextOfKinId: $stateParams.nextofkinid });
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
                                    "appService", function(appService) {
                                        return appService.GetData(fms.Entity.Doctor.Urls.GetActiveDoctors,
                                            { pageNumber: 1, listType: 1 });
                                    }
                                ]
                            }
                        }
                    }
                };
            case "edit":
                return {
                    name: "editdoctor",
                    url: "/editdoctor?doctorid",
                    views: {
                        "": fms.Routes.GetBaseRouteView(),
                        "toolbar@editdoctor": fms.Routes.GetToolbarRouteView(),
                        "sidemenu@editdoctor": fms.Routes.GetSideMenuRouteView(),
                        "body@editdoctor": {
                            templateUrl: "/components/doctor/edit-doctor.html",
                            controller: "EditDoctorController",
                            resolve: {
                                record: [
                                    "$stateParams", "appService", function($stateParams, appService) {
                                        return appService.GetData(fms.Entity.Doctor.Urls.GetDoctorById,
                                            { doctorId: $stateParams.doctorid });
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
                                    "appService", function(appService) {
                                        return appService.GetData(fms.Entity.HomeAffairsOfficer.Urls
                                            .GetActiveHomeAffairsOfficers,
                                            { pageNumber: 1, listType: 1 });
                                    }
                                ]
                            }
                        }
                    }
                };
            case "edit":
                return {
                    name: "edithomeaffairsofficer",
                    url: "/edithomeaffairsofficer?homeaffairsofficerid",
                    views: {
                        "": fms.Routes.GetBaseRouteView(),
                        "toolbar@edithomeaffairsofficer": fms.Routes.GetToolbarRouteView(),
                        "sidemenu@edithomeaffairsofficer": fms.Routes.GetSideMenuRouteView(),
                        "body@edithomeaffairsofficer": {
                            templateUrl: "/components/homeaffairsofficer/edit-homeaffairsofficer.html",
                            controller: "EditHomeAffairsOfficerController",
                            resolve: {
                                record: [
                                    "$stateParams", "appService", function($stateParams, appService) {
                                        return appService.GetData(
                                            fms.Entity.HomeAffairsOfficer.Urls.GetHomeAffairsOfficerById,
                                            { homeAffairsOfficerId: $stateParams.homeaffairsofficerid });
                                    }
                                ]
                            }
                        }
                    }
                };
            default:
            }
        case "supplier":
            switch (routeName) {
            case "list":
                return {
                    name: "listsupplier",
                    url: "/listsupplier",
                    views: {
                        "": fms.Routes.GetBaseRouteView(),
                        "toolbar@listsupplier": fms.Routes.GetToolbarRouteView(),
                        "sidemenu@listsupplier": fms.Routes.GetSideMenuRouteView(),
                        "body@listsupplier": {
                            templateUrl: "/components/supplier/list-supplier.html",
                            controller: "ListSupplierController",
                            resolve: {
                                records: [
                                    "appService", function(appService) {
                                        return appService.GetData(fms.Entity.Supplier.Urls.GetActiveSuppliers,
                                            { pageNumber: 1, listType: 1 });
                                    }
                                ]
                            }
                        }
                    }
                };
            case "edit":
                return {
                    name: "editsupplier",
                    url: "/editsupplier?supplierid",
                    views: {
                        "": fms.Routes.GetBaseRouteView(),
                        "toolbar@editsupplier": fms.Routes.GetToolbarRouteView(),
                        "sidemenu@editsupplier": fms.Routes.GetSideMenuRouteView(),
                        "body@editsupplier": {
                            templateUrl: "/components/supplier/edit-supplier.html",
                            controller: "EditSupplierController",
                            resolve: {
                                record: [
                                    "$stateParams", "appService", function($stateParams, appService) {
                                        return appService.GetData(fms.Entity.Supplier.Urls.GetSupplierById,
                                            { supplierId: $stateParams.supplierid });
                                    }
                                ]
                            }
                        }
                    }
                };
            case "add":
                return {
                    name: "addsupplier",
                    url: "/addsupplier",
                    views: {
                        "": fms.Routes.GetBaseRouteView(),
                        "toolbar@addsupplier": fms.Routes.GetToolbarRouteView(),
                        "sidemenu@addsupplier": fms.Routes.GetSideMenuRouteView(),
                        "body@addsupplier": {
                            templateUrl: "/components/supplier/add-supplier.html",
                            controller: "AddSupplierController"
                        }
                    }
                };
            default:
            }
        }
        return null;
    },
    SetListLookup: function(uibModal, templateUrl, controllerName, resolve, setSelectedObject) {
        uibModal.open({
                animation: true,
                ariaLabelledBy: "modal-title",
                ariaDescribedBy: "modal-body",
                templateUrl: templateUrl,
                controller: controllerName,
                size: "lg",
                resolve: resolve
            })
            .result.then(function(selectedRecord) {
                setSelectedObject(selectedRecord);
            });
    },
    SetAddLookup: function(uibModal, templateUrl, controllerName, getRecords) {
        uibModal
            .open({
                animation: true,
                ariaLabelledBy: "modal-title",
                ariaDescribedBy: "modal-body",
                templateUrl: templateUrl,
                controller: controllerName,
                size: "lg"
            })
            .result.then(function() {
                getRecords();
            });
    },
    SetEntityViewLookup: function(uibModal, templateUrl, controllerName, resolve) {
        uibModal.open({
            animation: true,
            ariaLabelledBy: "modal-title",
            ariaDescribedBy: "modal-body",
            templateUrl: templateUrl,
            controller: controllerName,
            size: "lg",
            resolve: resolve
        });
    }
};

fms.Functions = {
    SplitObjectIntoArray: function() {
        if (arguments.length === 0) return null;
        var record = arguments[0] == null ? null : arguments[0];
        var keyValues = [];
        _.forEach(record,
            function(value, key) {
                keyValues.push({ Key: key, Value: value });
            });
        return keyValues;
    },
    AddToOrRemoveFromArrayAnItemBasedOnId: function(array, arrayItem) {
        if (arrayItem["Selected"]) {
            array.push(arrayItem);
        } else {
            _.remove(array,
                function(x) {
                    return _.isEqual(x["Id"], arrayItem["Id"]);
                });
        }
    },
    SelectAllRecords: function(isSelected, array) {
        _.forEach(array,
            function(value) {
                value.Selected = isSelected;
            });
    },
    generateLuhnDigit: function() {
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
    ExtractFromIdNunmber: function() {
        if (arguments.length === 0) return null;
        var idNumber = arguments[0] == null ? null : arguments[0];

        var checkIDNumber = function(idNumber) {
            var number = idNumber.substring(0, idNumber.length - 1);
            return fms.Functions.generateLuhnDigit(number) === +idNumber[idNumber.length - 1];
        };

        var getBirthdate = function(idNumber) {
            var year = idNumber.substring(0, 2);
            var currentYear = new Date().getFullYear() % 100;

            var prefix = "19";
            if (+year < currentYear)
                prefix = "20";

            var month = idNumber.substring(2, 4);
            var day = idNumber.substring(4, 6);
            return new Date(prefix + year + "/" + month + "/" + day);
        };

        var getGender = function(idNumber) {
            return +idNumber.substring(6, 7) < 5 ? "female" : "male";
        };

        var getCitizenship = function(idNumber) {
            return +idNumber.substring(10, 11) === 0 ? "citizen" : "resident";
        };

        var result = {};
        result.valid = checkIDNumber(idNumber);
        result.birthdate = getBirthdate(idNumber);
        result.gender = getGender(idNumber);
        result.citizen = getCitizenship(idNumber);
        return result;
    },
    IsLeapYear: function(year) {
        return (year % 400) ? ((year % 100) ? ((year % 4) ? false : true) : false) : true;
    },
    GetMonthLastDay: function(year, month) {
        var monthNumbersWith31Days = [1, 3, 5, 7, 8, 10, 12];
        var monthNumbersWith30Days = [4, 6, 9, 11];
        if (_.findIndex(monthNumbersWith31Days, function(o) { return o === month; }) !== -1)
            return 31;
        else if (_.findIndex(monthNumbersWith30Days, function(o) { return o === month; }) !== -1)
            return 30;
        else if (month === 2) {
            if (fms.Functions.IsLeapYear(year))
                return 29;
            return 28;
        }
        return null;
    },
    IsEmpty: function(value) {
        return angular.isUndefined(value) || value === "" || value === null;
    }
};

fms.Entity = {
    Deceased: {
        EntityName: "Deceased",
        Urls: {
            GetActiveDeceaseds: "/Deceased/GetActiveDeceaseds",
            GetDeceasedById: "/Deceased/GetDeceasedById",
            GetDeceasedByFuneralId: "/Deceased/GetDeceasedByFuneralId",
            UpdateDeceased: "/Deceased/UpdateDeceased"
        }
    },
    Doctor: {
        EntityName: "Doctor",
        Urls: {
            GetActiveDoctors: "/Doctor/GetActiveDoctors",
            GetDoctorById: "/Doctor/GetDoctorById",
            AddDoctor: "/Doctor/AddDoctor",
            UpdateDoctor: "/Doctor/UpdateDoctor"
        }
    },
    Funeral: {
        EntityName: "Funeral",
        Urls: {
            GetActiveFunerals: "/Funeral/GetActiveFunerals",
            GetFuneralById: "/Funeral/GetFuneralById"
        }
    },
    HomeAffairsOfficer: {
        EntityName: "HomeAffairsOfficer",
        Urls: {
            GetActiveHomeAffairsOfficers: "/HomeAffairsOfficer/GetActiveHomeAffairsOfficers",
            GetHomeAffairsOfficerById: "/HomeAffairsOfficer/GetHomeAffairsOfficerById",
            AddHomeAffairsOfficer: "/HomeAffairsOfficer/AddHomeAffairsOfficer"
        }
    },
    HomeAffairsOffice: {
        EntityName: "HomeAffairsOffice",
        Urls: {
            GetActiveHomeAffairsOffices: "/HomeAffairsOffice/GetActiveHomeAffairsOffices",
            GetHomeAffairsOfficeById: "/HomeAffairsOffice/GetHomeAffairsOfficeById",
            AddHomeAffairsOffice: "/HomeAffairsOffice/AddHomeAffairsOffice"
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
            GetActiveInformants: "/Informant/GetActiveInformants",
            GetInformantById: "/Informant/GetInformantById",
            UpdateInformant: "/Informant/UpdateInformant"
        }
    },
    Cemetery: {
        EntityName: "Cemetery",
        Urls: {
            GetActiveCemeteries: "/Cemetery/GetActiveCemeteries",
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
    Member: {
        EntityName: "Member",
        Urls: {
            GetActiveMembers: "/Member/GetActiveMembers",
            GetMemberById: "/Member/GetMemberById",
            AddMember: "/Member/AddMember",
            UpdateMember: "/Member/UpdateMember"
        }
    },
    NextOfKin: {
        EntityName: "NextOfKin",
        Urls: {
            GetActiveNextOfKins: "/NextOfKin/GetActiveNextOfKins",
            GetNextOfKinById: "/NextOfKin/GetNextOfKinById",
            UpdateNextOfKin: "/NextOfKin/UpdateNextOfKin"
        }
    },
    FuneralBoughtItem: {
        EntityName: "FuneralBoughtItem",
        Urls: {
            GetFuneralBoughtItemsByFuneralId: "/FuneralBoughtItem/GetFuneralBoughtItemsByFuneralId"
        }
    },
    FuneralDocument: {
        EntityName: "FuneralDocument",
        Urls: {
            GetFuneralDocumentsByFuneralId: "/FuneralDocument/GetFuneralDocumentsByFuneralId"
        }
    },
    Supplier: {
        EntityName: "Supplier",
        Urls: {
            GetActiveSuppliers: "/Supplier/GetActiveSuppliers",
            GetSupplierById: "Supplier/GetSupplierById",
            AddSupplier: "/Supplier/AddSupplier"
        }
    },
    Payment: {
        EntityName: "Payment",
        Urls: {
            GetPaymentsByMemberId: "/Payment/GetPaymentsByMemberId",
            AddPayment: "/Payment/AddPayment"
        }
    }
};

fms.Notifications = {
    Toastr: {
        SetToastrOption: function() {
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
        CreateSuccessNotification: function(message) {
            fms.Notifications.Toastr.SetToastrOption();
            if (_.isNull(message) || _.isUndefined(message)) {
                message = "The record has been created successfully!";
            }
            toastr.success(message, "Success");
        },
        ShowErrorNotification: function() {
            fms.Notifications.Toastr.SetToastrOption();
            toastr.error("Something wrong occured while saving this record!", "Error");
        },
        CreateErrorNotification: function() {
            fms.Notifications.Toastr.SetToastrOption();
            toastr.error("Something wrong occured while creating this record!", "Error");
        },
        UpdateSuccessNotification: function(message) {
            fms.Notifications.Toastr.SetToastrOption();
            if (_.isNull(message) || _.isUndefined(message)) {
                message = "The record has been successfully modified!";
            }
            toastr.success(message, "Success");
        },
        UpdateErrorNotification: function() {
            fms.Notifications.Toastr.SetToastrOption();
            toastr.success("Something wrong occured while saving this record!", "Error");
        }
    }
};

fms.Loading = {
    Start: function(message) {
        if (message == null)
            return $("body").loading({
                message: "Working..."
            });
        else
            return $("body").loading({
                message: message
            });
    },
    Stop: function() {
        return $("body").loading("stop");
    }
};
