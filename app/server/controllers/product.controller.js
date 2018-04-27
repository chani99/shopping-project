"use strict";
let model = require("../models/Model.Schemas");
var uuidv4 = require("uuid/v4");


// get products from db by type
function getProducts(req, callback) {
    let categorey = JSON.parse(req.query.data).id;
    if (!categorey.id) {
        model.Product.find({
                category_id: categorey
            },

            function(err, products) {
                if (err) {
                    callback(404, "Error Occurred!")
                } else {
                    callback(null, products);
                }

            });
    } else {
        let search = JSON.parse(req.query.data).id;
        model.Product.find({
                name: new RegExp(search.value)
                    // name: /fish/
            },

            function(err, products) {
                if (err) {
                    callback(404, "Error Occurred!")
                } else {
                    callback(null, products);
                }

            });

    }

}

function saveFile(file, callback) {
    let sampleFile = file.productImage;
    let filename = uuidv4() + ".jpg"
    sampleFile.mv(`app/client/uploads/${filename}`, function(err) {
        if (err) {
            callback(res.status(500).send(err));
        } else {
            callback(null, filename);

        }
    })

}


function saveNewProduct(req, callback) {
    if (!req.files) {
        callback("no file was uploaded");
    } else {
        saveFile(req.files, function(err, imageNewName) {
            if (err) {
                callback(err);
            } else {
                let newProduct = req.body;
                newProduct.image = imageNewName;
                saveNewProductInDB(newProduct, function(err, product) {
                    if (err) callback(err);
                    else callback(null, product)
                });
            }
        });
    }

}

//after saving the file insert new product into db
function saveNewProductInDB(newProduct, callback) {
    organizeData(newProduct, function(productsForSave) {
        productsForSave.save(function(err, member) {
            if (err) {
                console.log(err);
                callback("Error saving member!")
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
    var query = { "_id": product._id };
    var options = { new: true };
    organizeDataForUpdate(product, function(data) {
        model.Product.findOneAndUpdate(query, data, options, function(err, updatedProduct) {
            if (err) {
                console.log("got an error");
            } else {
                console.log(updatedProduct);
                callback(null, updatedProduct);
            }

        });

    });


}

function getProductPrice(productId, callback) {
    model.Product.find({
            _id: productId
        }, { price: 1 },
        function(err, price) {
            if (err) {
                callback(404, "Error Occurred!")
            } else {
                callback(price);
            }

        });

}

function CountProductsInDB(callback){

    model.Product.find({})
    .then(res =>{
        callback(res.length);
    })
}


module.exports.CountProductsInDB = CountProductsInDB;
module.exports.getProductPrice = getProductPrice;
module.exports.getProducts = getProducts;
module.exports.saveNewProduct = saveNewProduct;
module.exports.updateProduct = updateProduct;



let organizeData = function(data, callback) {
    var newProducts = new model.Product();
    // if (data._id) newProducts._id = data._id;
    if (data.name) newProducts.name = data.name;
    if (data.category) newProducts.category_id = data.category;
    if (data.price) newProducts.price = data.price;
    if (data.image) newProducts.image = data.image;
    callback(newProducts);

}



let organizeDataForUpdate = function(data, callback) {
    var updateProduct = {};
    // if (data._id) newProducts._id = data._id;
    if (data.name) updateProduct.name = data.name;
    if (data.category) updateProduct.category_id = data.category;
    if (data.price) updateProduct.price = data.price;
    if (data.image) updateProduct.image = data.image;
    callback(updateProduct);

}