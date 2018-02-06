const mongoose = require('mongoose');
var Schema = mongoose.Schema;

//user schema-model
var MemberSchema = new Schema({
    fname: String,
    lname: String,
    userName: String,
    email: String,
    _id: Number,
    password: String,
    city: String,
    Streen: String,
    role: String,
    cart: CartSehema,
    order: OrderSchema
});

//category schema-model
var CategorySchema = new Schema({
    name: String,
    _id: Number
});

module.exports = mongoose.model('Member', MemberSchema);
module.exports = mongoose.model('Category', CategorySchema);