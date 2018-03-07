App.controller('admin', function($scope, $location, $window, appService) {
    $scope.categories = ["Milk & Eggs", "Vegetables & Fruits", "Meat & Fish", "Wine & Drinks"];
    $scope.product = {};
    $scope.file = {};
    $scope.choosen = {};
    $scope.imageSrc = "";

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


    //open's a empty for user to insert a new product
    $scope.shownewProduct = function() {
        $('.form-signin')[0].reset();
        $("#fileControl").val('');
        $scope.productForm.$setUntouched();
        $scope.newProduct = true;
        $scope.title = "New Product";
        $scope.choosen = {};
        $scope.imageSrc = false;
    }

    //preview for image uploaded before sent to server
    $scope.setFile = function(element) {
        $scope.currentFile = element.files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
                $scope.imageSrc = event.target.result
                $scope.$apply()
            }
            // when the file is read it triggers the onload event above.
        reader.readAsDataURL(element.files[0]);
    }




    //upload or new product
    $scope.submit = function(title) {
        switch (title) {
            case "New Product":
                if ($scope.product.category && $scope.file) {
                    appService.uploadProduct($scope.product, $scope.file, checkIflogedin.userName, "product/upload", newProductSucsses, onErr);
                }
                break;

            case "Update Product":
                if (($.isEmptyObject($scope.product)) && ($.isEmptyObject($scope.file))) {
                    alert("No changes were made");

                } else {
                    $scope.product._id = $scope.choosen._id;
                    appService.updateProduct($scope.product, $scope.file, checkIflogedin.userName, "product/update", newProductSucsses, onErr);

                }
                break;
        }

        // console.log($scope.product);
    }

    function newProductSucsses() {
        $scope.file = "";
        $scope.newProduct = false;
        $scope.product = {};
        // $('.form-signin')[0].reset();
        alert("new product was saved sucssesfully");
    }

    function onErr(err) {
        alert(JSON.stringify(err));
    }




    //get products by category
    $scope.find = function(category) {
        $scope.newProduct = false;
        if (category !== 'search') {
            appService.getProducts('product/find', category, checkIflogedin.userName, findSucsses, onErr);
        } else {
            let searchValue = {
                id: category,
                value: $scope.search
            }
            appService.getProducts('product/find', searchValue, checkIflogedin.userName, findSucsses, onErr);
        }

    }

    function findSucsses(res) {
        console.log(res);
        $scope.products = res.data;
    }



    //choose product for update - inserts values of choosen product into input's value
    $scope.chooseItem = function(choosenProduct) {
        console.log(choosenProduct);
        $("#fileControl").val('');
        $scope.title = "Update Product";
        $scope.productForm.$setPristine();
        $scope.productForm.price = choosenProduct.price;
        $scope.productForm.product = choosenProduct.name;
        $scope.choosen.name = choosenProduct.name;
        $scope.choosen.price = choosenProduct.price;
        $scope.choosen.category_id = choosenProduct.category_id;
        $scope.choosen._id = choosenProduct._id;
        $scope.newProduct = true;
        $scope.imageSrc = "../uploads/" + choosenProduct.image;

    }
});