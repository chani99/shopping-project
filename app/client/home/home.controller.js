App.controller('login', function($scope, $rootScope, $window, $location, appService, totalPrice) {
    $scope.user = {}
    $scope.userDetails = {};
    $scope.userDetails.shopping_cart = [];
    let user = JSON.parse($window.sessionStorage.getItem("user"));
    cartFromSession = JSON.parse($window.sessionStorage.getItem("cartItems"));
    if (user) {
        $scope.userDetails.name = user.userName;
        if (user.cart.length > 0) $scope.userDetails.shopping_cart = {
            date: user.cart[0].date_created,
            price: totalPrice.totalPrice(cartFromSession)
        }


    }





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
        $window.sessionStorage.removeItem("cartItems");
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
            if (res.data.member.role === "admin") {
                $location.path("/admin");
            } else {
                checkCartStatus(res.data.member.cart.length, res);
            }
        } else {
            $scope.loginErr = "wrong username or password";
        }
    }

    function loginError(res) {
        console.log('error');
        console.log(res);
    }


    function checkCartStatus(cartLength, res) {
        switch (cartLength) {
            case 0:
                $scope.userDetails.shopping_cart.status = "closed";
                break;
            case 1:
                $window.sessionStorage.setItem("cartItems", JSON.stringify(res.data.member.cartItems));
                $scope.userDetails.name = res.data.member.userName;
                $scope.userDetails.shopping_cart = {
                    status: "open",
                    date: res.data.member.cart[0].date_created,
                    price: totalPrice.totalPrice(res.data.member.cartItems)

                };

                break;
            default:
                $scope.userDetails.shopping_cart.status = "new";
                break;
        }


    }



});