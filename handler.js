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

}

function onInitTx(request, response) {

}

function onSignTx(request, response) {

}

exports.onCreate = onCreate;
exports.onRegister= onRegister;
exports.onInitTx= onInitTx;
exports.onSignTx= onSignTx;
