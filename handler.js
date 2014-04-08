var url = require('url');
var dot = require('dot');
var fs = require('fs');
var querystring = require('querystring');
var storage = require('./storage');
var mailman= require('./mailman');

function writeHtml(response, html) {
	response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
	response.write(html);
	response.end();
}

function buildHtml(f, output) {
	var data = fs.readFileSync('./templates/' + f, 'utf-8');
	var t = dot.template(data);
	return t(output);
}

// Controllers

exports.onCreate = function(request, response) {
	var posted = '';
	request.on('data', function(data) { posted += data });
	request.on('end', function() {
		var POST = querystring.parse(posted);

		var email = POST['email'];
		for(var i = 0; i < 3; ++i)
			mailman.sendRegistrationEmail(email[i]);

		writeHtml(response, buildHtml('mailed.html'));
	});
}

exports.onRegister = function(request, response) {
	var query = url.parse(request.url).query;
	var GET = querystring.parse(query);
	writeHtml(response, buildHtml('register.html', {"email": GET["email"]}));
}

exports.onSave = function(request, response) {
	var posted = '';
	request.on('data', function(data) { posted += data });
	request.on('end', function() {
		var POST = querystring.parse(posted);

		var email = POST['email'];
		var password = POST['password'];
		storage.createNewUser(email, password);

		writeHtml(response, buildHtml('registered.html'));
	});
}

exports.onInitTx = function(request, response) {
	output = {'text': 'data to inittx'};
	writeHtml(response, buildHtml('inittx.html', output))
}

exports.onConfirmTx = function(request, response) {

}

exports.onSignTx= function(request, response) {
	output = {'text': 'data to signtx.html'};
	writeHtml(response, buildHtml('signtx.html', output))
}
