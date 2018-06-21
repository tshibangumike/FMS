angular.module("fmsApp")
    .controller("ListNextOfKinController",
    [
        "$scope", "appService", "nextOfKins",
        function ($scope, appService, nextOfKins) {

            $scope.records = nextOfKins.data;
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

            $scope.edit = function (record) {
                if (_.isNull(record))
                    appService.NavigateTo("editnextofkin", { nextofkinid: $scope.selectedRecordIds[0] });
                else
                    appService.NavigateTo("editnextofkin", { nextofkinid: record["Id"] });

            };

            $scope.getNextOfKins = function (pageNumber, listType) {
                appService.GetData(
                        fms.Entity.NextOfKin.Urls.GetActiveNextOfKins,
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
                $scope.getNextOfKins($scope.pageNumber, $scope.listType);
            };

            $scope.next = function () {
                $scope.pageNumber++;
                if ($scope.pageNumber > $scope.totalPageNumber) {
                    $scope.pageNumber--;
                    return;
                }
                $scope.getNextOfKins($scope.pageNumber, $scope.listType);
            };

            $scope.previous = function () {
                $scope.pageNumber--;
                if ($scope.pageNumber <= 0) {
                    $scope.pageNumber++;
                    return;
                }
                $scope.getNextOfKins($scope.pageNumber, $scope.listType);
            };

            this.init();

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