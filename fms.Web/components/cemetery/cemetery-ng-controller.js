
angular.module("fmsApp")
    .controller("ListCemeteryController",
    [
        "$scope", "appService", "records",
        function ($scope, appService, records) {

            $scope.records = records.data;
            $scope.selectedRecords = [];

            $scope.selectRecord = function (record) {
                fms.Functions.AddToOrRemoveFromArrayAnItemBasedOnId($scope.selectedRecords, record);
            };

            $scope.getActiveCemeteries = function () {
                appService.GetData(fms.Entity.Cemetery.Urls.GetActiveCemeteries)
                    .then(function (response) {
                        $scope.records = response.data;
                    },
                    function (response) {
                    });
            };

            $scope.addNewCemetery = function () {
                fms.Routes.SetAddLookup(
                    $uibModal,
                    "/components/cemetery/modal/modal-add-cemetery.html",
                    "ModalAddCemeteryController",
                    $scope.getActiveCemeteries
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
    .controller("AddCemeteryController",
    [
        "$scope", "$uibModalInstance", "appService",
        function ($scope, $uibModalInstance, appService) {

            $scope.formHasBeenSubmitted = true;
            $scope.cemetery = {};

            $scope.cancel = function () {
                $uibModalInstance.dismiss("cancel");
            };

            $scope.processForm = function () {
                if (arguments.length === 0) return null;
                var form = arguments[0] == null ? null : arguments[0];
                if (!form.$valid) {
                    return null;
                }
                var keyValuesCemetery = fms.Functions.SplitObjectIntoArray($scope.cemetery);
                appService.PostForm("/Cemetery/AddCemetery", { cemetery: keyValuesCemetery })
                    .then(function successCallback(response) {
                        $uibModalInstance.close(response.data.cemetery);
                    },
                    function errorCallback(response) {
                    });
            };
        }
    ])
    .controller("EditCemteryController",
    [
        "$scope", "$uibModalInstance", "record",
        function ($scope, $uibModalInstance, record) {

            $scope.cemetery = record.data;

            $scope.cancel = function () {
                $uibModalInstance.dismiss("cancel");
            };

        }
    ])
    .controller("ModalListCemeteryController",
    [
        "$scope", "$uibModal", "$uibModalInstance", "appService", "records",
        function ($scope, $uibModal, $uibModalInstance, appService, records) {

            $scope.records = records.data;
            $scope.selectedRecords = [];

            $scope.selectRecord = function (record) {
                fms.Functions.AddToOrRemoveFromArrayAnItemBasedOnId($scope.selectedRecords, record);
            };

            $scope.getActiveCemeteries = function () {
                appService.GetData(fms.Entity.Cemetery.Urls.GetActiveCemeteries)
                    .then(function (response) {
                        $scope.records = response.data;
                    },
                    function (response) {
                    });
            };

            $scope.addNewCemetery = function () {
                fms.Routes.SetAddLookup(
                    $uibModal,
                    "/components/cemetery/modal/modal-add-cemetery.html",
                    "ModalAddCemeteryController",
                    $scope.getActiveCemeteries
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
    .controller("ModalAddCemeteryController",
    [
        "$scope", "$uibModalInstance", "appService",
        function ($scope, $uibModalInstance, appService) {

            $scope.formHasBeenSubmitted = true;
            $scope.cemetery = {};

            $scope.cancel = function () {
                $uibModalInstance.dismiss("cancel");
            };

            $scope.processForm = function () {
                if (arguments.length === 0) return null;
                var form = arguments[0] == null ? null : arguments[0];
                if (!form.$valid) {
                    return null;
                }
                var keyValuesCemetery = fms.Functions.SplitObjectIntoArray($scope.cemetery);
                appService.PostForm("/Cemetery/AddCemetery", { cemetery: keyValuesCemetery })
                    .then(function successCallback(response) {
                        $uibModalInstance.close(response.data.cemetery);
                    },
                    function errorCallback(response) {
                    });
            };
        }
    ])
    .controller("ModalEditCemteryController",
    [
        "$scope", "$uibModalInstance", "record",
        function ($scope, $uibModalInstance, record) {

            $scope.cemetery = record.data;

            $scope.cancel = function () {
                $uibModalInstance.dismiss("cancel");
            };

        }
    ]);