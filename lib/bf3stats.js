	var http = require("http");
var bf3statsRequest = require("./bf3stats-request");

var STANDARD_OPTIONS = "clear,rank,scores,global";

exports.createFor = function(platform, ident) {
	return new BF3Stats(platform, ident);
};

function BF3Stats(platform, ident) {
	var self = this;
	self.platform = platform;
	self.ident = ident || "";
}

// Parameters:
// players 	a required list of player names
// opt 			a list of [playerOutputOptions]
// cb 			callback with results
//
// Callback:
// err 			invalid_platform, no_players_given, no_valid_players,
//					index_database_error, data_database_error,
// 					too_many_players, private
// list 		list of players data with index name equal your requested name.
// 					Every item has status with following codes:
// 						pifound only the index data of the player was found
// 						data complete data of the player was found
// failed 	A list of failed players with index name equal your requested
// 					name. An item has at least error with one of the following codes:
// 						invalid_name, notfound
BF3Stats.prototype.playerlist = function(players, opt, callback) {
	// TODO Handle the options better, currently they are ignored
	bf3statsRequest.call({
		players: getPlayersList(players),
		opt: STANDARD_OPTIONS
	}, this.platform, "playerlist", resultHandler(callback));
};

BF3Stats.prototype.player = function(player, opt, callback) {
	bf3statsRequest.call({
		player: player,
		opt: STANDARD_OPTIONS
	}, this.platform, "player", resultHandler(callback));
};

BF3Stats.prototype.dogtags = function(player, callback) {
	bf3statsRequest.call({
		player: player
	}, this.platform, "dogtags", resultHandler(callback));
};

BF3Stats.prototype.server = function(id, callback) {
	bf3statsRequest.call({
		id: id,
		history: 1
	}, this.platform, "server", resultHandler(callback));
};

BF3Stats.prototype.onlinestats = function(callback) {
	bf3statsRequest.call(null, "global", "onlinestats", resultHandler(callback));
};

// signed request
BF3Stats.prototype.playerupdate = function(time, player, type, callback) {
	// TODO Handle the queueing at the other end
	bf3statsRequest.call({
		time: time,
		ident: this.ident,
		player: player,
		type: type || "cronjob"
	}, this.platform, "playerupdate", resultHandler(callback));
};

// signed request
BF3Stats.prototype.playerlookup = function(time, player, callback) {
	bf3statsRequest.call({
		time: time,
		ident: this.ident,
		player: player
	}, this.platform, "playerlookup", resultHandler(callback));
};

// signed request
BF3Stats.prototype.setupkey = function(time, clientident, name, callback) {
	bf3statsRequest.call({
		time: time,
		ident: this.ident,
		clientident: clientident,
		name: name
	}, this.platform, "setupkey", resultHandler(callback));
};

// signed request
BF3Stats.prototype.getkey = function(time, clientident, callback) {
	bf3statsRequest.call({
		time: time,
		ident: this.ident,
		clientident: clientident
	}, this.platform, "getkey", resultHandler(callback));
};

function getPlayersList(players) {
	if (players instanceof Array) {
		return players.join(",");
	} else {
		return players;
	}
}

function resultHandler(callback) {
	callback = callback || function() {};
	return function(err, data) {
		if (err) {
			callback(err);
		} else {
			callback(err, data);
		}
	};
}

/* Caching Strategies

The goal is to maximise the resposiveness of the API whilst reducing the
traffic to the BF3Stats API.

The BF3Stats API (and the DICE services underneath them) don't actually
provide a real-time feed of player stats. There is a some latency
within both protocols. We can take advantage of that thus:

1/ If we timestamp each call we can use that data if it's new enough. Maybe
   that is 5 or 30 seconds, that needs to be decided.
2/ If cached data is provided we could fire off the query again regardless
   which would then update the cache. The client would get old data but in
   the background the latest data would be being requested. The advantage
   of this is that the client could be told it has received cached data and
   elect to request it again. If a cache update call is in progress (or was
   and has now finished) then client will receive the latest data
3/ Cached data would be invalidated (or even re-requested) when the player
   it relates to gets their data updated.

The final option will be to turn off all caching.

*/

// No caching
BF3Stats.prototype.CACHE_NONE = "cache-none";
// Calls are cached but call is still made
BF3Stats.prototype.CACHE_READ_BEHIND = "cache-read-behind";

// Set the caching level
BF3Stats.prototype.cache = function(level) {

}