"use strict";
let model = require("../models/Model.Schemas");
let products = require("./product.controller");
let member = require("./member.controller");
let crypto = require("crypto");



function addOrder(data, callback) {
    organizeOrderData(data, function(orderForDB) {
        orderForDB.save(function(err, order) {
            if (err) {
                callback("Error saving order!")
            } else {
                console.log(order);
                callback(null, order);
            }
        })

    })
}

let organizeOrderData = function(data, callback) {
    var newOrder = new model.Order();
    if (data.member_id) newOrder.member_id = data.member_id;
    if (data.cart_id) newOrder.cart_id = data.cart_id;
    if (data.totalPrice) newOrder.Price = data.totalPrice;
    if (data.city) newOrder.derliver_city = data.city;
    if (data.street) newOrder.deliver_street = data.street;
    if (data.date) {
        let Ddate = new Date(data.date);
        Ddate.setDate(Ddate.getDate() + 1);
        newOrder.deliver_date = Ddate;
    }
    newOrder.order_date = new Date();
    if (data.credit) newOrder.credit_card_4dig = data.credit;
    callback(newOrder);

}

function sumOfAllOrders(callback) {
    var query = model.Order.find({}).select("_id");
    query.exec(function(err, allOrders) {
        if (err) {
            callback(err);
        } else {
            callback(allOrders.length);
        }
    });
}

//function to check what date has 3 order
function checkOrderDates(callback) {
    var query = model.Order.find({}).select("deliver_date -_id");
    query.exec(function(err, dates) {
        if (err) {
            callback(err);
        } else {
            let datesBooked3Times = [];

            for (let i = 0; i < dates.length; i++) {
                let dateCount = 0;
                let date1 = dates[i];
                let date11 = date1._doc.deliver_date;

                for (let x = 0; x < dates.length; x++) {
                    let date2 = dates[x];
                    let date22 = date2._doc.deliver_date;

                    if (+date11 == +date22) {
                        dateCount += 1;
                    }
                }
                if (dateCount >= 3) datesBooked3Times.push(date1.deliver_date);
            }

            callback(null, datesBooked3Times);

        }

    });

}

module.exports.checkOrderDates = checkOrderDates;
module.exports.addOrder = addOrder;
module.exports.sumOfAllOrders = sumOfAllOrders;