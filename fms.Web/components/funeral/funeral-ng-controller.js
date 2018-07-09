angular.module("fmsApp")
    .controller("ListFuneralController",
        [
            "$scope", "appService", "$uibModal", "funerals",
            function($scope, appService, $uibModal, funerals) {

                $scope.records = funerals.data;
                $scope.selectedRecordIds = [];
                $scope.pageNumber = 1;
                $scope.listType = 1;
                $scope.totalPageNumber = 0;

                this.init = function() {
                    if ($scope.records.length > 0) {
                        $scope.totalPageNumber = $scope.records[0]["TotalPageNumber"];
                    }
                };

                $scope.selectAll = function(isSelected) {
                    fms.Functions.SelectAllRecords(isSelected, $scope.records);
                };

                $scope.selectRecord = function(record) {
                    fms.Functions.AddToOrRemoveFromArrayAnItemBasedOnId($scope.selectedRecordIds, record);
                };

                $scope.toggleSelection = function(record) {
                    record.Selected = !record.Selected;
                };

                $scope.getFunerals = function(pageNumber, listType) {
                    appService.GetData(
                            fms.Entity.Funeral.Urls.GetActiveFunerals,
                            {
                                pageNumber: pageNumber,
                                listType: listType
                            })
                        .then(function(response) {

                                $scope.records = response.data;
                            },
                            function(response) {
                            });
                };

                $scope.create = function() {

                    appService.NavigateTo("addfuneral");

                };

                $scope.edit = function(record) {
                    if (_.isNull(record) || _.isUndefined(record)) {
                        var selectedRecords = _.filter($scope.records, function(x) { return x.Selected; });
                        if (_.isNull(selectedRecords) ||
                            _.isNull(selectedRecords) ||
                            selectedRecords.length === 0) return;
                        appService.NavigateTo("editfuneral", { funeralid: selectedRecords[0]["Id"] });
                    } else
                        appService.NavigateTo("editfuneral", { funeralid: record.Id });
                };

                $scope.startFromBegining = function() {
                    $scope.pageNumber = 1;
                    $scope.getFunerals($scope.pageNumber, $scope.listType);
                };

                $scope.next = function() {
                    $scope.pageNumber++;
                    if ($scope.pageNumber > $scope.totalPageNumber) {
                        $scope.pageNumber--;
                        return;
                    }
                    $scope.getFunerals($scope.pageNumber, $scope.listType);
                };

                $scope.previous = function() {
                    $scope.pageNumber--;
                    if ($scope.pageNumber <= 0) {
                        $scope.pageNumber++;
                        return;
                    }
                    $scope.getFunerals($scope.pageNumber, $scope.listType);
                };

                $scope.Delete = function() {
                    fms.Routes.ConfirmationLookup($uibModal, $scope.DeactivateFuneral);
                };

                $scope.DeactivateFuneral = function() {
                    var selectedRecords = _.filter($scope.records, function(x) { return x.Selected; });
                    if (_.isNull(selectedRecords) ||
                        _.isNull(selectedRecords) ||
                        selectedRecords.length === 0) return;
                    appService.GetData(fms.Entity.Funeral.Urls.DeactivateFuneral,
                            {
                                funeralId: selectedRecords[0]["Id"]
                            })
                        .then(function(response) {
                                appService.RefreshCurrentState();
                            },
                            function(response) {
                            });
                };

                this.init();

            }
        ])
    .controller("AddFuneralController",
        [
            "$rootScope", "$scope", "$uibModal", "appService",
            function($rootScope, $scope, $uibModal, appService) {

                $scope.funeral = {};
                $scope.deceased = {};
                $scope.informant = {};
                $scope.nextOfKin = {};
                $scope.doctor = {};
                $scope.homeAffairsOfficer = {};
                $scope.Tabs = [
                    { Name: "BeforeMortuary", Show: true },
                    { Name: "Documents", Show: false },
                    { Name: "Deceased", Show: true },
                    { Name: "Informant", Show: true },
                    { Name: "NextOfKin", Show: true },
                    { Name: "Doctor", Show: true },
                    { Name: "HomeAffairsOfficer", Show: true },
                    { Name: "OtherInformation", Show: true },
                    { Name: "PurchasedItems", Show: true },
                    { Name: "UploadedItems", Show: true }
                ];
                $scope.deceasedDOB = { Year: null, Month: null, Day: null };
                $scope.deceasedDOD = { Year: null, Month: null, Day: null };
                $scope.informantDOB = { Year: null, Month: null, Day: null };
                $scope.nextOfKinDOB = { Year: null, Month: null, Day: null };
                $scope.formHasBeenSubmitted = false;
                $scope.currentYear = (new Date()).getFullYear();

                $scope.collapseExpand = function() {

                    if (arguments.length === 0) return null;
                    var elementId = arguments[0] == null ? null : arguments[0];

                    var tab = _.find($scope.Tabs, function(x) { return _.isEqual(x.Name, elementId); });
                    if (_.isUndefined(tab)) return null;
                    tab.Show = !tab.Show;
                };

                $scope.getTabByName = function() {

                    if (arguments.length === 0) return null;
                    var elementId = arguments[0] == null ? null : arguments[0];

                    return _.find($scope.Tabs, function(x) { return _.isEqual(x.Name, elementId); });

                };

                $scope.GetLastDayOfMonth = function(year, month) {
                    return fms.Functions.GetMonthLastDay(year, month);
                };


                /*---Doctor Lookup - START*/
                $scope.setSelectedDoctor = function(selectedRecord) {
                    $scope.doctor = selectedRecord;
                    $scope.funeral["DoctorId"] = selectedRecord["Id"];
                };
                $scope.getDoctors = function() {
                    fms.Routes.SetListLookup(
                        $uibModal,
                        "/components/doctor/modal/modal-list-doctor.html",
                        "ModalListDoctorController",
                        {
                            records: [
                                "appService", function(appService) {
                                    return appService.GetData(fms.Entity.Doctor.Urls.GetActiveDoctors,
                                        { pageNumber: 1, listType: 2 });
                                }
                            ]
                        },
                        $scope.setSelectedDoctor
                    );
                };
                $scope.getDoctor = function(doctorId) {
                    fms.Routes.SetEntityViewLookup(
                        $uibModal,
                        "/components/doctor/modal/modal-view-doctor.html",
                        "ModalEditDoctorController",
                        {
                            record: [
                                "appService", function(appService) {
                                    return appService.GetData(fms.Entity.Doctor.Urls.GetDoctorById,
                                        { doctorId: doctorId });
                                }
                            ]
                        }
                    );
                };
                /*---Doctor Lookup - END*/

                /*---Home Affairs Officer Lookup - START*/
                $scope.setSelectedHomeAffairsOfficer = function(selectedRecord) {
                    $scope.homeAffairsOfficer = selectedRecord;
                    $scope.funeral["HomeAffairsOfficerId"] = selectedRecord["Id"];
                };
                $scope.getHomeAffairsOfficers = function() {
                    fms.Routes.SetListLookup(
                        $uibModal,
                        "/components/homeaffairsofficer/modal/modal-list-homeaffairsofficer.html",
                        "ModalListHomeAffairsOfficerController",
                        {
                            records: [
                                "appService", function(appService) {
                                    return appService.GetData(fms.Entity.HomeAffairsOfficer.Urls
                                        .GetActiveHomeAffairsOfficers,
                                        { pageNumber: 1, listType: 2 });
                                }
                            ]
                        },
                        $scope.setSelectedHomeAffairsOfficer
                    );
                };
                $scope.getHomeAffairsOfficer = function(homeAffairsOfficerId) {
                    fms.Routes.SetEntityViewLookup(
                        $uibModal,
                        "/components/homeaffairsofficer/modal/modal-view-homeaffairsofficer.html",
                        "ModalEditHomeAffairsOfficerController",
                        {
                            record: [
                                "appService", function(appService) {
                                    return appService.GetData(
                                        fms.Entity.HomeAffairsOfficer.Urls.GetHomeAffairsOfficerById,
                                        { homeAffairsOfficerId: homeAffairsOfficerId });
                                }
                            ]
                        }
                    );
                };
                /*---Doctor Lookup - END*/

                $scope.clearLookupInput = function() {

                    if (arguments.length === 0) return null;
                    var entityName = arguments[0] == null ? null : arguments[0];
                    switch (entityName) {
                    case "mortuary":
                        $scope.funeral["MortuaryName"] = null;
                        $scope.funeral["MortuaryId"] = null;
                        break;
                    case "cemetery":
                        $scope.funeral["CemeteryName"] = null;
                        $scope.funeral["CemeteryId"] = null;
                        break;
                    case "doctor":
                        $scope.doctor = null;
                        $scope.funeral["DoctorId"] = null;
                        break;
                    case "homeAffairsOfficer":
                        $scope.homeAffairsOfficer = null;
                        $scope.funeral["HomeAffairsOfficerId"] = null;
                        break;
                    case "newFuneralBoughtItem.supplier":
                        $scope.newFuneralBoughtItem["SupplierId"] = null;
                        $scope.newFuneralBoughtItem["SupplierName"] = null;
                        break;
                    default:
                    }

                };

                $scope.OnChange_SameAsInformant = function(sameAsInformant) {
                    if (_.isEqual(sameAsInformant, true)) {
                        $scope.nextOfKin = $scope.informant;
                    } else {
                        $scope.nextOfKin = null;
                    }
                };

                $scope.OnChange_SAIdNumber = function(entityName, saIdNumber) {
                    var data = fms.Functions.ExtractFromIdNunmber(saIdNumber);
                    switch (entityName) {
                    case fms.Entity.Deceased.EntityName.toLowerCase():
                        $scope.deceasedDOB["Year"] = moment(data.birthdate).year();
                        $scope.deceasedDOB["Month"] = 1 + moment(data.birthdate).month();
                        $scope.deceasedDOB["Day"] = moment(data.birthdate).date();
                        break;
                    case fms.Entity.Informant.EntityName.toLowerCase():
                        $scope.informantDOB["Year"] = moment(data.birthdate).year();
                        $scope.informantDOB["Month"] = moment(data.birthdate).month();
                        $scope.informantDOB["Day"] = moment(data.birthdate).date();
                        break;
                    case fms.Entity.NextOfKin.EntityName.toLowerCase():
                        $scope.nextOfKinDOB["Year"] = moment(data.birthdate).year();
                        $scope.nextOfKinDOB["Month"] = moment(data.birthdate).month();
                        $scope.nextOfKinDOB["Day"] = moment(data.birthdate).date();
                        break;
                    default:
                    }
                    $scope.deceased["GenderId"] = data.gender === "male" ? 1 : 2;
                };

                $scope.OnChange_InformantFirstName = function(firstName) {
                    if (!_.isNull(firstName) && !_.isUndefined(firstName)) {
                        fms.Fields.SetFieldRequirementLevel("informant", "saidnumber", true);
                    } else {
                        fms.Fields.SetFieldRequirementLevel("informant", "saidnumber", false);
                    }
                };

                $scope.OnChange_InformantIdNumber = function(saIdNumber) {

                    var data = fms.Functions.ExtractFromIdNunmber(saIdNumber);
                    $scope.informant["DateOfBirth"] = moment(data.birthdate).format("MM/DD/YYYY HH:mm A");
                    $scope.informant["GenderId"] = data.gender === "male" ? 1 : 2;

                };

                $scope.OnChange_NexyOfKinIdNumber = function(saIdNumber) {

                    var data = fms.Functions.ExtractFromIdNunmber(saIdNumber);
                    $scope.nextOfKin["DateOfBirth"] = moment(data.birthdate).format("MM/DD/YYYY HH:mm A");
                    $scope.nextOfKin["GenderId"] = data.gender === "male" ? 1 : 2;

                };

                $scope.OnChange_DateOfBirth = function() {
                    $scope.deceased["DateOfBirth"] = $("#DateOfBirth").val();
                };

                $scope.processForm = function(form) {
                    $scope.formHasBeenSubmitted = true;
                    if (!_.isNull($scope.deceasedDOB["Year"]) &&
                        !_.isNull($scope.deceasedDOB["Month"]) &&
                        !_.isNull($scope.deceasedDOB["Day"])) {
                        $scope.deceased["DateOfBirth"] = $scope.deceasedDOB["Year"] +
                            "/" +
                            $scope.deceasedDOB["Month"] +
                            "/" +
                            $scope.deceasedDOB["Day"];
                    }
                    if (!_.isNull($scope.deceasedDOD["Year"]) &&
                        !_.isNull($scope.deceasedDOD["Month"]) &&
                        !_.isNull($scope.deceasedDOD["Day"])) {
                        $scope.deceased["DateOfDeath"] = $scope.deceasedDOD["Year"] +
                            "/" +
                            $scope.deceasedDOD["Month"] +
                            "/" +
                            $scope.deceasedDOD["Day"];
                    }
                    if (!form.$valid) {
                        return;
                    }
                    var keyValuesDeceased = fms.Functions.SplitObjectIntoArray($scope.deceased);
                    var keyValuesInformant = fms.Functions.SplitObjectIntoArray($scope.informant);
                    var keyValuesNextOfKin = fms.Functions.SplitObjectIntoArray($scope.nextOfKin);
                    var keyValuesDoctor = fms.Functions.SplitObjectIntoArray($scope.doctor);
                    var keyValuesHomeAffairsOfficer = fms.Functions.SplitObjectIntoArray($scope.homeAffairsOfficer);
                    var keyValuesFuneral = fms.Functions.SplitObjectIntoArray($scope.funeral);
                    appService.PostForm("/Funeral/CreateFuneral",
                        {
                            deceased: keyValuesDeceased,
                            informant: keyValuesInformant,
                            nextOfKin: keyValuesNextOfKin,
                            doctor: keyValuesDoctor,
                            homeAffairsOfficer: keyValuesHomeAffairsOfficer,
                            funeral: keyValuesFuneral
                        }).then(function(response) {
                            if (response.data.state !== "success") {
                                fms.Notifications.Toastr.CreateErrorNotification();
                            }
                            fms.Notifications.Toastr.CreateSuccessNotification();
                            appService.NavigateTo("editfuneral", { funeralid: response.data.funeralId });
                        },
                        function(response) {
                        });
                };

            }
        ])
    .controller("EditFuneralController",
        [
            "$scope", "$window", "$location", "$anchorScroll", "$uibModal", "appService", "funeral", "deceased",
            "informant", "nextOfKin", "doctor",
            "homeAffairsOfficer", "funeralBoughtItems", "funeralDocuments",
            function($scope,
                $window,
                $location,
                $anchorScroll,
                $uibModal,
                appService,
                funeral,
                deceased,
                informant,
                nextOfKin,
                doctor,
                homeAffairsOfficer,
                funeralBoughtItems,
                funeralDocuments) {

                $scope.funeral = funeral.data;
                $scope.deceased = deceased.data;
                $scope.informant = informant.data;
                $scope.nextOfKin = nextOfKin.data;
                $scope.doctor = doctor.data;
                $scope.homeAffairsOfficer = homeAffairsOfficer.data;
                $scope.funeralBoughtItems = funeralBoughtItems.data;
                $scope.funeralDocuments = funeralDocuments.data;
                $scope.newFuneralBoughtItem = { Quantity: 1, Description: "" };
                $scope.selectedFuneralBoughtItemIds = [];
                $scope.newFuneralDocument = { Description: null };
                $scope.cemetery = { Id: $scope.funeral["CemeteryId"], Name: $scope.funeral["CemeteryName"] };
                $scope.mortuary = { Id: $scope.funeral["MortuaryId"], Name: $scope.funeral["MortuaryName"] };
                $scope.deceasedDOB = { Year: null, Month: null, Day: null };
                $scope.deceasedDOD = { Year: null, Month: null, Day: null };
                $scope.funeralBD = { Year: null, Month: null, Day: null };
                $scope.formHasBeenSubmitted = false;
                $scope.currentYear = (new Date()).getFullYear();
                $scope.Tabs = [
                    { Name: "BeforeMortuary", Show: true },
                    { Name: "DuringMortuary", Show: true },
                    { Name: "AfterMortuary", Show: true },
                    { Name: "Documents", Show: true },
                    { Name: "Deceased", Show: true },
                    { Name: "Informant", Show: true },
                    { Name: "NextOfKin", Show: true },
                    { Name: "Doctor", Show: true },
                    { Name: "HomeAffairsOfficer", Show: true },
                    { Name: "OtherInformation", Show: true },
                    { Name: "PurchasedItems", Show: true },
                    { Name: "UploadedItems", Show: true }
                ];

                this.init = function() {
                    if (!_.isNull($scope.deceased["DateOfBirth"])) {
                        $scope.deceasedDOB = {
                            Year: moment($scope.deceased["DateOfBirth"]).year(),
                            Month: (1 + moment($scope.deceased["DateOfBirth"]).month()),
                            Day: moment($scope.deceased["DateOfBirth"]).date()
                        };
                    }
                    if (!_.isNull($scope.deceased["DateOfDeath"])) {
                        $scope.deceasedDOD = {
                            Year: moment($scope.deceased["DateOfDeath"]).year(),
                            Month: (1 + moment($scope.deceased["DateOfDeath"]).month()),
                            Day: moment($scope.deceased["DateOfDeath"]).date()
                        };
                    }
                    if (!_.isNull($scope.funeral["BurialDate"])) {
                        $scope.funeralBD = {
                            Year: moment($scope.funeral["BurialDate"]).year(),
                            Month: (1 + moment($scope.funeral["BurialDate"]).month()),
                            Day: moment($scope.funeral["BurialDate"]).date()
                        };
                    }
                };

                $scope.collapseExpand = function() {

                    if (arguments.length === 0) return null;
                    var elementId = arguments[0] == null ? null : arguments[0];

                    var tab = _.find($scope.Tabs, function(x) { return _.isEqual(x.Name, elementId); });
                    if (_.isUndefined(tab)) return null;
                    tab.Show = !tab.Show;
                };

                $scope.getTabByName = function() {

                    if (arguments.length === 0) return null;
                    var elementId = arguments[0] == null ? null : arguments[0];

                    return _.find($scope.Tabs, function(x) { return _.isEqual(x.Name, elementId); });

                };

                $scope.goToCreateView = function() {

                    appService.NavigateTo("addfuneral");

                };

                $scope.GetLastDayOfMonth = function(year, month) {
                    return fms.Functions.GetMonthLastDay(year, month);
                };

                $scope.OnChange_Year = function(modelName, year) {
                    if (_.isNull(year) || _.isUndefined(year)) {
                        switch (modelName) {
                        case "deceasedDOB":
                            $scope.deceasedDOB["Month"] = $scope.deceasedDOB["Day"] = null;
                            break;
                        case "deceasedDOD":
                            $scope.deceasedDOD["Month"] = deceasedDOD.deceasedDOB["Day"] = null;
                            break;
                        case "funeralBD":
                            $scope.funeralBD["Month"] = $scope.funeralBD["Day"] = null;
                            break;
                        default:
                        }
                    }
                };

                $scope.OnChange_Month = function(modelName, month) {
                    if (_.isNull(month) || _.isUndefined(month)) {
                        switch (modelName) {
                        case "deceasedDOB":
                            $scope.deceasedDOB["Day"] = null;
                            break;
                        case "deceasedDOD":
                            $scope.deceasedDOD["Day"] = null;
                            break;
                        case "funeralBD":
                            $scope.funeralBD["Day"] = null;
                            break;
                        default:
                        }
                    }
                };

                $scope.OnChange_SameAsInformant = function(sameAsInformant) {
                    if (_.isEqual(sameAsInformant, true)) {
                        $scope.nextOfKin = $scope.informant;
                    } else {
                        $scope.nextOfKin = null;
                    }
                };

                $scope.OnChange_SAIdNumber = function(entityName, saIdNumber) {
                    var data = fms.Functions.ExtractFromIdNunmber(saIdNumber);
                    switch (entityName) {
                    case fms.Entity.Deceased.EntityName.toLowerCase():
                        $scope.deceasedDOB["Year"] = moment(data.birthdate).year();
                        $scope.deceasedDOB["Month"] = 1 + moment(data.birthdate).month();
                        $scope.deceasedDOB["Day"] = moment(data.birthdate).date();
                        break;
                    case fms.Entity.Informant.EntityName.toLowerCase():
                        $scope.informantDOB["Year"] = moment(data.birthdate).year();
                        $scope.informantDOB["Month"] = moment(data.birthdate).month();
                        $scope.informantDOB["Day"] = moment(data.birthdate).date();
                        break;
                    case fms.Entity.NextOfKin.EntityName.toLowerCase():
                        $scope.nextOfKinDOB["Year"] = moment(data.birthdate).year();
                        $scope.nextOfKinDOB["Month"] = moment(data.birthdate).month();
                        $scope.nextOfKinDOB["Day"] = moment(data.birthdate).date();
                        break;
                    default:
                    }
                    $scope.deceased["GenderId"] = data.gender === "male" ? 1 : 2;
                };

                /*---Doctor Lookup - START*/
                $scope.setSelectedDoctor = function(selectedRecord) {
                    $scope.doctor = selectedRecord;
                    $scope.funeral["DoctorId"] = selectedRecord["Id"];
                };
                $scope.getDoctors = function() {
                    fms.Routes.SetListLookup(
                        $uibModal,
                        "/components/doctor/modal/modal-list-doctor.html",
                        "ModalListDoctorController",
                        {
                            records: [
                                "appService", function(appService) {
                                    return appService.GetData(fms.Entity.Doctor.Urls.GetActiveDoctors,
                                        { pageNumber: 1, listType: 2 });
                                }
                            ]
                        },
                        $scope.setSelectedDoctor
                    );
                };
                $scope.getDoctor = function(doctorId) {
                    fms.Routes.SetEntityViewLookup(
                        $uibModal,
                        "/components/doctor/modal/modal-view-doctor.html",
                        "ModalEditDoctorController",
                        {
                            record: [
                                "appService", function(appService) {
                                    return appService.GetData(fms.Entity.Doctor.Urls.GetDoctorById,
                                        { doctorId: doctorId });
                                }
                            ]
                        }
                    );
                };
                /*---Doctor Lookup - END*/

                /*---Home Affairs Officer Lookup - START*/
                $scope.setSelectedHomeAffairsOfficer = function(selectedRecord) {
                    $scope.homeAffairsOfficer = selectedRecord;
                    $scope.funeral["HomeAffairsOfficerId"] = selectedRecord["Id"];
                };
                $scope.getHomeAffairsOfficers = function() {
                    fms.Routes.SetListLookup(
                        $uibModal,
                        "/components/homeaffairsofficer/modal/modal-list-homeaffairsofficer.html",
                        "ModalListHomeAffairsOfficerController",
                        {
                            records: [
                                "appService", function(appService) {
                                    return appService.GetData(fms.Entity.HomeAffairsOfficer.Urls
                                        .GetActiveHomeAffairsOfficers,
                                        { pageNumber: 1, listType: 2 });
                                }
                            ]
                        },
                        $scope.setSelectedHomeAffairsOfficer
                    );
                };
                $scope.getHomeAffairsOfficer = function(homeAffairsOfficerId) {
                    fms.Routes.SetEntityViewLookup(
                        $uibModal,
                        "/components/homeaffairsofficer/modal/modal-view-homeaffairsofficer.html",
                        "ModalEditHomeAffairsOfficerController",
                        {
                            record: [
                                "appService", function(appService) {
                                    return appService.GetData(
                                        fms.Entity.HomeAffairsOfficer.Urls.GetHomeAffairsOfficerById,
                                        { homeAffairsOfficerId: homeAffairsOfficerId });
                                }
                            ]
                        }
                    );
                };
                /*---Doctor Lookup - END*/

                /*---Cemetery Lookup - START*/
                $scope.setSelectedCemetery = function(selectedRecord) {
                    $scope.cemetery = selectedRecord;
                    $scope.funeral["CemeteryId"] = selectedRecord["Id"];
                };
                $scope.getCemeteries = function() {
                    fms.Routes.SetListLookup(
                        $uibModal,
                        "/components/cemetery/modal/modal-list-cemetery.html",
                        "ModalListCemeteryController",
                        {
                            records: [
                                "appService", function(appService) {
                                    return appService.GetData(fms.Entity.Cemetery.Urls.GetActiveCemeteries,
                                        { pageNumber: 1, listType: 2 });
                                }
                            ]
                        },
                        $scope.setSelectedCemetery
                    );
                };
                $scope.getCemetery = function(cemeteryId) {
                    fms.Routes.SetEntityViewLookup(
                        $uibModal,
                        "/components/cemetery/modal/modal-view-cemetery.html",
                        "ModalEditCemteryController",
                        {
                            record: [
                                "appService", function(appService) {
                                    return appService.GetData(fms.Entity.Cemetery.Urls.GetCemeteryById,
                                        { cemeteryId: cemeteryId });
                                }
                            ]
                        }
                    );
                };
                /*---Cemetery Lookup - END*/

                /*---Mortuary Lookup - START*/
                $scope.setSelectedMortuary = function(selectedRecord) {
                    $scope.mortuary = selectedRecord;
                    $scope.funeral["MortuaryId"] = selectedRecord["Id"];
                };
                $scope.getMortuaries = function() {
                    fms.Routes.SetListLookup(
                        $uibModal,
                        "/components/mortuary/modal/modal-list-mortuary.html",
                        "ModalListMortuaryController",
                        {
                            records: [
                                "appService", function(appService) {
                                    return appService.GetData(fms.Entity.Mortuary.Urls.GetActiveMortuaries,
                                        { pageNumber: 1, listType: 2 });
                                }
                            ]
                        },
                        $scope.setSelectedMortuary
                    );
                };
                $scope.getMortuary = function(mortuaryId) {
                    fms.Routes.SetEntityViewLookup(
                        $uibModal,
                        "/components/mortuary/modal/modal-view-mortuary.html",
                        "ModalEditMortuaryController",
                        {
                            record: [
                                "appService", function(appService) {
                                    return appService.GetData(fms.Entity.Mortuary.Urls.GetMortuaryById,
                                        { mortuaryId: mortuaryId });
                                }
                            ]
                        }
                    );
                };
                /*---Mortuary Lookup - END*/

                /*---Supplier Lookup - START*/
                $scope.setSelectedSupplier = function() {
                    if (arguments.length === 0) return false;
                    var selectedRecord = arguments[0] == null ? null : arguments[0];
                    $scope.supplier = selectedRecord;
                    $scope.newFuneralBoughtItem["SupplierId"] = selectedRecord["Id"];
                    return true;
                };
                $scope.getSuppliers = function() {
                    fms.Routes.SetListLookup(
                        $uibModal,
                        "/components/supplier/modal/modal-list-supplier.html",
                        "ModalListSupplierController",
                        {
                            records: [
                                "appService", function(appService) {
                                    return appService.GetData(fms.Entity.Supplier.Urls.GetActiveSuppliers,
                                        { pageNumber: 1, listType: 2 });
                                }
                            ]
                        },
                        $scope.setSelectedSupplier
                    );
                };
                $scope.getSupplier = function(supplierId) {
                    fms.Routes.SetEntityViewLookup(
                        $uibModal,
                        "/components/supplier/modal/modal-view-supplier.html",
                        "ModalEditSupplierController",
                        {
                            record: [
                                "appService", function(appService) {
                                    return appService.GetData(fms.Entity.Supplier.Urls.GetSupplierById,
                                        { supplierId: supplierId });
                                }
                            ]
                        }
                    );
                };
                /*---Supplier Lookup - END*/

                $scope.getTotalOfPurchaseItems = function() {
                    return _.sumBy($scope.funeralBoughtItems, function(x) { return (x.Amount * x.Quantity); });
                }

                $scope.clearLookupInput = function() {

                    if (arguments.length === 0) return null;
                    var entityName = arguments[0] == null ? null : arguments[0];
                    switch (entityName) {
                    case "mortuary":
                        $scope.funeral["MortuaryName"] = null;
                        $scope.funeral["MortuaryId"] = null;
                        break;
                    case "cemetery":
                        $scope.funeral["CemeteryName"] = null;
                        $scope.funeral["CemeteryId"] = null;
                        break;
                    case "doctor":
                        $scope.doctor = null;
                        $scope.funeral["DoctorId"] = null;
                        break;
                    case "homeAffairsOfficer":
                        $scope.homeAffairsOfficer = null;
                        $scope.funeral["HomeAffairsOfficerId"] = null;
                        break;
                    case "newFuneralBoughtItem.supplier":
                        $scope.newFuneralBoughtItem["SupplierId"] = null;
                        $scope.newFuneralBoughtItem["SupplierName"] = null;
                        break;
                    default:
                    }

                };

                $scope.selectFuneralBoughtItemRecord = function() {

                    if (arguments.length === 0) return null;
                    var _record = arguments[0] == null ? null : arguments[0];

                    if (_record.Selected) {
                        //add id in array
                        $scope.selectedFuneralBoughtItemIds.push(_record.Id);
                    } else {
                        //remove id from array
                        var evens = _.remove($scope.selectedFuneralBoughtItemIds,
                            function(x) {
                                return _.isEqual(x, _record.Id);
                            });
                    }

                };
                $scope.addFuneralBoughtItem = function() {

                    $scope.newFuneralBoughtItem["FuneralId"] = $scope.funeral.Id;
                    var keyValueFuneralBoughtItem = fms.Functions.SplitObjectIntoArray($scope.newFuneralBoughtItem);
                    appService.PostForm("/FuneralBoughtItem/AddFuneralBoughtItem",
                            { funeralBoughtItem: keyValueFuneralBoughtItem })
                        .then(function successCallback(response) {
                                if (response.data.state !== "success") {
                                    fms.Notifications.Toastr.CreateErrorNotification(
                                        "Something wrong happen while adding items!");
                                    return;
                                }
                                fms.Notifications.Toastr.UpdateSuccessNotification(
                                    "Items has been successfully added!");
                                appService.RefreshCurrentState();
                            },
                            function errorCallback(response) {
                            });

                };
                $scope.disableAddFuneralBoughtItemButton = function() {

                    return ((_.isNull($scope.newFuneralBoughtItem.Name) ||
                            _.isUndefined($scope.newFuneralBoughtItem.Name)) ||
                        (_.isNull($scope.newFuneralBoughtItem.Quantity) ||
                            _.isUndefined($scope.newFuneralBoughtItem.Quantity)) ||
                        (_.isNull($scope.newFuneralBoughtItem.Amount) ||
                            _.isUndefined($scope.newFuneralBoughtItem.Amount)));

                };
                $scope.disableDeleteFuneralBoughtItemButton = function() {

                    return $scope.selectedFuneralBoughtItemIds.length == 0;

                };
                $scope.disableEditFuneralBoughtItemButton = function() {
                    return $scope.selectedFuneralBoughtItemIds.length !== 1;
                };

                $scope.OnChange_FileInput = function(e) {
                    if (e.files.length === 0) {
                        $scope.newFuneralDocument = null;
                        return;
                    }
                    $scope.newFuneralDocument = e.files[0];
                };
                $scope.ClearFileInput = function(inputId) {
                    $("#funeralDocument").replaceWith($("#funeralDocument").val("").clone(true));
                };
                $scope.uploadFuneralDocument = function() {
                    appService.UploadFile(
                            "FuneralDocument/AddFuneralDocument",
                            $scope.newFuneralDocument,
                            {
                                documentTypeId: $scope.newFuneralDocument["DocumentTypeId"],
                                description: $scope.newFuneralDocument["Description"] == undefined
                                    ? null
                                    : $scope.newFuneralDocument["Description"],
                                funeralId: $scope.funeral["Id"]
                            },
                            "document")
                        .then(function(response) {
                                if (response.data.state !== "success") {
                                    fms.Notifications.Toastr.CreateErrorNotification(
                                        "Something wrong happen while adding the document!");
                                    return;
                                }
                                fms.Notifications.Toastr.UpdateSuccessNotification(
                                    "Document has been successfully added!");
                                appService.RefreshCurrentState();
                            },
                            function(response) {
                            });
                };

                $scope.GenerateConfirmationLetter = function() {
                    $window.open("/Report/GetConfirmationReport?funeralId=" + $scope.funeral["Id"], "_blank");
                };

                $scope.GenerateInvoice = function() {
                    $window.open("/Report/GetInvoiceReport?funeralId=" + $scope.funeral["Id"], "_blank");
                };

                $scope.Delete = function() {
                    fms.Routes.ConfirmationLookup($uibModal, $scope.DeactivateFuneral);
                };

                $scope.DeactivateFuneral = function() {
                    appService.GetData(fms.Entity.Funeral.Urls.DeactivateFuneral,
                            {
                                funeralId: $scope.funeral["Id"]
                            })
                        .then(function(response) {
                                appService.NavigateTo("funeral-list");
                            },
                            function(response) {
                            });
                };

                $scope.processForm = function(form) {
                    $scope.formHasBeenSubmitted = true;
                    if (!_.isNull($scope.deceasedDOB["Year"]) &&
                        !_.isNull($scope.deceasedDOB["Month"]) &&
                        !_.isNull($scope.deceasedDOB["Day"])) {
                        $scope.deceased["DateOfBirth"] = $scope.deceasedDOB["Year"] +
                            "/" +
                            $scope.deceasedDOB["Month"] +
                            "/" +
                            $scope.deceasedDOB["Day"];
                    }
                    if (!_.isNull($scope.deceasedDOD["Year"]) &&
                        !_.isNull($scope.deceasedDOD["Month"]) &&
                        !_.isNull($scope.deceasedDOD["Day"])) {
                        $scope.deceased["DateOfDeath"] = $scope.deceasedDOD["Year"] +
                            "/" +
                            $scope.deceasedDOD["Month"] +
                            "/" +
                            $scope.deceasedDOD["Day"];
                    }
                    if (!_.isNull($scope.funeralBD["Year"]) &&
                        !_.isNull($scope.funeralBD["Month"]) &&
                        !_.isNull($scope.funeralBD["Day"])) {
                        $scope.funeral["BurialDate"] = $scope.funeralBD["Year"] +
                            "/" +
                            $scope.funeralBD["Month"] +
                            "/" +
                            $scope.funeralBD["Day"];
                    }
                    if (!form.$valid) {
                        return;
                    }
                    var keyValuesDeceased = fms.Functions.SplitObjectIntoArray($scope.deceased);
                    var keyValuesInformant = fms.Functions.SplitObjectIntoArray($scope.informant);
                    var keyValuesNextOfKin = fms.Functions.SplitObjectIntoArray($scope.nextOfKin);
                    var keyValuesDoctor = fms.Functions.SplitObjectIntoArray($scope.doctor);
                    var keyValuesHomeAffairsOfficer = fms.Functions.SplitObjectIntoArray($scope.homeAffairsOfficer);
                    var keyValuesFuneral = fms.Functions.SplitObjectIntoArray($scope.funeral);
                    appService.PostForm("/Funeral/UpdateFuneral",
                        {
                            deceased: keyValuesDeceased,
                            informant: keyValuesInformant,
                            nextOfKin: keyValuesNextOfKin,
                            doctor: keyValuesDoctor,
                            homeAffairsOfficer: keyValuesHomeAffairsOfficer,
                            funeral: keyValuesFuneral
                        }).then(function successCallback(response) {
                            if (response.data.state !== "success") {
                                fms.Notifications.Toastr.UpdateErrorNotification();
                                return;
                            }
                            fms.Notifications.Toastr.UpdateSuccessNotification();
                            appService.RefreshCurrentState();
                        },
                        function errorCallback(response) {
                        });
                };

                this.init();

            }
        ]);