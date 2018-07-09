angular.module("fmsApp")
    .controller("ModalConfirmationDialogDoctorController",
        [
            "$scope", "$uibModal", "$uibModalInstance", 
            function($scope, $uibModal, $uibModalInstance) {

                $scope.ok = function() {
                    $uibModalInstance.close("ok");
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss("cancel");
                };

            }
        ]);