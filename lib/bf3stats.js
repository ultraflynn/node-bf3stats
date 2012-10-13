var bf3stats = require("./bf3stats-request");

var STANDARD_OPTIONS = "clear,rank,scores,global";

exports.createFor = function(platform, ident, cache) {
	return new BF3Stats(platform, ident, cache);
};

function BF3Stats(platform, ident, cache) {
	var self = this;
	self.platform = platform;
	self.ident = ident || "";
	self.cache = cache;
}

BF3Stats.prototype.playerlist = function(players, opt, callback) {
	// TODO Handle the options better, currently they are ignored
	request(this.cache, { players: getPlayersList(players), opt: STANDARD_OPTIONS },
		this.platform, "playerlist", handle(callback));
};

BF3Stats.prototype.player = function(player, opt, callback) {
	request(this.cache, { player: player, opt: STANDARD_OPTIONS },
		this.platform, "player", handle(callback));
};

BF3Stats.prototype.dogtags = function(player, callback) {
	request(this.cache, { player: player },
		this.platform, "dogtags", handle(callback));
};

BF3Stats.prototype.server = function(id, callback) {
	request(this.cache, { id: id, history: 1 },
		this.platform, "server", handle(callback));
};

BF3Stats.prototype.onlinestats = function(callback) {
	request(this.cache, null, "global", "onlinestats", handle(callback));
};

// signed request
BF3Stats.prototype.playerupdate = function(time, player, type, callback) {
	// TODO Handle the queueing at the other end
	request(this.cache, {
		time: time,
		ident: this.ident,
		player: player,
		type: type || "cronjob"
	}, this.platform, "playerupdate", handle(callback));
};

// signed request
BF3Stats.prototype.playerlookup = function(time, player, callback) {
	request(this.cache, {
		time: time,
		ident: this.ident,
		player: player
	}, this.platform, "playerlookup", handle(callback));
};

// signed request
BF3Stats.prototype.setupkey = function(time, clientident, name, callback) {
	request(this.cache, {
		time: time,
		ident: this.ident,
		clientident: clientident,
		name: name
	}, this.platform, "setupkey", handle(callback));
};

// signed request
BF3Stats.prototype.getkey = function(time, clientident, callback) {
	request(this.cache,	{
			time: time,
			ident: this.ident,
			clientident: clientident
		}, this.platform, "getkey", handle(callback));
};

function request(cache, content, platform, api, callback) {
	bf3stats.request(cache.configureRequest, content, platform, api,
		function(response) {
			response.on("data", function(data) {
				callback(null, data);
			});
			response.on("slow", function() {
				callback("slow");
			});
			response.on("timeout", function() {
				callback("timeout");
			});
			response.on("error", function(err) {
				callback(err);
			});
		});
}

function getPlayersList(players) {
	if (players instanceof Array) {
		return players.join(",");
	} else {
		return players;
	}
}

function handle(callback) {
	callback = callback || function() {};
	return function(err, data) {
		if (err) {
			callback(err);
		} else {
			callback(err, data);
		}
	};
}
