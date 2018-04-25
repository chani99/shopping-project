var App = angular.module('nodejsApp', ['ngRoute', 'ui.bootstrap', 'credit-cards']);




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
        .when('/order', {
            templateUrl: 'order/order.html'
        })

    .otherwise({ redirectTo: 'home' });
});




//index controller
App.controller('mainController', function($scope, $rootScope, $window, $location, appService, modelsServc) {
    $scope.mainData ={};
    $scope.isLogedin = $window.sessionStorage.getItem("user");
    $scope.logedin = $window.sessionStorage.getItem("logedin");
    if($scope.isLogedin)$scope.mainData.userName = JSON.parse($scope.isLogedin).member.userName;


    
  
    $scope.$on('logedin', function(event, args) {
        $scope.mainData = args;
        $scope.logedin = true;
        $window.sessionStorage.setItem("logedin", true);

    });

    $scope.logout = function() {
        appService.getData('logout', 'logout', logoutSucsses, logoutError);
    }

    function logoutSucsses(res) {
        console.log(res.data);
        if (res.data === "true") {
            $window.sessionStorage.setItem("logedin", false);
            $scope.isLogedin = false;
            $rootScope.$broadcast('logout', (false));
            $scope.logedin = false;
            // commonData.setData(false, {});


        } else {
            alert("error!");
        }


    }

    function logoutError(res) {
        console.log('error');
    }

});

//filter for credit card validation
App.filter('yesNo', function() {
    return function(boolean) {
        return boolean ? 'Yes' : 'No';
    }
})

//filter for first carecter uppercase
App.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
