var memberCtrl = require("../controllers/member.controller.js");
var express = require("express");
var router = express.Router();


router.use(function (req, res, next) {
    const allowedRoutes = ["/member/signUp", "/favicon.ico"];
    console.log(req.session);
    if (allowedRoutes.indexOf(req.originalUrl) > -1) {
        next();
    } else if (req.session === null || req.session === undefined) {
        res.send(401);
    } else if (req.originalUrl === "/member/details" || req.session._id == req.body.data.userId) {
        next();

    } else if (req.session.user == req.body.userName) {
        next();
    }

});




router.post("/signUp", function (req, res) {
    let user = req.body;
    ///for validation serverSide (basic)
    req.check("_id", "invalid user id").exists().notEmpty().isLength({
        min: 6
    });
    req.check("userName", "invalid user name").exists().notEmpty();
    req.check("email", "invalid email").exists().notEmpty().isEmail();
    req.check("password", "invalid user id").exists().notEmpty().isLength({
        min: 4
    });
    let valerrors = req.validationErrors();
    if (valerrors) {
        res.end(JSON.stringify({
            done: false,
            why: valerrors
        }));

    } else {

        let checkIfExists = memberCtrl.checkExists(user, function (err, checkRes) {
            if (err) {
                res.end(JSON.stringify({
                    done: false,
                    why: err
                }));

            } else {
                console.log("exists: " + checkRes);
                req.session["user"] = checkRes._doc.userName;
                req.session["role"] = checkRes._doc.role;
                req.session["_id"] = checkRes._doc._id;
                res.end(JSON.stringify({
                    done: true,
                    member: checkRes._doc._id
                }));
            }
        });
    }
});

router.put("/details", function (req, res) {
    ///for validation serverSide (basic)
    req.check("city", "invalid city").exists().notEmpty();
    req.check("fname", "invalid first Name").exists().notEmpty();
    req.check("lname", "invalid last Name").exists().notEmpty();
    req.check("street", "invalid City").exists().notEmpty();
    let valerrors = req.validationErrors();
    if (valerrors) {
        res.end(JSON.stringify({
            done: false,
            why: valerrors
        }));

    } else {
        console.log(req.body);
        let userDetails = req.body;
        let updateDetals = memberCtrl.updateDetals(userDetails, function (err, updated) {
            if (err) {
                console.log(err);
                res.end(JSON.stringify({
                    done: false,
                    why: err
                }));
            } else {
                res.end(JSON.stringify({
                    done: true,
                    member: {
                        _id: updated._doc._id,
                        userName: updated._doc.userName,
                        role: updated._doc.role,
                        cart: updated._doc.cart
                    }
                }));
            }
        });
    }
});


module.exports = router;