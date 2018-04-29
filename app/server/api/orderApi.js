var orderCtrl = require("../controllers/order.controller.js");
var cartCtrl = require("../controllers/cart.controller.js");
var memberCtrl = require("../controllers/member.controller.js");

var express = require("express");
var router = express.Router();


router.use(function (req, res, next) {
    const allowedRoutes = ["/favicon.ico", "/order/dates"];
    console.log(req.session);
    console.log(req);
    if (allowedRoutes.indexOf(req.originalUrl) > -1) {
        next();
    } else if (req.session === null || req.session === undefined) {
        res.send(401);
        // } else if (req.session._id == req.body.data.userId) {
    } else if (req.session.user == req.body.userName) {
        next();
    } else if (req.session._id == req.body.member_id) {
        next();
    }

});

//get dates that are booked 3 times
router.get("/dates", function (req, res) {
    orderCtrl.checkOrderDates(function (err, dates) {
        if (err) {
            console.log(err);
            res.end(JSON.stringify({
                done: false,
                why: err
            }));
        } else {
            res.end(JSON.stringify(dates));

        }

    });
});




//add order to db
router.post("/order", function (req, res) {
    ///for validation serverSide (basic)
    req.check("cart_id", "no cart id").exists().notEmpty();
    req.check("city", "missing city").exists().notEmpty();
    req.check("credit", "missing credit card").exists().notEmpty();
    req.check("date", "missing date").exists().notEmpty();
    req.check("member_id", "missing member id").exists().notEmpty();
    req.check("street", "missing street").exists().notEmpty();
    req.check("totalPrice", "missing total price").exists().notEmpty();
    let valerrors = req.validationErrors();
    if (valerrors) {
        res.end(JSON.stringify({
            done: false,
            why: valerrors
        }));

    } else {
        let order = req.body;
        let userId = req.session;
        cartCtrl.compareTotalPrice(order.cart_id, function (err, isEquel) {
            if (err) {
                console.log(err);
                res.end(JSON.stringify({
                    done: false,
                    why: err
                }));

            } else {
                order.totalPrice = isEquel;

                let addOrder = orderCtrl.addOrder(order, function (err, newOrder) {

                    if (err) {
                        console.log(err);
                        res.end(JSON.stringify({
                            done: false,
                            why: err
                        }));
                    } else {
                        cartCtrl.getAllCartItems(order.cart_id, function (err, cartItems) {
                            if (err) {
                                console.log(err);
                                res.end(JSON.stringify("problem updating mamber"));
                            } else {
                                let memberDta = {
                                    userId: order.member_id,
                                    cart: [],
                                    lastPurchaseDate: newOrder._doc.order_date,
                                    lastPurchasePrice: newOrder._doc.Price,
                                    order: newOrder._doc._id
                                }


                                memberCtrl.updateDetals(memberDta, function (err, updated) {
                                    console.log(updated);
                                    res.end(JSON.stringify({
                                        done: true,
                                        order: newOrder,
                                        member: updated,
                                        items: cartItems
                                    }));

                                });

                            }
                        });
                    }


                });
            }
        })
    }

});



module.exports = router;