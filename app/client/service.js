//http srvices
App.service("appService", function ($http) {

    //build form data function
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

    //http POST
    this.sendData = function (path, userParams, onSuccess, onError) {
        $http({
            url: "http://localhost:3000/" + path,
            method: "POST",
            data: userParams


        }).then(onSuccess, onError);
    }


    //http GET for products
    this.getProducts = function (path, userParams, userName, onSuccess, onError) {
        $http.get("http://localhost:3000/" + path, {
            params: {
                data: {
                    id: userParams,
                    userName: userName
                }
            }
        }).then(onSuccess, onError);
    }

    //http GET for products
    this.get = function (path, userParams, userName, onSuccess, onError) {
        $http.get("http://localhost:3000/" + path, {
            params: {
                data: {
                    id: userParams,
                    userName: userName
                }
            }
        }).then(onSuccess, onError);
    }

    //http GET for login
    this.getData = function (path, Params, onSuccess, onError) {
        $http({
            url: "http://localhost:3000/" + path,
            method: "GET",
            data: {
                data: Params
            }
        }).then(onSuccess, onError);
    }

    //http PUT to update user details
    this.updateData = function (path, Params, onSuccess, onError) {
        $http({
            url: "http://localhost:3000/" + path,
            method: "PUT",
            data: Params.newMember


        }).then(onSuccess, onError);

    }

    //http POST for inserting data and uploading files
    this.uploadProduct = function (product, productImage, userName, path, success, error) { //
        var formData = buildFormData(product, productImage, userName);
        $http.post("http://localhost:3000/" + path, formData, {
            transformRequest: angular.identity,
            headers: {
                "Content-Type": undefined
            }

        }).then(success, error);

    }

    //http POST for updating data and uploading files
    this.updateProduct = function (product, productImage, userName, path, success, error) {
        var formData = buildFormData(product, productImage, userName);
        $http.put("http://localhost:3000/" + path, formData, {
            transformRequest: angular.identity,
            headers: {
                "Content-Type": undefined
            }
        }).then(success, error);
    }

    //http POST for updating cart when a member adds a item to cart
    this.updateCart = function (path, userName, product, success, error) {
        var formData = buildFormData(product, null, userName);
        $http.put("http://localhost:3000/" + path, formData, {
            transformRequest: angular.identity,
            headers: {
                "Content-Type": undefined
            }
        }).then(success, error);
    }


    this.deleteFromCart = function (path, userName, data, success, error) {
        $http({
            url: "http://localhost:3000/" + path,
            method: "DELETE",
            data: {
                data: data,
                userName: userName
            },
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }

        }).then(success, error);

    }


});


App.service("totalPrice", function () {
    this.totalPrice = function (cartItems) {
        let cartTotalPrice = 0;
        for (i = 0; i < cartItems.length; i++) {
            cartTotalPrice += cartItems[i].totla_price;
        }
        return (cartTotalPrice)
    }
});