var memberCtrl = require('../controllers/member.controller.js');
var express = require('express');
var router = express.Router();




router.use(function(req, res, next) {
    const allowedRoutes = ['/member/signUp', '/favicon.ico'];

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




router.post('/signUp', function(req, res) {
    console.log(req.body);
    let user = req.body;
    let checkIfExists = memberCtrl.checkExists(user, function(err, exists) {
        if (err) {
            console.log(err);
            res.end(JSON.stringify({ login: false, Cause: err }));

        } else {
            console.log("exists: " + exists);
            res.end(JSON.stringify({ done: true, member: exists }));
        }
    });

});

module.exports = router;