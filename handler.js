var url = require('url');
var dot = require('dot');
var fs = require('fs');
var querystring = require('querystring');
var storage = require('./storage');

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

}

function onRegister(request, response) {
	output = {'text': 'text to register html'};
	writeHtml(response, buildHtml('register.html', output))

}

function onInitTx(request, response) {
	output = {'text': 'data to inittx'};
	writeHtml(response, buildHtml('inittx.html', output))
}

function onSignTx(request, response) {
	output = {'text': 'data to signtx.html'};
	writeHtml(response, buildHtml('signtx.html', output))

}

exports.onCreate = onCreate;
exports.onRegister= onRegister;
exports.onInitTx= onInitTx;
exports.onSignTx= onSignTx;
