App.controller("signUp", function($scope, $rootScope, $location, $window, appService, modelsServc) {
    $scope.newUser = {};
    $scope.city = ["jerusalem", "Tel Aviv", "Hiafa", "Beer Seva", "Eilat", "Afula", "Kfar Saba", "Petach Tikva", "Raanana", "Beit Shemesh"];
    let userId;

    //gets a new users data and sends it to sendData service
    $scope.next = function(newUser) {
        let newMember = new modelsServc.MemberModel(newUser);
        appService.sendData("member/signUp", newMember, nextSucsses, nextError);

    }

    function nextSucsses(res) {
        if (JSON.parse(res.data.done)) {
            $scope.step1success = "Welcome to JSMarket, you are now registered, please fill up some more details to compleat you registration";
            userId = res.data.member;
            $scope.step2 = true;
        } else {
            alert(res.data.why);
        }

    }

    function nextError(res) {
        console.log("error: " + res.data);
    }

    //gets a new user"s step 2 data and sends it to updateData service
    $scope.submit = function(userDetails) {
        let newMember = new modelsServc.MemberModel(userDetails);
        appService.updateData("member/details", { newMember, userId }, submitSucsses, submitError);

    }

    function submitSucsses(res) {
        if (JSON.parse(res.data.done)) {
            console.log(res.data)
            userId = res.data.member;
            $scope.step2 = false;
            // commonData.setData(true, res.data.member);
            let userForSession = { userName: res.data.member.userName, cart: res.data.member.cart, role: res.data.member.role, logedin: true };
            $window.sessionStorage.setItem("user", JSON.stringify(userForSession));
            $rootScope.$broadcast("logedin", (res.data.member));
            $location.path("/");

        } else {
            alert(res.data.why);
        }

    }

    function submitError(res) {
        console.log("error: " + res.data);
    }





});