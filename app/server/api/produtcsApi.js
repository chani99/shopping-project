var productCtrl = require('../controllers/product.controller.js');
var express = require('express');
var router = express.Router();

let sess;


router.use(function(req, res, next) {
    const allowedRoutes = ['/products/get', '/favicon.ico'];
    console.log(req.session);
    //     next();
    if (sess === null || sess === undefined) {
        res.send(401);
    } else if (sess._id == req.body.data.userId && allowedRoutes.indexOf(req.originalUrl) > -1) {
        next();
    } else if (sess._id == req.body.data.userId && sess.role == "admin") {
        next();
    }

});




router.get('/products/get', function(req, res) {
    console.log(req.body);
    let productsWanted = req.body;
    let allProducts = productCtrl.getProducts(productsWanted, function(err, products) {
        if (err) {
            console.log(err);
            res.end(JSON.stringify(err));

        } else {
            console.log(products);
            res.end(JSON.stringify(products));
        }
    });

});

router.post('/products/save', function(req, res) {
    console.log(req.body);
    let newProduct = req.body;
    let product = productCtrl.saveNewProduct(newProduct, function(err, newPro) {
        if (err) {
            console.log(err);
            res.end(JSON.stringify({ done: false, why: err }));
        } else {
            res.end(JSON.stringify({ done: true, Product: newPro._doc.name }));
        }
    });

});


module.exports = router;