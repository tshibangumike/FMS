angular.module("fmsApp")
    .controller("ListFuneralController",
    [
        "$scope", "appService", "funerals",
        function ($scope, appService, funerals) {

            $scope.records = funerals.data;
            $scope.selectedRecordIds = [];

            $scope.selectRecord = function () {

                if (arguments.length === 0) return null;
                var _record = arguments[0] == null ? null : arguments[0];

                if (_record.Selected) {
                    //add id in array
                    $scope.selectedRecordIds.push(_record.Id);
                }
                else {
                    //remove id from array
                    var evens = _.remove($scope.selectedRecordIds, function (x) {
                        return _.isEqual(x, _record.Id);
                    });
                }

            };

            $scope.editRecord = function () {

                var _record = null;

                if (arguments.length === 1)
                    _record = _.isEqual(arguments.length, 1) ? arguments[0] : null;

                if (_.isNull(_record))
                    appService.NavigateTo("editfuneral", { funeralid: $scope.selectedRecordIds[0] });
                else
                    appService.NavigateTo("editfuneral", { funeralid: _record.Id });

            };

        }
    ])
    .controller("AddFuneralController",
    [
        "$rootScope", "$scope", "$uibModal", "appService",
        function ($rootScope, $scope, $uibModal, appService) {

            $scope.funeral = {};
            $scope.deceased = {};
            $scope.informant = {};
            $scope.nextOfKin = {};
            $scope.doctor = {};
            $scope.homeAffairesOfficer = {};

            $scope.getHospitals = function () {

                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: "modal-title",
                    ariaDescribedBy: "modal-body",
                    templateUrl: "/components/hospital/modal/modal-list-hospital.html",
                    controller: "ListHospitalController",
                    size: "lg",
                    resolve: {
                        records: [
                            "appService", function (appService) {
                                return appService.GetData("/Hospital/GetHospitals");
                            }
                        ]
                    }
                });

                modalInstance.result.then(function (selectedRecord) {
                    $scope.doctor["HospitalName"] = selectedRecord.Name;
                    $scope.doctor["HospitalId"] = selectedRecord.Id;
                });

            };

            $scope.addNewHospital = function () {

                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: "modal-title",
                    ariaDescribedBy: "modal-body",
                    templateUrl: "/components/hospital/modal-add-hospital.html",
                    controller: "AddHospitalController",
                    size: "lg",
                });

                modalInstance.result.then(function (selectedRecord) {
                    $scope.vehicle["VehicleDriverName"] = selectedRecord.Name;
                    $scope.vehicle["VehicleDriverId"] = selectedRecord.Id;
                });

            };

            $scope.processForm = function () {
                if (arguments.length === 0) return null;
                var form = arguments[0] == null ? null : arguments[0];
                if (!form.$valid) {
                    return null;
                }
                $scope.deceased["DateOfDeath"] = $("#DateOfDeath").val();
                var keyValuesDeceased = fms.Functions.SplitObjectIntoArray($scope.deceased);
                var keyValuesInformant = fms.Functions.SplitObjectIntoArray($scope.informant);
                var keyValuesNextOfKin = fms.Functions.SplitObjectIntoArray($scope.nextOfKin);
                var keyValuesDoctor = fms.Functions.SplitObjectIntoArray($scope.doctor);
                var keyValuesHomeAffairsOfficer = fms.Functions.SplitObjectIntoArray($scope.homeAffairesOfficer);
                var keyValuesFuneral = fms.Functions.SplitObjectIntoArray($scope.funeral);
                appService.PostForm("/Funeral/CreateFuneral", {
                    deceased: keyValuesDeceased
                    , informant: keyValuesInformant
                    , nextOfKin: keyValuesNextOfKin
                    , doctor: keyValuesDoctor
                    , homeAffairsOfficer: keyValuesHomeAffairsOfficer
                    , funeral: keyValuesFuneral
                })
            };

        }
    ])
    .controller("EditFuneralController",
    [
        "$scope", "$uibModal", "appService", "funeral", "deceased", "informant", "nextOfKin", "doctor", "homeAffairsOfficer", "funeralBoughtItems",
        function ($scope, $uibModal, appService, funeral, deceased, informant, nextOfKin, doctor, homeAffairsOfficer, funeralBoughtItems) {

            $scope.funeral = funeral.data;
            $scope.deceased = deceased.data;
            $scope.informant = informant.data;
            $scope.nextOfKin = nextOfKin.data;
            $scope.doctor = doctor.data;
            $scope.homeAffairsOfficer = homeAffairsOfficer.data;
            $scope.funeralBoughtItems = funeralBoughtItems.data;
            $scope.newFuneralBoughtItem = { Quantity: 1 };

            $scope.getHospitals = function () {

                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: "modal-title",
                    ariaDescribedBy: "modal-body",
                    templateUrl: "/components/hospital/modal/modal-list-hospital.html",
                    controller: "ListHospitalController",
                    size: "lg",
                    resolve: {
                        records: [
                            "appService", function (appService) {
                                return appService.GetData("/Hospital/GetActiveHospitals");
                            }
                        ]
                    }
                });

                modalInstance.result.then(function (selectedRecord) {
                    $scope.doctor["HospitalName"] = selectedRecord.Name;
                    $scope.doctor["HospitalId"] = selectedRecord.Id;
                });

            };

            $scope.getCemeteries = function () {

                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: "modal-title",
                    ariaDescribedBy: "modal-body",
                    templateUrl: "/components/cemetery/modal/modal-list-cemetery.html",
                    controller: "ListCemeteryController",
                    size: "lg",
                    resolve: {
                        records: [
                            "appService", function (appService) {
                                return appService.GetData("/Cemetery/GetActiveCemeteries");
                            }
                        ]
                    }
                });

                modalInstance.result.then(function (selectedRecord) {
                    $scope.funeral["CemeteryName"] = selectedRecord.Name;
                    $scope.funeral["CemeteryId"] = selectedRecord.Id;
                });

            };

            $scope.getMortuaries = function () {

                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: "modal-title",
                    ariaDescribedBy: "modal-body",
                    templateUrl: "/components/mortuary/modal/modal-list-mortuary.html",
                    controller: "ListMortuaryController",
                    size: "lg",
                    resolve: {
                        records: [
                            "appService", function (appService) {
                                return appService.GetData("/Mortuary/GetActiveMortuaries");
                            }
                        ]
                    }
                });

                modalInstance.result.then(function (selectedRecord) {
                    $scope.funeral["MortuaryName"] = selectedRecord.Name;
                    $scope.funeral["MortuaryId"] = selectedRecord.Id;
                });

            };

            $scope.clearLookupInput = function () {

                if (arguments.length === 0) return null;
                var entityName = arguments[0] == null ? null : arguments[0];
                switch (entityName) {
                    case "mortuary":
                        $scope.funeral["MortuaryName"] = null;
                        $scope.funeral["MortuaryId"] = null;
                        break;
                    case "cemetery":
                        $scope.funeral["CemeteryName"] = null;
                        $scope.funeral["CemeteryId"] = null;
                    default:
                }

            };

            $scope.addFuneralBoughtItem = function () {

                $scope.newFuneralBoughtItem["FuneralId"] = $scope.funeral.Id;
                var keyValueFuneralBoughtItem = fms.Functions.SplitObjectIntoArray($scope.newFuneralBoughtItem);
                appService.PostForm("/FuneralBoughtItem/AddFuneralBoughtItem", { funeralBoughtItem: keyValueFuneralBoughtItem })
                    .then(function successCallback(response) {

                        return appService.RefreshCurrentState();

                    }, function errorCallback(response) {
                    });

            };

            $scope.processForm = function () {
                if (arguments.length === 0) return null;
                var form = arguments[0] == null ? null : arguments[0];
                if (!form.$valid) {
                    return null;
                }
                $scope.deceased["DateOfDeath"] = $("#DateOfDeath").val();
                var keyValuesDeceased = fms.Functions.SplitObjectIntoArray($scope.deceased);
                var keyValuesInformant = fms.Functions.SplitObjectIntoArray($scope.informant);
                var keyValuesNextOfKin = fms.Functions.SplitObjectIntoArray($scope.nextOfKin);
                var keyValuesDoctor = fms.Functions.SplitObjectIntoArray($scope.doctor);
                var keyValuesHomeAffairsOfficer = fms.Functions.SplitObjectIntoArray($scope.homeAffairesOfficer);
                var keyValuesFuneral = fms.Functions.SplitObjectIntoArray($scope.funeral);
                appService.PostForm("/Funeral/UpdateFuneral", {
                    deceased: keyValuesDeceased
                    , informant: keyValuesInformant
                    , nextOfKin: keyValuesNextOfKin
                    , doctor: keyValuesDoctor
                    , homeAffairsOfficer: keyValuesHomeAffairsOfficer
                    , funeral: keyValuesFuneral
                }).then(function successCallback(response) {

                }, function errorCallback(response) {
                });
            };

        }
    ]);