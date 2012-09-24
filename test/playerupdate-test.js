var bf3stats = require("../index.js").platform(360);

var time = null;
var player = "ultraflynn";
var type = "direct";

bf3stats.playerupdate(time, player, type, function(err, data) {
	if (err) {
		console.log(err);
	} else {
		console.log("pos", pos, "task" , task);
	}
});
