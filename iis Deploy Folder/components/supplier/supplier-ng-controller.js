angular.module("fmsApp")
    .controller("ModalListSupplierController",
    [
        "$rootScope", "$scope", "$uibModal", "$uibModalInstance", "appService", "records",
        function ($rootScope, $scope, $uibModal, $uibModalInstance, appService, records) {

            $scope.records = records.data;
            $scope.selectedRecords = [];

            $scope.selectRecord = function () {
                if (_.isEqual(arguments.length, 0)) return null;
                var _record = _.isNull(arguments[0], 0) ? null : arguments[0];
                if (_.isNull(arguments[0])) return null;
                fms.Functions.AddToOrRemoveFromArray($scope.selectedRecords, _record);
            };

            $scope.getActiveSuppliers = function () {

                appService.GetData(fms.Entity.Supplier.Urls.GetActiveSuppliers)
                    .then(function successCallback(response) {

                        $scope.records = response.data;

                    }, function errorCallback(response) {
                    });

            };

            $scope.addNewSupplier = function () {

                fms.Routes.SetAddLookup(
                    $uibModal,
                    appService,
                    "/components/supplier/modal/modal-add-supplier.html",
                    "ModalAddSupplierController",
                    $scope.getActiveSuppliers
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
    .controller("ModalAddSupplierController",
    [
        "$scope", "$uibModalInstance", "appService",
        function ($scope, $uibModalInstance, appService) {

            $scope.formHasBeenSubmitted = false;
            $scope.supplier = {};

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
                var keyValue = fms.Functions.SplitObjectIntoArray($scope.supplier);
                appService.PostForm(fms.Entity.Supplier.Urls.AddSupplier, { supplier: keyValue })
                    .then(function successCallback(response) {
                        $uibModalInstance.close();
                    }, function errorCallback(response) {
                    });
            };

        }
    ]);