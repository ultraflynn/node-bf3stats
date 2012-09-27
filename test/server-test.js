var bf3stats = require("../index.js").platform(360);

var id = "a73100a1-b2e9-4d11-9f68-6733c022ed5d";

bf3stats.server(id, function(err, data) {
	if (err) {
		console.log(err);
	} else {
		console.log("data", data);
	}
});
