"use strict";
let model = require("../models/Model.Schemas");


// get products from db by type
function getProducts(type, callback) {
    model.Member.find({
            category_id: type.data
        },
        function(err, products) {
            if (err) {
                callback(404, 'Error Occurred!')
            } else {
                callback(null, products);
            }

        });

}





function saveNewProduct(product, callback) {
    organizeData(product.data, function(productsForSave) { //if both are ok then save new member
        productsForSave.save(function(err, member) {
            if (err) {
                callback('Error saving member!')
            } else {
                console.log(member);
                callback(null, member);
            }
        })


    })



}

module.exports.getProducts = getProducts;
module.exports.saveNewProduct = saveNewProduct;



let organizeData = function(data, callback) {
    var newProducts = new model.Product();
    if (data._id) newProducts._id = data._id;
    if (data.name) newProducts.name = data.name;
    if (data.category_id) newProducts.category_id = data.category_id;
    if (data.price) newProducts.price = data.price;
    if (data.image) newProducts.image = data.image;
    callback(newProducts);

}