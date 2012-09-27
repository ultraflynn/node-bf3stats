//
// BF3 Stats API for Node.js
//
var core = require("./lib/bf3stats");

exports.platform = function(platform, ident) {
	if (!(platform === "PC" || 
		platform === "360" || platform === 360 ||
		platform === "ps3")) {
		throw new Error("Invalid platform '" + platform + "'. Options are PC, 360 or ps3.");
	}
	return new core.createFor(platform, ident);
};
