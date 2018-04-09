var memberCtrl = require('../controllers/member.controller.js');
var express = require('express');
var router = express.Router();

// let ;

router.use(function(req, res, next) {
    const allowedRoutes = ['/member/signUp', '/favicon.ico'];
    console.log(req.session);
    if (allowedRoutes.indexOf(req.originalUrl) > -1) {
        next();
    } else if (req.session === null || req.session === undefined) {
        res.send(401);
        // } else if (req.session._id == req.body.data.userId) {
    } else if (req.session.user == req.body.userName) {
        next();
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
            req.session['user'] = checkRes._doc.userName;
            req.session['role'] = checkRes._doc.role;
            req.session['_id'] = checkRes._doc._id;
            console.log(req.session);
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
            res.end(JSON.stringify({ done: true, member: { _id: updated._doc._id, userName: updated._doc.userName, role: updated._doc.role, cart: updated._doc.cart } }));
        }
    });

});

router.put('/addToCart', function(req, res) { //to do...
    let cartItem = req.body;
    let userDetails = {user: req.session.user, id: req.session.id};
    let addToCart = memberCtrl.addToCart(userDetails, cartItem, function(err, updated) {
        if (err) {
            console.log(err);
            res.end(JSON.stringify({ done: false, why: err }));
        } else {
            res.end(JSON.stringify({ done: true, member: { _id: updated._doc._id, userName: updated._doc.userName, role: updated._doc.role, cart: updated._doc.cart } }));
        }
    });

});
module.exports = router;