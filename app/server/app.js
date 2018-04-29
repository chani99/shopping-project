var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    path = require("path"),
    bodyParser = require("body-parser"),
    port = 3000,
    favicon = require("serve-favicon"),
    login = require("./api/loginApi"),
    fileUpload = require("express-fileupload"),
    cookieParser = require("cookie-parser"),
    session = require("express-session");
validator = require("express-validator")


app.use(express.static("./app/client"));
app.use("/node_modules", express.static("./app/node_modules"));
app.use(favicon(path.join(__dirname, "../client/images/favicon.ico")));
// app.use(express.static(path.join(__dirname, "./app/node_modules")));
app.use("/client", express.static(path.join(__dirname, "./app/client")));
// app.use("/client", express.static("./client"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(fileUpload());
app.use(cookieParser());
app.use(session({
    secret: "TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
    resave: true,
    saveUninitialized: true
}));
app.use(validator());


app.listen(port, function () {
    console.log(`App listening on port ${port}`);
})


//main router index
app.use(login);