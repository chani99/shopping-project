App.controller('signUp', function($scope, appService, modelsServc) {
    $scope.newUser = {};
    $scope.city = ["jerusalem", "Tel Aviv", "Hiafa", "Beer Seva", "Eilat", "Afula", "Kfar Saba", "Petach Tikva", "Raanana", "Beit Shemesh"];


    $scope.next = function(newUser) {
        let newMember = new modelsServc.MemberModel(newUser);
        appService.sendData('member/signUp', newMember, nextSucsses, nextError);

    }

    function nextSucsses(res) {
        console.log('sucsses: ' + res.data.member);
        $scope.step2 = true;

    }

    function nextError(res) {
        console.log('error: ' + res.data);

    }




});