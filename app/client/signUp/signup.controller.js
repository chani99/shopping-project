App.controller('signUp', function($scope, appService, modelsServc) {
    $scope.newUser = {};


    $scope.next = function(newUser) {
        let newMember = new modelsServc.MemberModel(newUser);
        appService.sendData('member/signUp', newMember, nextSucsses, nextError);

    }

    function nextSucsses(res) {
        console.log('sucsses: ' + res.data.member);
        appService.getData('city', 'getall', function(res){
            $scope.city =  res.data;
        }, function(res){
            console.log(res);
        });
        
        $scope.step2 = true;

    }

    function nextError(res) {
        console.log('error: ' + res.data);

    }




});