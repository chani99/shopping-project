var App = angular.module('nodejsApp', ['ngRoute']);


App.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home/home.html'
        })
        .when('/signUp', {
            templateUrl: 'signUp/signUp.html'
        })
        .when('/shop', {
            templateUrl: 'shop/shop.html'
        })
        .when('/shippers', {
            templateUrl: 'shippers/shippers.view.html'
        })
        .otherwise({ redirectTo: 'home' });
});

App.service('appService', function($http) {

    this.sendData = function(path, userParams, onSuccess, onError) {
        $http({
            url: 'http://localhost:3000/' + path,
            method: 'POST',
            data: {
                data: userParams
            }

        }).then(onSuccess, onError);
    }


    this.getData = function(path, Params, onSuccess, onError) {
        $http({
            url: 'http://localhost:3000/' + path,
            method: 'GET',
            data: {
                data: Params
            }

        }).then(onSuccess, onError);

    }

    this.updateData = function(path, Params, onSuccess, onError) {
        $http({
            url: 'http://localhost:3000/' + path,
            method: 'PUT',
            data: {
                data: Params
            }

        }).then(onSuccess, onError);

    }

});

App.service('commonData', function() {
    let data;
    let userDetails = {};
    this.setData = function(someData, obj) {
        data = someData;
        if (obj) userDetails.userName = obj.userName;
        if (obj) userDetails.shopping_cart = obj.cart || [];

    }

    this.getData = function() {
        if (userDetails) {
            let dataToReturn = {
                logedin: data,
                name: userDetails.userName,
                shopping_cart: userDetails.shopping_cart
            }
            return dataToReturn;

        }

    }

});

App.controller('mainController', function($scope, $rootScope, $location, appService, modelsServc) {
    $scope.mainData = "";

    $scope.$on('logedin', function(event, args) {
        $scope.mainData = args;
        $scope.logedin = true;

    });

    $scope.logout = function() {
        appService.getData('logout', 'logout', logoutSucsses, logoutError);
    }

    function logoutSucsses(res) {
        console.log(res.data);
        if (res.data === "true") {
            $scope.isLogedin = false;
            $rootScope.$broadcast('logout', (false));
            $scope.logedin = false;
            commonData.setData(false, {});


        } else {
            alert("error!");
        }


    }

    function logoutError(res) {
        console.log('error');
    }

});


App.directive('resizer', function($document) {

    return function($scope, $element, $attrs) {

        $element.on('mousedown', function(event) {
            event.preventDefault();

            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
        });

        function mousemove(event) {

            if ($attrs.resizer == 'vertical') {
                // Handle vertical resizer
                var x = event.pageX;

                if ($attrs.resizerMax && x > $attrs.resizerMax) {
                    x = parseInt($attrs.resizerMax);
                }

                $element.css({
                    left: x + 'px'
                });

                $($attrs.resizerLeft).css({
                    width: x + 'px'
                });
                $($attrs.resizerRight).css({
                    left: (x + parseInt($attrs.resizerWidth)) + 'px'
                });

                if ($attrs.id == "right-vertical-resizer") {
                    $("#sidebar-resizer").css({
                        left: '25%'
                    });
                    $("#top-content").css({
                        left: '25%'
                    });
                    $("#sidebar").css({
                        width: '25%'
                    });
                }
            } else {
                // Handle horizontal resizer
                var y = window.innerHeight - event.pageY;

                if ($attrs.resizerMax && y > $attrs.resizerMax) {
                    y = parseInt($attrs.resizerMax);
                }
                if ($attrs.id == "right-horizontal-1-resizer" || $attrs.id == "right-horizontal-2-resizer") {
                    $element.css({
                        bottom: (y - 4) + 'px'
                    });
                    $($attrs.resizerBottom).css({
                        top: (event.pageY - 32) + 'px'
                    });
                } else if ((event.pageY + 745) > parseInt($attrs.resizerMax)) {
                    $element.css({
                        bottom: (y - 5) + 'px'
                    });
                    $($attrs.resizerBottom).css({
                        top: (event.pageY - 32) + 'px'
                    });
                }

                if ($attrs.id == "content-resizer") {
                    $('#sidebar-resizer').css({
                        bottom: (y + parseInt($attrs.resizerHeight)) + 'px',
                        height: window.innerHeight - y - 35 + 'px'
                    })
                }
            }
        }

        function mouseup() {
            $document.unbind('mousemove', mousemove);
            $document.unbind('mouseup', mouseup);
        }
    };
});