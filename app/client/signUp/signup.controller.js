App.controller('signUp', function($scope, appService) {
    $scope.newUser = {};


    $scope.next = function(newUser) {
        appService.sendData('member/signUp', newUser, nextSucsses, nextError);

    }

    function nextSucsses(res) {
        console.log('sucsses: ' + res.data.member);

    }

    function nextError(res) {
        console.log('error: ' + res.data);

    }




});