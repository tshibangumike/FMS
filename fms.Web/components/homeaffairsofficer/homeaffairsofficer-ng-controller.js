angular.module("fmsApp")
    .controller("ListHomeAffairsOfficerController",
        [
            "$rootScope", "$scope", "appService", "homeAffairsOfficers",
            function($rootScope, $scope, appService, homeAffairsOfficers) {

                $scope.records = homeAffairsOfficers.data;
                $scope.selectedRecords = [];
                $scope.pageNumber = 1;
                $scope.listType = 1;
                $scope.totalPageNumber = 0;

                this.init = function() {
                    if ($scope.records.length > 0) {
                        $scope.totalPageNumber = $scope.records[0]["TotalPageNumber"];
                    }
                };

                $scope.selectRecord = function(record) {
                    fms.Functions.AddToOrRemoveFromArrayAnItemBasedOnId($scope.selectedRecords, record);
                };

                $scope.toggleSelection = function(record) {
                    record.Selected = !record.Selected;
                };

                $scope.edit = function(record) {
                    if (_.isNull(record) || _.isUndefined(record)) {
                        var selectedRecords = _.filter($scope.records, function (x) { return x.Selected; });
                        if (_.isNull(selectedRecords) ||
                            _.isNull(selectedRecords) ||
                            selectedRecords.length === 0) return;
                        appService.NavigateTo("edithomeaffairsofficer", { homeaffairsofficerid: selectedRecords[0]["Id"] });
                    } else
                        appService.NavigateTo("edithomeaffairsofficer", { homeaffairsofficerid: record["Id"] });
                };

                $scope.getHomeAffairOfficers = function(pageNumber, listType) {
                    appService.GetData(
                            fms.Entity.HomeAffairsOfficer.Urls.GetActiveHomeAffairsOfficers,
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

                $scope.startFromBegining = function() {
                    $scope.pageNumber = 1;
                    $scope.getHomeAffairOfficers($scope.pageNumber, $scope.listType);
                };

                $scope.next = function() {
                    $scope.pageNumber++;
                    if ($scope.pageNumber > $scope.totalPageNumber) {
                        $scope.pageNumber--;
                        return;
                    }
                    $scope.getHomeAffairOfficers($scope.pageNumber, $scope.listType);
                };

                $scope.previous = function() {
                    $scope.pageNumber--;
                    if ($scope.pageNumber <= 0) {
                        $scope.pageNumber++;
                        return;
                    }
                    $scope.getHomeAffairOfficers($scope.pageNumber, $scope.listType);
                };

                this.init();
            }
        ])
    .controller("AddHomeAffairsOfficerController",
        [
            "$rootScope", "$scope", "$uibModalInstance", "appService",
            function($rootScope, $scope, $uibModalInstance, appService) {

                $scope.formHasBeenSubmitted = true;
                $scope.homeAffairsOfficer = {};

                $scope.cancel = function() {
                    $uibModalInstance.dismiss("cancel");
                };

                $scope.cancel = function() {
                    $uibModalInstance.dismiss("cancel");
                };

                $scope.processForm = function() {
                    $uibModalInstance.close($scope.homeAffairsOfficer);
                };

            }
        ])
    .controller("EditHomeAffairsOfficerController",
        [
            "$scope", "appService", "$uibModal", "record",
            function($scope, appService, $uibModal, record) {

                $scope.record = record.data;
                $scope.formHasBeenSubmitted = false;
                $scope.recordDOB = { Year: null, Month: null, Day: null };
                $scope.Tabs = [
                    { Name: "Person", Show: true },
                    { Name: "HomeAffairsOfficer", Show: true }
                ];

                this.init = function() {
                    if (!_.isNull($scope.record["DateOfBirth"])) {
                        $scope.recordDOB = {
                            Year: moment($scope.record["DateOfBirth"]).year(),
                            Month: (1 + moment($scope.record["DateOfBirth"]).month()),
                            Day: moment($scope.record["DateOfBirth"]).date()
                        };
                    }
                };

                $scope.clearLookupInput = function(entityName) {
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
                    case "homeAffairsOffice":
                        $scope.record["HomeAffairsOfficeId"] = null;
                        $scope.record["HomeAffairsOfficeName"] = null;
                        break;
                    case "newFuneralBoughtItem.supplier":
                        $scope.newFuneralBoughtItem["SupplierId"] = null;
                        $scope.newFuneralBoughtItem["SupplierName"] = null;
                        break;
                    case "hospital":
                        $scope.record["HospitalId"] = null;
                        $scope.record["HospitalName"] = null;
                        break;
                    default:
                    }
                };

                $scope.collapseExpand = function(elementId) {
                    var tab = _.find($scope.Tabs, function(x) { return _.isEqual(x.Name, elementId); });
                    if (_.isUndefined(tab)) return null;
                    tab.Show = !tab.Show;
                };

                $scope.getTabByName = function(elementId) {
                    return _.find($scope.Tabs, function(x) { return _.isEqual(x.Name, elementId); });
                };

                $scope.GetLastDayOfMonth = function(year, month) {
                    return fms.Functions.GetMonthLastDay(year, month);
                };

                $scope.OnChange_Year = function(modelName, year) {
                    if (_.isNull(year) || _.isUndefined(year)) {
                        switch (modelName) {
                        case "recordDOB":
                            $scope.recordDOB["Month"] = $scope.recordDOB["Day"] = null;
                            break;
                        case "recordDOD":
                            $scope.recordDOD["Month"] = $scope.recordDOD["Day"] = null;
                            break;
                        case "funeralBD":
                            $scope.recordBD["Month"] = $scope.recordBD["Day"] = null;
                            break;
                        default:
                        }
                    }
                };

                $scope.OnChange_Month = function(modelName, month) {
                    if (_.isNull(month) || _.isUndefined(month)) {
                        switch (modelName) {
                        case "recordDOB":
                            $scope.recordDOB["Day"] = null;
                            break;
                        case "recordDOD":
                            $scope.recordDOD["Day"] = null;
                            break;
                        case "funeralBD":
                            $scope.funeralBD["Day"] = null;
                            break;
                        default:
                        }
                    }
                };

                $scope.OnChange_SAIdNumber = function(entityName, saIdNumber) {
                    var data = fms.Functions.ExtractFromIdNunmber(saIdNumber);
                    $scope.recordDOB["Year"] = moment(data.birthdate).year();
                    $scope.recordDOB["Month"] = 1 + moment(data.birthdate).month();
                    $scope.recordDOB["Day"] = moment(data.birthdate).date();
                    $scope.record["GenderId"] = data.gender === "male" ? 1 : 2;
                };

                $scope.setSelectedHomeAffairsOffice = function(selectedRecord) {
                    $scope.record["HomeAffairsOfficeId"] = selectedRecord["Id"];
                    $scope.record["HomeAffairsOfficeName"] = selectedRecord["Name"];
                };

                $scope.getHomeAffairsOffices = function() {
                    fms.Routes.SetListLookup(
                        $uibModal,
                        "/components/homeaffairsoffice/modal/modal-list-homeaffairsoffice.html",
                        "ModalListHomeAffairsOfficeController",
                        {
                            records: [
                                "appService", function(appService) {
                                    return appService.GetData(
                                        fms.Entity.HomeAffairsOffice.Urls.GetActiveHomeAffairsOffices,
                                        { pageNumber: 1, listType: 2 });
                                }
                            ]
                        },
                        $scope.setSelectedHomeAffairsOffice
                    );
                };

                $scope.getHomeAffairsOffice = function (homeAffairsOfficeId) {
                    fms.Routes.SetEntityViewLookup(
                        $uibModal,
                        "/components/homeaffairsoffice/modal/modal-view-homeaffairsoffice.html",
                        "ModalEditHomeAffairsOfficeController",
                        {
                            record: [
                                "appService", function (appService) {
                                    return appService.GetData(fms.Entity.HomeAffairsOffice.Urls.GetHomeAffairsOfficeById,
                                        { homeAffairsOfficeId: homeAffairsOfficeId });
                                }
                            ]
                        }
                    );
                };

                $scope.DeactivateHomeAffairsOfficer = function () {
                    appService.GetData(fms.Entity.HomeAffairsOfficer.Urls.DeactivateHomeAffairsOfficer,
                            {
                                homeAffairsOfficeId: $scope.record["Id"]
                            })
                        .then(function (response) {
                                appService.NavigateTo("homeaffairsofficer-list");
                            },
                            function (response) {
                            });
                };

                $scope.Delete = function () {
                    fms.Routes.ConfirmationLookup($uibModal, $scope.DeactivateHomeAffairsOfficer);
                };

                $scope.processForm = function(form) {
                    $scope.formHasBeenSubmitted = true;
                    if (!form.$valid) {
                        return;
                    }
                    var keyValue = fms.Functions.SplitObjectIntoArray($scope.record);
                    appService.PostForm(fms.Entity.HomeAffairsOfficer.Urls.UpdateHomeAffairsOfficer,
                        {
                            homeAffairsOfficer: keyValue
                        }).then(function(response) {
                            if (response.data.state !== "success") {
                                fms.Notifications.Toastr.UpdateErrorNotification();
                            }
                            fms.Notifications.Toastr.UpdateSuccessNotification();
                            return appService.RefreshCurrentState();
                        },
                        function() {
                            fms.Notifications.Toastr.UpdateErrorNotification();
                        });
                    return;
                };

                this.init();

            }
        ])
    .controller("ModalListHomeAffairsOfficerController",
        [
            "$rootScope", "$scope", "appService", "$uibModal", "$uibModalInstance", "records",
            function($rootScope, $scope, appService, $uibModal, $uibModalInstance, records) {

                $scope.records = records.data;
                $scope.selectedRecords = [];

                $scope.selectRecord = function(record) {
                    fms.Functions.AddToOrRemoveFromArrayAnItemBasedOnId($scope.selectedRecords, record);
                };

                $scope.addNewHomeAffairsOfficer = function() {
                    fms.Routes.SetAddLookup(
                        $uibModal,
                        "/components/homeaffairsofficer/modal/modal-add-homeaffairsofficer.html",
                        "ModalAddHomeAffairsOfficerController",
                        $scope.getActiveHomeAffairsOfficers
                    );
                };

                $scope.getActiveHomeAffairsOfficers = function() {
                    appService.GetData(fms.Entity.HomeAffairsOfficer.Urls.GetActiveHomeAffairsOfficers,
                            { pageNumber: 1, listType: 2 })
                        .then(function(response) {
                                $scope.records = response.data;
                            },
                            function(response) {
                            });
                };

                $scope.save = function() {
                    if (!_.isEqual($scope.selectedRecords.length, 1)) return;
                    $uibModalInstance.close($scope.selectedRecords[0]);
                };

                $scope.cancel = function() {
                    $uibModalInstance.dismiss("cancel");
                };

            }
        ])
    .controller("ModalAddHomeAffairsOfficerController",
        [
            "$scope", "$uibModal", "$uibModalInstance", "appService",
            function($scope, $uibModal, $uibModalInstance, appService) {

                $scope.formHasBeenSubmitted = false;
                $scope.homeAffairsOfficer = {};

                $scope.setSelectedHomeAffairsOffice = function(selectedRecord) {
                    $scope.homeAffairsOfficer["HomeAffairsOfficeId"] = selectedRecord["Id"];
                    $scope.homeAffairsOfficer["HomeAffairsOfficeName"] = selectedRecord["Name"];
                };
                $scope.getHomeAffairsOffices = function() {
                    fms.Routes.SetListLookup(
                        $uibModal,
                        "/components/homeaffairsoffice/modal/modal-list-homeaffairsoffice.html",
                        "ModalListHomeAffairsOfficeController",
                        {
                            records: [
                                "appService", function(appService) {
                                    return appService.GetData(
                                        fms.Entity.HomeAffairsOffice.Urls.GetActiveHomeAffairsOffices,
                                        { pageNumber: 1, listType: 2 });
                                }
                            ]
                        },
                        $scope.setSelectedHomeAffairsOffice
                    );
                };

                $scope.cancel = function() {
                    $uibModalInstance.dismiss("cancel");
                };

                $scope.processForm = function(form) {
                    $scope.formHasBeenSubmitted = true;
                    if (!form.$valid) {
                        return null;
                    }
                    var keyValuesHomeAffairsOfficer = fms.Functions.SplitObjectIntoArray($scope.homeAffairsOfficer);
                    appService.PostForm(fms.Entity.HomeAffairsOfficer.Urls.AddHomeAffairsOfficer,
                            { homeAffairsOfficer: keyValuesHomeAffairsOfficer })
                        .then(function(response) {
                                $uibModalInstance.close();
                            },
                            function(response) {
                            });
                };

            }
        ])
    .controller("ModalEditHomeAffairsOfficerController",
        [
            "$scope", "$uibModal", "$uibModalInstance", "appService", "record",
            function($scope, $uibModal, $uibModalInstance, appService, record) {

                $scope.formHasBeenSubmitted = true;
                $scope.record = record.data;

                $scope.getHospitals = function() {

                    var modalInstance = $uibModal.open({
                        animation: true,
                        ariaLabelledBy: "modal-title",
                        ariaDescribedBy: "modal-body",
                        templateUrl: "/components/hospital/modal/modal-list-hospital.html",
                        controller: "ListHospitalController",
                        size: "lg",
                        backdrop: false,
                        resolve: {
                            records: [
                                "appService", function(appService) {
                                    return appService.GetData("/Hospital/GetActiveHospitals");
                                }
                            ]
                        }
                    });

                    modalInstance.result.then(function(selectedRecord) {
                        $scope.doctor["HospitalName"] = selectedRecord.Name;
                        $scope.doctor["HospitalId"] = selectedRecord.Id;
                    });

                };

                $scope.cancel = function() {
                    $uibModalInstance.dismiss();
                };

                $scope.save = function() {
                    $uibModalInstance.close($scope.doctor);
                };
            }
        ]);