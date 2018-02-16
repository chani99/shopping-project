var memberCtrl = require('../controllers/member.controller.js');
var express = require('express');
var router = express.Router();

let sess;


router.use(function(req, res, next) {
    const allowedRoutes = ['/member/signUp', '/favicon.ico'];
    console.log(req.session);
    if (allowedRoutes.indexOf(req.originalUrl) > -1) {
        next();
    } else if (sess === null || sess === undefined) {
        res.send(401);
    } else if (sess._id == req.body.data.userId) {
        next();

        if (adminRoutes.indexOf(req.originalUrl) > -1) {
            res.send(401, 'only admins');
        }


    }

});




router.post('/signUp', function(req, res) {
    console.log(req.body);
    let user = req.body;
    let checkIfExists = memberCtrl.checkExists(user, function(err, checkRes) {
        if (err) {
            console.log(err);
            res.end(JSON.stringify({ done: false, why: err }));

        } else {
            console.log("exists: " + checkRes);
            sess = req.session;
            sess['user'] = checkRes._doc.userName;
            sess['role'] = checkRes._doc.role;
            sess['_id'] = checkRes._doc._id;
            console.log(sess);
            res.end(JSON.stringify({ done: true, member: checkRes._doc._id }));
        }
    });

});

router.put('/details', function(req, res) {
    console.log(req.body);
    let userDetails = req.body;
    let updateDetals = memberCtrl.updateDetals(userDetails, function(err, updated) {
        if (err) {
            console.log(err);
            res.end(JSON.stringify({ done: false, why: err }));
        } else {
            res.end(JSON.stringify({ done: true, member: updated._doc._id }));
        }
    });

});


module.exports = router;