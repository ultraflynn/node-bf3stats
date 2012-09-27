var bf3stats = require("../index.js").platform(360);

bf3stats.onlinestats(function(err, pc, xbox, ps3) {
	if (err) {
		console.log(err);
	} else {
		console.log("pc", pc, "360", xbox, "ps3", ps3);
	}
});
