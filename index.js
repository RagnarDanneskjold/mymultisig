var server = require('./server');
var dispatcher = require('./dispatcher');
var nodestatic = require('node-static');
var staticfiles = new(nodestatic.Server)('./static', {cache: 600});
var handler = require('./handler');

dispatchers = {
	'/create':   handler.onCreate,
	'/register': handler.onRegister,
	'/inittx':   handler.onInitTx,
	'/signtx':   handler.onSignTx
};

server.start(dispatcher.dispatch, dispatchers, staticfiles);
