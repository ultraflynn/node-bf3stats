var http = require("http");
var querystring = require("querystring");
var events = require("events");
var util = require("util");

var API_URL = "api.bf3stats.com";

// TODO Now this is in a better shape it needs hooking into the cache
// Think about what actions the cache will take, who is responsible for
// making the callback.

exports.createRequest = function(content, platform, api) {
	return new Request(content, platform, api);
};

function Request(content, platform, api) {
	var self = this;
	self.content = content;
	self.platform = platform;
	self.api = api;
	self.cache = null;
}

util.inherits(Request, events.EventEmitter);

Request.prototype.attachCache = function(cache) {
	var self = this;
	self.cache = cache;
}

Request.prototype.start = function() {
	var self = this;
	var payload = self.generatePayload();
	var options = self.generateOptions(payload);

	self.initiateRequest(payload, options, function(response) {
	  var reply = "";

		// response.setMaxListeners(25);
	  response.setEncoding("UTF8");
	  response.on("data", function (chunk) {
	    reply += chunk;
	  });
	  response.on("end", function () {
	  	if (reply.indexOf("ERROR 500: Internal server error") >= 0) {
	  		self.emit("error", "Request to BF3Stats API failed");
	  	} else {
		  	var data = JSON.parse(reply);
	  		if (data.status === "error") {
		  		self.emit("error", data.error);
		  	} else {
		  		self.emit("data", data);
		  	}
		  }
	  });
	});
};

Request.prototype.generatePayload = function() {
	var self = this;
	return self.content === null ? "" :
				 		querystring.stringify(self.content);
};

Request.prototype.generateOptions = function(payload) {
	var self = this;
	return {
		method: "POST",
		host: API_URL,
		path: "/" + self.platform + "/" + self.api + "/",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Content-Length" : payload.length
		}
	};
};

Request.prototype.initiateRequest = function(payload, options, callback) {
	var self = this;
	self.request = http.request(options, callback);
	self.request.write(payload);
	self.request.end();

	self.request.on("error", function(err) {
		self.emit("error", err);
	});
}

Request.prototype.end = function() {
	var self = this;
	if (self.request !== null) {
		self.request.destroy();
	}
};
