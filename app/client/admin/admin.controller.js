App.controller('admin', function($scope, $location, $window, appService) {
    $scope.categories = ["Milk & Eggs", "Vegetables & Fruits", "Meat & Fish", "Wine & Drinks"];
    $scope.product = {};
    $scope.file = {};
    $scope.choosen = {};

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

    $scope.shownewProduct = function() {
        $scope.newProduct = true;
        $scope.title = "New Product";
        $scope.choosen = {};
        $scope.imageSrc = false;
    }

    $scope.getFile = function() {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope)
            .then(function(result) {
                $scope.imageSrc = result;
            });
    };


    //upload new product
    $scope.submit = function() {
        if ($scope.product.category && $scope.file) {
            appService.uploadProduct($scope.product, $scope.file, checkIflogedin.userName, "product/upload", newProductSucsses, onErr);
        }
        console.log($scope.product);
    }

    function newProductSucsses() {
        $scope.newProduct = false;
        alert("new product was saved sucssesfully");
    }

    function onErr(err) {
        alert(JSON.stringify(err));
    }

    $scope.find = function(category) {
        $scope.newProduct = false;
        appService.getProducts('product/find', category, checkIflogedin.userName, findSucsses, onErr);

    }

    function findSucsses(res) {
        console.log(res);
        $scope.products = res.data;
    }

    $scope.chooseItem = function(choosenProduct) {
        console.log(choosenProduct);
        $scope.title = "Update Product";
        $scope.choosen.name = choosenProduct.name;
        $scope.choosen.price = choosenProduct.price;
        $scope.choosen.category_id = choosenProduct.category_id;
        $scope.newProduct = true;
        $scope.imageSrc = "../uploads/" + choosenProduct.image;




    }
});