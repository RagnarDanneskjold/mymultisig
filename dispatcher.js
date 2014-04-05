var url = require('url');

function dispatch(request, response, handlers) {
	var pathname= url.parse(request.url).pathname;
	if (handlers[pathname]) 
		handlers[pathname](request, response);
}

exports.dispatch = dispatch;
