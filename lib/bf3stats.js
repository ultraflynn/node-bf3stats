var bf3stats = require("./bf3stats-request");

var STANDARD_OPTIONS = "clear,rank,scores,global";

exports.newInstance = function(platform, ident, cache) {
	return new BF3Stats(platform, ident, cache);
};

function BF3Stats(platform, ident, cache) {
	var self = this;
	self.platform = platform;
	self.ident = ident || "";
	self.cache = cache;
}

BF3Stats.prototype.request = function(content, api, callback) {
	var self = this;

  // callback can be undefined if caller doesn't care about result
	if (!callback) {
		callback = function(err, data) {
			if (err) {
				console.log(err);
			}
		};
	}

	var request = bf3stats.createRequest(content, self.platform, api);
	request.attachCache(self.cache);
	request.on("data", function(data) {
		callback(null, data);
	});
	request.on("error", function(err) {
		callback(err)
	});
	request.start();
}

BF3Stats.prototype.playerlist = function(players, opt, callback) {
	this.request({ players: getPlayersList(players), opt: STANDARD_OPTIONS },
		"playerlist", callback);
};

BF3Stats.prototype.player = function(player, opt, callback) {
	this.request({ player: player, opt: STANDARD_OPTIONS }, "player", callback);
};

BF3Stats.prototype.dogtags = function(player, callback) {
	this.request({ player: player }, "dogtags", callback);
};

BF3Stats.prototype.server = function(id, callback) {
	this.request({ id: id, history: 1 }, "server", callback);
};

BF3Stats.prototype.onlinestats = function(callback) {
	this.request(null, "global", "onlinestats", callback);
};

// signed request
BF3Stats.prototype.playerupdate = function(time, player, type, callback) {
	// TODO Handle the queueing at the other end
	this.request({
		time: time,
		ident: this.ident,
		player: player,
		type: type || "cronjob"
	}, "playerupdate", callback);
};

// signed request
BF3Stats.prototype.playerlookup = function(time, player, callback) {
	this.request({
		time: time,
		ident: this.ident,
		player: player
	}, "playerlookup", callback);
};

// signed request
BF3Stats.prototype.setupkey = function(time, clientident, name, callback) {
	this.request({
		time: time,
		ident: this.ident,
		clientident: clientident,
		name: name
	}, "setupkey", callback);
};

// signed request
BF3Stats.prototype.getkey = function(time, clientident, callback) {
	this.request({
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
