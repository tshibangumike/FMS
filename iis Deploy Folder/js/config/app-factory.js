angular.module("fmsApp")
    .factory("httpLoader", [
        "$rootScope", "$q", function ($rootScope, $q) {
            var pendingRequests = 0;
            return {
                request: function (config) {
                    pendingRequests++;
                    fms.Loading.Start($rootScope.LoadingText);
                    return config || $q.when(config);
                },
                response: function (response) {
                    if ((--pendingRequests) === 0) {
                        fms.Loading.Stop();
                    }
                    return response || $q.when(response);
                },
                responseError: function (response) {
                    if ((--pendingRequests) === 0) {
                        fms.Loading.Stop();
                    }
                    return $q.reject(response);
                }
            };
        }
    ]);

