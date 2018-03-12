//file upload directive
App.directive("fileModel", ["$parse", function($parse) {
    return {
        restrict: "A",
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind("change", function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

<<<<<<< HEAD
=======
// App.directive("shopDirective", function() {
//     return {
//         templateUrl: "templates/shopTemp.html",
//         scope: {
>>>>>>> 4a717e6c0046ee7d4fe51dcd8cccfe405a4ba470


App.directive("shopDirective", function() {

<<<<<<< HEAD
    return {
        templateUrl: 'templates/shopTemp.html',
        scope: {
            productsObject: "=",
            searchObject: "=",
            findFunction: "&",
            chooseItemFunction: "&"
        }
    }
})
=======
        return {
            templateUrl: "templates/shopTemp.html",
            scope: {
                productsObject: "=",
                searchObject: "=",
                findFunction: "&",
                // sucsses: "&sucssesFn",
                // err: "&errFn",
                chooseItemFunction: "&"
            }
        }
    })
    // link: function($scope, element, attrs) {
    //     let checkIflogedin = JSON.parse($window.sessionStorage.getItem("user"));

//     $scope.find = function(category) {
//         $scope.newProduct = false;
//         if (category !== "search") {
//             appService.getProducts("product/find", category, checkIflogedin.userName, findSucsses, $scope.err);
//         } else {
//             let searchValue = {
//                 id: category,
//                 value: $scope.search
//             }
//             appService.getProducts("product/find", searchValue, checkIflogedin.userName, findSucsses, $scope.err);
//         }

//     }


//     function findSucsses(res) {
//         console.log(res);
//         productsObject = res.data;
//     }

// }
>>>>>>> 4a717e6c0046ee7d4fe51dcd8cccfe405a4ba470
