<<<<<<< HEAD
var App = angular.module('nodejsApp', ['ngRoute', 'ui.bootstrap']);
=======
var App = angular.module("nodejsApp", ["ngRoute"]);
>>>>>>> 4a717e6c0046ee7d4fe51dcd8cccfe405a4ba470


App.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "home/home.html"
        })
        .when("/signUp", {
            templateUrl: "signUp/signUp.html"
        })
        .when("/shop", {
            templateUrl: "shop/shop.html"
        })
        .when("/admin", {
            templateUrl: "admin/admin.html"
        })
        .otherwise({ redirectTo: "home" });
});




//index controller
App.controller("mainController", function($scope, $rootScope, $window, $location, appService, modelsServc) {
    $scope.mainData = "";
    $scope.isLogedin = $window.sessionStorage.getItem("user");
    $scope.logedin = $window.sessionStorage.getItem("logedin");

    $scope.$on("logedin", function(event, args) {
        $scope.mainData = args;
        $scope.logedin = true;
        $window.sessionStorage.setItem("logedin", true);

    });

    $scope.logout = function() {
        appService.getData("logout", "logout", logoutSucsses, logoutError);
    }

    function logoutSucsses(res) {
        console.log(res.data);
        if (res.data === "true") {
            $window.sessionStorage.setItem("logedin", false);
            $scope.isLogedin = false;
            $rootScope.$broadcast("logout", (false));
            $scope.logedin = false;
            // commonData.setData(false, {});


        } else {
            alert("error!");
        }


    }

    function logoutError(res) {
        console.log("error");
    }

});