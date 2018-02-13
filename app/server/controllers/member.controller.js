"use strict";
let model = require("../models/Model.Schemas");
let crypto = require('crypto');


// Checks if a id exists in the system
function checkExists(user, callback) {
    model.Member.findOne({
            _id: user.data.id,
        },
        function(err, member) {
            if (err) {
                callback(404, 'Error Occurred!')
            } else {
                if (member !== null) {
                    callback(null, "id allready exists")
                } else {
                    organizeData(user.data, function(member4save) {
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

            }
        });




}



module.exports.checkExists = checkExists;



let organizeData = function(data, callback) {
    let salt = "myApp##"
    var newMember = new model.Member();
    if (data.id) newMember._id = data.id;
    if (data.fname) newMember.fname = data.fname;
    if (data.lname) newMember.lname = data.lname;
    if (data.userName) newMember.userName = data.userName;
    if (data.email) newMember.email = data.email;
    if (data.password) newMember.password = hashPassword(salt + data.password);
    if (data.street) newMember.street = data.street;
    if (data.city) newMember.city = data.city;
    if (data.role) newMember.role = 'member';
    callback(newMember);

}

function hashPassword(password) {
    let newpass = crypto.createHash('md5').update(password).digest("hex");
    return (newpass);
}