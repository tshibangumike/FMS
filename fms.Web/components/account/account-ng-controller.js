angular.module("fmsApp")
    .controller("LoginController",
        [
            "$rootScope", "$scope", "appService",
            function($rootScope, $scope, appService) {

                $scope.account = {};
                $scope.errorMessage = null;
                $scope.formHasBeenSubmitted = false;

                $scope.processForm = function() {
                    $scope.formHasBeenSubmitted = true;
                    appService.PostForm("/Account/Authenticate",
                            { username: $scope.account["Username"], password: $scope.account["Password"] })
                        .then(function(response) {
                                if (_.isEqual(response.data.state, "error")) {
                                    $scope.errorMessage = response.data.message;
                                    return;
                                }
                                appService.NavigateTo("listfuneral");
                            },
                            function(response) {
                            });
                };
            }
        ]);