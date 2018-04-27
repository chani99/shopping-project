var productCtrl = require('../controllers/product.controller.js');
var express = require('express');
var router = express.Router();
let data;

// router.use(function(req, res, next) {
//     const allowedRoutes = ['/product/find/:data', '/favicon.ico'];
//     let session = req.session;
//     data = JSON.parse(req.query.data);

//     console.log("Session Product: %j", session);
//     console.log("body:  %j", req);

//         next();
//     if (req.session === null || req.session === undefined) {
//         res.send(401);
//     } else if ((req.session.user == req.body.userName || req.session.user == data.userName)  &&  (allowedRoutes.indexOf(req.originalUrl)) > -1) {
//         next();
//     } else if ((req.session.user == req.body.userName || req.session.user == data.userName)  && req.session.role == "admin") {
//         next();
//     }

// });

function adminmiddleware(req, res, next) {
    if(req.body)data = req.body;
    if (req.session.user === data.userName && req.session.role === "admin") {
        next();
    }
}

router.post('/upload',adminmiddleware, function(req, res) {
    let product = productCtrl.saveNewProduct(req, function(err, updatedPro) {
        if (err) {
            console.log(err);
            res.end(JSON.stringify({ done: false, why: err }));
        } else {
            res.end(JSON.stringify({ done: true, Product: updatedPro._doc.name }));
        }
    });
});

router.put('/update',adminmiddleware, function(req, res) {
    let product = productCtrl.updateProduct(req, function(err, updatedPro) {
        if (err) {
            console.log(err);
            res.end(JSON.stringify({ done: false, why: err }));
        } else {
            res.end(JSON.stringify({ done: true, Product: updatedPro._doc.name }));
        }
    });
});



function findmiddleware(req, res, next) {
    data = JSON.parse(req.query.data);
    if (req.session.user == data.userName) {
        next();
    }
}


router.get('/find', findmiddleware, function(req, res, next) {
    let allProducts = productCtrl.getProducts(req, function(err, products) {
        if (err) {
            console.log(err);
            res.end(JSON.stringify(err));

        } else {
            res.end(JSON.stringify(products));
        }
    });

});



module.exports = router;