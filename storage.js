// sqlite3 database is create here

function createNewUser(email, password) {
	// Store email and hashed passord on sqlite3 DB
	console.log("Creating new user %s", email);
}

function isPasswordValid(email, password) {
	// Return true is password is valid
	return true;
}

exports.createNewUser = createNewUser;
exports.isPassworValid = createNewUser;
