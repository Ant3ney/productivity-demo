//User model
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
   uid: String,
   productivity: Number,
});

module.exports = mongoose.model('User', userSchema);
