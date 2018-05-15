angular.module("fmsApp")
    .controller("ListFuneralController",
    [
        "$rootScope", "$scope", "appService",
        function ($rootScope, $scope, appService) {

            $scope.account = {};

        }
    ])
    .controller("AddFuneralController",
    [
        "$rootScope", "$scope", "$uibModal", "appService", 
        function ($rootScope, $scope, $uibModal, appService) {

            $scope.funeral = {};
            $scope.deceased = {};
            $scope.informant = {};
            $scope.nextOfKin = {};
            $scope.doctor = {};
            $scope.homeAffairesOfficer = {};

            //$scope.getHospitals = function (val) {
            //    appService.GetData("Hospital/GetHospitalsByName", { searchText: val })
            //        .then(function successCallback(response) {

            //            return response.data.map(function (item) {
            //                return item.Name;
            //            });

            //        }, function errorCallback(response) {
            //        });

            //};

            $scope.getHospitals = function () {

                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: "modal-title",
                    ariaDescribedBy: "modal-body",
                    templateUrl: "/components/hospital/modal/modal-list-hospital.html",
                    controller: "ListHospitalController",
                    size: "lg",
                    resolve: {
                        records: [
                            "appService", function (appService) {
                                return appService.GetData("/Hospital/GetHospitals");
                            }
                        ]
                    }
                });

                modalInstance.result.then(function (selectedRecord) {
                    $scope.vehicle["VehicleDriverName"] = selectedRecord.Name;
                    $scope.vehicle["VehicleDriverId"] = selectedRecord.Id;
                });

            };

            $scope.addNewHospital = function () {

                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: "modal-title",
                    ariaDescribedBy: "modal-body",
                    templateUrl: "/components/hospital/modal-add-hospital.html",
                    controller: "AddHospitalController",
                    size: "lg",
                });

                modalInstance.result.then(function (selectedRecord) {
                    $scope.vehicle["VehicleDriverName"] = selectedRecord.Name;
                    $scope.vehicle["VehicleDriverId"] = selectedRecord.Id;
                });

            };

        }
    ]);