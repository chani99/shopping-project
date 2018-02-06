let app = require('../app');

// let Member = require('../Member.model');
let session = require('express-session');
let path = require('path');
let fs = require('fs');


let sess;

app.use(session({
    secret: 'somesecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

// app.use(function(req, res, next) {
//     const adminRoutes = ['/admin'];
//     const allowedRoutes = ['/login', '/'];

// if (allowedRoutes.indexOf(req.originalUrl) > -1) {
//     next();
// } else if (sess.user == null) {
//     res.send(401);
// } else if (sess.user.name == 'user') {
// next();

// if (adminRoutes.indexOf(req.originalUrl) > -1) {
//     res.send(401, 'only admins');
// }


// });



app.get('/', function(req, res) {

    res.sendFile(path.join(__dirname, '../../client/index.html'));
});

app.post('/login', function(req, res) {
    //get user name and password, check and respond, store in session
    sess = req.session;
    sess.user = {
        name: 'user' // change
    }
    console.log(req.session.user);
    res.send('user is logedin');

});