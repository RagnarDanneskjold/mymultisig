var storage = require('../storage');

storage.createNewUser("example@example.com", "h4ck3r");

storage.isPasswordValid("example@example.com", "h4ck3r", function(valid) {
	if(valid)
		console.log("Test isPasswordValid() OK");
	else
		console.log("Test isPasswordValid() FAILED");
});
