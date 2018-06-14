angular.module("fmsApp")
    .controller("ListInformantController",
        [
            "$scope", "appService", "informants",
            function($scope, appService, informants) {

                $scope.records = informants.data;
                $scope.selectedRecords = [];

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
                    $scope.record["DateOfDeath"] = $("#DateOfDeath").val();
                    $scope.record["DateOfBirth"] = $("#DateOfBirth").val();
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