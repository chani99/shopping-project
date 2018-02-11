App.controller('login', function($scope, appService) {
    $scope.user = {}

    $scope.userDetails = {
        shopping_cart: {
            status: "open",
            date: new Date(),
            price: 50 + "$"
        }

    }

    $scope.getProducts = function() {
        appService.getNorthwind('products', onSuccess, onError);
    }

    $scope.login = function(user) {
        appService.sendData('login', user, liginSucsses, loginError);
    }

    function liginSucsses(res) {
        console.log(res.data);

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