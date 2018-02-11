const mongoose = require('mongoose');
var Schema = mongoose.Schema;

//user schema-model
var MemberSchema = new Schema({
    _id: Number,
    fname: String,
    lname: String,
    userName: String,
    email: String,
    password: String,
    city: String,
    street: String,
    role: String,
    cart: [{ type: Schema.Types.ObjectId, ref: 'cart' }],
    order: [{ type: Schema.Types.ObjectId, ref: 'order' }]
});

// category schema-model
var CategorySchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String
});

var OrderSchema = new Schema({
    _id: Schema.Types.ObjectId,
    member_id: [{ type: Schema.Types.ObjectId, ref: 'members' }],
    cart_id: [{ type: Schema.Types.ObjectId, ref: 'cart' }],
    Price: Number,
    derliver_city: String,
    deliver_street: String,
    dliver_date: Date,
    order_date: Date,
    credit_card_4dig: Number
});


var CartSchema = new Schema({
    _id: Schema.Types.ObjectId,
    member_id: [{ type: Schema.Types.ObjectId, ref: 'Member' }],
    date_created: Date
});

var ProductSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    category_id: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    price: Number,
    image: String
});

var CartItem = new Schema({
    _id: Schema.Types.ObjectId,
    product_id: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    quantity: Number,
    totla_price: Number,
    cart_id: [{ type: Schema.Types.ObjectId, ref: 'Cart' }]

});


module.exports = {
    Member: mongoose.model('members', MemberSchema),
    Category: mongoose.model('category', CategorySchema),
    Order: mongoose.model('order', OrderSchema),
    Cart: mongoose.model('cart', CartSchema),
    Product: mongoose.model('product', ProductSchema),
    Cart_item: mongoose.model('cart_item', CartItem)

};