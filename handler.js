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

function onCreate(request, response) {
	var posted = '';
	request.on('data', function(data) { posted += data });
	request.on('end', function() {
		var POST = querystring.parse(posted);
		var emailArray = POST['email'];
		for(var i = 0; i < 3; ++i)
			mailman.sendRegistrationEmail(emailArray[i]);

		// View
		writeHtml(response, buildHtml('mailed.html'));
	});
}

function onRegister(request, response) {
	output = {'text': 'text to register html'};
	writeHtml(response, buildHtml('register.html', output))

}

function onInitTx(request, response) {
	output = {'text': 'data to inittx'};
	writeHtml(response, buildHtml('inittx.html', output))
}

function onConfirmTx(request, response) {

}

function onSignTx(request, response) {
	output = {'text': 'data to signtx.html'};
	writeHtml(response, buildHtml('signtx.html', output))

}

exports.onCreate = onCreate;
exports.onRegister= onRegister;
exports.onInitTx= onInitTx;
exports.onConfirmTx= onConfirmTx;
exports.onSignTx= onSignTx;
