angular.module("fmsApp")
    .controller("ListDeceasedController",
        [
            "$rootScope", "$scope", "appService", "deceaseds",
            function($rootScope, $scope, appService, deceaseds) {

                $scope.records = deceaseds.data;
                $scope.selectedRecords = [];

                $scope.selectRecord = function(record) {
                    fms.Functions.AddToOrRemoveFromArrayAnItemBasedOnId($scope.selectedRecords, record);
                };

                $scope.toggleSelection = function(record) {
                    record.Selected = !record.Selected;
                };

                $scope.edit = function(record) {
                    if (_.isNull(record))
                        appService.NavigateTo("editdeceased", { deceasedid: $scope.selectedRecordIds[0] });
                    else
                        appService.NavigateTo("editdeceased", { deceasedid: record["Id"] });

                };

            }
        ])
    .controller("EditDeceasedController",
        [
            "$scope", "$uibModal", "appService", "record",
            function($scope, $uibModal, appService, record) {

                $scope.record = record.data;

                $scope.processForm = function() {
                    if (arguments.length === 0) return null;
                    var form = arguments[0] == null ? null : arguments[0];
                    if (!form.$valid) {
                        return null;
                    }
                    $scope.record["DateOfDeath"] = $("#DateOfDeath").val();
                    $scope.record["DateOfBirth"] = $("#DateOfBirth").val();
                    var keyValue = fms.Functions.SplitObjectIntoArray($scope.record);
                    appService.PostForm(fms.Entity.Deceased.Urls.UpdateDeceased,
                        {
                            deceased: keyValue
                        }).then(function(response) {
                            if (response.data.state !== "success") {
                                fms.Notifications.Toastr.UpdateErrorNotification();
                            }
                            fms.Notifications.Toastr.UpdateSuccessNotification();
                            return appService.RefreshCurrentState();
                        },
                        function () {
                            fms.Notifications.Toastr.UpdateErrorNotification();
                        });
                    return null;
                };
            }
        ]);