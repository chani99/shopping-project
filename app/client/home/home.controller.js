App.controller('login', function($scope, $location, appService) {
    $scope.user = {}


    $scope.getProducts = function() {
        appService.getNorthwind('products', onSuccess, onError);
    }

    $scope.startShooing = function() {
        $location.path("/signUp");
    }

    $scope.login = function(user) {
        appService.sendData('login', user, loginSucsses, loginError);
    }

    function loginSucsses(res) {
        console.log(res.data);
        if (res.data.login === true) {
            $scope.isLogedin = true;
            $scope.userDetails = {
                name: res.data.user.fname,
                shopping_cart: {
                    date: "to do",
                    price: "to do"
                }
            }
            switch (res.data.user.cart.length) {
                case 0:
                    $scope.userDetails.shopping_cart.status = "closed";
                    break;
                case 1:
                    $scope.userDetails.shopping_cart.status = "open";
                    break;
                default:
                    $scope.userDetails.shopping_cart.status = "new";
                    break;
            }

        } else {
            $scope.loginErr = "wrong username or password";
        }


    }

    function loginError(res) {
        console.log('error');
        console.log(res);
    }



    // $scope.addProducts = function() {
    //     let data ={
    //         tableName: 'products',
    //         ProductName: $scope.ProductName,
    //         QuantityPerUnit: $scope.QuantityPerUnit,
    //         ReorderLevel: $scope.ReorderLevel,
    //         SupplierID:  $scope.SupplierID,
    //         UnitPrice: $scope.UnitPrice,
    //         UnitsInStock:  $scope.UnitsInStock,
    //         UnitsOnOrder: $scope.UnitsOnOrder

    //     }
    //     appService.setNorthwind(data, onSuccess2, onError);
    // }
    // function onSuccess2(res) {
    //     $scope.newPro = res.data;
    //     console.log(res.data);

    // }
    // function onSuccess(res) {
    //     $scope.keys = Object.keys(res.data[0]);
    //     $scope.data = res.data;
    //     console.log(res.data);

    // }

    // function onError(res) {
    //     console.log('error');
    //     console.log(res);
    // }


    // $scope.viewWeather = function() {
    //     weatherService.getDataByCityName($scope.cityName, onSuccess, onError );
    // }

});