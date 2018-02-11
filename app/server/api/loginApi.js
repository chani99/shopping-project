let app = require('../app');

let session = require('express-session');
let path = require('path');
let fs = require('fs');
var loginCtrl = require('../controllers/LoginController.js');
var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));



let sess;

app.use(session({
    secret: 'somesecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.use(function(req, res, next) {
    const adminRoutes = ['/admin'];
    const allowedRoutes = ['/login', '/', '/favicon.ico'];

    if (allowedRoutes.indexOf(req.originalUrl) > -1) {
        next();
    } else if (sess === null || sess === undefined) {
        res.send(401);
    } else if (sess.user.name == 'user') {
        next();

        if (adminRoutes.indexOf(req.originalUrl) > -1) {
            res.send(401, 'only admins');
        }


    }

});


app.get('/', function(req, res) {

    res.sendFile(path.join(__dirname, '../../client/index.html'));
});

app.post('/login', function(req, res) {
    console.log(req.body);
    let user = req.body;
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

app.post('/login', function(req, res) {
    var newMember = new Member();
    //model fields:
    newMember._id = 200178755;
    newMember.fname = hadar;
    newMember.lname = avrahami;
    newMember.userName = hadar1234;
    newMember.password = 1234;
    newMember.street = baal;
    newMember.city = beitar;
    newMember.role = client;

    //insert into mongodb:
    newMember.save(function(err, member) {
        if (err) {
            res.send('Error saving member!')
        } else {
            console.log(member);
            res.json("the member: " + member);
        }
    })
});