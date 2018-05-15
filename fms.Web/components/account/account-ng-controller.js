angular.module("fmsApp")
    .controller("LoginController",
    [
        "$rootScope", "$scope", "appService",
        function ($rootScope, $scope, appService) {

            $scope.account = {};

            $scope.processForm = function () {
                appService.NavigateTo("listfuneral");
            };

        }
    ]);