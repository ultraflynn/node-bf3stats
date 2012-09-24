var bf3stats = require("../index.js").platform(360);

var id = "AServerId";

bf3stats.server(player, function(err, data) {
	if (err) {
		console.log(err);
	} else {
		console.log("data", data);
	}
});
