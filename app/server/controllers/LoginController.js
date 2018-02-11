var model = require("../models/Model.Schemas");
var crypto = require('crypto');
require("../api/loginApi");
let app = require('../app');
var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
let mongoose = require('mongoose');
let db = 'mongodb://127.0.0.1/north';
// mongoose.connect(db, { useMongoClient: true });
mongoose.connect(db);
var con = mongoose.connection;

con.on('error', console.error.bind(console, 'connection error:'));
con.once('open', function() {
    console.log("connection created");
});




function checkUser(user, callback) {
    let salt = "myApp##"

    hashPassword(salt + user.data.password, function(pass) {
        console.log(user.data.name);
        console.log(pass);

        // var newMember = new model.Member();
        // //model fields:
        // newMember._id = 200178755;
        // newMember.fname = 'hadar';
        // newMember.lname = 'avrahami';
        // newMember.userName = 'hadar1234';
        // newMember.password = 1234;
        // newMember.street = 'baal';
        // newMember.city = 'beitar';
        // newMember.role = 'client';

        // //insert into mongodb:
        // newMember.save(function(err, member) {
        //     if (err) {
        //         res.send('Error saving member!')
        //     } else {
        //         console.log(member);
        //         res.json("the member: " + member);
        //     }
        // })

        model.Member.findOne({
                fname: user.data.name,
                password: '1234'
            },
            function(err, Member) {
                if (err) {
                    callback(404, 'Error Occurred!')
                } else {
                    console.log(Member);
                    callback(Member);
                }
            });


        function hashPassword(password, callback) {
            let newpass = crypto.createHash('md5').update(password).digest("hex");
            callback(newpass);

        }

        // db.members.findOne({ "fname": "Chani", "password": "1234" })



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