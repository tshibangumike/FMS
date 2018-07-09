angular.module("fmsApp")
    .controller("ListDeceasedController",
        [
            "$rootScope", "$scope", "appService", "deceaseds",
            function($rootScope, $scope, appService, deceaseds) {

                $scope.records = deceaseds.data;
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
                    if (_.isNull(record) || _.isUndefined(record)) {
                        var selectedRecords = _.filter($scope.records, function (x) { return x.Selected; });
                        if (_.isNull(selectedRecords) ||
                            _.isNull(selectedRecords) ||
                            selectedRecords.length === 0) return;
                        appService.NavigateTo("editdeceased", { deceasedid: selectedRecords[0]["Id"] });
                    } else
                        appService.NavigateTo("editdeceased", { deceasedid: record.Id });
                };

                $scope.getDeceaseds = function(pageNumber, listType) {
                    appService.GetData(
                            fms.Entity.Deceased.Urls.GetActiveDeceaseds,
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
                    $scope.getDeceaseds($scope.pageNumber, $scope.listType);
                };

                $scope.next = function() {
                    $scope.pageNumber++;
                    if ($scope.pageNumber > $scope.totalPageNumber) {
                        $scope.pageNumber--;
                        return;
                    }
                    $scope.getDeceaseds($scope.pageNumber, $scope.listType);
                };

                $scope.previous = function() {
                    $scope.pageNumber--;
                    if ($scope.pageNumber <= 0) {
                        $scope.pageNumber++;
                        return;
                    }
                    $scope.getDeceaseds($scope.pageNumber, $scope.listType);
                };

                this.init();

            }
        ])
    .controller("EditDeceasedController",
        [
            "$scope", "$uibModal", "appService", "record",
            function($scope, $uibModal, appService, record) {

                $scope.record = record.data;
                $scope.formHasBeenSubmitted = false;
                $scope.Tabs = [
                    { Name: "Person", Show: true },
                    { Name: "Deceased", Show: true }
                ];

                this.init = function() {
                    if (!_.isNull($scope.record["DateOfBirth"])) {
                        $scope.recordDOB = {
                            Year: moment($scope.record["DateOfBirth"]).year(),
                            Month: (1 + moment($scope.record["DateOfBirth"]).month()),
                            Day: moment($scope.record["DateOfBirth"]).date()
                        };
                    }
                    if (!_.isNull($scope.record["DateOfBirth"])) {
                        $scope.recordDOD = {
                            Year: moment($scope.record["DateOfDeath"]).year(),
                            Month: (1 + moment($scope.record["DateOfDeath"]).month()),
                            Day: moment($scope.record["DateOfDeath"]).date()
                        };
                    }
                };

                $scope.collapseExpand = function (elementId) {
                    var tab = _.find($scope.Tabs, function (x) { return _.isEqual(x.Name, elementId); });
                    if (_.isUndefined(tab)) return null;
                    tab.Show = !tab.Show;
                };

                $scope.getTabByName = function (elementId) {
                    return _.find($scope.Tabs, function (x) { return _.isEqual(x.Name, elementId); });
                };

                $scope.DeactivateDeceased = function () {
                    appService.GetData(fms.Entity.Deceased.Urls.DeactivateDeceased,
                            {
                                deceasedId: $scope.record["Id"]
                            })
                        .then(function (response) {
                                appService.NavigateTo("deceased-list");
                            },
                            function (response) {
                            });
                };

                $scope.Delete = function () {
                    fms.Routes.ConfirmationLookup($uibModal, $scope.DeactivateDeceased);
                };

                $scope.GetLastDayOfMonth = function (year, month) {
                    return fms.Functions.GetMonthLastDay(year, month);
                };

                $scope.OnChange_Year = function (modelName, year) {
                    if (_.isNull(year) || _.isUndefined(year)) {
                        switch (modelName) {
                            case "recordDOB":
                                $scope.recordDOB["Month"] = $scope.recordDOB["Day"] = null;
                                break;
                            case "recordDOD":
                                $scope.recordDOD["Month"] = $scope.recordDOD["Day"] = null;
                                break;
                            case "funeralBD":
                                $scope.recordBD["Month"] = $scope.recordBD["Day"] = null;
                                break;
                            default:
                        }
                    }
                };

                $scope.OnChange_Month = function (modelName, month) {
                    if (_.isNull(month) || _.isUndefined(month)) {
                        switch (modelName) {
                            case "recordDOB":
                                $scope.recordDOB["Day"] = null;
                                break;
                            case "recordDOD":
                                $scope.recordDOD["Day"] = null;
                                break;
                            case "funeralBD":
                                $scope.funeralBD["Day"] = null;
                                break;
                            default:
                        }
                    }
                };

                $scope.OnChange_SAIdNumber = function(entityName, saIdNumber) {
                    var data = fms.Functions.ExtractFromIdNunmber(saIdNumber);
                    $scope.recordDOB["Year"] = moment(data.birthdate).year();
                    $scope.recordDOB["Month"] = 1 + moment(data.birthdate).month();
                    $scope.recordDOB["Day"] = moment(data.birthdate).date();
                    $scope.record["GenderId"] = data.gender === "male" ? 1 : 2;
                };

                $scope.processForm = function (form) {
                    $scope.formHasBeenSubmitted = true;
                    if (!form.$valid) {
                        return null;
                    }
                    if (!_.isNull($scope.recordDOB["Year"]) &&
                        !_.isNull($scope.recordDOB["Month"]) &&
                        !_.isNull($scope.recordDOB["Day"])) {
                        $scope.record["DateOfBirth"] = $scope.recordDOB["Year"] +
                            "/" +
                            $scope.recordDOB["Month"] +
                            "/" +
                            $scope.recordDOB["Day"];
                    }
                    if (!_.isNull($scope.recordDOD["Year"]) &&
                        !_.isNull($scope.recordDOD["Month"]) &&
                        !_.isNull($scope.recordDOD["Day"])) {
                        $scope.record["DateOfDeath"] = $scope.recordDOD["Year"] +
                            "/" +
                            $scope.recordDOD["Month"] +
                            "/" +
                            $scope.recordDOD["Day"];
                    }
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
                        function() {
                            fms.Notifications.Toastr.UpdateErrorNotification();
                        });
                    return null;
                };

                this.init();
            }
        ]);