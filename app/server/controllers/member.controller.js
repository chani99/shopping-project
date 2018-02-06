"use strict";


let organizeData = function(data, callback) {
    let data4Update = {}
        // if (data._id) data4Update._id = data._id;
    if (data.fname) data4Update.fname = data.fname;
    if (data.lname) data4Update.lname = data.lname;
    if (data.password) data4Update.password = data.password;
    if (data.street) data4Update.street = data.street;
    if (data.city) data4Update.city = data.city;
    if (data.role) data4Update.role = data.role;
    callback(null, data4Update);

}


module.exports.organizeData = organizeData;