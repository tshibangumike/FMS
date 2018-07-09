angular.module("fmsApp")
    .controller("ListMemberController",
    [
        "$rootScope", "$scope", "appService", "records",
        function ($rootScope, $scope, appService, records) {

            $scope.records = records.data;
            $scope.selectedRecordIds = [];
            $scope.pageNumber = 1;
            $scope.listType = 1;
            $scope.totalPageNumber = 0;

            this.init = function () {
                if ($scope.records.length > 0) {
                    $scope.totalPageNumber = $scope.records[0]["TotalPageNumber"];
                }
            };

            $scope.selectAll = function (isSelected) {
                fms.Functions.SelectAllRecords(isSelected, $scope.records);
            };

            $scope.selectRecord = function (record) {
                fms.Functions.AddToOrRemoveFromArrayAnItemBasedOnId($scope.selectedRecords, record);
            };

            $scope.toggleSelection = function (record) {
                record.Selected = !record.Selected;
            };

            $scope.create = function () {
                appService.NavigateTo("addmember");
            };

            $scope.edit = function (record) {
                if (_.isNull(record))
                    appService.NavigateTo("editmember", { memberid: $scope.selectedRecordIds[0] });
                else
                    appService.NavigateTo("editmember", { memberid: record.Id });
            };

            $scope.getMembers = function (pageNumber, listType) {
                appService.GetData(
                    fms.Entity.Member.Urls.GetActiveMembers,
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
                $scope.getMembers($scope.pageNumber, $scope.listType);
            };

            $scope.next = function () {
                $scope.pageNumber++;
                if ($scope.pageNumber > $scope.totalPageNumber) {
                    $scope.pageNumber--;
                    return;
                }
                $scope.getMembers($scope.pageNumber, $scope.listType);
            };

            $scope.previous = function () {
                $scope.pageNumber--;
                if ($scope.pageNumber <= 0) {
                    $scope.pageNumber++;
                    return;
                }
                $scope.getMembers($scope.pageNumber, $scope.listType);
            };

            this.init();

        }
    ])
    .controller("AddMemberController",
    [
        "$rootScope", "$scope", "appService",
        function ($rootScope, $scope, appService) {

            $scope.record = {};
            $scope.formHasBeenSubmitted = false;

            $scope.processForm = function (form) {
                $scope.formHasBeenSubmitted = true;
                if (!form.$valid) {
                    return null;
                }
                var keyValue = fms.Functions.SplitObjectIntoArray($scope.record);
                appService.PostForm(fms.Entity.Member.Urls.AddMember, { member: keyValue })
                    .then(function successCallback(response) {
                        if (response.data.state !== "success") {
                            fms.Notifications.Toastr.CreateErrorNotification();
                            return;
                        }
                        fms.Notifications.Toastr.CreateSuccessNotification();
                        appService.NavigateTo("editmember", { memberid: response.data.memberId });
                    },
                    function errorCallback(response) {
                    });
            };

        }
    ])
    .controller("EditMemberController",
    [
        "$rootScope", "$scope", "appService", "$uibModal", "record", "payments", "paymentPeriods",
        function ($rootScope, $scope, appService, $uibModal, record, payments, paymentPeriods) {

            $scope.record = record.data;
            $scope.payments = payments.data;
            $scope.paymentPeriods = paymentPeriods.data;
            $scope.formHasBeenSubmitted = false;
            $scope.currentDate = { Year: (new Date()).getFullYear(), Month: (new Date()).getMonth() + 1, Day: (new Date()).getDate() };
            $scope.paymentDate = { Year: (new Date()).getFullYear(), Month: null, Day: null };
            $scope.newPayment = { YearId: (new Date()).getFullYear() };
            $scope.months = [
                { Id: 1, Name: "January" },
                { Id: 2, Name: "February" },
                { Id: 3, Name: "March" },
                { Id: 4, Name: "April" },
                { Id: 5, Name: "May" },
                { Id: 6, Name: "June" },
                { Id: 7, Name: "July" },
                { Id: 8, Name: "August" },
                { Id: 9, Name: "September" },
                { Id: 10, Name: "October" },
                { Id: 11, Name: "November" },
                { Id: 12, Name: "December" }
            ];
            $scope.Tabs = [
                { Name: "GeneralInformation", Show: true },
                { Name: "Payment", Show: true }
            ];

            $scope.GetLastDayOfMonth = function (year, month) {
                return fms.Functions.GetMonthLastDay(year, month);
            };

            $scope.collapseExpand = function (elementId) {
                var tab = _.find($scope.Tabs, function (x) { return _.isEqual(x.Name, elementId); });
                if (_.isUndefined(tab)) return;
                tab.Show = !tab.Show;
            };

            $scope.getTabByName = function () {

                if (arguments.length === 0) return null;
                var elementId = arguments[0] == null ? null : arguments[0];

                return _.find($scope.Tabs, function (x) { return _.isEqual(x.Name, elementId); });

            };

            $scope.OnChange_FileInput = function (e) {
                if (e.files.length === 0) {
                    $scope.newProofOfPayment = null;
                    return;
                }
                $scope.newProofOfPayment = e.files[0];
            };

            $scope.ClearFileInput = function (inputId) {
                $("#ProofOfPayment").replaceWith($("#ProofOfPayment").val("").clone(true));
            };

            $scope.AddPayment = function () {
                if (!_.isNull($scope.paymentDate["Year"]) &&
                    !_.isNull($scope.paymentDate["Month"]) &&
                    !_.isNull($scope.paymentDate["Day"])) {
                    $scope.newPayment["PaymentDate"] = $scope.paymentDate["Year"] +
                        "/" +
                        $scope.paymentDate["Month"] +
                        "/" +
                        $scope.paymentDate["Day"];
                } else {
                    return;
                }
                appService.UploadFile(
                    "Document/AddDocument",
                    $scope.newProofOfPayment,
                    {},
                    "proofOfPayment")
                    .then(function successCallback(response) {
                        if (!_.isEqual(response.data.state, "success")) {
                            fms.Notifications.Toastr.CreateErrorNotification();
                            return;
                        }
                        $scope.newPayment["DocumentId"] = response.data.documentId;
                        $scope.newPayment["MemberId"] = $scope.record["Id"];
                        var keyValue = fms.Functions.SplitObjectIntoArray($scope.newPayment);
                        appService.PostForm("/Payment/AddPayment", { payment: keyValue })
                            .then(function successCallback(response) {
                                if (response.data.state !== "success") {
                                    fms.Notifications.Toastr.CreateErrorNotification();
                                    return;
                                }
                                fms.Notifications.Toastr.CreateSuccessNotification();
                                appService.RefreshCurrentState();
                            },
                            function errorCallback(response) {
                            });
                    },
                    function errorCallback(response) {
                    });
            };

            $scope.DeactivateMember = function () {
                appService.GetData(fms.Entity.Member.Urls.DeactivateMember,
                    {
                        memberId: $scope.record["Id"]
                    })
                    .then(function (response) {
                        appService.NavigateTo("member-list");
                    },
                    function (response) {
                    });
            };

            $scope.Delete = function () {
                fms.Routes.ConfirmationLookup($uibModal, $scope.DeactivateMember);
            };

            $scope.processForm = function (form) {
                $scope.formHasBeenSubmitted = true;
                if (!form.$valid) {
                    return null;
                }
                var keyValue = fms.Functions.SplitObjectIntoArray($scope.record);
                appService.PostForm(fms.Entity.Member.Urls.AddMember, { member: keyValue })
                    .then(function (response) {
                        if (response.data.state !== "success") {
                            fms.Notifications.Toastr.CreateErrorNotification();
                            return;
                        }
                        fms.Notifications.Toastr.CreateSuccessNotification();
                        appService.NavigateTo("editmember", { memberid: response.data.memberId });
                    },
                    function (response) {
                    });
            };

        }
    ]);