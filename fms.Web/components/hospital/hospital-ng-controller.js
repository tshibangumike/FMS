angular.module("fmsApp")
    .controller("ModalListHospitalController",
    [
        "$rootScope", "$scope", "$uibModal", "$uibModalInstance", "appService", "records",
        function ($rootScope, $scope, $uibModal, $uibModalInstance, appService, records) {

            $scope.records = records.data;
            $scope.selectedRecords = [];

            $scope.selectRecord = function () {
                if (_.isEqual(arguments.length, 0)) return null;
                var _record = _.isNull(arguments[0], 0) ? null : arguments[0];
                if (_.isNull(arguments[0])) return null;
                fms.Functions.AddToOrRemoveFromArrayAnItemBasedOnId($scope.selectedRecords, _record);
            };

            $scope.getActiveHospitals = function () {

                appService.GetData(fms.Entity.Hospital.Urls.GetActiveHospitals)
                    .then(function successCallback(response) {

                        $scope.records = response.data;

                    }, function errorCallback(response) {
                    });

            };

            $scope.addNewHospital = function () {

                fms.Routes.SetAddLookup(
                    $uibModal,
                    appService,
                    "/components/hospital/modal/modal-add-hospital.html",
                    "ModalAddHospitalController",
                    $scope.getActiveHospitals
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
    .controller("ModalAddHospitalController",
    [
        "$rootScope", "$scope", "$uibModalInstance", "appService",
        function ($rootScope, $scope, $uibModalInstance, appService) {

            $scope.formHasBeenSubmitted = false;
            $scope.hospital = {};

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
                var keyValue = fms.Functions.SplitObjectIntoArray($scope.hospital);
                appService.PostForm(fms.Entity.Hospital.Urls.AddHospital, { hospital: keyValue })
                    .then(function successCallback(response) {
                        $uibModalInstance.close();
                    }, function errorCallback(response) {
                    });
            };
        }
    ])
    .controller("EditHospitalController",
    [
        "$rootScope", "$scope", "$uibModalInstance", "appService", "hospital",
        function ($rootScope, $scope, $uibModalInstance, appService, hospital) {

            $scope.formHasBeenSubmitted = true;
            $scope.hospital = {};

            $scope.cancel = function () {
                $uibModalInstance.dismiss("cancel");
            };

            $scope.processForm = function () {
                if (arguments.length === 0) return null;
                var form = arguments[0] == null ? null : arguments[0];
                if (!form.$valid) {
                    return null;
                }
                var keyValuesHospital = fms.Functions.SplitObjectIntoArray($scope.hospital);
                appService.PostForm("/Hospital/AddHospital", { hospital: keyValuesHospital })
                    .then(function successCallback(response) {
                        $uibModalInstance.close(response.data.hospital);
                    }, function errorCallback(response) {
                    });
            };
        }
    ]);