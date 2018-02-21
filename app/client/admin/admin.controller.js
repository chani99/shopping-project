App.controller('admin', function($scope, $location, commonData, appService) {
    $scope.categories = ["Milk & Eggs", "Vegetables & Fruits", "Meat & Fish", "Wine & Drinks"];
    $scope.product={};

    //Checks if a user is logged in
    let checkIflogedin = commonData.getData();
    if (!checkIflogedin.logedin) $location.path("/");
    if ((checkIflogedin.shopping_cart) && (checkIflogedin.shopping_cart.length <= 0));

    //listens to a broascast logout event
    $scope.$on('logout', function(event, args) {
        commonData.setData(false, {});
        $location.path("/");

    });

    $scope.submit = function(product){
        if(product.category && product.file){
            var uploadUrl = "/upload";
            fileUpload.uploadFileToUrl(product.file, uploadUrl, V, X);
      
        }
        console.log(product);

    }



});