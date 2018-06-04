angular.module("fmsApp")
    .controller("ListDeceasedController",
    [
        "$rootScope", "$scope", "appService", "deceaseds",
        function ($rootScope, $scope, appService, deceaseds) {

            $scope.records = deceaseds.data;
            $scope.selectedRecords = [];

            $scope.selectRecord = function () {
                if (_.isEqual(arguments.length, 0)) return null;
                var _record = _.isNull(arguments[0], 0) ? null : arguments[0];
                if (_.isNull(arguments[0])) return null;
                if (_record.Selected) {
                    //add id in array
                    $scope.selectedRecords.push(_record);
                }
                else {
                    //remove id from array
                    _.remove($scope.selectedRecords, function (x) {
                        return _.isEqual(x.Id, _record.Id);
                    });
                }
            };

            $scope.addNewDoctor = function () {

                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: "modal-title",
                    ariaDescribedBy: "modal-body",
                    templateUrl: "/components/doctor/modal/modal-add-doctor.html",
                    controller: "AddDoctorController",
                    size: "lg",
                    backdrop: false,
                });

                modalInstance.result.then(function (selectedRecord) {
                    $scope.selectedRecords.push(selectedRecord);
                    if (!_.isEqual($scope.selectedRecords.length, 1)) return;
                    $uibModalInstance.close($scope.selectedRecords[0]);
                });

            };

            $scope.save = function () {
                if (!_.isEqual($scope.selectedRecords.length, 1)) return;
                $uibModalInstance.close($scope.selectedRecords[0]);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss("cancel");
            };

        }
    ]);