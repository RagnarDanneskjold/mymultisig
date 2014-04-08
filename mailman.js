exports.sendEmail = function(args, callback) {
	var mandrill = require('mandrill-api/mandrill');
	var config = require('./config');

	var template_name = args.template_name || null;
	var template_content = args.template_content || [];
	var to = args.to || [];
	var merge_vars = args.merge_vars || [];

	var mandrill_client = new mandrill.Mandrill(config.mandrill.api_key,true);

	mandrill_client.messages.sendTemplate({
		"key": config.mandrill.api_key,

		"template_name": template_name,
		"template_content": template_content,
		"message": {
			"from_email": config.mandrill.from_email,
			"from_name": config.mandrill.from_name,
			"to": to,
			"headers": {
				"Reply-To": config.mandrill.reply_to
			},
			"important": true,
			"track_opens": true,
			"track_clicks": true,
			"auto_text": null,
			"auto_html": null,
			"inline_css": null,
			"url_strip_qs": null,
			"preserve_recipients": null,
			"view_content_link": null,
			"bcc_address": null,
			"tracking_domain": null,
			"signing_domain": null,
			"return_path_domain": null,
			"merge": false,
			"global_merge_vars": [],
			"merge_vars": merge_vars,
			"tags": [],
			"subaccount": null,
			"google_analytics_domains": [],
			"google_analytics_campaign": [],
			"metadata": null,
			"recipient_metadata": [],
			"attachments": [],
			"images": []
		},
		"async": false,
		"ip_pool": null,
		"send_at": null
	}, function(res) {
		if(callback) callback(null, res);
	}, function(err) {
		if(callback) callback(err, null);
	});
}

exports.sendRegistrationEmail= function(email) {
	// TODO Send a registration email, it should include a link back to 
	// http://localhost:8888/register?email=foo@example.com
	this.sendEmail({
		"template_name": "create-account",
		"template_content": [],
		"to": [{
			"email": email,
			"name": email,
			"type": "to"
		}],
		"merge_vars": [{
			"rcpt": email,
			"vars": [{
				"name": "USER_NAME",
				"content": email
			}]
		}]
	}, function(err, res) {
		if(err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});
}

exports.sendTransactionEmail=function(email, txid) {
	// TODO Send a transaction confirmation email, it should include a link back to 
	// http://localhost:8888/confirmtx?email=foo@example.com&txid=123456
	this.sendEmail({
		"template_name": "tx-attempted",
		"template_content": [],
		"to": [{
			"email": email,
			"name": email,
			"type": "to"
		}],
		"merge_vars": [{
			"rcpt": email,
			"vars": [{
				"name": "USER_NAME",
				"content": email
			}]
		}]
	},function(err, res) {
		if(err) {
			console.log(err);
		} else {
			console.log(res);
		}
	});
}
