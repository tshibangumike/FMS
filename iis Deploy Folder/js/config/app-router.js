
angular.module("fmsApp")
    .config([
        "$stateProvider", "$urlRouterProvider", "$httpProvider",
        function ($stateProvider, $urlRouterProvider, $httpProvider) {

            $httpProvider.interceptors.push("httpLoader");
            $urlRouterProvider.otherwise("/login");

            var states = [
                fms.Routes.SetRoutes("account", "login"),
                fms.Routes.SetRoutes("funeral", "list"),
                fms.Routes.SetRoutes("funeral", "add"),
                fms.Routes.SetRoutes("funeral", "edit"),
                fms.Routes.SetRoutes("deceased", "list"),
                fms.Routes.SetRoutes("informant", "list"),
                fms.Routes.SetRoutes("nextofkin", "list"),
                fms.Routes.SetRoutes("doctor", "list"),
                fms.Routes.SetRoutes("homeaffairsofficer", "list")
            ];

            states.forEach(function (state) {
                $stateProvider.state(state);
            });

        }
    ]);
