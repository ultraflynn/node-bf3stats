var bf3stats = require("../index.js").platform(360);

var time = null;
var clientident = null;

bf3stats.getkey(time, clientident, function(err, data) {
	if (err) {
		console.log(err);
	} else {
		console.log("data", data);
	}
});
