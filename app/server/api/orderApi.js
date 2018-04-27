var orderCtrl = require("../controllers/order.controller.js");
var cartCtrl = require("../controllers/cart.controller.js");
var memberCtrl = require("../controllers/member.controller.js");

var express = require("express");
var router = express.Router();


router.use(function(req, res, next) {
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
    }
    else if (req.session._id == req.body.data.member_id) {
        next();
    }

});

router.get("/dates", function(req, res) {
    orderCtrl.checkOrderDates(function(err, dates){
        if (err) {
            console.log(err);
            res.end(JSON.stringify({ done: false, why: err }));
        }   else {
            res.end(JSON.stringify(dates));
    
        }

    });
});
    




router.post("/order", function(req, res) {
    let order = req.body;
    let userId = req.session;
    let addOrder = orderCtrl.addOrder(order.data, function(err, newOrder) {

                if (err) {
                    console.log(err);
                    res.end(JSON.stringify({ done: false, why: err }));
                } else {
                    cartCtrl.getAllCartItems(order.data.cart_id, function(err, cartItems){
                                if(err) {
                                    console.log(err);
                                    res.end(JSON.stringify("problem updating mamber"));
                                } else {
                        let memberDta = {
                                        data: {
                                                userId: order.data.member_id,
                                                newMember: {
                                                    cart: [],
                                                    lastPurchaseDate:newOrder._doc.order_date,
                                                    lastPurchasePrice:newOrder._doc.Price,
                                                    order: newOrder._doc._id
                                                }
                                            }
                                        }
                                
                        memberCtrl.updateDetals(memberDta, function(err, updated) {
                                    console.log(updated);
                                    res.end(JSON.stringify({ done: true, order: newOrder, member: updated, items: cartItems}));
                                    
                        });

                }
                    });
                }

        
    });
            
});



module.exports = router;