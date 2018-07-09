angular.module("fmsApp")
    .controller("ToolbarController",
    [
        "$rootScope", "$scope", "appService", "currentUser",
        function ($rootScope, $scope, appService, currentUser) {

            $scope.currentUser = currentUser.data.appUser;

            $scope.Logout = function () {
                appService.PostForm("/Account/Logout")
                    .then(function (response) {
                        appService.NavigateTo("login");
                    },
                    function (response) {
                    });
            };
        }
    ]);