angular.module("fmsApp")
    .controller("ListHomeAffairsOfficerController",
    [
        "$rootScope", "$scope", "appService", "homeAffairsOfficers",
        function ($rootScope, $scope, appService, homeAffairsOfficers) {

            $scope.records = homeAffairsOfficers.data;
            $scope.selectedRecords = [];

            $scope.selectRecord = function () {
                if (_.isEqual(arguments.length, 0)) return null;
                var _record = _.isNull(arguments[0], 0) ? null : arguments[0];
                if (_.isNull(arguments[0])) return null;
                if (_record.Selected) {
                    //add id in array
                    $scope.selectedRecords.push(_record);
                }
                else {
                    //remove id from array
                    _.remove($scope.selectedRecords, function (x) {
                        return _.isEqual(x.Id, _record.Id);
                    });
                }
            };

            $scope.addNewHomeAffairsOfficer = function () {

                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: "modal-title",
                    ariaDescribedBy: "modal-body",
                    templateUrl: "/components/homeaffairsofficer/modal/modal-add-homeaffairsofficer.html",
                    controller: "AddHomeAffairsOfficerController",
                    size: "lg",
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
    .controller("AddHomeAffairsOfficerController",
    [
        "$rootScope", "$scope", "$uibModalInstance", "appService",
        function ($rootScope, $scope, $uibModalInstance, appService) {

            $scope.formHasBeenSubmitted = true;
            $scope.homeAffairsOfficer = {};

            $scope.cancel = function () {
                $uibModalInstance.dismiss("cancel");
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss("cancel");
            };

            $scope.processForm = function () {
                $uibModalInstance.close($scope.homeAffairsOfficer);
            };

        }
    ])
    .controller("EditHomeAffairsOfficerController",
    [
        "$scope", "$uibModal", "$uibModalInstance", "appService", "homeAffairsOfficer",
        function ($scope, $uibModal, $uibModalInstance, appService, homeAffairsOfficer) {

            $scope.formHasBeenSubmitted = true;
            $scope.homeAffairsOfficer = homeAffairsOfficer.data;

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
    .controller("ModalListHomeAffairsOfficerController",
    [
        "$rootScope", "$scope", "appService", "$uibModal", "$uibModalInstance", "records",
        function ($rootScope, $scope, appService, $uibModal, $uibModalInstance, records) {

            $scope.records = records.data;
            $scope.selectedRecords = [];

            $scope.selectRecord = function () {
                if (_.isEqual(arguments.length, 0)) return null;
                var record = _.isNull(arguments[0], 0) ? null : arguments[0];
                if (_.isNull(arguments[0])) return null;
                fms.Functions.AddToOrRemoveFromArray($scope.selectedRecords, record);
            };

            $scope.addNewHomeAffairsOfficer = function () {

                fms.Routes.SetAddLookup(
                    $uibModal,
                    appService,
                    "/components/homeaffairsofficer/modal/modal-add-homeaffairsofficer.html",
                    "ModalAddHomeAffairsOfficerController",
                    $scope.getActiveHomeAffairsOfficers
                );

            };

            $scope.getActiveHomeAffairsOfficers = function () {
                appService.GetData(fms.Entity.HomeAffairsOfficer.Urls.GetActiveHomeAffairsOfficers)
                    .then(function(response) {

                        $scope.records = response.data;

                    }, function(response) {
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
    .controller("ModalAddHomeAffairsOfficerController",
    [
        "$scope", "$uibModalInstance", "appService",
        function ($scope, $uibModalInstance, appService) {

            $scope.formHasBeenSubmitted = false;
            $scope.homeAffairsOfficer = {};

            $scope.cancel = function () {
                $uibModalInstance.dismiss("cancel");
            };

            $scope.processForm = function () {
                if (arguments.length === 0) return null;
                var form = arguments[0] == null ? null : arguments[0];
                if (!form.$valid) {
                    return null;
                }
                var keyValuesHomeAffairsOfficer = fms.Functions.SplitObjectIntoArray($scope.homeAffairsOfficer);
                appService.PostForm(fms.Entity.HomeAffairsOfficer.Urls.AddHomeAffairsOfficer, { homeAffairsOfficer: keyValuesHomeAffairsOfficer })
                    .then(function (response) {
                        $uibModalInstance.close();
                    }, function (response) {
                    });
            };

        }
    ])
    .controller("ModalEditHomeAffairsOfficerController",
    [
        "$scope", "$uibModal", "$uibModalInstance", "appService", "homeAffairsOfficer",
        function ($scope, $uibModal, $uibModalInstance, appService, homeAffairsOfficer) {

            $scope.formHasBeenSubmitted = true;
            $scope.homeAffairsOfficer = homeAffairsOfficer.data;

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

            $scope.close = function () {
                $uibModalInstance.dismiss();
            };

            $scope.save = function () {
                $uibModalInstance.close($scope.doctor);
            };
        }
    ]);