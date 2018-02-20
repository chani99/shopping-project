App.controller('login', function($scope, $rootScope, $location, appService, commonData) {
    $scope.user = {}
    $scope.userDetails = {};
    $scope.userDetails.shopping_cart = [];

    //Checks if a user is logged in
    let checkIflogedin = commonData.getData();
    if (checkIflogedin.logedin) $scope.isLogedin = checkIflogedin.logedin;
    if (checkIflogedin.name) $scope.userDetails.name = checkIflogedin.name;
    if (checkIflogedin.logedin) checkCartStatus(checkIflogedin.shopping_cart.length);


    //listens to a broascast logout event
    $scope.$on('logout', function(event, args) {
        $scope.isLogedin = args;
        $scope.userDetails = {};
        $scope.userDetails.shopping_cart = {};
        commonData.setData(false, {});
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
            commonData.setData(true, res.data.member);
            $scope.userDetails = {
                name: res.data.member.userName,
                shopping_cart: {
                    date: "to do",
                    price: "to do"
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