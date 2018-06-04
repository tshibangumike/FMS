﻿angular.module("fmsApp")
    .controller("ListMortuaryController",
    [
        "$rootScope", "$scope", "$uibModal", "$uibModalInstance", "appService", "records",
        function ($rootScope, $scope, $uibModal, $uibModalInstance, appService, records) {

            $scope.records = records.data;
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

            $scope.addNewHospital = function () {

                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: "modal-title",
                    ariaDescribedBy: "modal-body",
                    templateUrl: "/components/mortuary/modal/modal-add-mortuary.html",
                    controller: "AddMortuaryController",
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
    .controller("AddMortuaryController",
    [
        "$scope", "$uibModalInstance", "appService",
        function ($scope, $uibModalInstance, appService) {

            $scope.formHasBeenSubmitted = true;
            $scope.mortuary = {};

            $scope.cancel = function () {
                $uibModalInstance.dismiss("cancel");
            };

            $scope.processForm = function () {
                if (arguments.length === 0) return null;
                var form = arguments[0] == null ? null : arguments[0];
                if (!form.$valid) {
                    return null;
                }
                var keyValuesMortuary = fms.Functions.SplitObjectIntoArray($scope.mortuary);
                appService.PostForm("/Mortuary/AddMortuary", { mortuary: keyValuesMortuary })
                    .then(function successCallback(response) {
                        $uibModalInstance.close(response.data.mortuary);
                    }, function errorCallback(response) {
                    });
            };
        }
    ]);