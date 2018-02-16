App.controller('signUp', function($scope, $location, appService, modelsServc) {
    $scope.newUser = {};
    $scope.city = ["jerusalem", "Tel Aviv", "Hiafa", "Beer Seva", "Eilat", "Afula", "Kfar Saba", "Petach Tikva", "Raanana", "Beit Shemesh"];
    let userId;


    $scope.next = function(newUser) {
        let newMember = new modelsServc.MemberModel(newUser);
        appService.sendData('member/signUp', newMember, nextSucsses, nextError);

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
        console.log('error: ' + res.data);
    }

    $scope.submit = function(userDetails) {
        let newMember = new modelsServc.MemberModel(userDetails);
        appService.updateData('member/details', { newMember, userId }, submitSucsses, submitError);

    }

    function submitSucsses(res) {
        if (JSON.parse(res.data.done)) {
            userId = res.data.member;
            $scope.step2 = false;
            $location.path("/");

        } else {
            alert(res.data.why);
        }

    }

    function submitError(res) {
        console.log('error: ' + res.data);
    }





});