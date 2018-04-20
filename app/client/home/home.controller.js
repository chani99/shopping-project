App.controller('login', function($scope, $rootScope, $window, $location, appService, totalPrice) {
    $scope.user = {}
    $scope.userDetails = {};
    $scope.userDetails.shopping_cart = [];
    let user = JSON.parse($window.sessionStorage.getItem("user"));
    let cartFromSession = JSON.parse($window.sessionStorage.getItem("cartItems"));
    if (user) {
        $scope.user = user;
        $scope.userDetails.name = user.userName;
        if (user.member.cart.length > 0) $scope.userDetails.shopping_cart = {
            date: user.member.cart[0].date_created,
            price: totalPrice.totalPrice(cartFromSession)
        }


    }


    //Checks if a user is logged in
    let checkIflogedin = JSON.parse($window.sessionStorage.getItem("user"));
    if (checkIflogedin) {
        if (checkIflogedin.logedin) $scope.isLogedin = checkIflogedin.logedin;
        $scope.userDetails.name = checkIflogedin.member.name;
        checkCartStatus(checkIflogedin.member.cart.length, checkIflogedin.member);
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
            // let userForSession = { userName: res.data.member.userName, cart: res.data.member.cart, role: res.data.member.role, logedin: true };
            let userForSession = { member: res.data.member, logedin: true };
            $window.sessionStorage.setItem("user", JSON.stringify(userForSession));
            if (res.data.member.role === "admin") {
                $location.path("/admin");
            } else {
                checkCartStatus(res.data.member.cart.length, res.data.member);
            }
        } else {
            $scope.loginErr = "wrong username or password";
        }
    }

    function loginError(res) {
        console.log('error');
        console.log(res);
    }


    function checkCartStatus(cartLength, member) {
        switch (cartLength) {
            case 0:
                $scope.userDetails.shopping_cart.status = "closed";
                break;
            case 1:
                let cartFromSession = JSON.parse($window.sessionStorage.getItem("cartItems"));
                if (!cartFromSession) { $window.sessionStorage.setItem("cartItems", JSON.stringify(member.cartItems)); }
                $scope.userDetails.name = member.userName;
                $scope.userDetails.shopping_cart = {
                    status: "open",
                    date: member.cart[0].date_created,
                    price: totalPrice.totalPrice(member.cartItems)
                };
                break;
            default:
                $scope.userDetails.shopping_cart.status = "new";
                break;
        }


    }



});