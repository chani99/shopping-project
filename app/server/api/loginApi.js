var loginCtrl = require('../controllers/LoginController.js');
let cityCtrl = require('../controllers/cityController.js');
let productCtrl = require('../controllers/product.controller.js');
let orderCtrl = require('../controllers/order.controller.js');

var express = require('express');
var router = express.Router();



// router.use(function(req, res, next) {
//     const adminRoutes = ['/admin'];
//     const allowedRoutes = ['/login', '/', '/member', '/favicon.ico'];

//     if (allowedRoutes.indexOf(req.originalUrl) > -1) {
//         next();
//     } else if (sess === null || sess === undefined) {
//         res.send(401);
//     } else if (sess.user.name == 'user') {
//         next();

//         if (adminRoutes.indexOf(req.originalUrl) > -1) {
//             res.send(401, 'only admins');
//         }


//     }

// });
router.use('/order', require('./orderApi'));
router.use('/member', require('./membersApi'));
router.use('/product', require('./produtcsApi'));
router.use('/cart', require('./cartApi'));
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
});



router.post('/login', function(req, res) {
    let user = req.body;
    let checkUser = loginCtrl.checkUser(user, function(err, logedin) {
        if (err) {
            console.log(err);
            res.end(JSON.stringify({ login: false, Cause: err }));

        } else {
            // console.log("login: " + logedin);
            let session = req.session;
            session["user"] = logedin.member._doc.userName;
            session["role"] = logedin.member._doc.role;
            session["_id"] = logedin.member._doc._id;
            session["pass"] = logedin.member._doc.password;
            console.log("Session: %j", session);
            productCtrl.CountProductsInDB(function(allProduct){
                orderCtrl.sumOfAllOrders(function(allOrders){
                    res.end(JSON.stringify({
                        login: true,
                        allProduct: allProduct,
                        allOrders: allOrders,
                        member: {
                            _id: logedin.member._doc._id,
                            userName: logedin.member._doc.userName,
                            role: logedin.member._doc.role,
                            cart: logedin.member._doc.cart,
                            cartItems: logedin.cartItem,
                            city: logedin.member._doc.city,
                            street: logedin.member._doc.street,
                            lastPurchasePrice: logedin.member._doc.lastPurchasePrice,
                            lastPurchaseDate: logedin.member._doc.lastPurchaseDate,
                            
                        }
                    }));
        

                })
            })

        }
    });

});

router.get('/logout', function(req, res) {
    if (req.session.user) {
        loginCtrl.CheckUsersCart(req.session.user, req.session.pass);
        req.session.destroy();
        res.end(JSON.stringify(true));
    } else {
        res.end(JSON.stringify(true));


    }


});

module.exports = router;