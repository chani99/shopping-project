"use strict";
let model = require("../models/Model.Schemas");


// get products from db by type
function getProducts(type, callback) {
    model.Product.find(

        function(err, products) {
            if (err) {
                callback(404, 'Error Occurred!')
            } else {
                callback(null, products);
            }

        });

}





function saveNewProduct(product, fileName, callback) {
    organizeData(product, fileName, function(productsForSave) { //if both are ok then save new member
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



let organizeData = function(data, fileName, callback) {
    var newProducts = new model.Product();
    if (data._id) newProducts._id = data._id;
    if (data.name) newProducts.name = data.name;
    if (data.category) newProducts.category_id.push(data.category);
    if (data.price) newProducts.price = data.price;
    if (fileName) newProducts.image = fileName;
    callback(newProducts);

}