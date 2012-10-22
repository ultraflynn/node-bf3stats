//
// BF3 Stats API for Node.js
//
var core = require("./lib/bf3stats");
var cache = require("./lib/bf3stats-cache");

// Creates an instance of the Core API
//
// platform: PC, 360 or ps3
// ident: client specific
// cacheStrategy: leave blank for default or see docs
exports.platform = function(platform, ident, cacheStrategy) {
	if (!(platform === "PC" || 
		platform === "360" || platform === 360 ||
		platform === "ps3")) {
		throw new Error("Invalid platform '" + platform + "'. Options are PC, 360 or ps3.");
	}
	return core.newInstance(platform, ident, cache.newInstance(cacheStrategy));
};
