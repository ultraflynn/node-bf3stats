var bf3stats = require("../index.js").platform(360);

var player = "ultraflynn";

var opt = null;
bf3stats.player(player, opt, function(err, data) {
	if (err) {
		console.log(err);
	} else {
		console.log("data", data);
	}
});
