"use strict";
let model = require("../models/Model.Schemas");
let crypto = require('crypto');


// Checks if a id exists in the system
function getall(callback) {
    // loop to insert coategories to db
    let citylist = ["Milk & Eggs", "Vegetables & Fruits", "Meat & Fish", "Wine & Drinks"];
    for (let x = 0; x <= citylist.length; x++) {
        var newCity = new model.Category();
        newCity._id = x;
        newCity.name = citylist[x];
        newCity.save(function(err, city) {
            if (err) {
                console.log(err)
            } else {
                console.log(city + x)
            }
        })
    }
    // model.City.find({}, function(err, city) {
    //     if (err) {
    //         callback(404, 'Error Occurred!');
    //     } else {
    //         console.log(city);
    //         callback(null, city);
    //     }
    // });

}



module.exports.getall = getall;


// loop to insert cities to db
// let citylist = ["Milk & Eggs", "Vegetables & Fruits", "Meat & Fish", "Wine & Drinks"];
// for (let x = 0; x <= citylist.length; x++) {
//     var newCity = new model.Category();
//     newCity._id = x;
//     newCity.name = citylist[x];
//     newCity.save(function(err, city) {
//         if (err) {
//             console.log('Error Occurred!')
//         } else {
//             console.log(city + x)
//         }
//     })
// }