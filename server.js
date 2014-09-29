var express = require('express');
var app = express();
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var server = require('http').Server(app);

var swig = require('swig');
var uuid = require('uuid');

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.use(session({
	store: new RedisStore({}),
	genid: function(req) {
    	return uuid.v1(); // use UUIDs for session IDs
  	},
	secret: 'lolcatz'
}));
var io = require('socket.io')(server);
app.set('views', __dirname + '/app/views');
app.set('view cache', false);
app.disable('x-powered-by');
swig.setDefaults({ cache: false });
app.use(express.static(__dirname + '/public'));
var httpController = require('./app/controllers/httpController');
var playerController = require('./app/controllers/playerController');
playerController(io);
httpController(app);

server.listen(3000);