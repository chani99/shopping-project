App.controller('login', function($scope, $rootScope, $window, $location, appService, totalPrice) {
    $scope.user = {}
    $scope.userDetails = {};
    $scope.userDetails.shopping_cart = [];

    //Checks if a user is logged in
    let checkIflogedin = JSON.parse($window.sessionStorage.getItem("user"));
    if (checkIflogedin) {
        if (checkIflogedin.logedin) $scope.isLogedin = checkIflogedin.logedin;
        if (checkIflogedin.name) $scope.userDetails.name = checkIflogedin.name;
        if (checkIflogedin.logedin) checkCartStatus(checkIflogedin.cart.length);
    }


    //listens to a broascast logout event
    $scope.$on('logout', function(event, args) {
        $scope.isLogedin = args;
        $scope.userDetails = {};
        $scope.userDetails.shopping_cart = {};
        $window.sessionStorage.removeItem("user");
        $window.sessionStorage.setItem("logedin", false);

    });

    //sends login data to sendData service
    $scope.login = function(user) {
        appService.sendData('login', user, loginSucsses, loginError);
    }

    function loginSucsses(res) {
        console.log(res.data);
        if (res.data.login === true) {
            $scope.isLogedin = true;
            $rootScope.$broadcast('logedin', (res.data.member));
            let userForSession = { userName: res.data.member.userName, cart: res.data.member.cart, role: res.data.member.role, logedin: true };
            $window.sessionStorage.setItem("user", JSON.stringify(userForSession));
            $window.sessionStorage.setItem("cartItems", JSON.stringify(res.data.member.cartItems));


            $scope.userDetails = {
                name: res.data.member.userName,
                shopping_cart: {
                    date: res.data.member.cart[0].date_created,
                    price: totalPrice.totalPrice(res.data.member.cartItems)
                }
            }
            checkCartStatus(res.data.member.cart.length);
            if (res.data.member.role === "admin") {
                $location.path("/admin");

            }
        } else {
            $scope.loginErr = "wrong username or password";
        }
    }

    function loginError(res) {
        console.log('error');
        console.log(res);
    }


    function checkCartStatus(cartLength) {
        switch (cartLength) {
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


    }



});