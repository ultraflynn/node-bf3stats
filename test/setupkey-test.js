var bf3stats = require("../index.js").platform(360);

var time = null;
var clientident = null;
var name = null;

bf3stats.setupkey(time, clientdent, name, function(err, data) {
	if (err) {
		console.log(err);
	} else {
		console.log("data", data);
	}
});
