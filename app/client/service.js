//http srvices
App.service("appService", function($http) {

    this.sendData = function(path, userParams, onSuccess, onError) {
        $http({
            url: "http://localhost:3000/" + path,
            method: "POST",
            data: {
                data: userParams
            }

        }).then(onSuccess, onError);
    }



    this.getProducts = function(path, userParams, userName, onSuccess, onError) {
        $http.get("http://localhost:3000/" + path, {
            params: {
                data: {
                    id: userParams,
                    userName: userName
                }
            }
        }).then(onSuccess, onError);


    }


    // this.getProducts = function(path, userParams, userName, onSuccess, onError) {
    //     let data = {
    //         data: userParams,
    //         userName: userName
    //     }
    //     $http.post("http://localhost:3000/" + path, data, {
    //             transformRequest: angular.identity,
    //             headers: { "Content-Type": undefined }
    //         }) // PASS THE DATA AS THE SECOND PARAMETER
    //         .then(onSuccess, onError);
    // }


    this.getData = function(path, Params, onSuccess, onError) {
        $http({
            url: "http://localhost:3000/" + path,
            method: "GET",
            data: {
                data: Params
            }

        }).then(onSuccess, onError);

    }

    this.updateData = function(path, Params, onSuccess, onError) {
        $http({
            url: "http://localhost:3000/" + path,
            method: "PUT",
            data: {
                data: Params
            }

        }).then(onSuccess, onError);

    }

    this.uploadProduct = function(product, productImage, userName, path, success, error) {

        var formData = buildFormData(product, productImage, userName);
        $http.post("http://localhost:3000/" + path, formData, {
            transformRequest: angular.identity,
            headers: { "Content-Type": undefined }

        }).then(success, error);


    }

    this.updateProduct = function(product, productImage, userName, path, success, error) {

        var formData = buildFormData(product, productImage, userName);
        $http.put("http://localhost:3000/" + path, formData, {
            transformRequest: angular.identity,
            headers: { "Content-Type": undefined }

        }).then(success, error);


    }


    function buildFormData(product, productImage, userName) {
        var formData = new FormData();

        for (var key in product) {
            if (product.hasOwnProperty(key)) {
                formData.append(key, product[key] === undefined ? "value-from-client-is-undefined" : product[key]);
            }
        }
        formData.append("userName", userName)
        if ($.isEmptyObject(productImage) == false) {
            formData.append("productImage", productImage);
        }
        return formData;
    }

});