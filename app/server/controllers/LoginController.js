let model = require("../models/Model.Schemas");
let crypto = require('crypto');


// Checks if a user exists in the system
function checkUser(user, callback) {
    let salt = "myApp##"

    hashPassword(salt + user.data.password, function(pass) {
        // console.log(user.data.name);
        // console.log(pass);

        model.Member.findOne({
            userName: user.data.name,
            password: pass
        }).populate('cart', 'date_created').exec(
            function(err, member) {
                if (err) {
                    callback(404, 'Error Occurred!')
                } else {
                    member !== null ? callback(null, member) : callback('no match');
                }


            })
    });



}

// Creating hash and salt 
function hashPassword(password, callback) {
    let newpass = crypto.createHash('md5').update(password).digest("hex");
    callback(newpass);
}


module.exports.checkUser = checkUser;