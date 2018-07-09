angular.module("fmsApp")
    .controller("ListSupplierController",
    [
        "$scope", "appService", "records",
        function ($scope, appService, records) {

            $scope.records = records.data;
            $scope.selectedRecords = [];
            $scope.pageNumber = 1;
            $scope.listType = 1;
            $scope.totalPageNumber = 0;

            this.init = function () {
                if ($scope.records.length > 0) {
                    $scope.totalPageNumber = $scope.records[0]["TotalPageNumber"];
                }
            };

            $scope.selectRecord = function (record) {
                fms.Functions.AddToOrRemoveFromArrayAnItemBasedOnId($scope.selectedRecords, record);
            };

            $scope.toggleSelection = function (record) {
                record.Selected = !record.Selected;
            };

            $scope.create = function () {
                appService.NavigateTo("addsupplier");
            };

            $scope.edit = function (record) {
                if (_.isNull(record) || _.isUndefined(record)) {
                    var selectedRecords = _.filter($scope.records, function (x) { return x.Selected; });
                    if (_.isNull(selectedRecords) ||
                        _.isNull(selectedRecords) ||
                        selectedRecords.length === 0) return;
                    appService.NavigateTo("editsupplier", { supplierid: selectedRecords[0]["Id"] });
                } else
                    appService.NavigateTo("editsupplier", { supplierid: record.Id });
            };

            $scope.getSuppliers = function (pageNumber, listType) {
                appService.GetData(
                        fms.Entity.Supplier.Urls.GetActiveSuppliers,
                        {
                            pageNumber: pageNumber,
                            listType: listType
                        })
                    .then(function (response) {
                            $scope.records = response.data;
                        },
                        function (response) {
                        });
            };

            $scope.startFromBegining = function () {
                $scope.pageNumber = 1;
                $scope.getSuppliers($scope.pageNumber, $scope.listType);
            };

            $scope.next = function () {
                $scope.pageNumber++;
                if ($scope.pageNumber > $scope.totalPageNumber) {
                    $scope.pageNumber--;
                    return;
                }
                $scope.getSuppliers($scope.pageNumber, $scope.listType);
            };

            $scope.previous = function () {
                $scope.pageNumber--;
                if ($scope.pageNumber <= 0) {
                    $scope.pageNumber++;
                    return;
                }
                $scope.getSuppliers($scope.pageNumber, $scope.listType);
            };

            this.init();

        }
    ])
    .controller("AddSupplierController",
    [
        "$scope", "appService",
        function ($scope, appService) {

            $scope.formHasBeenSubmitted = false;
            $scope.supplier = {};

            $scope.cancel = function () {
                $uibModalInstance.dismiss("cancel");
            };

            $scope.processForm = function (form) {
                $scope.formHasBeenSubmitted = true;
                if (!form.$valid) {
                    return;
                }
                var keyValue = fms.Functions.SplitObjectIntoArray($scope.supplier);
                appService.PostForm(fms.Entity.Supplier.Urls.AddSupplier, { supplier: keyValue })
                    .then(function (response) {
                            if (response.data.state !== "success") {
                                fms.Notifications.Toastr.CreateErrorNotification();
                            }
                            fms.Notifications.Toastr.CreateSuccessNotification();
                            appService.NavigateTo("editsupplier", { funeralid: response.data.funeralId });
                    },
                    function (response) {
                    });
            };

        }
    ])
    .controller("EditSupplierController",
    [
        "$scope", "appService", "record",
        function($scope, appService, record) {

            $scope.record = record.data;
            $scope.formHasBeenSubmitted = false;

            $scope.processForm = function(form) {
                $scope.formHasBeenSubmitted = true;
                if (!form.$valid) {
                    return;
                }
                var keyValue = fms.Functions.SplitObjectIntoArray($scope.record);
                appService.PostForm(fms.Entity.Supplier.Urls.UpdateSupplier, { supplier: keyValue })
                    .then(function successCallback(response) {
                            if (response.data.state !== "success") {
                                fms.Notifications.Toastr.UpdateErrorNotification();
                            }
                            fms.Notifications.Toastr.UpdateSuccessNotification();
                            return appService.RefreshCurrentState();
                        },
                        function errorCallback(response) {
                        });
            };

        }
    ])
    .controller("ModalListSupplierController",
        [
            "$rootScope", "$scope", "$uibModal", "$uibModalInstance", "appService", "records",
            function($rootScope, $scope, $uibModal, $uibModalInstance, appService, records) {

                $scope.records = records.data;
                $scope.selectedRecords = [];

                $scope.selectRecord = function (record) {
                    fms.Functions.AddToOrRemoveFromArrayAnItemBasedOnId($scope.selectedRecords, record);
                };

                $scope.getActiveSuppliers = function() {
                    appService.GetData(fms.Entity.Supplier.Urls.GetActiveSuppliers)
                        .then(function successCallback(response) {
                                $scope.records = response.data;
                            },
                            function errorCallback(response) {
                            });
                };

                $scope.addNewSupplier = function() {
                    fms.Routes.SetAddLookup(
                        $uibModal,
                        "/components/supplier/modal/modal-add-supplier.html",
                        "ModalAddSupplierController",
                        $scope.getActiveSuppliers
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
    .controller("ModalAddSupplierController",
        [
            "$scope", "$uibModalInstance", "appService",
            function($scope, $uibModalInstance, appService) {

                $scope.formHasBeenSubmitted = false;
                $scope.supplier = {};

                $scope.cancel = function() {
                    $uibModalInstance.dismiss("cancel");
                };

                $scope.processForm = function() {
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
                            },
                            function errorCallback(response) {
                            });
                };

            }
        ])
    .controller("ModalEditSupplierController",
        [
            "$scope", "$uibModalInstance", "record",
            function($scope, $uibModalInstance, record) {

                $scope.supplier = record.data;

                $scope.cancel = function() {
                    $uibModalInstance.dismiss("cancel");
                };

            }
        ]);