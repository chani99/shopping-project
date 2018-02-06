App.controller('shippers', function($scope, appService) {
    
        $scope.getShippers = function() {
            appService.getNorthwind('shippers', onSuccess, onError);
        }
    
        $scope.addShipper = function() {
            let data ={
                tableName: 'shippers',
                CompanyName: $scope.CompanyName,
                Phone: $scope.Phone,
            }
            appService.setNorthwind(data, onSuccess2, onError);
        }
        function onSuccess2(res) {
            $scope.newPro = res.data;
            console.log(res.data);
            
        }
        function onSuccess(res) {
            $scope.data = res.data;
            console.log(res.data);
            
        }
    
        function onError(res) {
            console.log('error');
            console.log(res);
        }
    
    
        // $scope.viewWeather = function() {
        //     weatherService.getDataByCityName($scope.cityName, onSuccess, onError );
        // }
    
    });