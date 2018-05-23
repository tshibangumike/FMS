
angular.module("fmsApp")
    .config([
        "$stateProvider", "$urlRouterProvider", "$httpProvider",
        function ($stateProvider, $urlRouterProvider, $httpProvider) {

            //$httpProvider.interceptors.push("httpLoader");
            $urlRouterProvider.otherwise("/login");

            var states = [
                fms.Routes.SetRoutes("account", "login"),
                fms.Routes.SetRoutes("funeral", "list"),
                fms.Routes.SetRoutes("funeral", "add"),
                fms.Routes.SetRoutes("funeral", "edit"),
                fms.Routes.SetRoutes("member", "list")
            ];

            states.forEach(function (state) {
                $stateProvider.state(state);
            });

        }
    ]);
