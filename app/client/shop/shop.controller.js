App.controller("shop", function($scope, $rootScope, $window, $location, appService) {
    //Checks if a user is logged in
    let checkIflogedin = JSON.parse($window.sessionStorage.getItem("user"));
    if (checkIflogedin) {
        if (!checkIflogedin.logedin) $location.path("/");;
        if ((checkIflogedin.cart) && (checkIflogedin.cart.length <= 0)) $scope.empty = true;
    }

    //listens to a broascast logout event
    $scope.$on("logout", function(event, args) {
        $window.sessionStorage.removeItem("user");
        $window.sessionStorage.setItem("logedin", false);
        $location.path("/");

    });

    $scope.content = "Hello World";
    $scope.product = {};


});