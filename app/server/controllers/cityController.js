"use strict";
let model = require("../models/Model.Schemas");
let crypto = require('crypto');


// Checks if a id exists in the system
function getall(callback) {
    model.City.find({}, function(err, city) {
        if (err) {
            callback(404, 'Error Occurred!');
        } else {
            console.log(city);
            callback(null, city);
        }
    });

}



module.exports.getall = getall;


// loop to insert cities to db
// let citylist = ["jerusalem", "Tel Aviv", "Hiafa", "Beer Seva", "Eilat", "Afula", "Kfar Saba", "Petach Tikva", "Raanana", "Beit Shemesh"];
// for (let x = 0; x <= citylist.length; x++) {
//     var newCity = new model.City();
//     newCity._id = x;
//     newCity.city = citylist[x];
//     newCity.save(function(err, city) {
//         if (err) {
//             console.log('Error Occurred!')
//         } else {
//             console.log(city + x)
//         }