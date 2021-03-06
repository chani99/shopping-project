"use strict";
let model = require("../models/Model.Schemas");
let products = require("./member.controller");
let crypto = require("crypto");


// Checks if a id exists in the system
function checkExists(user, callback) {
    model.Member.findOne({ //check if id exists
            _id: user._id
        },
        function(err, member) {
            if (err) {
                callback(404, "Error Occurred!")
            } else if (member !== null) {
                callback("a member with this id is already registerd!")
            } else {
                model.Member.findOne({ //now check if user name exists
                        userName: user.userName
                    },
                    function(err, userN) {
                        if (err) {
                            callback(404, "Error Occurred!")
                        } else if (userN !== null) {
                            callback("This user name already taken, Pleas try a difrent one!")
                        } else {
                            organizeData(user, function(member4save) { //if both are ok then save new member
                                member4save.save(function(err, member) {
                                    if (err) {
                                        callback("Error saving member!")
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
    var query = { "_id": user.userId };
    var options = { new: true };
    organizeData(user, function(data) {
        model.Member.findOneAndUpdate(query, data, options, function(err, member) {
            if (err) {
                console.log("got an error");
            } else {
                console.log(member);
                callback(null, member);
            }

        });

    });


}

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
    if (data.order) newMember.order = data.order;    
    if (data.cart) newMember.cart = data.cart;
    if (data.lastPurchaseDate) newMember.lastPurchaseDate = data.lastPurchaseDate;
    if (data.lastPurchasePrice) newMember.lastPurchasePrice = data.lastPurchasePrice;

    newMember.role = "client";
    callback(newMember);

}

function hashPassword(password) {
    let newpass = crypto.createHash("md5").update(password).digest("hex");
    return (newpass);
}