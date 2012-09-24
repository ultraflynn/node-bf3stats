var bf3stats = require("../index.js").platform(360);

var player = "ultraflynn";

bf3stats.dogtags(player, function(err, data) {
	if (err) {
		console.log(err);
	} else {
		console.log("data", data);
	}
});
