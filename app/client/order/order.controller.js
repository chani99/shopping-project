App.controller('order', function($scope, $rootScope, $window, $location, $modal, $log, appService, totalPrice, modelsServc) {
    //Checks if a user is logged in
    $scope.cartNotEmpty = false;
    $scope.orderDone = false;

    let checkIflogedin = JSON.parse($window.sessionStorage.getItem("user"));
    if (checkIflogedin) {
        if (!checkIflogedin.logedin) $location.path("/");;
        if ((checkIflogedin.member.cart) && (checkIflogedin.member.cart.length <= 0)) $scope.empty = true;
        if ((checkIflogedin.member.cart) && (checkIflogedin.member.cart.length > 0)) {
            let cartFromSession = JSON.parse($window.sessionStorage.getItem("cartItems"));
            $scope.items = cartFromSession;
            $scope.total = totalPrice.totalPrice(cartFromSession);
            if($scope.items.length>0) $scope.cartNotEmpty = true;
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
    $scope.card = {};
    $scope.city = ["jerusalem", "Tel Aviv", "Hiafa", "Beer Seva", "Eilat", "Afula", "Kfar Saba", "Petach Tikva", "Raanana", "Beit Shemesh"];
    $scope.order.street = checkIflogedin.member.street;
    $scope.order.city = checkIflogedin.member.city;


    appService.getData("order/dates", checkIflogedin.member.userName, onSuccessDates, onError);
    function onSuccessDates(dates){
        let disableDates = dates.data
    }

    //date picker
    var dateToday = new Date(); 
    // var disableDates = ["2018-04-24", "2018-04-25", "2018-04-28"] //todo
    $(function() {
        $("#datepicker").datepicker({
            beforeShowDay: function(date) {
                var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
                return [disableDates.indexOf(string) == -1]
            },
            showButtonPanel: true,
            minDate: dateToday

        });
    });


    //credit card 
    $scope.orderButton = function() {
        let last4 = getLast4($scope.card.number);
        let userCart = checkIflogedin.member.cart[0];
        let data = {
            member_id: checkIflogedin.member._id,
            cart_id: userCart._id,
            totalPrice: $scope.total,
            city: $scope.order.city,
            street: $scope.order.street,
            date: $scope.order.date,
            credit: last4
        }
        let order = new modelsServc.OrderModel(data);
        console.log(data);
        console.log($scope.card);
        appService.sendData("order/order", data, onSuccess, onError) 
    }

    function onSuccess(res){
        $scope.items = [];
        $scope.total = 0;
        $scope.orderDone = true;
        $scope.cartNotEmpty = false;
        $window.sessionStorage.removeItem("cartItems");
        $window.sessionStorage.setItem("cartItems", JSON.stringify([]));
        let userForSession = { userName: res.data.member.userName, cart: res.data.member.cart, role: res.data.member.role, member: res.data.member, logedin: true };
        $window.sessionStorage.removeItem("user");
        $window.sessionStorage.setItem("user", JSON.stringify(userForSession));
        console.log(res);
    }
    
    function onError(err){
        alert(err);
        console.log(err);
        
    }

function getLast4(num){
    var last4 = num.substr(num.length - 4);     
    return(last4);
}


});