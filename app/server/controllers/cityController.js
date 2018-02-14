"use strict";
let model = require("../models/Model.Schemas");
let crypto = require('crypto');


// Checks if a id exists in the system
function getall(callback) {
    model.City.find( {}, function(err, city) {
            if (err) {
                callback(404, 'Error Occurred!')
            } else {
                callback(null, city);
            }
          
        });

}


module.exports.getall = getall;


