App.controller('login', function($scope, $rootScope, $window, $location, appService, totalPrice) {
    $scope.user = {}
    $scope.userDetails = {};
    $scope.userDetails.shopping_cart = [];
    $scope.statistics ={};
    let user = JSON.parse($window.sessionStorage.getItem("user"));
    let cartFromSession = JSON.parse($window.sessionStorage.getItem("cartItems"));
    if (user) {
        $scope.user = user;
        let statistics = JSON.parse($window.sessionStorage.getItem("statistics"));
        $scope.statistics.products =statistics.allProduct;
        $scope.statistics.orders =statistics.allOrders;
        $scope.userDetails.name = user.member.userName;
        if (user.member.cart.length > 0) $scope.userDetails.shopping_cart = {
            date: user.member.cart[0].date_created,
            price: totalPrice.totalPrice(cartFromSession)
        }
        if(user.member.role === 'admin') $location.path("/admin");



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
            $scope.statistics.products =res.data.allProduct;
            $scope.statistics.orders =res.data.allOrders;
            $rootScope.$broadcast('logedin', (res.data.member));
            // let userForSession = { userName: res.data.member.userName, cart: res.data.member.cart, role: res.data.member.role, logedin: true };
            let userForSession = { member: res.data.member, logedin: true };
            user = userForSession;
            $window.sessionStorage.setItem("user", JSON.stringify(userForSession));
            $window.sessionStorage.setItem("statistics", JSON.stringify({allOrders: res.data.allOrders, allProduct: res.data.allProduct }));
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
            if (user.member.lastPurchaseDate){
                $scope.userDetails.shopping_cart.status = "closed";
                $scope.userDetails.lastPurchaseDate = member.lastPurchaseDate;
                $scope.userDetails.lastPurchasePrice = member.lastPurchasePrice;
            } else{
                $scope.userDetails.shopping_cart.status = "new";
            }
                break;
            case 1:
                let cartFromSession = JSON.parse($window.sessionStorage.getItem("cartItems"));
                $scope.userDetails.name = member.userName;
                $scope.userDetails.shopping_cart = {
                    status: "open",
                    date: member.cart[0].date_created,
                };

                if (!cartFromSession)  {
                    $window.sessionStorage.setItem("cartItems", JSON.stringify(member.cartItems));
                    $scope.userDetails.shopping_cart.price = totalPrice.totalPrice(member.cartItems);
                } else {
                    $scope.userDetails.shopping_cart.price = totalPrice.totalPrice(cartFromSession);
                }

                break;
            default:
                $scope.userDetails.shopping_cart.status = "new";
                break;
        }


    }



});