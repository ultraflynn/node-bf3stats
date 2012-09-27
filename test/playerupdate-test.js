var bf3stats = require("../index.js").platform(360, "dqdeMJPCRn");

var time = new Date().getTime() / 1000;
var player = "ultraflynn";
var type = "direct";

bf3stats.playerupdate(time, player, type, function(err, data) {
	if (err) {
		console.log(err);
	} else {
		console.log("pos", pos, "task" , task);
	}
});
