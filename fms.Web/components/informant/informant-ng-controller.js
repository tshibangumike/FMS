﻿angular.module("fmsApp")
    .controller("ListInformantController",
        [
            "$scope", "appService", "informants",
            function($scope, appService, informants) {

                $scope.records = informants.data;
                $scope.selectedRecords = [];
                $scope.pageNumber = 1;
                $scope.listType = 1;
                $scope.totalPageNumber = 0;

                this.init = function() {
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
                        appService.NavigateTo("editinformant", { informantid: $scope.selectedRecordIds[0] });
                    else
                        appService.NavigateTo("editinformant", { informantid: record["Id"] });

                };

                $scope.getInformants = function(pageNumber, listType) {
                    appService.GetData(
                            fms.Entity.Informant.Urls.GetActiveInformants,
                            {
                                pageNumber: pageNumber,
                                listType: listType
                            })
                        .then(function(response) {
                                $scope.records = response.data;
                            },
                            function(response) {
                            });
                };

                $scope.startFromBegining = function() {
                    $scope.pageNumber = 1;
                    $scope.getInformants($scope.pageNumber, $scope.listType);
                };

                $scope.next = function() {
                    $scope.pageNumber++;
                    if ($scope.pageNumber > $scope.totalPageNumber) {
                        $scope.pageNumber--;
                        return;
                    }
                    $scope.getInformants($scope.pageNumber, $scope.listType);
                };

                $scope.previous = function() {
                    $scope.pageNumber--;
                    if ($scope.pageNumber <= 0) {
                        $scope.pageNumber++;
                        return;
                    }
                    $scope.getInformants($scope.pageNumber, $scope.listType);
                };

                this.init();

            }
        ])
    .controller("EditInformantController",
        [
            "$scope", "$uibModal", "appService", "record",
            function($scope, $uibModal, appService, record) {

                $scope.record = record.data;

                $scope.processForm = function(form) {
                    if (!form.$valid) {
                        return;
                    }
                    var keyValue = fms.Functions.SplitObjectIntoArray($scope.record);
                    appService.PostForm(fms.Entity.Informant.Urls.UpdateInformant,
                        {
                            informant: keyValue
                        }).then(function(response) {
                            if (response.data.state !== "success") {
                                fms.Notifications.Toastr.UpdateErrorNotification();
                            }
                            fms.Notifications.Toastr.UpdateSuccessNotification();
                            return appService.RefreshCurrentState();
                        },
                        function() {
                            fms.Notifications.Toastr.UpdateErrorNotification();
                        });
                    return;
                };
            }
        ]);