"use strict";
let model = require("../models/Model.Schemas");
let products = require("./product.controller");
let member = require("./member.controller");
let crypto = require('crypto');



function addToCart(user, cartItem, callback) {
    checkIfCart(user, function(memberAndCart) {
        if (memberAndCart.hasCart === false) {
            createNewCart(user, function(err, cart) {
                if (err) {
                    callback("err creating cart" + err);
                } else {
                    let data = { data: { userId: user._id, newMember: { cart: cart._doc._id } } }
                    member.updateDetals(data, function(err, member) {
                        if (err) callback("error!: " + err);
                        else {
                            addToCartStep2(cart._doc._id, cartItem, wasDone);

                        }
                    });
                }
            });
        } else {
            addToCartStep2(memberAndCart.member._doc.cart[0], cartItem, wasDone);
        }

        function wasDone(err, AllCartItems) {
            if (err) {
                callback("error adding item to cart")
            } else {
                callback(null, AllCartItems);

            }
        }

    });

    function createNewCart(user, callback) {
        var newCart = new model.Cart();
        newCart.member_id = user._id;
        newCart.date_created = new Date();
        newCart.save(function(err, cart) {
            if (err) {
                callback('Error saving cart!' + err)
            } else {
                console.log(cart);
                callback(null, cart);
            }
        })
    }



    function addToCartStep2(cartId, cartItem, callback) {
        products.getProductPrice(cartItem._id, function(price) {
            var newCartItem = new model.Cart_item();
            let priceFromDB = price[0];
            newCartItem._product_id = cartItem._id;
            newCartItem.totla_price = cartItem.qty * priceFromDB._doc.price;
            newCartItem.quantity = cartItem.qty;
            newCartItem._cart_id = cartId;
            newCartItem.save(function(err, cartItem) {
                if (err) {
                    console.log(err);
                    callback('Error saving cart item!');
                } else {
                    console.log(cartItem);
                    getAllCartItems(cartId, function(err, AllCartItems) {
                        if (err) {
                            console.log(err);
                            callback('Error getting all cart items!');

                        } else {
                            console.log(AllCartItems);
                            callback(null, AllCartItems);

                        }
                    });
                }
            });

        });
    }




}

function checkIfCart(memberId, callback) {
    model.Member.findOne({ //check if id exists
            _id: memberId
        },
        // }).populate('cart')
        // .exec(
        function(err, member) {
            if (err) {
                callback(404, 'Error Occurred!');
            } else {

                member._doc.cart.length === 0 ? callback({ hasCart: false, member: member }) : callback({ hasCart: true, member: member });

            }

        });

}



function getAllCartItems(cartId, callback) {

    model.Cart_item.find({ _cart_id: cartId }).populate('products', 'price').exec(
        function(err, items) {
            if (err) {
                callback(404, 'Error Occurred!')
            } else {
                callback(null, items);

            }

        });




    // model.Cart_item.findOne({ _cart_id: cartId }).populate('products', 'name')
    //     .exec(function(err, items) { if (err) { console.log(err) } else { console.log(items) } })
    // model.Cart_item.find({ //check if id exists
    //     cart_id: cartId
    // }).populate('product').exec(
    //     function(err, items) {
    //         if (err) {
    //             callback(404, 'Error Occurred!');
    //         } else {
    //             callback(null, items);

    //         }

    //     });


}

// let organizeData = function(data, callback) {
//     let salt = "myApp##"
//     var newMember = new model.Member();
//     if (data._id) newMember._id = data._id;
//     if (data.fname) newMember.fname = data.fname;
//     if (data.lname) newMember.lname = data.lname;
//     if (data.userName) newMember.userName = data.userName;
//     if (data.email) newMember.email = data.email;
//     if (data.password) newMember.password = hashPassword(salt + data.password);
//     if (data.street) newMember.street = data.street;
//     if (data.city) newMember.city = data.city;
//     if (data.cart) newMember.cart = data.cart;
//     newMember.role = 'client';
//     callback(newMember);

// }

// function hashPassword(password) {
//     let newpass = crypto.createHash('md5').update(password).digest("hex");
//     return (newpass);
// }

module.exports.addToCart = addToCart;