"use strict";
let model = require("../models/Model.Schemas");
let products = require("./product.controller");
let member = require("./member.controller");
let crypto = require('crypto');


// Checks if a id exists in the system
// function checkExists(user, callback) {
//     model.Member.findOne({ //check if id exists
//             _id: user.data._id
//         },
//         function(err, member) {
//             if (err) {
//                 callback(404, 'Error Occurred!')
//             } else if (member !== null) {
//                 callback("a member with this id is already registerd!")
//             } else {
//                 model.Member.findOne({ //now check if user name exists
//                         userName: user.data.userName
//                     },
//                     function(err, userN) {
//                         if (err) {
//                             callback(404, 'Error Occurred!')
//                         } else if (userN !== null) {
//                             callback("This user name already taken, Pleas try a difrent one!")
//                         } else {
//                             organizeData(user.data, function(member4save) { //if both are ok then save new member
//                                 member4save.save(function(err, member) {
//                                     if (err) {
//                                         callback('Error saving member!')
//                                     } else {
//                                         console.log(member);
//                                         callback(null, member);
//                                     }
//                                 })
//                             })
//                         }
//                     });
//             }
//         })
// }

// function updateDetals(user, callback) {
//     var query = { "_id": user.data.userId };
//     var options = { new: true };
//     organizeData(user.data.newMember, function(data) {
//         model.Member.findOneAndUpdate(query, data, options, function(err, member) {
//             if (err) {
//                 console.log('got an error');
//             } else {
//                 console.log(member);
//                 callback(null, member);
//             }

//         });

//     });

// userName: user.data.name,
// password: pass

// }

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
            addToCartStep2(memberAndCart.member._doc.cart._id, cartItem, wasDone);
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
        products.getProductPrice(cartItem._id, function(price) {
            var newCartItem = new model.Cart_item();
            let priceFromDB = price[0];
            newCartItem.product_id = cartItem._id;
            newCartItem.quantity = cartItem.quantity * priceFromDB._doc.price;
            newCartItem.cart_id = cartId;
            newCartItem.save(function(err, cartItem) {
                if (err) {
                    callback('Error saving cart item!')
                } else {
                    console.log(cartItem);
                    callback(null, cartItem);
                }
            });

        });
    }




}

function checkIfCart(memberId, callback) {
    model.Member.findOne({ //check if id exists
            _id: memberId
        }).populate('cart')
        .exec(
            function(err, member) {
                if (err) {
                    callback(404, 'Error Occurred!');
                } else {

                    member._doc.cart.length === 0 ? callback({ hasCart: false, member: member }) : callback({ hasCart: true, member: member });

                }

            });

}

module.exports.addToCart = addToCart;
// module.exports.checkExists = checkExists;



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