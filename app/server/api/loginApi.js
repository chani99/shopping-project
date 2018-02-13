var loginCtrl = require('../controllers/LoginController.js');
var express = require('express');
var router = express.Router();




router.use(function(req, res, next) {
    const adminRoutes = ['/admin'];
    const allowedRoutes = ['/login', '/', '/favicon.ico', '/signUp'];

    if (allowedRoutes.indexOf(req.originalUrl) > -1) {
        next();
    } else if (sess === null || sess === undefined) {
        res.send(401);
    } else if (sess.user.name == 'user') {
        next();

        if (adminRoutes.indexOf(req.originalUrl) > -1) {
            res.send(401, 'only admins');
        }


    }

});


router.get('/', function(req, res) {

    res.sendFile(path.join(__dirname, '../../client/index.html'));
});

router.post('/login', function(req, res) {
    console.log(req.body);
    let user = req.body;
    let checkUser = loginCtrl.checkUser(user, function(err, logedin) {
        if (err) {
            console.log(err);
            res.end(JSON.stringify({ login: false, Cause: err }));


        } else {
            console.log("login: " + logedin);
            sess = req.session;
            sess['user'] = logedin._doc.userName;
            sess['role'] = logedin._doc.role;


            res.end(JSON.stringify({ login: true, user: logedin }));
        }
    });

});
module.exports = router;


// app.post('/login', function(req, res) {
//     var newMember = new Member();
//     //model fields:
//     newMember._id = 200178755;
//     newMember.fname = hadar;
//     newMember.lname = avrahami;
//     newMember.userName = hadar1234;
//     newMember.password = 1234;
//     newMember.street = baal;
//     newMember.city = beitar;
//     newMember.role = client;

//     //insert into mongodb:
//     newMember.save(function(err, member) {
//         if (err) {
//             res.send('Error saving member!')
//         } else {
//             console.log(member);
//             res.json("the member: " + member);
//         }
//     })
// });