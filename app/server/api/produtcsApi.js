var productCtrl = require('../controllers/product.controller.js');
var express = require('express');
var router = express.Router();
var uuidv4 = require('uuid/v4');

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


router.post('/upload', function(req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');
    console.log(req.files);
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.productImage;
    let filename = uuidv4() + '.jpg'

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(`uploads/${filename}`, function(err) {
        if (err) {
            return res.status(500).send(err);
        } else {

            let newProduct = req.body;
            let product = productCtrl.saveNewProduct(newProduct, filename, function(err, newPro) {
                if (err) {
                    console.log(err);
                    res.end(JSON.stringify({ done: false, why: err }));
                } else {
                    res.end(JSON.stringify({ done: true, Product: newPro._doc.name }));
                }
            });

        }

    });
});

function middleware(req, res, next){
        data = JSON.parse(req.query.data);

 if (req.session.user == data.userName){
    next();
}
}



router.get('/find', middleware, function(req, res, next) {

    console.log(req.query);
    let categorey = JSON.parse(req.query.data).id;
    let allProducts = productCtrl.getProducts(categorey, function(err, products) {
        if (err) {
            console.log(err);
            res.end(JSON.stringify(err));

        } else {
            console.log(products);
            res.end(JSON.stringify(products));
        }
    });

});

// router.post('/newProduct', function(req, res) {
//     console.log(req.body);

// });


module.exports = router;