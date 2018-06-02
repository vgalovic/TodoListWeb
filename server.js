
var http = require('http');
var express = require('express');
var path = require('path');
var methodOverride = require('method-override');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var mustacheExpress = require('mustache-express');
var mongoose = require('mongoose');
var routes = require('./routes/routes');

var app = express();

var mustacheExpressInstance = mustacheExpress();
mustacheExpressInstance.cache = null;


var xhrDelete = new XMLHttpRequest();

xhrDelete.open('post', '/delete', true);
xhrDelete.onload = onloadDelete();
xhrDelete.setRequestHeader('X-HTTP-Method-Override', 'DELETE');
xhrDelete.send();
function onloadDelete () {
  app.use(methodOverride('_method'));
}

var xhrUpdate = new XMLHttpRequest();

xhrUpdate.open('post', '/put', true);
xhrDelete.onload = onloadPut();
xhrUpdate.setRequestHeader('X-HTTP-Method-Override', 'PUT');
xhrUpdate.send();
function onloadPut () {
  app.use(methodOverride('_method'));
}

var port = 8080;

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/todoAppDB').then(() => {console.log('Database connected')});

app
  .engine('mustache', mustacheExpressInstance)
  .set('view engine', 'mustache')
  .set('views', __dirname + '/views')

  .use('/', routes)

  .use(express.static(path.join(__dirname, 'public')))

  .listen(process.env.PORT || port);

var server = http.createServer(app).listen(() => {
    console.log('Express server listening on port ' + port + ', go to localhost:' + port);
  });