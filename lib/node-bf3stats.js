var _ = require("underscore");

var bf3stats = exports;

var setup = {
	platform: "360",
	ident: null,
	config: require("./node-bf3stats/request-config").defaultConfig
};

bf3stats.setPlatform = function(platform) {
	if (!(platform === "PC" || 
		platform === "360" || platform === 360 ||
		platform === "ps3")) {
		throw new Error("Invalid platform '" + platform + "'. Options are PC, 360 or ps3.");
	}
	setup.platform = platform;
	return this;
};
bf3stats.setIdent = function(ident) {
	setup.ident = ident;
	return this;
};
bf3stats.setRequestConfig = function(config) {
	setup.requestConfig = config;
	return this;
};

var methods = [
	"playerlist",
	"player",
	"dogtags",
	"server",
	"onlinestats",
	"playerupdate",
	"playerlookup",
	"setupkey",
	"getkey"
];

var api = require("./node-bf3stats/api.js")
						.configure(setup.platform, setup.ident, setup.config);

_.each(methods, function(method) {
	bf3stats[method] = function() {
		return api[method].apply(api, arguments);
	};
});