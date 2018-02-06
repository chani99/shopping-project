const mongoose = require('mongoose');
const Category = require('./Category.model');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    _id: Number,
    name: String,
    category: Category,
    price: Number,
    pic: String
});

module.exports = mongoose.model('Product' , ProductSchema);
