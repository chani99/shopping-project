"use strict";
let model = require("../models/Model.Schemas");
let products = require("./product.controller");
let member = require("./member.controller");
let crypto = require('crypto');



function addOrder(data, callback) {
    organizeOrderData(data, function(orderForDB){
        orderForDB.save(function(err, order) {
            if (err) {
                callback('Error saving order!')
            } else {
                console.log(order);
                callback(null, order);
            }
        })
    

    })

}

let organizeOrderData = function(data, callback) {
    var newOrder = new model.Order();
    if(data.member_id) newOrder.member_id = data.member_id;
    if(data.cart_id) newOrder.cart_id = data.cart_id;
    if(data.totalPrice) newOrder.Price = data.totalPrice;
    if(data.city) newOrder.derliver_city = data.city;
    if(data.street) newOrder.deliver_street = data.street;
    if(data.date) newOrder.deliver_date = data.date;
    newOrder.order_date = new Date();
    if(data.credit) newOrder.credit_card_4dig = data.credit;
    callback(newOrder);

}

module.exports.addOrder = addOrder;
