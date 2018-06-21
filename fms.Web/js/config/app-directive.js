angular.module("fmsApp")
    .filter("jsonDate", ["$filter", function ($filter) {
        return function (input, format) {
            return (input)
                ? $filter("date")(parseInt(input.substr(6)), format)
                : "";
        };
    }])
    .filter("total", function () {
        return function (input, property) {
            var i = input instanceof Array ? input.length : 0;
            if (typeof property === "undefined" || i === 0) {
                return i;
            } else if (isNaN(input[0][property])) {
                throw "filter total can count only numeric values";
            } else {
                var total = 0;
                while (i--)
                    total += input[i][property];
                return total;
            }
        };
    });
angular.module("fmsApp")
    .directive("fileModel",
        [
            "$parse", function($parse) {
                return {
                    restrict: "A",
                    link: function(scope, element, attrs) {
                        var model = $parse(attrs.fileModel);
                        var modelSetter = model.assign;
                        element.bind("change",
                            function() {
                                scope.$apply(function() {
                                    modelSetter(scope, element[0].files[0]);
                                });
                            });
                    }
                };
            }
        ])
    .directive("convertToNumber",
        function() {
            return {
                require: "ngModel",
                link: function(scope, element, attrs, ngModel) {
                    ngModel.$parsers.push(function(val) {
                        return val != null ? parseInt(val, 10) : null;
                    });
                    ngModel.$formatters.push(function(val) {
                        return val != null ? "" + val : null;
                    });
                }
            };
        })
    .directive("limitTo",
        function() {
            return {
                restrict: "A",
                link: function(scope, elem, attrs) {
                    var limit = parseInt(attrs.limitTo);
                    angular.element(elem).on("keypress",
                        function(e) {
                            if (this.value.length == limit) e.preventDefault();
                        });
                }
            }
        })
    .directive('ngMin',
        function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, elem, attr, ctrl) {
                    scope.$watch(attr.ngMin,
                        function() {
                            ctrl.$setViewValue(ctrl.$viewValue);
                        });
                    var minValidator = function(value) {
                        var min = scope.$eval(attr.ngMin) || 0;
                        if (!fms.Functions.IsEmpty(value) && value < min) {
                            ctrl.$setValidity('ngMin', false);
                            return undefined;
                        } else {
                            ctrl.$setValidity('ngMin', true);
                            return value;
                        }
                    };

                    ctrl.$parsers.push(minValidator);
                    ctrl.$formatters.push(minValidator);
                }
            };
        })
    .directive('ngMax',
        function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, elem, attr, ctrl) {
                    scope.$watch(attr.ngMax,
                        function() {
                            ctrl.$setViewValue(ctrl.$viewValue);
                        });
                    var maxValidator = function(value) {
                        var max = scope.$eval(attr.ngMax) || Infinity;
                        if (!fms.Functions.IsEmpty(value) && value > max) {
                            ctrl.$setValidity('ngMax', false);
                            return undefined;
                        } else {
                            ctrl.$setValidity('ngMax', true);
                            return value;
                        }
                    };

                    ctrl.$parsers.push(maxValidator);
                    ctrl.$formatters.push(maxValidator);
                }
            };
        });