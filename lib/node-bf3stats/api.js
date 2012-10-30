var bf3stats = require("./request");

var STANDARD_OPTIONS = "clear,rank,scores,global";

exports.configure = function(platform, ident, config) {
	return new BF3Stats(platform, ident, config);
};

function BF3Stats(platform, ident, config) {
	var self = this;
	self.platform = platform;
	self.ident = ident || "";
	self.config = config;
}

var makeRequest = function(self, content, api, callback) {
  // callback can be undefined if caller doesn't care about result
	if (!callback) {
		callback = function(err, data) {};
	}

	var request = bf3stats.createRequest(content, self.platform, api, self.config);
	request.on("data", function(data) {
		callback(null, data);
	});
	request.on("error", function(err) {
		callback(err)
	});
	request.start();
}

BF3Stats.prototype.playerlist = function(players, opt, callback) {
	makeRequest(this, { players: getPlayersList(players), opt: STANDARD_OPTIONS },
		"playerlist", callback);
};

BF3Stats.prototype.player = function(player, opt, callback) {
	makeRequest(this, { player: player, opt: STANDARD_OPTIONS }, "player", callback);
};

BF3Stats.prototype.dogtags = function(player, callback) {
	makeRequest(this, { player: player }, "dogtags", callback);
};

BF3Stats.prototype.server = function(id, callback) {
	makeRequest(this, { id: id, history: 1 }, "server", callback);
};

BF3Stats.prototype.onlinestats = function(callback) {
	makeRequest(this, "global", "onlinestats", callback);
};

// signed request
BF3Stats.prototype.playerupdate = function(time, player, type, callback) {
	// TODO Handle the queueing at the other end
	makeRequest(this, {
		time: time,
		ident: this.ident,
		player: player,
		type: type || "cronjob"
	}, "playerupdate", callback);
};

// signed request
BF3Stats.prototype.playerlookup = function(time, player, callback) {
	makeRequest(this, {
		time: time,
		ident: this.ident,
		player: player
	}, "playerlookup", callback);
};

// signed request
BF3Stats.prototype.setupkey = function(time, clientident, name, callback) {
	makeRequest(this, {
		time: time,
		ident: this.ident,
		clientident: clientident,
		name: name
	}, "setupkey", callback);
};

// signed request
BF3Stats.prototype.getkey = function(time, clientident, callback) {
	makeRequest(this, {
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