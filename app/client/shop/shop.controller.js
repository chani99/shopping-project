App.controller('shop', function($scope, $rootScope, $location, commonData, appService) {
    //Checks if a user is logged in
    let checkIflogedin = commonData.getData();
    if (!checkIflogedin.logedin) $location.path("/");
    if ((checkIflogedin.shopping_cart) && (checkIflogedin.shopping_cart.length <= 0)) $scope.empty = true;

    //listens to a broascast logout event
    $scope.$on('logout', function(event, args) {
        commonData.setData(false, {});
        $location.path("/");

    });
    $scope.content = 'Hello World';
    $scope.products = [{
            name: "apple",
            image: "apple.jpg",
            description: "red Hermon apple",
            price: 2.5
        }, {
            name: "apple",
            image: "apple.jpg",
            description: "red Hermon apple",
            price: 2.5
        }, {
            name: "apple",
            image: "apple.jpg",
            description: "red Hermon apple",
            price: 2.5
        }, {
            name: "apple",
            image: "apple.jpg",
            description: "red Hermon apple",
            price: 2.5
        }, {
            name: "apple",
            image: "apple.jpg",
            description: "red Hermon apple",
            price: 2.5
        }, {
            name: "apple",
            image: "apple.jpg",
            description: "red Hermon apple",
            price: 2.5
        }, {
            name: "apple",
            image: "apple.jpg",
            description: "red Hermon apple",
            price: 2.5
        }, {
            name: "apple",
            image: "apple.jpg",
            description: "red Hermon apple",
            price: 2.5
        }, {
            name: "apple",
            image: "apple.jpg",
            description: "red Hermon apple",
            price: 2.5
        },

    ]



});