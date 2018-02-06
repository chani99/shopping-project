mongoose = require('mongoose');
var Schema = mongoose.Schema;



var MemberSchema = new Schema({
    name: String,
    age: Number
});

module.exports = mongoose.model('Member', MemberSchema);