//
// BF3 Stats API for Node.js
//
var bf3stats = require("./lib/bf3stats");

exports.platform = function(platform) {
	if (!(platform === "PC" || 
		platform === "360" || platform === 360 ||
		platform === "ps3")) {
		throw new Error("Invalid platform '" + platform + "'. Should be PC, 360 or ps3.");
	}
	return new bf3stats.createFor(platform);
};
