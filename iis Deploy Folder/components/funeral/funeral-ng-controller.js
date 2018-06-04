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

            $scope.create = function () {

                appService.NavigateTo("addfuneral");

            };

            $scope.edit = function () {

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
            $scope.homeAffairsOfficer = {};
            $scope.Tabs = [
                { Name: "BeforeMortuary", Show: true },
                { Name: "Documents", Show: false },
                { Name: "Deceased", Show: true },
                { Name: "Informant", Show: true },
                { Name: "NextOfKin", Show: true },
                { Name: "Doctor", Show: true },
                { Name: "HomeAffairsOfficer", Show: true },
                { Name: "OtherInformation", Show: true },
                { Name: "PurchasedItems", Show: true },
                { Name: "UploadedItems", Show: true }
            ];

            $scope.collapseExpand = function () {

                if (arguments.length === 0) return null;
                var elementId = arguments[0] == null ? null : arguments[0];

                var tab = _.find($scope.Tabs, function (x) { return _.isEqual(x.Name, elementId); });
                if (_.isUndefined(tab)) return null;
                tab.Show = !tab.Show;
            };

            $scope.getTabByName = function () {

                if (arguments.length === 0) return null;
                var elementId = arguments[0] == null ? null : arguments[0];

                return _.find($scope.Tabs, function (x) { return _.isEqual(x.Name, elementId); });

            };

            $scope.getDoctor = function () {

                if (_.isNull($scope.funeral.DoctorId)) return null;

                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: "modal-title",
                    ariaDescribedBy: "modal-body",
                    templateUrl: "/components/doctor/modal/modal-edit-doctor.html",
                    controller: "ModalEditDoctorController",
                    size: "lg",
                    resolve: {
                        doctor: [
                            "appService", function (appService) {
                                return appService.GetData(fms.Entity.Doctor.Urls.GetDoctorById, { doctorId: $scope.funeral.DoctorId });
                            }
                        ]
                    }
                });

                modalInstance.result.then(function (selectedRecord) {
                    $scope.doctor = selectedRecord;
                    $scope.funeral["DoctorId"] = selectedRecord.Id;
                });

            };

            $scope.setSelectedDoctor = function() {
                if (arguments.length === 0) return false;
                var selectedRecord = arguments[0] == null ? null : arguments[0];
                $scope.doctor = selectedRecord;
                $scope.funeral["DoctorId"] = selectedRecord["Id"];
                return true;
            };

            $scope.getDoctors = function () {

                fms.Routes.SetListLookup(
                    $uibModal,
                    appService,
                    "/components/doctor/modal/modal-list-doctor.html",
                    "ModalListDoctorController",
                    {
                        records: [
                            "appService", function (appService) {
                                return appService.GetData(fms.Entity.Doctor.Urls.GetActiveDoctors);
                            }
                        ]
                    },
                    $scope.setSelectedDoctor
                );

            };

            $scope.getHomeAffairsOfficer = function () {

                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: "modal-title",
                    ariaDescribedBy: "modal-body",
                    templateUrl: "/components/homeaffairsofficer/modal/modal-edit-homeaffairsofficer.html",
                    controller: "ModalEditHomeAffairsOfficerController",
                    size: "lg",
                    resolve: {
                        homeAffairsOfficer: [
                            "appService", function (appService) {
                                return appService.GetData(fms.Entity.HomeAffairsOfficer.Urls.GetHomeAffairsOfficerById, { homeaffairsofficerId: $scope.homeAffairsOfficer.Id });
                            }
                        ]
                    }
                });

                modalInstance.result.then(function (selectedRecord) {
                    $scope.doctor["HospitalName"] = selectedRecord.Name;
                    $scope.doctor["HospitalId"] = selectedRecord.Id;
                });

            };

            $scope.setSelectedHomeAffairsOfficer = function () {
                if (arguments.length === 0) return false;
                var selectedRecord = arguments[0] == null ? null : arguments[0];
                $scope.homeAffairsOfficer = selectedRecord;
                $scope.funeral["HomeAffairsOfficerId"] = selectedRecord["Id"];
                return true;
            };

            $scope.getHomeAffairsOfficers = function () {
                fms.Routes.SetListLookup(
                    $uibModal,
                    appService,
                    "/components/homeaffairsofficer/modal/modal-list-homeaffairsofficer.html",
                    "ModalListHomeAffairsOfficerController",
                    {
                        records: [
                            "appService", function (appService) {
                                return appService.GetData(fms.Entity.HomeAffairsOfficer.Urls.GetActiveHomeAffairsOfficers);
                            }
                        ]
                    },
                    $scope.setSelectedHomeAffairsOfficer
                );
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
                        break;
                    case "doctor":
                        $scope.doctor = null;
                        $scope.funeral["DoctorId"] = null;
                        break;
                    case "homeAffairsOfficer":
                        $scope.homeAffairsOfficer = null;
                        $scope.funeral["HomeAffairsOfficerId"] = null;
                        break;
                    case "newFuneralBoughtItem.supplier":
                        $scope.newFuneralBoughtItem["SupplierId"] = null;
                        $scope.newFuneralBoughtItem["SupplierName"] = null;
                        break;
                    default:
                }

            };

            $scope.OnChange_SAIdNumber = function () {

                var data = fms.Functions.ExtractFromIdNunmber($scope.deceased["SAIdNumber"]);
                $scope.deceased["DateOfBirth"] = moment(data.birthdate).format("MM/DD/YYYY HH:mm A");
                $scope.deceased["GenderId"] = data.gender === "male" ? 1: 2;

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
                var keyValuesHomeAffairsOfficer = fms.Functions.SplitObjectIntoArray($scope.homeAffairsOfficer);
                var keyValuesFuneral = fms.Functions.SplitObjectIntoArray($scope.funeral);
                appService.PostForm("/Funeral/CreateFuneral", {
                    deceased: keyValuesDeceased
                    , informant: keyValuesInformant
                    , nextOfKin: keyValuesNextOfKin
                    , doctor: keyValuesDoctor
                    , homeAffairsOfficer: keyValuesHomeAffairsOfficer
                    , funeral: keyValuesFuneral
                }).then(function successCallback(response) {
                    appService.NavigateTo("editfuneral", { funeralid: response.data.funeralId });
                }, function errorCallback(response) {
                });
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
            $scope.funeralDocuments = [];
            $scope.newFuneralBoughtItem = { Quantity: 1, Description: null };
            $scope.selectedFuneralBoughtItemIds = [];
            $scope.newFuneralDocument = null;
            $scope.Tabs = [
                { Name: "BeforeMortuary", Show: true },
                { Name: "DuringMortuary", Show: false },
                { Name: "AfterMortuary", Show: false },
                { Name: "Documents", Show: false },
                { Name: "Deceased", Show: true },
                { Name: "Informant", Show: true },
                { Name: "NextOfKin", Show: true },
                { Name: "Doctor", Show: true },
                { Name: "HomeAffairsOfficer", Show: true },
                { Name: "OtherInformation", Show: true },
                { Name: "PurchasedItems", Show: true },
                { Name: "UploadedItems", Show: true }
            ];

            $scope.collapseExpand = function () {

                if (arguments.length === 0) return null;
                var elementId = arguments[0] == null ? null : arguments[0];

                var tab = _.find($scope.Tabs, function (x) { return _.isEqual(x.Name, elementId); });
                if (_.isUndefined(tab)) return null;
                tab.Show = !tab.Show;
            };

            $scope.getTabByName = function () {

                if (arguments.length === 0) return null;
                var elementId = arguments[0] == null ? null : arguments[0];

                return _.find($scope.Tabs, function (x) { return _.isEqual(x.Name, elementId); });

            };

            $scope.goToCreateView = function () {

                appService.NavigateTo("addfuneral");

            };

            /*---Doctor Lookup - START*/
            $scope.getDoctor = function () {

                if (_.isNull($scope.funeral.DoctorId)) return null;

                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: "modal-title",
                    ariaDescribedBy: "modal-body",
                    templateUrl: "/components/doctor/modal/modal-edit-doctor.html",
                    controller: "ModalEditDoctorController",
                    size: "lg",
                    resolve: {
                        doctor: [
                            "appService", function (appService) {
                                return appService.GetData(fms.Entity.Doctor.Urls.GetDoctorById, { doctorId: $scope.funeral.DoctorId });
                            }
                        ]
                    }
                });

                modalInstance.result.then(function (selectedRecord) {
                    $scope.doctor = selectedRecord;
                    $scope.funeral["DoctorId"] = selectedRecord.Id;
                });

            };
            $scope.setSelectedDoctor = function () {
                if (arguments.length === 0) return false;
                var selectedRecord = arguments[0] == null ? null : arguments[0];
                $scope.doctor = selectedRecord;
                $scope.funeral["DoctorId"] = selectedRecord["Id"];
                return true;
            };
            $scope.getDoctors = function () {

                fms.Routes.SetListLookup(
                    $uibModal,
                    appService,
                    "/components/doctor/modal/modal-list-doctor.html",
                    "ModalListDoctorController",
                    {
                        records: [
                            "appService", function (appService) {
                                return appService.GetData(fms.Entity.Doctor.Urls.GetActiveDoctors);
                            }
                        ]
                    },
                    $scope.setSelectedDoctor
                );

            };
            /*---Doctor Lookup - END*/

            /*---Home Affairs Officer Lookup - START*/
            $scope.getHomeAffairsOfficer = function () {
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: "modal-title",
                    ariaDescribedBy: "modal-body",
                    templateUrl: "/components/homeaffairsofficer/modal/modal-edit-homeaffairsofficer.html",
                    controller: "ModalEditHomeAffairsOfficerController",
                    size: "lg",
                    resolve: {
                        homeAffairsOfficer: [
                            "appService", function (appService) {
                                return appService.GetData(fms.Entity.HomeAffairsOfficer.Urls.GetHomeAffairsOfficerById, { homeaffairsofficerId: $scope.homeAffairsOfficer.Id });
                            }
                        ]
                    }
                });
                modalInstance.result.then(function (selectedRecord) {
                    $scope.doctor["HospitalName"] = selectedRecord.Name;
                    $scope.doctor["HospitalId"] = selectedRecord.Id;
                });
            };
            $scope.setSelectedHomeAffairsOfficer = function () {
                if (arguments.length === 0) return false;
                var selectedRecord = arguments[0] == null ? null : arguments[0];
                $scope.homeAffairsOfficer = selectedRecord;
                $scope.funeral["HomeAffairsOfficerId"] = selectedRecord["Id"];
                return true;
            };
            $scope.getHomeAffairsOfficers = function () {
                fms.Routes.SetListLookup(
                    $uibModal,
                    appService,
                    "/components/homeaffairsofficer/modal/modal-list-homeaffairsofficer.html",
                    "ModalListHomeAffairsOfficerController",
                    {
                        records: [
                            "appService", function (appService) {
                                return appService.GetData(fms.Entity.HomeAffairsOfficer.Urls.GetActiveHomeAffairsOfficers);
                            }
                        ]
                    },
                    $scope.setSelectedHomeAffairsOfficer
                );
            };
            /*---Doctor Lookup - END*/

            /*---Cemetery Lookup - START*/
            $scope.setSelectedCemetery = function () {
                if (arguments.length === 0) return false;
                var selectedRecord = arguments[0] == null ? null : arguments[0];
                $scope.cemetery = selectedRecord;
                $scope.funeral["CemeteryId"] = selectedRecord["Id"];
                return true;
            };
            $scope.getCemeteries = function () {
                fms.Routes.SetListLookup(
                    $uibModal,
                    appService,
                    "/components/cemetery/modal/modal-list-cemetery.html",
                    "ModalListCemeteryController",
                    {
                        records: [
                            "appService", function (appService) {
                                return appService.GetData(fms.Entity.Cemetery.Urls.GetActiveCemeteries);
                            }
                        ]
                    },
                    $scope.setSelectedCemetery
                );
            };
            /*---Cemetery Lookup - END*/

            /*---Mortuary Lookup - START*/
            $scope.setSelectedMortuary = function () {
                if (arguments.length === 0) return false;
                var selectedRecord = arguments[0] == null ? null : arguments[0];
                $scope.mortuary = selectedRecord;
                $scope.funeral["MortuaryId"] = selectedRecord["Id"];
                return true;
            };
            $scope.getMortuaries = function () {
                fms.Routes.SetListLookup(
                    $uibModal,
                    appService,
                    "/components/mortuary/modal/modal-list-mortuary.html",
                    "ModalListMortuaryController",
                    {
                        records: [
                            "appService", function (appService) {
                                return appService.GetData(fms.Entity.Cemetery.Urls.GetActiveCemeteries);
                            }
                        ]
                    },
                    $scope.setSelectedMortuary
                );
            };
            /*---Mortuary Lookup - END*/
            
            /*---Supplier Lookup - START*/
            $scope.setSelectedSupplier = function() {
                if (arguments.length === 0) return false;
                var selectedRecord = arguments[0] == null ? null : arguments[0];
                $scope.supplier = selectedRecord;
                $scope.newFuneralBoughtItem["SupplierId"] = selectedRecord["Id"];
                return true;
            };
            $scope.getSuppliers = function() {
                fms.Routes.SetListLookup(
                    $uibModal,
                    appService,
                    "/components/supplier/modal/modal-list-supplier.html",
                    "ModalListSupplierController",
                    {
                        records: [
                            "appService", function(appService) {
                                return appService.GetData(fms.Entity.Supplier.Urls.GetActiveSuppliers);
                            }
                        ]
                    },
                    $scope.setSelectedSupplier
                );
            };
            /*---Supplier Lookup - END*/

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
                        break;
                    case "doctor":
                        $scope.doctor = null;
                        $scope.funeral["DoctorId"] = null;
                        break;
                    case "homeAffairsOfficer":
                        $scope.homeAffairsOfficer = null;
                        $scope.funeral["HomeAffairsOfficerId"] = null;
                        break;
                    case "newFuneralBoughtItem.supplier":
                        $scope.newFuneralBoughtItem["SupplierId"] = null;
                        $scope.newFuneralBoughtItem["SupplierName"] = null;
                        break;
                    default:
                }

            };

            $scope.selectFuneralBoughtItemRecord = function () {

                if (arguments.length === 0) return null;
                var _record = arguments[0] == null ? null : arguments[0];

                if (_record.Selected) {
                    //add id in array
                    $scope.selectedFuneralBoughtItemIds.push(_record.Id);
                }
                else {
                    //remove id from array
                    var evens = _.remove($scope.selectedFuneralBoughtItemIds, function (x) {
                        return _.isEqual(x, _record.Id);
                    });
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
            $scope.disableAddFuneralBoughtItemButton = function () {

                return ((_.isNull($scope.newFuneralBoughtItem.Name) || _.isUndefined($scope.newFuneralBoughtItem.Name))
                    || (_.isNull($scope.newFuneralBoughtItem.Quantity) || _.isUndefined($scope.newFuneralBoughtItem.Quantity))
                    || (_.isNull($scope.newFuneralBoughtItem.Amount) || _.isUndefined($scope.newFuneralBoughtItem.Amount)));

            };
            $scope.disableDeleteFuneralBoughtItemButton = function () {

                return $scope.selectedFuneralBoughtItemIds.length == 0;

            };
            $scope.disableEditFuneralBoughtItemButton = function () {
                return $scope.selectedFuneralBoughtItemIds.length !== 1;
            };

            $scope.getFuneralDocuments = function () {

                if ($scope.funeralDocuments.length !== 0) return;
                $scope.showFechDocumentsLoadingIcon = true;
                appService.GetData("/FuneralDocument/GetFuneralDocumentsByFuneralId", { funeralId: $scope.funeral.Id })
                    .then(function successCallback(response) {
                        $scope.showFechDocumentsLoadingIcon = false;
                        $scope.funeralDocuments = response.data;

                    }, function errorCallback(response) {
                    });

            };
            $scope.OnChange_FileInput = function (e) {

                if (arguments.length === 0) return null;
                var e = arguments[0] == null ? null : arguments[0];
                if (e.files.length === 0) {
                    $scope.newFuneralDocument = null;
                    return null;
                }
                $scope.newFuneralDocument = e.files[0];
            };
            $scope.ClearFileInput = function () {
                if (arguments.length === 0) return null;
                var inputId = arguments[0] == null ? null : arguments[0];
                $("#funeralDocument").replaceWith($("#funeralDocument").val("").clone(true));
            };
            $scope.uploadFuneralDocument = function () {
                appService.UploadFile(
                    "FuneralDocument/AddFuneralDocument",
                    $scope.newFuneralDocument,
                    {
                        documentTypeId: $scope.newFuneralDocument.DocumentTypeId,
                        description: $scope.newFuneralDocument.Description,
                        funeralId: $scope.funeral.Id
                    },
                    "document")
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
                $scope.deceased["DateOfBirth"] = $("#DateOfBirth").val();
                var keyValuesDeceased = fms.Functions.SplitObjectIntoArray($scope.deceased);
                var keyValuesInformant = fms.Functions.SplitObjectIntoArray($scope.informant);
                var keyValuesNextOfKin = fms.Functions.SplitObjectIntoArray($scope.nextOfKin);
                var keyValuesDoctor = fms.Functions.SplitObjectIntoArray($scope.doctor);
                var keyValuesHomeAffairsOfficer = fms.Functions.SplitObjectIntoArray($scope.homeAffairsOfficer);
                var keyValuesFuneral = fms.Functions.SplitObjectIntoArray($scope.funeral);
                appService.PostForm("/Funeral/UpdateFuneral", {
                    deceased: keyValuesDeceased
                    , informant: keyValuesInformant
                    , nextOfKin: keyValuesNextOfKin
                    , doctor: keyValuesDoctor
                    , homeAffairsOfficer: keyValuesHomeAffairsOfficer
                    , funeral: keyValuesFuneral
                }).then(function successCallback(response) {
                    if (response.data.state !== "success") {
                        fms.Notifications.Toastr.UpdateErrorNotification();
                    }
                    fms.Notifications.Toastr.UpdateSuccessNotification();
                    return appService.RefreshCurrentState();
                }, function errorCallback(response) {
                });
            };

        }
    ]);