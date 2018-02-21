App.controller('admin', function($scope, $location, commonData, appService) {
    $scope.categories = ["Milk & Eggs", "Vegetables & Fruits", "Meat & Fish", "Wine & Drinks"];
    $scope.product = {};

    //Checks if a user is logged in
    let checkIflogedin = commonData.getData();
    if (!checkIflogedin.logedin) $location.path("/");
    if ((checkIflogedin.shopping_cart) && (checkIflogedin.shopping_cart.length <= 0));

    //listens to a broascast logout event
    $scope.$on('logout', function(event, args) {
        commonData.setData(false, {});
        $location.path("/");

    });

    $scope.submit = function(product) {
        if (product.category && product.file) {
            appService.uploadFileToUrl(product.file, "product/upload", fillSucsses, onErr);
        }
        console.log(product);

    }


    function fillSucsses(filename) {
        $scope.product.file = filename;
        appService.sendData('product/newProduct', $scope.product, newProductSucsses, onErr);

    }

    function onErr(err) {
        alert(err);
    }

    function newProductSucsses() {
        alert("new product was saved sucssesfully")
    }

});