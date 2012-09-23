var bf3stats = require("../index.js").platform(360);

// This should work but produces this (which is wrong):
// players=ultraflynn&players=R1ckyDaMan19
var playersArray = ["ultraflynn", "R1ckyDaMan19"];
var playersList = "ultraflynn,R1ckyDaMan19";

var opt = null;
bf3stats.playerlist(playersList, opt, function(err, list, failed) {
	if (err) {
		console.log(err);
	} else {
		console.log("list", list, "failed", failed);
	}
});
