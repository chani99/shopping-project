App.controller('admin', function($scope, $location, $window, appService) {
    $scope.categories = ["Milk & Eggs", "Vegetables & Fruits", "Meat & Fish", "Wine & Drinks"];
    $scope.product = {};
    $scope.file = {};

    //Checks if a user is logged in
    let checkIflogedin = JSON.parse($window.sessionStorage.getItem("user"));
    if (checkIflogedin) {
        if ((!checkIflogedin.logedin) && (!checkIflogedin.role == 'admin')) $location.path("/");
    }

    //listens to a broascast logout event
    $scope.$on('logout', function(event, args) {
        $window.sessionStorage.removeItem("user");
        $window.sessionStorage.setItem("logedin", false);
        $location.path("/");

    });

    $scope.submit = function() {
        if ($scope.product.category && $scope.file) {
            appService.uploadProduct($scope.product, $scope.file, checkIflogedin.userName, "product/upload", newProductSucsses, onErr);
        }
        console.log($scope.product);
    }


    // function fillSucsses(filename) {
    //     $scope.product.file = filename.data;
    //     appService.sendData('product/newProduct', $scope.product, newProductSucsses, onErr);

    // }
    function newProductSucsses() {
        alert("new product was saved sucssesfully");
    }

    function onErr(err) {
        alert(err);
    }


});