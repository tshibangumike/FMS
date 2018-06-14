angular.module("fmsApp")
    .controller("ListNextOfKinController",
    [
        "$scope", "appService", "nextOfKins",
        function ($scope, appService, nextOfKins) {

            $scope.records = nextOfKins.data;
            $scope.selectedRecords = [];

            $scope.selectRecord = function (record) {
                fms.Functions.AddToOrRemoveFromArrayAnItemBasedOnId($scope.selectedRecords, record);
            };

            $scope.toggleSelection = function (record) {
                record.Selected = !record.Selected;
            };

            $scope.edit = function (record) {
                if (_.isNull(record))
                    appService.NavigateTo("editnextofkin", { nextofkinid: $scope.selectedRecordIds[0] });
                else
                    appService.NavigateTo("editnextofkin", { nextofkinid: record["Id"] });

            };

        }
    ])
    .controller("EditNextOfKinController",
        [
            "$scope", "$uibModal", "appService", "record",
            function ($scope, $uibModal, appService, record) {

                $scope.record = record.data;

                $scope.processForm = function () {
                    if (arguments.length === 0) return null;
                    var form = arguments[0] == null ? null : arguments[0];
                    if (!form.$valid) {
                        return null;
                    }
                    $scope.record["DateOfDeath"] = $("#DateOfDeath").val();
                    $scope.record["DateOfBirth"] = $("#DateOfBirth").val();
                    var keyValue = fms.Functions.SplitObjectIntoArray($scope.record);
                    appService.PostForm(fms.Entity.NextOfKin.Urls.UpdateNextOfKin,
                        {
                            nextOfKin: keyValue
                        }).then(function (response) {
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