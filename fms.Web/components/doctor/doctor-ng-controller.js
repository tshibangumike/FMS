angular.module("fmsApp")
    .controller("ListDoctorController",
    [
        "$rootScope", "$scope", "appService", "doctors",
        function ($rootScope, $scope, appService, doctors) {

            $scope.records = doctors.data;
            $scope.selectedRecords = [];

            $scope.selectRecord = function (record) {
                fms.Functions.AddToOrRemoveFromArrayAnItemBasedOnId($scope.selectedRecords, record);
            };

            $scope.toggleSelection = function (record) {
                record.Selected = !record.Selected;
            };

            $scope.edit = function (record) {
                if (_.isNull(record))
                    appService.NavigateTo("editdoctor", { doctorid: $scope.selectedRecordIds[0] });
                else
                    appService.NavigateTo("editdoctor", { doctorid: record["Id"] });

            };

        }
    ])
    .controller("AddDoctorController",
    [
        "$rootScope", "$scope", "$uibModal", "$uibModalInstance", "appService",
        function ($rootScope, $scope, $uibModal, $uibModalInstance, appService) {

            $scope.formHasBeenSubmitted = true;
            $scope.doctor = {};

            $scope.getHospitals = function () {

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
                            "appService", function (appService) {
                                return appService.GetData("/Hospital/GetActiveHospitals");
                            }
                        ]
                    }
                });

                modalInstance.result.then(function (selectedRecord) {
                    $scope.doctor["HospitalName"] = selectedRecord.Name;
                    $scope.doctor["HospitalId"] = selectedRecord.Id;
                });

            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss("cancel");
            };

            $scope.save = function () {
                $uibModalInstance.close($scope.doctor);
            };
        }
    ])
    .controller("EditDoctorController",
    [
        "$scope", "$uibModal", "appService", "record",
        function ($scope, $uibModal, appService, record) {

            $scope.formHasBeenSubmitted = true;
            $scope.record = record.data;

            $scope.setSelectedHospital = function (selectedRecord) {
                $scope.hospital = selectedRecord;
                $scope.doctor["HospitalId"] = selectedRecord["Id"];
            };
            $scope.getHospitals = function () {
                fms.Routes.SetListLookup(
                    $uibModal,
                    "/components/hospital/modal/modal-list-hospital.html",
                    "ModalListHospitalController",
                    {
                        records: [
                            "appService", function (appService) {
                                return appService.GetData(fms.Entity.Hospital.Urls.GetActiveHospitals);
                            }
                        ]
                    },
                    $scope.setSelectedHospital
                );
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss("cancel");
            };

            $scope.save = function () {
                $uibModalInstance.close($scope.doctor);
            };
        }
    ])
    .controller("ModalListDoctorController",
    [
        "$scope", "appService", "$uibModal", "$uibModalInstance", "records",
        function ($scope, appService, $uibModal, $uibModalInstance, records) {

            $scope.records = records.data;
            $scope.selectedRecords = [];

            $scope.selectRecord = function (record) {
                fms.Functions.AddToOrRemoveFromArrayAnItemBasedOnId($scope.selectedRecords, record);
            };

            $scope.getActiveDoctors = function () {

                appService.GetData(fms.Entity.Doctor.Urls.GetActiveDoctors)
                    .then(function successCallback(response) {

                        $scope.records = response.data;

                    }, function errorCallback(response) {
                    });

            };

            $scope.addNewDoctor = function () {
                fms.Routes.SetAddLookup(
                    $uibModal,
                    "/components/doctor/modal/modal-add-doctor.html",
                    "ModalAddDoctorController",
                    $scope.getActiveDoctors
                );
            };

            $scope.save = function () {
                if (!_.isEqual($scope.selectedRecords.length, 1)) return;
                $uibModalInstance.close($scope.selectedRecords[0]);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss("cancel");
            };

        }
    ])
    .controller("ModalAddDoctorController",
    [
        "$scope", "$uibModal", "$uibModalInstance", "appService",
        function ($scope, $uibModal, $uibModalInstance, appService) {

            $scope.formHasBeenSubmitted = false;
            $scope.doctor = {};

            $scope.setSelectedHospital = function() {
                if (arguments.length === 0) return false;
                var selectedRecord = arguments[0] == null ? null : arguments[0];
                $scope.doctor["HospitalId"] = selectedRecord["Id"];
                $scope.doctor["HospitalName"] = selectedRecord["Name"];
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
                                return appService.GetData(fms.Entity.Hospital.Urls.GetActiveHospitals);
                            }
                        ]
                    },
                    $scope.setSelectedHospital
                );
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss("cancel");
            };

            $scope.processForm = function (form) {
                $scope.formHasBeenSubmitted = true;
                if (!form.$valid) {
                    return;
                }
                var keyValue = fms.Functions.SplitObjectIntoArray($scope.doctor);
                appService.PostForm(fms.Entity.Doctor.Urls.AddDoctor, { doctor: keyValue })
                    .then(function successCallback(response) {
                        $uibModalInstance.close();
                    }, function errorCallback(response) {
                    });
            };
        }
    ])
    .controller("ModalEditDoctorController",
    [
        "$scope", "$uibModal", "$uibModalInstance", "appService", "record",
        function ($scope, $uibModal, $uibModalInstance, appService, record) {

            $scope.formHasBeenSubmitted = true;
            $scope.doctor = record.data;

            $scope.getHospitals = function () {

                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: "modal-title",
                    ariaDescribedBy: "modal-body",
                    templateUrl: "/components/hospital/modal/modal-list-hospital.html",
                    controller: "ModalListHospitalController",
                    size: "lg",
                    backdrop: false,
                    resolve: {
                        records: [
                            "appService", function (appService) {
                                return appService.GetData("/Hospital/GetActiveHospitals");
                            }
                        ]
                    }
                });

                modalInstance.result.then(function (selectedRecord) {
                    $scope.doctor["HospitalName"] = selectedRecord.Name;
                    $scope.doctor["HospitalId"] = selectedRecord.Id;
                });

            };

            $scope.close = function () {
                $uibModalInstance.dismiss();
            };

            $scope.save = function () {
                $uibModalInstance.close($scope.doctor);
            };

            $scope.processForm = function () {
                if (arguments.length === 0) return null;
                var form = arguments[0] == null ? null : arguments[0];
                if (!form.$valid) {
                    return null;
                }
                var keyValuesDoctor = fms.Functions.SplitObjectIntoArray($scope.doctor);
                appService.PostForm("/Funeral/UpdateFuneral", {
                    deceased: keyValuesDeceased
                    , informant: keyValuesInformant
                    , nextOfKin: keyValuesNextOfKin
                    , doctor: keyValuesDoctor
                    , homeAffairsOfficer: keyValuesHomeAffairsOfficer
                    , funeral: keyValuesFuneral
                }).then(function successCallback(response) {
                    if (response.data.state !== "success") {
                        fms.Notifications.Toastr.UpdateErrorNotification();
                    }
                    fms.Notifications.Toastr.UpdateSuccessNotification();
                    return appService.RefreshCurrentState();
                }, function errorCallback(response) {
                });
                $uibModalInstance.close($scope.doctor);
            }
        }
    ]);