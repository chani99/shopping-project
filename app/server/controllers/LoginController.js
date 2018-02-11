var model = require("../models/Model.Schemas");
var crypto = require('crypto');
require("../api/loginApi");



function checkUser(user, callback) {
    let salt = "myApp##"
    hashPassword(salt + user.password, function(pass) {
        model.Member.findOne({
            userName: req.params.name,
            password: pass // body-parser did it !!!!
        }).exec(function(err, Member) {
            if (err) {
                res.send(404, 'Error Occurred!')
            } else {
                console.log(Member);
                res.json(Member);
            }
        });


        function hashPassword(password, callback) {
            let newpass = crypto.createHash('md5').update(password).digest("hex");
            callback(newpass);

        }

        findUser("administratior", user.name, pass, function(err, res) {
            if (err) {
                callback(err);
            } else {
                console.log("res: " + res);
                if (res.length < 1) {
                    callback('no match');

                }
                callback(null, res);


            }


        });

    });


}




// Creating hash and salt 
function hashPassword(password, callback) {
    let newpass = crypto.createHash('md5').update(password).digest("hex");
    callback(newpass);

    // Store hash (incl. algorithm, iterations, and salt) 

    // Verifying a hash 
    // password('hack').verifyAgainst(myuser.hash, function(error, verified) {
    //     if(error)
    //         throw new Error('Something went wrong!');
    //     if(!verified) {
    //         console.log("Don't try! We got you!");
    //     } else {
    //         console.log("The secret is...");
    //     }
    // });
}


module.exports.checkUser = checkUser;