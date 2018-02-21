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
        .when('/admin', {
            templateUrl: 'admin/admin.html'
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

    this.uploadFileToUrl = function(file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);

        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
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
App.directive('fileModel', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);


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