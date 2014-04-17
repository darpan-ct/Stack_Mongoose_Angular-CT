// mongoose API
var mongoose = require('mongoose');

// Connect to db.collection 'users'
mongoose.connect('mongodb://localhost/mean_stack');

// Define db Schema and Model
var User = mongoose.model('users', {
	userName: String, 
	password: String
});

module.exports.User = User;