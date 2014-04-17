// mongoose API
var mongoose = require('mongoose');

// Define db Schema and Model
var UserAttrs = mongoose.model('crud', {
	userID: String,
	firstName: String,
	lastName: String,
	address: String,
	city: String,
	state: String,
	zip: Number,
	notes: String
});

module.exports.UserAttrs = UserAttrs;