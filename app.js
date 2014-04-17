
/**
 * Module dependencies.
 */

var express = require('express'),
	http = require('http'), 
	mongoose = require('mongoose'),
	
	config = require('./config')(),
	app = express(),
	controller = require('./controllers/api');
	//MongoClient = require('mongodb').MongoClient,
	/*Admin = require('./controllers/Admin'),
	Home = require('./controllers/Home'),
	Blog = require('./controllers/Blog'),
	Page = require('./controllers/Page');
*/

// all environments
// app.set('port', process.env.PORT || 3000);
app.configure(function () {
	app.use(express.static(__dirname + '/public'));	
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
});


//app.listen(7777);
http.createServer(app).listen(config.port, function() {
  	console.log(
  		'Successfully connected to mongodb://' + config.mongo.host + ':' + config.mongo.port,
  		'\nExpress server listening on port ' + config.port
  	);
});

// development only
if ('development' == app.get('env')) {
  	app.use(express.errorHandler());
}
app.get('/', function(req, res) {
	console.log('Sending to the index.html');
	res.sendfile('./public/index.html');
});	


app.get('/api/users/:userName', controller.readUsers);
app.post('/api/users', controller.create);
app.put('/api/users/:userName', controller.updateUser);
app.delete('/api/users/:userName', controller.delete);

app.get('/api/attrs/:userName', controller.readAttrs);
app.put('/api/attrs/:userName', controller.updateAttrs);

app.get('/api/login/:userName/:password', controller.login);
/*
MongoClient.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/fastdelivery', function(err, db) {
	if(err) {
		console.log('Sorry, there is no mongo db server running.');
	} else {
		var attachDB = function(req, res, next) {
			req.db = db;
			next();
		};
		app.all('/admin*', attachDB, function(req, res, next) {
			Admin.run(req, res, next);
		});			
		app.all('/blog/:id', attachDB, function(req, res, next) {
			Blog.runArticle(req, res, next);
		});	
		app.all('/blog', attachDB, function(req, res, next) {
			Blog.run(req, res, next);
		});	
		app.all('/services', attachDB, function(req, res, next) {
			Page.run('services', req, res, next);
		});	
		app.all('/careers', attachDB, function(req, res, next) {
			Page.run('careers', req, res, next);
		});	
		app.all('/contacts', attachDB, function(req, res, next) {
			Page.run('contacts', req, res, next);
		});	
		app.all('/', attachDB, function(req, res, next) {
			Home.run(req, res, next);
		});		
		http.createServer(app).listen(config.port, function() {
		  	console.log(
		  		'Successfully connected to mongodb://' + config.mongo.host + ':' + config.mongo.port,
		  		'\nExpress server listening on port ' + config.port
		  	);
		});
	}
});*/