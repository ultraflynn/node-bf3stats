var querystring = require("querystring");
var http = require("http");
var bf3statsRequest = require("./bf3stats-request");

var STANDARD_OPTIONS = "clear,rank,scores,global";

exports.createFor = function(platform) {
	return new BF3Stats(platform);
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
	var self = this;

	// TODO Handle the options better, currently they are ignored
	var content = querystring.stringify({
		players: players.join(","),
		opt: STANDARD_OPTIONS
	});

	bf3statsRequest.call(content, self.platform, "playerlist", function(err, data) {
		callback(err, data.list, data.failed);
		// TODO Handle the return list and status, present it in a nice way
	});
};

BF3Stats.prototype.player = function(player, opt, callback) {
	var self = this;

	var content = querystring.stringify({
		player: player,
		opt: STANDARD_OPTIONS
	});

	bf3statsRequest.call(content, self.platform, "player", function(err, data) {
		callback(err, data);
	});
};

BF3Stats.prototype.dogtags = function(player, callback) {
	var self = this;

	var content = querystring.stringify({
		player: player
	});

	bf3statsRequest.call(content, self.platform, "dogtags", function(err, data) {
		callback(err, data);
	});
};

BF3Stats.prototype.server = function(id, callback) {
	var self = this;

	var content = querystring.stringify({
		id: id
	});

	bf3statsRequest.call(content, self.platform, "server", function(err, data) {
		callback(err, data);
	});
};

BF3Stats.prototype.onlinestats = function(callback) {
	var self = this;

	// TODO How will the interface react to the null?
	bf3statsRequest.call(null, "global", "onlinestats", function(err, data) {
		callback(err, data.pc, data.360, data.ps3);
	});
};

BF3Stats.prototype.playerupdate = function(time, player, type, callback) {
	var self = this;

	var content = querystring.stringify({
		time: time,
		ident: self.selfident,
		player: player,
		type: type
	});

	bf3statsRequest.call(content, self.platform, "playerupdate", function(err, data) {
		// TODO Handle the queueing at the other end
		callback(err, data.pos, data.task);
	});
};

BF3Stats.prototype.playerlookup = function(time, player, callback) {
	var self = this;

	var content = querystring.stringify({
		time: time,
		ident: self.ident,
		player: player
	});

	bf3statsRequest.call(content, self.platform, "playerlookup", function(err, data) {
		// TODO Handle the queueing at the other end
		callback(err, data.pos, data.task);
	});
};

BF3Stats.prototype.setupkey = function(time, clientident, name, callback) {
	var self = this;

	var content = querystring.stringify({
		time: time,
		ident: self.ident,
		clientident: clientident,
		name: name
	});

	bf3statsRequest.call(content, self.platform, "setupkey", function(err, data) {
		callback(err, data);
	});
};

BF3Stats.prototype.getkey = function(time, clientident, callback) {
	var self = this;

	var content = querystring.stringify({
		time: time,
		ident: self.ident,
		clientident: clientident
	});

	bf3statsRequest.call(content, self.platform, "getkey", function(err, data) {
		callback(err, data);
	});
};
