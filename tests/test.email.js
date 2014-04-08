var mailman = require('../mailman');

mailman.sendEmail({
	"template_name": "create-account",
	"template_content": [],
	"to": [{
		"email": "marco@parroquiano.net",
		"name": "Marco Bravo",
		"type": "to"
	}],
	"merge_vars": [{
		"rcpt": "marco@parroquiano.net",
		"vars": [{
			"name": "USER_NAME",
			"content": "Marco Bravo"
		}]
	}]
}, function(err, res) {
	if(err) {
		console.log(err);
	} else {
		console.log(res);
	}
});
