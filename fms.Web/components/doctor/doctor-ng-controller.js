angular.module("fmsApp")
    .controller("ListDoctorController",
        [
            "$rootScope", "$scope", "appService", "doctors",
            function($rootScope, $scope, appService, doctors) {

                $scope.records = doctors.data;
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
                        appService.NavigateTo("editdoctor", { doctorid: selectedRecords[0]["Id"] });
                    } else
                        appService.NavigateTo("editdoctor", { doctorid: record.Id });
                };

                $scope.getDoctors = function(pageNumber, listType) {
                    appService.GetData(
                            fms.Entity.Doctor.Urls.GetActiveDoctors,
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
                    $scope.getDoctors($scope.pageNumber, $scope.listType);
                };

                $scope.next = function() {
                    $scope.pageNumber++;
                    if ($scope.pageNumber > $scope.totalPageNumber) {
                        $scope.pageNumber--;
                        return;
                    }
                    $scope.getDoctors($scope.pageNumber, $scope.listType);
                };

                $scope.previous = function() {
                    $scope.pageNumber--;
                    if ($scope.pageNumber <= 0) {
                        $scope.pageNumber++;
                        return;
                    }
                    $scope.getDoctors($scope.pageNumber, $scope.listType);
                };

                this.init();

            }
        ])
    .controller("AddDoctorController",
        [
            "$rootScope", "$scope", "$uibModal", "$uibModalInstance", "appService",
            function($rootScope, $scope, $uibModal, $uibModalInstance, appService) {

                $scope.formHasBeenSubmitted = true;
                $scope.doctor = {};

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
                    $uibModalInstance.dismiss("cancel");
                };

                $scope.save = function() {
                    $uibModalInstance.close($scope.doctor);
                };
            }
        ])
    .controller("EditDoctorController",
        [
            "$scope", "$uibModal", "appService", "record",
            function($scope, $uibModal, appService, record) {

                $scope.record = record.data;
                $scope.formHasBeenSubmitted = false;
                $scope.recordDOB = { Year: null, Month: null, Day: null };
                $scope.Tabs = [
                    { Name: "Person", Show: true },
                    { Name: "Doctor", Show: true }
                ];

                $scope.clearLookupInput = function () {

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
                    case "hospital":
                            $scope.record["HospitalId"] = null;
                            $scope.record["HospitalName"] = null;
                        break;
                    default:
                    }

                };

                $scope.setSelectedHospital = function (selectedRecord) {
                    $scope.record["HospitalId"] = selectedRecord["Id"];
                    $scope.record["HospitalName"] = selectedRecord["Name"];
                    return true;
                };

                $scope.getHospitals = function () {
                    fms.Routes.SetListLookup(
                        $uibModal,
                        "/components/hospital/modal/modal-list-hospital.html",
                        "ModalListHospitalController",
                        {
                            records: [
                                "appService", function (appService) {
                                    return appService.GetData(fms.Entity.Hospital.Urls.GetActiveHospitals,
                                        { pageNumber: 1, listType: 2 });
                                }
                            ]
                        },
                        $scope.setSelectedHospital
                    );
                };

                $scope.getHospital = function (hospitalId) {
                    fms.Routes.SetEntityViewLookup(
                        $uibModal,
                        "/components/hospital/modal/modal-view-hospital.html",
                        "ModalEditDoctorController",
                        {
                            record: [
                                "appService", function (appService) {
                                    return appService.GetData(fms.Entity.Hospital.Urls.GetHospitalById,
                                        { hospitalId: hospitalId });
                                }
                            ]
                        }
                    );
                };

                $scope.collapseExpand = function(elementId) {
                    var tab = _.find($scope.Tabs, function(x) { return _.isEqual(x.Name, elementId); });
                    if (_.isUndefined(tab)) return null;
                    tab.Show = !tab.Show;
                };

                $scope.getTabByName = function(elementId) {
                    return _.find($scope.Tabs, function(x) { return _.isEqual(x.Name, elementId); });
                };

                $scope.DeactivateDoctor = function () {
                    appService.GetData(fms.Entity.Doctor.Urls.DeactivateDoctor,
                            {
                                doctorId: $scope.record["Id"]
                            })
                        .then(function (response) {
                                appService.NavigateTo("doctor-list");
                            },
                            function (response) {
                            });
                };

                $scope.Delete = function () {
                    fms.Routes.ConfirmationLookup($uibModal, $scope.DeactivateDoctor);
                };

                $scope.processForm = function(form) {
                    $scope.formHasBeenSubmitted = true;
                    if (!form.$valid) {
                        return;
                    }
                    var keyValue = fms.Functions.SplitObjectIntoArray($scope.record);
                    appService.PostForm(fms.Entity.Doctor.Urls.UpdateDoctor,
                        {
                            doctor: keyValue
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
            }
        ])
    .controller("ModalListDoctorController",
        [
            "$scope", "appService", "$uibModal", "$uibModalInstance", "records",
            function($scope, appService, $uibModal, $uibModalInstance, records) {

                $scope.records = records.data;
                $scope.selectedRecords = [];

                $scope.selectRecord = function(record) {
                    fms.Functions.AddToOrRemoveFromArrayAnItemBasedOnId($scope.selectedRecords, record);
                };

                $scope.getActiveDoctors = function() {

                    appService.GetData(fms.Entity.Doctor.Urls.GetActiveDoctors, { pageNumber: 1, listType: 2 })
                        .then(function successCallback(response) {

                                $scope.records = response.data;

                            },
                            function errorCallback(response) {
                            });

                };

                $scope.addNewDoctor = function() {
                    fms.Routes.SetAddLookup(
                        $uibModal,
                        "/components/doctor/modal/modal-add-doctor.html",
                        "ModalAddDoctorController",
                        $scope.getActiveDoctors
                    );
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
    .controller("ModalAddDoctorController",
        [
            "$scope", "$uibModal", "$uibModalInstance", "appService",
            function($scope, $uibModal, $uibModalInstance, appService) {

                $scope.formHasBeenSubmitted = false;
                $scope.doctor = {};

                $scope.setSelectedHospital = function() {
                    if (arguments.length === 0) return false;
                    var selectedRecord = arguments[0] == null ? null : arguments[0];
                    $scope.doctor["HospitalId"] = selectedRecord["Id"];
                    $scope.doctor["HospitalName"] = selectedRecord["Name"];
                    return true;
                };
                $scope.getHospitals = function() {
                    fms.Routes.SetListLookup(
                        $uibModal,
                        "/components/hospital/modal/modal-list-hospital.html",
                        "ModalListHospitalController",
                        {
                            records: [
                                "appService", function(appService) {
                                    return appService.GetData(fms.Entity.Hospital.Urls.GetActiveHospitals,
                                        { pageNumber: 1, listType: 2 });
                                }
                            ]
                        },
                        $scope.setSelectedHospital
                    );
                };

                $scope.cancel = function() {
                    $uibModalInstance.dismiss("cancel");
                };

                $scope.processForm = function(form) {
                    $scope.formHasBeenSubmitted = true;
                    if (!form.$valid) {
                        return;
                    }
                    var keyValue = fms.Functions.SplitObjectIntoArray($scope.doctor);
                    appService.PostForm(fms.Entity.Doctor.Urls.AddDoctor, { doctor: keyValue })
                        .then(function successCallback(response) {
                                $uibModalInstance.close();
                            },
                            function errorCallback(response) {
                            });
                };
            }
        ])
    .controller("ModalEditDoctorController",
        [
            "$scope", "$uibModal", "$uibModalInstance", "appService", "record",
            function($scope, $uibModal, $uibModalInstance, appService, record) {

                $scope.formHasBeenSubmitted = true;
                $scope.record = record.data;

                $scope.clearLookupInput = function (entityName) {
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

                $scope.getHospitals = function () {
                    $scope.getActiveHospitals = function () {

                        appService.GetData(fms.Entity.Hospital.Urls.GetActiveHospitals)
                            .then(function successCallback(response) {

                                $scope.records = response.data;

                            }, function errorCallback(response) {
                            });

                    };
                };

                $scope.close = function() {
                    $uibModalInstance.dismiss();
                };

                $scope.save = function() {
                    $uibModalInstance.close($scope.doctor);
                };

            }
        ]);