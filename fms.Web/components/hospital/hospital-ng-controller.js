angular.module("fmsApp")
    .controller("ListHospitalController",
    [
        "$rootScope", "$scope", "$uibModal", "$uibModalInstance", "appService", "records",
        function ($rootScope, $scope, $uibModal, $uibModalInstance, appService, records) {

            $scope.records = records.data;

            $scope.addNewHospital = function () {

                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: "modal-title",
                    ariaDescribedBy: "modal-body",
                    templateUrl: "/components/hospital/modal/modal-add-hospital.html",
                    controller: "AddHospitalController",
                    size: "lg",
                });

                modalInstance.result.then(function (selectedRecord) {
                    $scope.vehicle["VehicleDriverName"] = selectedRecord.Name;
                    $scope.vehicle["VehicleDriverId"] = selectedRecord.Id;
                });

            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss("cancel");
            };

        }
    ])
    .controller("AddHospitalController",
    [
        "$rootScope", "$scope", "$uibModalInstance", "appService",
        function ($rootScope, $scope, $uibModalInstance, appService) {

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
                appService.PostForm("/Hospital/AddHospital", { hospital: $scope.hospital })
                    .then(function successCallback(response) {

                        $uibModalInstance.close(response.data.hospital);

                    }, function errorCallback(response) {
                    });
            };

        }
    ]);