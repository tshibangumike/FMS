angular.module("fmsApp")
    .controller("ListDoctorController",
    [
        "$rootScope", "$scope", "appService", "doctors",
        function ($rootScope, $scope, appService, doctors) {

            $scope.records = doctors.data;
            $scope.selectedRecords = [];

            $scope.selectRecord = function () {
                if (_.isEqual(arguments.length, 0)) return null;
                var record = _.isNull(arguments[0], 0) ? null : arguments[0];
                if (_.isNull(arguments[0])) return null;
                if (record.Selected) {
                    //add id in array
                    $scope.selectedRecords.push(record);
                }
                else {
                    //remove id from array
                    _.remove($scope.selectedRecords, function (x) {
                        return _.isEqual(x.Id, record.Id);
                    });
                }
            };

            $scope.addNewDoctor = function () {

                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: "modal-title",
                    ariaDescribedBy: "modal-body",
                    templateUrl: "/components/doctor/modal/modal-add-doctor.html",
                    controller: "ModalAddDoctorController",
                    size: "lg",
                    backdrop: false,
                });

                modalInstance.result.then(function (selectedRecord) {
                    $scope.selectedRecords.push(selectedRecord);
                    if (!_.isEqual($scope.selectedRecords.length, 1)) return;
                    $uibModalInstance.close($scope.selectedRecords[0]);
                });

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
        "$scope", "$uibModal", "$uibModalInstance", "appService", "doctor",
        function ($scope, $uibModal, $uibModalInstance, appService, doctor) {

            $scope.formHasBeenSubmitted = true;
            $scope.doctor = doctor.data;

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
    .controller("ModalListDoctorController",
    [
        "$scope", "appService", "$uibModal", "$uibModalInstance", "records",
        function ($scope, appService, $uibModal, $uibModalInstance, records) {

            $scope.records = records.data;
            $scope.selectedRecords = [];

            $scope.selectRecord = function () {
                if (_.isEqual(arguments.length, 0)) return null;
                var _record = _.isNull(arguments[0], 0) ? null : arguments[0];
                if (_.isNull(arguments[0])) return null;
                fms.Functions.AddToOrRemoveFromArray($scope.selectedRecords, _record);
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
                    appService,
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
                    appService,
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

            $scope.processForm = function () {
                if (arguments.length === 0) return null;
                var form = arguments[0] == null ? null : arguments[0];
                $scope.formHasBeenSubmitted = true;
                if (!form.$valid) {
                    return null;
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
        "$scope", "$uibModal", "$uibModalInstance", "appService", "doctor",
        function ($scope, $uibModal, $uibModalInstance, appService, doctor) {

            $scope.formHasBeenSubmitted = true;
            $scope.doctor = doctor.data;

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