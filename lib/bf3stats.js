var querystring = require("querystring");
var http = require("http");

exports.createFor = function(platform) {
	return new BF3Stats(platform);
};

function BF3Stats(platform) {
	var self = this;
	self.platform = platform;
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
	var err = null;
	var list = null;
	var failed = null;

	makeRequest(self.platform, players, opt, callback);
};

function makeRequest(platform, players, opt, callback) {
	var content = querystring.stringify({
		players: players,
		opt: "clear,rank,scores,global"
	});
	var options = {
		method: "POST",
		host: "api.bf3stats.com",
		path: "/" + platform + "/playerlist/",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Content-Length" : content.length
		}
	};

	var request = http.request(options, function(response) {
	  var str = "";

	  response.setEncoding("UTF8");

	  response.on("data", function (chunk) {
	    str += chunk;
	  });

	  response.on("end", function () {
	    console.log(str);
	  });
	});

	console.log(content);

	request.write(content);
	request.end();

	request.on("error", function(e) {
	  console.log("problem with request: " + e.message);
	});
}

BF3Stats.prototype.player = function(platform, player, opt, cb) {
	cb();
};

BF3Stats.prototype.dogtags = function(platform, player, cb) {
	cb();
};

BF3Stats.prototype.server = function(platform, id, cb) {
	cb();
};

BF3Stats.prototype.onlinestats = function(platform, cb) {
	cb();
};

BF3Stats.prototype.playerupdate = function(platform, time, ident, player, type, cb) {
	cb();
};

BF3Stats.prototype.playerlookup = function(platform, time, ident, player, cb) {
	cb();
};

BF3Stats.prototype.setupkey = function(platform, time, ident, clientident, name, cb) {
	cb();
};

BF3Stats.prototype.getkey = function(platform, time, ident, clientident, cb) {
	cb();
};
