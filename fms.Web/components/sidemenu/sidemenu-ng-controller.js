angular.module("fmsApp")
    .controller("SideMenuController",
    [
        "$scope", 
        function ($scope) {

            $scope.tabs = [
                { Name: "People", Show: false },
                { Name: "Places", Show: false }
            ];

            $scope.collapseExpand = function (elementId) {
                var tab = _.find($scope.tabs, function (x) { return _.isEqual(x["Name"], elementId); });
                if (_.isUndefined(tab)) return;
                tab.Show = !tab.Show;
            };

            $scope.getTabByName = function (elementId) {
                return _.find($scope.tabs, function (x) { return _.isEqual(x["Name"], elementId); });
            };

        }
    ]);