"use strict";
let model = require("../models/Model.Schemas");
let crypto = require('crypto');


// Checks if a id exists in the system
function checkExists(user, callback) {
    model.Member.findOne({ //check if id exists
            _id: user.data._id
        },
        function(err, member) {
            if (err) {
                callback(404, 'Error Occurred!')
            } else if (member !== null) {
                callback("a member with this id is already registerd!")
            } else {
                model.Member.findOne({ //now check if user name exists
                        userName: user.data.userName
                    },
                    function(err, userN) {
                        if (err) {
                            callback(404, 'Error Occurred!')
                        } else if (userN !== null) {
                            callback("This user name already taken, Pleas try a difrent one!")
                        } else {
                            organizeData(user.data, function(member4save) { //if both are ok then save new member
                                member4save.save(function(err, member) {
                                    if (err) {
                                        callback('Error saving member!')
                                    } else {
                                        console.log(member);
                                        callback(null, member);
                                    }
                                })
                            })
                        }
                    });
            }
        })
}

function updateDetals(user, callback) {
    var query = { "_id": user.data.userId };
    var options = { new: true };
    organizeData(user.data.newMember, function(data) {
        model.Member.findOneAndUpdate(query, data, options, function(err, member) {
            if (err) {
                console.log('got an error');
            } else {
                console.log(member);
                callback(null, member);
            }

        });

    });

    // userName: user.data.name,
    // password: pass

}

function addToCart(user, cartItem, callback) {
    checkIfCart(user, function(member) {
        if (member === false) {
            createNewCart(user, function(err, cart) {
                if (err) {
                    callback("err creating cart" + err);
                } else {
                    let data = { data: { userId: user._id, newMember: { cart: cart._doc._id } } }
                    updateDetals(data, function(err, member) {
                        if (err) callback("error!: " + err);
                        else {
                            addToCartStep2(cart._doc._id, cartItem, wasDone);

                        }
                    });
                }
            });
        } else {
            addToCartStep2(cart._doc._id, cartItem, wasDone);
        }

        function wasDone(err, newCartItem) {
            if (err) {
                callback("error adding item to cart")
            } else {
                callback(null, newCartItem);

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
        console.log('now add a item to cart item') //todo
            // var newCartItem = new model.Cart_item();
            // newCartItem.product_id = cartItem.product_id; 
            // newCartItem.quantity = cartItem.quantity * price;
            // newCartItem.cart_id = cartId;
            // callback(newCart);
    }




}

function checkIfCart(memberId, callback) {
    model.Member.findOne({ //check if id exists
            _id: memberId
        },
        function(err, member) {
            if (err) {
                callback(404, 'Error Occurred!');
            } else {
                member._doc.cart.length === 0 ? callback(false) : callback(member);

            }

        });

}

module.exports.addToCart = addToCart;
module.exports.checkExists = checkExists;
module.exports.updateDetals = updateDetals;



let organizeData = function(data, callback) {
    let salt = "myApp##"
    var newMember = new model.Member();
    if (data._id) newMember._id = data._id;
    if (data.fname) newMember.fname = data.fname;
    if (data.lname) newMember.lname = data.lname;
    if (data.userName) newMember.userName = data.userName;
    if (data.email) newMember.email = data.email;
    if (data.password) newMember.password = hashPassword(salt + data.password);
    if (data.street) newMember.street = data.street;
    if (data.city) newMember.city = data.city;
    if (data.cart) newMember.cart = data.cart;
    newMember.role = 'client';
    callback(newMember);

}

function hashPassword(password) {
    let newpass = crypto.createHash('md5').update(password).digest("hex");
    return (newpass);
}