var loginCtrl = require('../controllers/LoginController.js');
let cityCtrl = require('../controllers/cityController.js');
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

router.use('/member', require('./membersApi'));
router.use('/product', require('./produtcsApi'));
router.use('/cart', require('./cartApi'));
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
});


router.get('/city', function(req, res) {
    let getCity = cityCtrl.getall(function(err, citylist) {
        if (err) {
            console.log(err);
            res.end(JSON.stringify({ login: false, Cause: err }));
        } else {
            res.end(JSON.stringify(citylist));
        }
    });
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
            session["user"] = logedin._doc.userName;
            session["role"] = logedin._doc.role;
            session["_id"] = logedin._doc._id;
            console.log("Session: %j", session);
            res.end(JSON.stringify({ login: true, member: { _id: logedin._doc._id, userName: logedin._doc.userName, role: logedin._doc.role, cart: logedin._doc.cart } }));
        }
    });

});

router.get('/logout', function(req, res) {
    req.session.destroy();
    res.end(JSON.stringify(true));

});

module.exports = router;