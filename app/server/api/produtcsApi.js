var productCtrl = require('../controllers/product.controller.js');
var express = require('express');
var router = express.Router();



router.use(function(req, res, next) {
    // const allowedRoutes = ['/product/get', '/favicon.ico'];
    console.log(req.session);
    //     next();
    if (req.session === null || req.session === undefined) {
        res.send(401);
    } else if (req.session._id == req.body.data.userId && allowedRoutes.indexOf(req.originalUrl) > -1) {
        next();
    } else if (req.session._id == req.body.data.userId && req.session.role == "admin") {
        next();
    }

});


router.post('/upload', function(req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    console.log(req.files);
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.file;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(`uploads/${sampleFile.name}`, function(err) {
        if (err)
            return res.status(500).send(err);

        res.send(req.files.file.name);
    });
});



router.get('/get', function(req, res) {
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

router.post('/newProduct', function(req, res) {
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