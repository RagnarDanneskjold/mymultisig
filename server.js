var sys = require('sys');
var http = require('http');
var url = require('url');
var util = require('util');

function start(dispatch, handlers, staticfiles) {
	
	function onRequest(request, response) {
		try {
			var href = url.parse(request.url).href;
			if( href == "/" )
				href = "/index.html";

			console.log("Request [" + request.connection.remoteAddress + "]:" + href );

			if(href.indexOf(".html") > 0 || href.indexOf(".css") > 0 ||
			   href.indexOf(".ico") > 0 || href.indexOf(".js") > 0)

				staticfiles.serve(request, response, function (e, result) {
					if(e) {
						console.error("Error serving %s - %s", request.url, e.message);
						if(e.status == 404 || e.status == 500) {
							staticfiles.serveFile(util.format("/%d.html", e.status),
							                      e.status, {}, request, response);
						} else {
							response.writeHead(e.status, e.headers);
							response.end();
						}
					} else {
						console.log("Static: %s", request.url);
					}
				});
			else
				dispatch(request, response, handlers);
		} catch(e) {
			sys.puts(e);
			response.writeHead(500);
			response.end("Internal error server");
		}
	}

	console.log("Starting server...");
	http.createServer(onRequest).listen(8888);
	console.log("Server listening on localhost:8888");
}

exports.start = start;
