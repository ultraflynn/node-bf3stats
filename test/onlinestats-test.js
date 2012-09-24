var bf3stats = require("../index.js").platform(360);

bf3stats.onlinestats(function(err, data) {
	if (err) {
		console.log(err);
	} else {
		console.log("data", data);
	}
});
