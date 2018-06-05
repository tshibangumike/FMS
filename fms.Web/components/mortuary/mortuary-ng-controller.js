angular.module("fmsApp")
    .controller("ModalListMortuaryController",
        [
            "$rootScope", "$scope", "$uibModal", "$uibModalInstance", "appService", "records",
            function($rootScope, $scope, $uibModal, $uibModalInstance, appService, records) {

                $scope.records = records.data;
                $scope.selectedRecords = [];

                $scope.selectRecord = function (record) {
                    fms.Functions.AddToOrRemoveFromArray($scope.selectedRecords, record);
                };

                $scope.getActiveMortuaries = function () {

                    appService.GetData(fms.Entity.Mortuary.Urls.GetActiveMortuaries)
                        .then(function successCallback(response) {

                            $scope.records = response.data;

                        }, function errorCallback(response) {
                        });

                };

                $scope.addNewMortuary = function() {
                    fms.Routes.SetAddLookup(
                        $uibModal,
                        "/components/mortuary/modal/modal-add-mortuary.html",
                        "ModalAddMortuaryController",
                        $scope.getActiveMortuaries
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
    .controller("ModalAddMortuaryController",
        [
            "$scope", "$uibModalInstance", "appService",
            function($scope, $uibModalInstance, appService) {

                $scope.formHasBeenSubmitted = true;
                $scope.mortuary = {};

                $scope.cancel = function() {
                    $uibModalInstance.dismiss("cancel");
                };

                $scope.processForm = function() {
                    if (arguments.length === 0) return null;
                    var form = arguments[0] == null ? null : arguments[0];
                    if (!form.$valid) {
                        return null;
                    }
                    var keyValuesMortuary = fms.Functions.SplitObjectIntoArray($scope.mortuary);
                    appService.PostForm("/Mortuary/AddMortuary", { mortuary: keyValuesMortuary })
                        .then(function successCallback(response) {
                                $uibModalInstance.close(response.data.mortuary);
                            },
                            function errorCallback(response) {
                            });
                };
            }
        ])
    .controller("ModalEditMortuaryController",
        [
            "$scope", "$uibModalInstance", "record",
            function($scope, $uibModalInstance, record) {

                $scope.mortuary = record.data;

                $scope.cancel = function() {
                    $uibModalInstance.dismiss("cancel");
                };

            }
        ]);