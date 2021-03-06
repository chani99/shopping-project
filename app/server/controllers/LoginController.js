let model = require("../models/Model.Schemas");
let crypto = require("crypto");
let cart = require("./cart.controller");


// Checks if a user exists in the system
function checkUser(user, callback) {
    let salt = "myApp##"

    hashPassword(salt + user.password, function(pass) {

        findOneUser(user.name, pass, function(err, resault) {
            callback(err, resault);

        })
    });



}

function findOneUser(userName, password, callback) {
    model.Member.findOne({
            userName: userName,
            password: password
        })
        .populate("cart", "date_created")
        .exec(
            function(err, member) {
                if (err) {
                    callback(404, "Error Occurred!")
                } else {
                    if (member !== null) {
                        if (member._doc.cart.length > 0) {
                            let cartid = member._doc.cart[0];
                            cart.getAllCartItems(cartid._doc._id, function(err, cartItems) {
                                callback(null, { member: member, cartItem: cartItems });

                            });

                        } else {
                            callback(null, { member: member, cartItem: null });
                        }

                    } else {
                        callback("no match");
                    }

                }
            });

}

function CheckUsersCart(userName, password) {
    findOneUser(userName, password, function(err, resault) {
        if (resault.cartItem === null || resault.cartItem.length <= 0) {
            let cartId = resault.member._doc.cart[0];
            if (cartId) cart.deleteCart(cartId._doc._id, resault.member._id);
        }

    });




}

// Creating hash and salt 
function hashPassword(password, callback) {
    let newpass = crypto.createHash("md5").update(password).digest("hex");
    callback(newpass);
}


module.exports.checkUser = checkUser;
module.exports.CheckUsersCart = CheckUsersCart;