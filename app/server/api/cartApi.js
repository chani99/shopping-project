var cartCtrl = require('../controllers/cart.controller.js');
var express = require('express');
var router = express.Router();

// let ;

router.use(function(req, res, next) {
    const allowedRoutes = ['/favicon.ico'];
    console.log(req.session);
    console.log(req);
    if (allowedRoutes.indexOf(req.originalUrl) > -1) {
        next();
    } else if (req.session === null || req.session === undefined) {
        res.send(401);
        // } else if (req.session._id == req.body.data.userId) {
    } else if (req.session.user == req.body.userName) {
        next();
    }

});


router.delete('/deleteCartItem', function(req, res) {
    let cartItemId = req.body.data.cartItemId;
    let cartId = req.body.data.cartId;

    let deleteAitem = cartCtrl.deleteFromCart(cartItemId, cartId, function(err, updatedCart) {
        if (err) {
            console.log(err);
            res.end(JSON.stringify({ done: false, why: err }));
        } else {
            res.end(JSON.stringify({ done: true, updatedCart }));
        }
    });

});

router.delete('/deleteCart', function(req, res) {
    let cartId = req.body.data;

    let deleteAllItems = cartCtrl.deleteAllItems(cartId, function(err, updatedCart) {
        if (err) {
            console.log(err);
            res.end(JSON.stringify({ done: false, why: err }));
        } else {
            res.end(JSON.stringify({ done: true, updatedCart }));
        }
    });

});



router.put('/addToCart', function(req, res) {
    let cartItem = req.body;
    let userId = req.session;
    let addToCart = cartCtrl.addToCart(userId, cartItem, function(err, cart, member) {
        if (err) {
            console.log(err);
            res.end(JSON.stringify({ done: false, why: err }));
        } else {
            res.end(JSON.stringify({ done: true, cart, member: member }));
        }
    });

});
module.exports = router;