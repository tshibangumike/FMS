angular.module("fmsApp")
    .controller("ListHomeAffairsOfficeController",
        [
            "$rootScope", "$scope", "appService", "homeAffairsOfficers",
            function($rootScope, $scope, appService, homeAffairsOfficers) {

                $scope.records = homeAffairsOfficers.data;
                $scope.selectedRecords = [];
                $scope.pageNumber = 1;
                $scope.listType = 1;
                $scope.totalPageNumber = 0;

                this.init = function () {
                    if ($scope.records.length > 0) {
                        $scope.totalPageNumber = $scope.records[0]["TotalPageNumber"];
                    }
                };

                $scope.selectRecord = function(record) {
                    fms.Functions.AddToOrRemoveFromArrayAnItemBasedOnId($scope.selectedRecords, record);
                };

                $scope.toggleSelection = function(record) {
                    record.Selected = !record.Selected;
                };

                $scope.edit = function(record) {
                    if (_.isNull(record))
                        appService.NavigateTo("edithomeaffairsofficer",
                            { homeaffairsofficerid: $scope.selectedRecordIds[0] });
                    else
                        appService.NavigateTo("edithomeaffairsofficer", { homeaffairsofficerid: record["Id"] });
                };

                $scope.getHomeAffairOffices = function (pageNumber, listType) {
                    appService.GetData(
                            fms.Entity.HomeAffairsOffice.Urls.GetActiveHomeAffairsOffices,
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
                    $scope.getHomeAffairOffices($scope.pageNumber, $scope.listType);
                };

                $scope.next = function () {
                    $scope.pageNumber++;
                    if ($scope.pageNumber > $scope.totalPageNumber) {
                        $scope.pageNumber--;
                        return;
                    }
                    $scope.getHomeAffairOffices($scope.pageNumber, $scope.listType);
                };

                $scope.previous = function () {
                    $scope.pageNumber--;
                    if ($scope.pageNumber <= 0) {
                        $scope.pageNumber++;
                        return;
                    }
                    $scope.getHomeAffairOffices($scope.pageNumber, $scope.listType);
                };

                this.init();

            }
        ])
    .controller("AddHomeAffairsOfficeController",
        [
            "$rootScope", "$scope", "$uibModalInstance", "appService",
            function($rootScope, $scope, $uibModalInstance, appService) {

                $scope.formHasBeenSubmitted = true;
                $scope.homeAffairsOfficer = {};

                $scope.cancel = function() {
                    $uibModalInstance.dismiss("cancel");
                };

                $scope.cancel = function() {
                    $uibModalInstance.dismiss("cancel");
                };

                $scope.processForm = function() {
                    $uibModalInstance.close($scope.homeAffairsOfficer);
                };

            }
        ])
    .controller("EditHomeAffairsOfficeController",
        [
            "$scope", "appService", "record",
            function($scope, appService, record) {

                $scope.formHasBeenSubmitted = true;
                $scope.record = record.data;

                $scope.cancel = function() {
                    $uibModalInstance.dismiss("cancel");
                };

                $scope.save = function() {
                    $uibModalInstance.close($scope.doctor);
                };

            }
        ])
    .controller("ModalListHomeAffairsOfficeController",
        [
            "$rootScope", "$scope", "appService", "$uibModal", "$uibModalInstance", "records",
            function($rootScope, $scope, appService, $uibModal, $uibModalInstance, records) {

                $scope.records = records.data;
                $scope.selectedRecords = [];

                $scope.selectRecord = function (record) {
                    fms.Functions.AddToOrRemoveFromArrayAnItemBasedOnId($scope.selectedRecords, record);
                };

                $scope.addNewHomeAffairsOffice = function() {
                    fms.Routes.SetAddLookup(
                        $uibModal,
                        "/components/homeaffairsoffice/modal/modal-add-homeaffairsoffice.html",
                        "ModalAddHomeAffairsOfficeController",
                        $scope.getActiveHomeAffairsOffices
                    );
                };

                $scope.getActiveHomeAffairsOffices = function() {
                    appService.GetData(fms.Entity.HomeAffairsOffice.Urls.GetActiveHomeAffairsOffices)
                        .then(function(response) {
                                $scope.records = response.data;
                            },
                            function(response) {
                            });
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
    .controller("ModalAddHomeAffairsOfficeController",
        [
            "$rootScope", "$scope", "$uibModalInstance", "appService",
            function($rootScope, $scope, $uibModalInstance, appService) {

                $scope.formHasBeenSubmitted = false;
                $scope.record = {};

                $scope.cancel = function() {
                    $uibModalInstance.dismiss("cancel");
                };

                $scope.processForm = function(form) {
                    $scope.formHasBeenSubmitted = true;
                    if (!form.$valid) {
                        return;
                    }
                    var keyValuesHomeAffairsOffice = fms.Functions.SplitObjectIntoArray($scope.record);
                    appService.PostForm(fms.Entity.HomeAffairsOffice.Urls.AddHomeAffairsOffice,
                            { homeAffairsOffice: keyValuesHomeAffairsOffice })
                        .then(function(response) {
                                $uibModalInstance.close();
                            },
                            function(response) {
                            });
                };

            }
        ])
    .controller("ModalEditHomeAffairsOfficeController",
        [
            "$scope", "$uibModal", "$uibModalInstance", "appService", "record",
            function($scope, $uibModal, $uibModalInstance, appService, record) {

                $scope.formHasBeenSubmitted = true;
                $scope.homeAffairsOfficer = record.data;

                $scope.getHospitals = function() {

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
                                "appService", function(appService) {
                                    return appService.GetData("/Hospital/GetActiveHospitals");
                                }
                            ]
                        }
                    });

                    modalInstance.result.then(function(selectedRecord) {
                        $scope.doctor["HospitalName"] = selectedRecord.Name;
                        $scope.doctor["HospitalId"] = selectedRecord.Id;
                    });

                };

                $scope.cancel = function() {
                    $uibModalInstance.dismiss();
                };

                $scope.save = function() {
                    $uibModalInstance.close($scope.doctor);
                };
            }
        ]);