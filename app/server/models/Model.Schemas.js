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
    cart: [{ type: Schema.Types.ObjectId, ref: 'Cart' }],
    order: [{ type: Schema.Types.ObjectId, ref: 'Order' }]
});

// category schema-model
var CategorySchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String
});

var OrderSchema = new Schema({
    _id: Schema.Types.ObjectId,
    member_id: [{ type: Schema.Types.ObjectId, ref: 'Member' }],
    cart_id: [{ type: Schema.Types.ObjectId, ref: 'Cart' }],
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


module.exports.schemas = {
    Member: mongoose.model('Member', MemberSchema),
    Category: mongoose.model('Category', CategorySchema),
    Order: mongoose.model('Order', OrderSchema),
    Cart: mongoose.model('Cart', CartSchema),
    Product: mongoose.model('Product', ProductSchema),
    Cart_item: mongoose.model('Cart_item', CartItem)

};