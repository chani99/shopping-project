//http srvices
App.service("appService", function($http) {

    //build form data function
    function buildFormData(product, productImage, userName) {
        var formData = new FormData();

        for (var key in product) {
            if (product.hasOwnProperty(key)) {
                formData.append(key, product[key] === undefined ? 'value-from-client-is-undefined' : product[key]);
            }
        }
        formData.append("userName", userName)
        if ($.isEmptyObject(productImage) == false) {
            formData.append("productImage", productImage);
        }
        return formData;
    }

    //http POST
    this.sendData = function(path, userParams, onSuccess, onError) {
        $http({
            url: "http://localhost:3000/" + path,
            method: "POST",
            data: {
                data: userParams
            }

        }).then(onSuccess, onError);
    }


    //http GET for products
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

<<<<<<< HEAD
    //http GET for login
    this.getData = function(path, Params, onSuccess, onError) {
            $http({
                url: 'http://localhost:3000/' + path,
                method: 'GET',
                data: {
                    data: Params
                }
=======

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
>>>>>>> 4a717e6c0046ee7d4fe51dcd8cccfe405a4ba470

            }).then(onSuccess, onError);

        }
        //http PUT to update user details
    this.updateData = function(path, Params, onSuccess, onError) {
        $http({
            url: "http://localhost:3000/" + path,
            method: "PUT",
            data: {
                data: Params
            }

        }).then(onSuccess, onError);

    }

    //http POST for inserting data and uploading files
    this.uploadProduct = function(product, productImage, userName, path, success, error) { //
        var formData = buildFormData(product, productImage, userName);
        $http.post("http://localhost:3000/" + path, formData, {
            transformRequest: angular.identity,
            headers: { "Content-Type": undefined }

        }).then(success, error);


    }

    //http POST for updating data and uploading files
    this.updateProduct = function(product, productImage, userName, path, success, error) {
        var formData = buildFormData(product, productImage, userName);
        $http.put("http://localhost:3000/" + path, formData, {
            transformRequest: angular.identity,
<<<<<<< HEAD
            headers: { 'Content-Type': undefined }
=======
            headers: { "Content-Type": undefined }

>>>>>>> 4a717e6c0046ee7d4fe51dcd8cccfe405a4ba470
        }).then(success, error);


    }

<<<<<<< HEAD
=======

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

>>>>>>> 4a717e6c0046ee7d4fe51dcd8cccfe405a4ba470
});