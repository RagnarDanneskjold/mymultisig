function sendRegistrationEmail(email) {
	// Send a registration email, it should include a link back to 
	// http://localhost:8888/register?email=foo@example.com
}

function sendTransactionEmail(email, txid) {
	// Send a a transaction confirmation email, it should include a link back to 
	// http://localhost:8888/confirmtx?email=foo@example.com&txid=123456
}

exports.sendRegistrationEmail = sendRegistrationEmail;
exports.sendTransactionEmail = sendTransactionEmail;
