var bf3stats = require("../index.js").platform(360);

var players = ["ultraflynn", "R1ckyDaMan19"];

var opt = null;
bf3stats.playerlist(players, opt, function(err, list, failed) {
	if (err) {
		console.log(err);
	} else {
		console.log("list", list, "\nfailed", failed);
	}
});
