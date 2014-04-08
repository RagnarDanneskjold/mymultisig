var sqlite3 = require('sqlite3')
var crypto = require('crypto')

var db = new sqlite3.Database('./mymultisig.db');

exports.createNewUser = function(email, password) {
	db.serialize(function() {
		var sha256 = crypto.createHash('SHA256');
		sha256.update(password);
		var hash = sha256.digest('base64');
		var stmt = db.prepare("INSERT OR REPLACE INTO user VALUES (?, ?)");
		stmt.run(email, hash);

		console.log("INSERT %s %s", email, hash);

		stmt.finalize();
		});
}

exports.isPasswordValid = function(email, password, callback) {
	db.serialize(function() {
		var stored_hash = "";
		var stmt = db.prepare("SELECT sha256password FROM user WHERE username = ?");
		stmt.each(email, function(e, row) { // TODO: handle e
			stored_hash = row.sha256password;
			var sha256 = crypto.createHash('SHA256');
			sha256.update(password);
			var hash = sha256.digest('base64');
			callback(hash == stored_hash);
		});
		stmt.finalize();
	});
}
