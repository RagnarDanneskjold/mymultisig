var url = require('url');
var dot = require('dot');
var fs = require('fs');
var querystring = require('querystring');
var bitcore = require('bitcore');

function writeHtml(response, html) {
	response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
	response.write(html);
	response.end();
}

function buildHtml(f, output) {
	var data = fs.readFileSync("./templates/" + f, "utf-8");
	var t = dot.template(data);
	return t(output);
}

// Callbacks

function onValid(request, response) {
	var q = url.parse(request.url).query
	console.log("onValid: %s", q);

	var arg = querystring.parse(q);
	var Address = bitcore.Address;
	var a = new Address(arg["address"]);

	output = {};

	if(a.isValid())
		output["valid"] = "true";
	else
		output["valid"] = "false";

	// valid.html is a template
	writeHtml(response, buildHtml("valid.html", output));
}

exports.onValid= onValid;
