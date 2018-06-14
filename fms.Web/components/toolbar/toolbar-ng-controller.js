angular.module("fmsApp")
    .controller("ToolbarController",
    [
        "$rootScope", "$scope", "appService", "currentUser",
        function ($rootScope, $scope, appService, currentUser) {

            $scope.currentUser = currentUser.data.appUser;

        }
    ]);