App.controller('admin', function($scope, $location, commonData, appService) {
    $scope.categories = ["Milk & Eggs", "Vegetables & Fruits", "Meat & Fish", "Wine & Drinks"];

    //Checks if a user is logged in
    let checkIflogedin = commonData.getData();
    if (!checkIflogedin.logedin) $location.path("/");
    if ((checkIflogedin.shopping_cart) && (checkIflogedin.shopping_cart.length <= 0));

    //listens to a broascast logout event
    $scope.$on('logout', function(event, args) {
        commonData.setData(false, {});
        $location.path("/");

    });



});