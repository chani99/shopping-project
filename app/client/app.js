var App = angular.module('nodejsApp', ['ngRoute']);


App.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home/home.html'
        })
        .when('/signUp', {
            templateUrl: 'signUp/signUp.html'
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
        if (obj) userDetails.fname = obj.fname;
        if (obj) userDetails.shopping_cart = obj.cart || [];

    }

    this.getData = function() {
        if (userDetails) {
            let dataToReturn = {
                logedin: data,
                name: userDetails.fname,
                shopping_cart: userDetails.shopping_cart
            }
            return dataToReturn;

        }

    }

});