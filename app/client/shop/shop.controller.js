App.controller('shop', function($scope, $rootScope, $location, commonData, appService) {
    //Checks if a user is logged in
    let checkIflogedin = commonData.getData();
    if (!checkIflogedin.logedin) $location.path("/");


    //listens to a broascast logout event
    $scope.$on('logout', function(event, args) {
        commonData.setData(false, {});
        $location.path("/");

    });
    $scope.content = 'Hello World';



});