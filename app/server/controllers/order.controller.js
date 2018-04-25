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

function sumOfAllOrders(callback){

    var query = model.Order.find({}).select('_id');

    query.exec(function (err, allOrders) {
        if (err)  {callback(err);
        } else{
            // let sum = 0;
            
            // for (let i = 0; i < allOrders.length; i++) { 
            //     sum += allOrders[i]._doc.Price;
            // }
            callback(allOrders.length);
        }
    });
}

function checkOrderDates(callback){
    var query = model.Order.find({}).select('deliver_date -_id');
        query.exec(function (err, dates) {
            if (err)  {callback(err);
            } else {
                let datesBooked3Times = [];
                
                for (let i = 0; i < dates.length; i++) { 
                    let tempDate = [];
                    for (let x = 0; x < dates.length-1; x++) { 
                        let date1 = dates[i];
                        let date2 = dates[x+1];
                        if(date1._doc.deliver_date == date2._doc.deliver_date){
                            tempDate.push(date2._doc.deliver_date);
                        }
                    }
                        if (tempDate.length >=1) datesBooked3Times.push(tempDate[0]);
                    }
                    callback(null, datesBooked3Times);
                    
                }
            
        });
    

}

module.exports.checkOrderDates = checkOrderDates;
module.exports.addOrder = addOrder;
module.exports.sumOfAllOrders = sumOfAllOrders;
