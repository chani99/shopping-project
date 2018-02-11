var App = angular.module('nodejsApp', ['ngRoute']);


App.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home/home.html'
        })
        .when('/products', {
            templateUrl: 'products/products.view.html'
        })
        .when('/shippers', {
            templateUrl: 'shippers/shippers.view.html'
        })
        .otherwise({ redirectTo: 'home' });
});

App.service('appService', function($http) {

    this.sendData = function(path, userParams, onSuccess, onError) {
        // $http.post('http://localhost:3000/' + path, userParams).then(onSuccess, onError);
        $http({
            url: 'http://localhost:3000/' + path,
            method: 'POST',
            data: {
                data: userParams
            }

        }).then(onSuccess, onError);
    }


    this.setNorthwind = function(data, onSuccess, onError) {
        $http({
            url: 'http://localhost:3000/' + data.tableName,
            method: 'POST',
            params: {
                tableName: data.tableName,
                data: data
            }
        }).then(onSuccess, onError);
    }
});