var bf3stats = require("../index.js").platform(360);

var time = null;
var player = "ultraflynn";

bf3stats.playerlookup(time, player, function(err, data) {
	if (err) {
		console.log(err);
	} else {
		console.log("pos", pos, "task" , task);
	}
});
