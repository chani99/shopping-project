App.controller('shop', function($scope, $rootScope, $window, $location, $modal, $log, appService) {
    //Checks if a user is logged in
    let checkIflogedin = JSON.parse($window.sessionStorage.getItem("user"));
    if (checkIflogedin) {
        if (!checkIflogedin.logedin) $location.path("/");;
        if ((checkIflogedin.cart) && (checkIflogedin.cart.length <= 0)) $scope.empty = true;
    }

    //listens to a broascast logout event
    $scope.$on('logout', function(event, args) {
        $window.sessionStorage.removeItem("user");
        $window.sessionStorage.setItem("logedin", false);
        $location.path("/");

    });

    $scope.content = 'Hello World';
    $scope.product = {};



    function onErr(err) {
        alert(JSON.stringify(err));
    }


    //get products by category
    $scope.find = function(category) {
        // $scope.newProduct = false;
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
        $scope.products = res.data;
        console.log($scope.products);

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
                alert(JSON.stringify(item));
                // appService.updateCart('member/addToCart', { item: item, user: checkIflogedin.userName }, submitSucsses, submitError);
                appService.updateCart('cart/addToCart', checkIflogedin.userName, item, submitSucsses, submitError);
            }
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    function submitSucsses() {
        alert("The product was added to your shopping cart");
    }

    function submitError(err) {
        alert(err);
    }



});

App.controller('DialogInstCtrl', function($scope, $modalInstance, selectedUsr, $log) {
    $scope.item = selectedUsr;
    $scope.submitUser = function() {
        $modalInstance.close($scope.item);
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});