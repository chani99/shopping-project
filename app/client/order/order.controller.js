App.controller('order', function($scope, $rootScope, $window, $location, $modal, $log, appService, totalPrice) {
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

    //
    $scope.product = {};
    $scope.order = {};
    $scope.city = ["jerusalem", "Tel Aviv", "Hiafa", "Beer Seva", "Eilat", "Afula", "Kfar Saba", "Petach Tikva", "Raanana", "Beit Shemesh"];
    $scope.order.street = checkIflogedin.member.street;
    $scope.order.city = checkIflogedin.member.city;




    //date picker
    var disableDates = ["2018-04-24", "2018-04-25", "2018-04-28"]
    $(function() {
        $("#datepicker").datepicker({
            beforeShowDay: function(date) {
                var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
                return [disableDates.indexOf(string) == -1]
            },
            showButtonPanel: true
        });
    });

    //credit card 


    $scope.orderButton = function() {
        alert("BOM");
        console.log($scope.order);
        console.log($scope.card);


    }




});