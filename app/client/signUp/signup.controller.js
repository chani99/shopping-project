App.controller('signUp', function($scope, appService) {
    $scope.newUser = {};


    $scope.next = function() {
        if ($scope.userForm.$valid) {
            alert('baaaa');
            // appService.sendData('login', user, loginSucsses, loginError);
            
    }
}

    // $scope.login = function(user) {
    //     appService.sendData('login', user, loginSucsses, loginError);
    // }

    // function loginSucsses(res) {
    //     console.log(res.data);
    //     if (res.data.login === true) {
    //         $scope.isLogedin = true;
    //         $scope.userDetails = {
    //             name: res.data.user.fname,
    //             shopping_cart: {
    //                 date: "to do",
    //                 price: "to do"
    //             }
    //         }
    //         switch (res.data.user.cart.length) {
    //             case 0:
    //                 $scope.userDetails.shopping_cart.status = "closed";
    //                 break;
    //             case 1:
    //                 $scope.userDetails.shopping_cart.status = "open";
    //                 break;
    //             default:
    //                 $scope.userDetails.shopping_cart.status = "new";
    //                 break;
    //         }

    //     } else {
    //         $scope.loginErr = "wrong username or password";
    //     }


    // }

    // function loginError(res) {
    //     console.log('error');
    //     console.log(res);
    // }



});