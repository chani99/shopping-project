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
            newCartItem.product_id = cartItem._id;
            newCartItem.totla_price = cartItem.qty * priceFromDB._doc.price;
            newCartItem.quantity = cartItem.qty;
            newCartItem.cart_id = cartId;
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


    model.Cart_item.find({ cart_id: cartId })
        // .select('product_id')
        .populate('product_id')
        .populate('cart_id')
        .exec()
        .then(docs => {
            // if (err) {
            //     callback(404, 'Error Occurred!')
            // } else {
            console.log(docs);
            callback(null, docs);

            // }

        });
}




function deleteFromCart(cartItemId, cartId, callback) {
    model.Cart_item.find({ _id: cartItemId })
        .remove()
        .exec(
            function(err, res) {
                if (err) {
                    callback(err);
                } else {
                    getAllCartItems(cartId, function(err, AllCartItems) {
                        if (err) {
                            console.log(err);
                            callback('Error getting all cart items!');

                        } else {
                            callback(null, AllCartItems);

                        }
                    });
                }

            });

}




function deleteAllItems(cartId, callback) {
    model.Cart_item.find({ cart_id: cartId })
        .remove()
        .exec(
            function(err, res) {
                if (err) {
                    callback(err);
                } else {
                    getAllCartItems(cartId, function(err, AllCartItems) {
                        if (err) {
                            console.log(err);
                            callback('Error getting all cart items!');

                        } else {
                            callback(null, AllCartItems);

                        }
                    });
                }

            });

}

function deleteCart(cartId, memberId){
model.Cart.find({_id: cartId})
.remove()
.exec(
    function(err, res) {
        if (err) {
            callback(err);
        } else {
            //update member schema - remove the cart id from there
            let memberDta ={
                data: {
                    userId: memberId,
                    newMember: {
                        cart: []
                    }
                }
            }
            member.updateDetals(memberDta);

        }
    });

}


module.exports.deleteCart = deleteCart;
module.exports.addToCart = addToCart;
module.exports.deleteFromCart = deleteFromCart;
module.exports.getAllCartItems = getAllCartItems;
module.exports.deleteAllItems = deleteAllItems;