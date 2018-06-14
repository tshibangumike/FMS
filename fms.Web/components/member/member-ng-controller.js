angular.module("fmsApp")
    .controller("ListMemberController",
        [
            "$rootScope", "$scope", "appService", "records",
            function($rootScope, $scope, appService, records) {

                $scope.records = records.data;
                $scope.selectedRecordIds = [];

                $scope.selectAll = function(isSelected) {
                    fms.Functions.SelectAllRecords(isSelected, $scope.records);
                };

                $scope.selectRecord = function(record) {
                    fms.Functions.AddToOrRemoveFromArrayAnItemBasedOnId($scope.selectedRecords, record);
                };

                $scope.toggleSelection = function(record) {
                    record.Selected = !record.Selected;
                };

                $scope.create = function() {
                    appService.NavigateTo("addmember");
                };

                $scope.edit = function(record) {
                    if (_.isNull(record))
                        appService.NavigateTo("editmember", { memberid: $scope.selectedRecordIds[0] });
                    else
                        appService.NavigateTo("editmember", { memberid: record.Id });
                };

            }
        ])
    .controller("AddMemberController",
        [
            "$rootScope", "$scope", "appService",
            function($rootScope, $scope, appService) {

                $scope.record = {};
                $scope.formHasBeenSubmitted = false;

                $scope.processForm = function(form) {
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
            "$rootScope", "$scope", "appService", "record", "payments", "paymentPeriods",
            function($rootScope, $scope, appService, record, payments, paymentPeriods) {

                $scope.record = record.data;
                $scope.payments = payments.data;
                $scope.paymentPeriods = paymentPeriods.data;
                $scope.newPayment = {};
                $scope.formHasBeenSubmitted = false;
                $scope.Tabs = [
                    { Name: "GeneralInformation", Show: true },
                    { Name: "Payment", Show: true }
                ];

                $scope.collapseExpand = function(elementId) {
                    var tab = _.find($scope.Tabs, function(x) { return _.isEqual(x.Name, elementId); });
                    if (_.isUndefined(tab)) return;
                    tab.Show = !tab.Show;
                };

                $scope.getTabByName = function() {

                    if (arguments.length === 0) return null;
                    var elementId = arguments[0] == null ? null : arguments[0];

                    return _.find($scope.Tabs, function(x) { return _.isEqual(x.Name, elementId); });

                };

                $scope.OnChange_FileInput = function(e) {
                    if (e.files.length === 0) {
                        $scope.newProofOfPayment = null;
                        return;
                    }
                    $scope.newProofOfPayment = e.files[0];
                };

                $scope.ClearFileInput = function(inputId) {
                    $("#ProofOfPayment").replaceWith($("#ProofOfPayment").val("").clone(true));
                };

                $scope.addPayment = function() {

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
                                $scope.newPayment["PaymentDate"] = $("#paymentDate").val();
                                var keyValue = fms.Functions.SplitObjectIntoArray($scope.newPayment);
                                appService.PostForm("/Payment/AddPayment", { payment: keyValue })
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
                            },
                            function errorCallback(response) {
                            });
                };

                $scope.processForm = function(form) {
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
        ]);