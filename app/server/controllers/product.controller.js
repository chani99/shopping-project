"use strict";
let model = require("../models/Model.Schemas");
var uuidv4 = require('uuid/v4');


// get products from db by type
function getProducts(type, callback) {
    model.Product.find({
            category_id: type
        },

        function(err, products) {
            if (err) {
                callback(404, 'Error Occurred!')
            } else {
                callback(null, products);
            }

        });

}

function saveFile(file, callback) {
    let sampleFile = file;
    let filename = uuidv4() + '.jpg'
    sampleFile.mv(`app/client/uploads/${filename}`, function(err) {
        if (err) {
            callback(res.status(500).send(err));
        } else {
            callback(filename);

        }
    })

}


function saveNewProduct(product, fileName, callback) {
    organizeData(product, fileName, function(productsForSave) { //if both are ok then save new member
        productsForSave.save(function(err, member) {
            if (err) {
                console.log(err);
                callback('Error saving member!')
            } else {
                console.log(member);
                callback(null, member);
            }
        })


    })



}

function updateProduct(req, callback) {
    if (req.files) { //check if the client sent a file, and if - save it and then update
        saveFile(req.files, function(err, imageNewName) {
            if (err) {
                callback(err);
            } else {
                let updateProduct = req.body;
                updateProduct.image = imageNewName;
                saveUpdateInDB(updateProduct, function(err, product) {
                    if (err) callback(err);
                    else callback(null, product)
                });
            }
        });

    } else { //otherwise just update
        saveUpdateInDB(req.body, function(err, product) {
            if (err) callback(err);
            else callback(null, product)
        });
    }
}

//updates product in mongo db
function saveUpdateInDB(product, callback) {

}

module.exports.getProducts = getProducts;
module.exports.saveNewProduct = saveNewProduct;
module.exports.updateProduct = updateProduct;



let organizeData = function(data, fileName, callback) {
    var newProducts = new model.Product();
    if (data._id) newProducts._id = data._id;
    if (data.name) newProducts.name = data.name;
    if (data.category) newProducts.category_id = data.category;
    if (data.price) newProducts.price = data.price;
    if (fileName) newProducts.image = fileName;
    callback(newProducts);

}