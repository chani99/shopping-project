App.controller('shop', function($scope, $rootScope, $window, $location, $modal, $log, appService, totalPrice) {
    //Checks if a user is logged in
    let checkIflogedin = JSON.parse($window.sessionStorage.getItem("user"));
    if (checkIflogedin) {
        if (!checkIflogedin.logedin) $location.path("/");;
        if ((checkIflogedin.member.cart) && (checkIflogedin.member.cart.length <= 0)) $scope.empty = true;
        if ((checkIflogedin.member.cart) && (checkIflogedin.member.cart.length > 0)) {
            let cartFromSession = JSON.parse($window.sessionStorage.getItem("cartItems"));
            $scope.items = cartFromSession;
            $scope.total = totalPrice.totalPrice(cartFromSession);
        }

    }

    //listens to a broascast logout event
    $scope.$on('logout', function(event, args) {
        $window.sessionStorage.removeItem("user");
        $window.sessionStorage.setItem("logedin", false);
        $location.path("/");


    });

    $scope.product = {};



    function onErr(err) {
        alert(JSON.stringify(err));
    }


    //get products by category
    $scope.find = function(category) {
        // $scope.newProduct = false;
        if (category !== 'search') {
            appService.getProducts('product/find', category, checkIflogedin.member.userName, findSucsses, onErr);
        } else {
            let searchValue = {
                id: category,
                value: $scope.search
            }
            appService.getProducts('product/find', searchValue, checkIflogedin.member.userName, findSucsses, onErr);
        }
    }

    function findSucsses(res) {
        $scope.products = res.data;
        console.log($scope.products);
    }

    //delete a item from shopping cart
    $scope.removeCartItem = function(cartItemId, cartId) {
        data = {
            cartItemId: cartItemId,
            cartId: cartId
        }
        appService.deleteFromCart('cart/deleteCartItem', checkIflogedin.member.userName, data, dltSucsses, submitError);
    }

    $scope.emeptyCart = function(cartId) {
        let make_sure = confirm("Are you sure you want to empty your cart?");
        if (make_sure) appService.deleteFromCart('cart/deleteCart', checkIflogedin.member.userName, cartId, dltAllSucsses, submitError);
    }

    //after deleteing a cart item
    function dltSucsses(cart) {
        $scope.items = cart.data.updatedCart;
        $scope.total = totalPrice.totalPrice(cart.data.updatedCart);
        $window.sessionStorage.removeItem("cartItems");
        $window.sessionStorage.setItem("cartItems", JSON.stringify(cart.data.updatedCart));
    }

    //after deleteing a all cart item
    function dltAllSucsses(cart) {
        $scope.items = [];
        $scope.total = 0;
        $window.sessionStorage.removeItem("cartItems");
    }

    //modal product popup function
    $scope.usrs = [];
    $scope.usr = { name: '', job: '', age: '', sal: '', addr: '' };
    $scope.chooseItem = function(coosenItem) {
        var dialogInst = $modal.open({
            templateUrl: '../templates/selectedProdactModal.html',
            controller: 'DialogInstCtrl',
            size: 'lg',
            resolve: {
                selectedUsr: function() {
                    return coosenItem;
                }
            }
        });
        dialogInst.result.then(function(item) {
            if (item.qty > 0) {
                // alert(JSON.stringify(item));
                appService.updateCart('cart/addToCart', checkIflogedin.member.userName, item, submitSucsses, submitError);
            }
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };


    function submitSucsses(cart) {
        console.log(cart);
        $scope.empty = false;
        $scope.items = cart.data.cart;
        $scope.total = totalPrice.totalPrice(cart.data.cart);
        $window.sessionStorage.removeItem("cartItems");
        $window.sessionStorage.setItem("cartItems", JSON.stringify(cart.data.cart));

        // alert("The product was added to your shopping cart");
    }

    function submitError(err) {
        alert(err);
        console.log(err);
    }



});


//dialog popup controller
App.controller('DialogInstCtrl', function($scope, $modalInstance, selectedUsr, $log) {
    $scope.item = selectedUsr;
    $scope.submitUser = function() {
        $modalInstance.close($scope.item);
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});