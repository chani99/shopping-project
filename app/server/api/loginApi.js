let app = require('../app');

let session = require('express-session');
let path = require('path');
let fs = require('fs');
var loginCtrl = require('../controllers/LoginController.js');



let sess;

app.use(session({
    secret: 'somesecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

// app.use(function(req, res, next) {
//     const adminRoutes = ['/admin'];
//     const allowedRoutes = ['/login', '/', '/favicon.ico'];

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


app.get('/', function(req, res) {

    res.sendFile(path.join(__dirname, '../../client/index.html'));
});

app.post('/login', function(req, res) {
    console.log(req.query);
    let user = req.query;
    let checkUser = loginCtrl.checkUser(user, function(err, login) {
        if (err) {
            console.log(err);
        } else {
            console.log("login: " + login);
            sess = req.session;
            sess['user'] = user.name;

            res.end(JSON.stringify({ login: true, role: login[0].role_id }));
        }
    });

});