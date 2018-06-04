angular.module("fmsApp")
    .controller("ListMemberController",
    [
        "$rootScope", "$scope", "appService",
        function ($rootScope, $scope, appService) {

            $scope.member = {};

        }
    ])
    .controller("AddMemberController",
    [
        "$rootScope", "$scope", "appService",
        function ($rootScope, $scope, appService) {

            $scope.member = {};

        }
    ]);