var server = require('./server');
var dispatcher = require('./dispatcher');
var nodestatic = require('node-static');
var staticfiles = new(nodestatic.Server)('./static', {cache: 600});
var handler = require('./handler');

dispatchers = {"/valid": handler.onValid };

server.start(dispatcher.dispatch, dispatchers, staticfiles);
