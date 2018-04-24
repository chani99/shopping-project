//file upload directive
App.directive('fileModel', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);



App.directive("shopDirective", function() {

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

// App.directive("orderForm-directive", function() {
    
//         return {
//             templateUrl: 'templates/shopTemp.html',
//             scope: {
//                orderObject: "=",
//                 cardObject: "=",
//                 orderButtonFunction: "&"
//             }
//         }
//     })