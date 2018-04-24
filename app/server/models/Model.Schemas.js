const mongoose = require('mongoose');
var Schema = mongoose.Schema;
autoIncrement = require('mongoose-auto-increment');

// db configuration
var db = 'mongodb://127.0.0.1/north';
mongoose.connect(db);
var con = mongoose.connection;
con.on('error', console.error.bind(console, 'connection error:'));
con.once('open', function() {
    console.log("connection created");
});

// var connection = mongoose.createConnection("mongodb://localhost/myDatabase");

autoIncrement.initialize(con);


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


var OrderSchema = new Schema({
    member_id: [{ type: Number, ref: 'members' }],
    cart_id: [{ type: Schema.Types.ObjectId, ref: 'cart' }],
    Price: Number,
    derliver_city: String,
    deliver_street: String,
    deliver_date: Date,
    order_date: Date,
    credit_card_4dig: Number
});


var CartSchema = new Schema({
    member_id: Number,
    date_created: Date
});

var ProductSchema = new Schema({
    name: String,
    category_id: Number,
    price: Number,
    image: String
});
// ProductSchema.plugin(autoIncrement.plugin, 'product');

var CartItem = new Schema({
    product_id: { type: Schema.Types.ObjectId, ref: 'product' },
    quantity: Number,
    totla_price: Number,
    cart_id: { type: Schema.ObjectId, ref: 'cart' },
});



module.exports = {
    Member: mongoose.model('members', MemberSchema),
    Order: mongoose.model('order', OrderSchema),
    Cart: mongoose.model('cart', CartSchema),
    Product: mongoose.model('product', ProductSchema),
    Cart_item: mongoose.model('cart_item', CartItem)

};

// db.city.save({"_id":1, "city":"Jerusalem"},{"_id":2, "city":"Tel Aviv"},{"_id":3, "city":"Be'er Sheva"},{"_id":4, "city":"Ashdod"},{"_id":5, "city":"Haifa"},{"_id":6, "city":"Rishon Letzion"},{"_id":7, "city":"Afula"},{"_id":8, "city":"Eilat"},{"_id":9, "city":"Bnei Brak"},{"_id":10, "city":"Raanana"},)
// findOneAndUpdate({ "_id" : 200178755 },{ $set: { "role" : "admin"}})