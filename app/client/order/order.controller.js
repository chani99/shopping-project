App.controller("order", function ($scope, $rootScope, $window, $location, $modal, $log, appService, totalPrice, modelsServc) {
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
            if ($scope.items.length > 0) $scope.cartNotEmpty = true;
        }
    }

    //listens to a broascast logout event
    $scope.$on("logout", function (event, args) {
        $window.sessionStorage.removeItem("user");
        $window.sessionStorage.setItem("logedin", false);
        $location.path("/");
    });


    $scope.product = {};
    $scope.order = {};
    $scope.card = {};
    $scope.formValidate = {
        date: "",
        street: "",
        city: "",
        credit: ""
    };
    $scope.city = ["jerusalem", "Tel Aviv", "Hiafa", "Beer Seva", "Eilat", "Afula", "Kfar Saba", "Petach Tikva", "Raanana", "Beit Shemesh"];
    $scope.order.street = checkIflogedin.member.street;
    $scope.order.city = checkIflogedin.member.city;


    //check for order dates on db
    appService.getData("order/dates", checkIflogedin.member.userName, onSuccessDates, onError);

    function onSuccessDates(dates) {
        let slicedDates = [];
        for (let z = 0; z < dates.data.length; z++) {
            let d = dates.data[z];
            slicedDates.push(d.slice(0, 10));
        }
        disableDates = slicedDates;
        console.log(slicedDates);
    }


    //date picker
    let dateToday = new Date();
    var disableDates = [];

    $scope.loadDatePicker = function () {
        $("#datepicker").datepicker({
            beforeShowDay: function (date) {
                var string = jQuery.datepicker.formatDate("yy-mm-dd", date);
                return [disableDates.indexOf(string) === -1]
            },
            showButtonPanel: true,
            minDate: dateToday

        });
    }





    //get order and send to server
    $scope.orderButton = function () {
        let last4 = getLast4($scope.card.number); //credit card 
        let userCart = checkIflogedin.member.cart[0]._id;
        if (!userCart) userCart = checkIflogedin.member.cart;

        let data = {
            member_id: checkIflogedin.member._id,
            cart_id: userCart,
            totalPrice: $scope.total,
            city: $scope.order.city,
            street: $scope.order.street,
            date: $scope.order.date,
            credit: last4
        }
        let validateData = false;
        for (var key in data) {
            if (!data[key]) {
                $scope.formValidate[key] = true;
                validateData = true;
            }
        }

        if (validateData === false) {
            $scope.buttonDisabled = true;
            let order = new modelsServc.OrderModel(data);
            console.log(data);
            console.log($scope.card);
            appService.sendData("order/order", data, onSuccess, onError)

        }
    }


    //on order success
    function onSuccess(res) {
        $scope.buttonDisabled = false;
        $scope.items = [];
        $scope.total = 0;
        $scope.orderDone = true;
        $scope.cartNotEmpty = false;
        $scope.order = {
            member: res.data.member,
            items: res.data.items,
            order: res.data.order
        };
        $window.sessionStorage.removeItem("cartItems");
        $window.sessionStorage.setItem("cartItems", JSON.stringify([]));
        let userForSession = {
            userName: res.data.member.userName,
            cart: res.data.member.cart,
            role: res.data.member.role,
            member: res.data.member,
            logedin: true
        };
        $window.sessionStorage.removeItem("user");
        $window.sessionStorage.setItem("user", JSON.stringify(userForSession));
    }

    function onError(err) {
        console.log(err);
        alert(JSON.stringify(err));
    }

    //cut last 4 digits from credit card number
    function getLast4(num) {
        var last4 = num.substr(num.length - 4);
        return (last4);
    }

    //convert receipt to pdf
    $scope.getReceipt = function () {
        $scope.getR = true;
        html2canvas(document.getElementById("receipt"), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500,
                    }]
                };
                pdfMake.createPdf(docDefinition).download("JsMarket_receipt.pdf");
            }
        });
    }


    $scope.highlight = function () {
        var highlighted = document.getElementsByClassName("highlight");
        if (highlighted.length > 0) {
            highlighted[0].classList.remove("highlight");

        }
        var inputText = document.getElementById("cartItemsOrder");
        var innerHTML = inputText.innerHTML;
        var index = innerHTML.indexOf($scope.search);
        if (index >= 0) {
            innerHTML = innerHTML.substring(0, index) + "<span class='highlight'>" + innerHTML.substring(index, index + $scope.search.length) + "</span>" + innerHTML.substring(index + $scope.search.length);
            inputText.innerHTML = innerHTML;
        }
    }

    $scope.search = "";
    $scope.getR = false;




})