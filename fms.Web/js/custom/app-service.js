
angular.module("fmsApp")
    .service("appService", [
        "$http", "$state",
        function ($http, $state) {
            return {
                GetData: function (url, paramObject) {
                    return $http({
                        method: "POST",
                        url: url,
                        data: paramObject
                    });
                },
                SendData: function (url, paramObject) {
                    return $http({
                        method: "GET",
                        url: url,
                        data: paramObject
                    });
                },
                PostForm: function (url, formData) {
                    return $http({
                        method: "POST",
                        url: url,
                        data: $.param(formData),
                        headers: { 'Content-Type': "application/x-www-form-urlencoded" }
                    });
                },
                NavigateTo: function () {
                    if (arguments.length === 0) return null;
                    var entityView = arguments[0] == null ? null : arguments[0];
                    var parameters = arguments[1] == null ? null : arguments[1];
                    if (parameters != null) {
                        $state.go(entityView, parameters);
                    } else {
                        $state.go(entityView);
                    }
                    return null;
                },
                RefreshCurrentState: function () {
                    $state.go($state.current, {}, { reload: true });
                }
            };
        }
    ]);
