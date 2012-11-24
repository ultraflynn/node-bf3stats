var carbine = require("carbine");
var querystring = require("querystring");
var crypto = require("crypto");

var STANDARD_OPTIONS = "clear,rank,scores,global";
var API_URL = "api.bf3stats.com";

exports.configure = function(platform, ident, config) {
	return new BF3Stats(platform, ident, config);
};

function BF3Stats(platform, ident, config) {
	var self = this;
	self.platform = platform;
	self.ident = ident || "";
	self.config = config;
}

var generatePayload = function(content) {
	return content === null ? "" : querystring.stringify(content);
};

var generateSignedPayload = function(secretKey, content) {
	var unencoded = content === null ? "" : querystring.stringify(content);
	return crypto.createHmac("SHA256", secretKey)
							 .update(unencoded).digest("base64");
};

var generatePath = function(platform, api) {
	return "/" + platform + "/" + api + "/";
};

BF3Stats.prototype.makeRequest = function(content, api, callback) {
	var self = this;
  // callback can be undefined if caller doesn't care about result
	if (!callback) {
		callback = function(err, data) {};
	}
	self.placeRequest(API_URL, generatePayload(content),
		                api, callback);
}

BF3Stats.prototype.makeSignedRequest = function(ident, secretKey, content, api, callback) {
	var self = this;
  // callback can be undefined if caller doesn't care about result
	if (!callback) {
		callback = function(err, data) {};
	}
	self.placeRequest(API_URL, generateSignedPayload(secretKey, content),
               api, callback);
}

BF3Stats.prototype.placeRequest = function(url, payload, api, callback) {
	var self = this;
	var path = generatePath(self.platform, api);
	var request = carbine.createRequest(url, payload, path, self.config);
	request.on("data", function(data) {
		callback(null, data);
	});
	request.on("error", function(err) {
		callback(err);
	});
	request.start();
};

BF3Stats.prototype.playerlist = function(players, opt, callback) {
	this.makeRequest({ players: getPlayersList(players), opt: STANDARD_OPTIONS },
		"playerlist", callback);
};

BF3Stats.prototype.player = function(player, opt, callback) {
	this.makeRequest({ player: player, opt: STANDARD_OPTIONS },
		"player", callback);
};

BF3Stats.prototype.dogtags = function(player, callback) {
	this.makeRequest({ player: player },
		"dogtags", callback);
};

BF3Stats.prototype.server = function(id, callback) {
	this.makeRequest({ id: id, history: 1 }, 
		"server", callback);
};

BF3Stats.prototype.onlinestats = function(callback) {
	this.makeRequest(null, "global", "onlinestats", callback);
};

// TODO Add higher level functions which handl the queueing of updates

BF3Stats.prototype.playerupdate = function(ident, secretKey, player, type, callback) {
	var time = new Date().toJSON(); // TODO This isn't handled correctly
	this.makeSignedRequest(ident, secretKey, {
		time: time,
		ident: ident,
		player: player,
		type: type || "direct"
	}, "playerupdate", callback);
};

BF3Stats.prototype.playerlookup = function(player, callback) {
	var time = new Date().toJSON();
	this.makeSignedRequest(ident, secretKey, {
		time: time,
		ident: this.ident,
		player: player
	}, "playerlookup", callback);
};

BF3Stats.prototype.setupkey = function(clientident, name, callback) {
	var time = new Date().toJSON();
	this.makeSignedRequest(ident, secretKey, {
		time: time,
		ident: this.ident,
		clientident: clientident,
		name: name
	}, "setupkey", callback);
};

BF3Stats.prototype.getkey = function(clientident, callback) {
	var time = new Date().toJSON();
	this.makeSignedRequest(ident, secretKey, {
			time: time,
			ident: this.ident,
			clientident: clientident
		}, "getkey", callback);
};

function getPlayersList(players) {
	if (players instanceof Array) {
		return players.join(",");
	} else {
		return players;
	}
}
