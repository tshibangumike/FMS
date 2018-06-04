angular.module("fmsApp")
    .controller("LoginController",
    [
        "$rootScope", "$scope", "appService",
        function ($rootScope, $scope, appService) {

            $scope.account = {};

            $scope.processForm = function () {
                appService.PostForm("/Account/Authenticate", { username: $scope.account.Username, password: $scope.account.Password })
                    .then(function successCallback(response) {
                        appService.NavigateTo("listfuneral");
                    }, function errorCallback(response) {
                    });
                //appService.NavigateTo("listfuneral");
            };

        }
    ]);