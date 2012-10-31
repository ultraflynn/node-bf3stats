var http = require("http");
var querystring = require("querystring");
var events = require("events");
var util = require("util");
var _ = require("underscore");
var timeunit = require("./timeunit");

var API_URL = "api.bf3stats.com";

exports.createRequest = function(content, platform, api, config) {
	return new Request(content, platform, api, config);
};

function Request(content, platform, api, config) {
	var self = this;
	self.content = content;
	self.platform = platform;
	self.api = api;
	self.config = config;
}

util.inherits(Request, events.EventEmitter);

Request.prototype.start = function() {
	var self = this;
	var payload = self.generatePayload();
	var options = self.generateOptions(payload);

	self.initiateRequest(payload, options, function(response) {
	  var reply = "";

	  response.setEncoding("UTF8");
	  response.on("data", function (chunk) {
	    reply += chunk;
	  });
	  response.on("end", function () {
	  	if (reply.indexOf("ERROR 500: Internal server error") >= 0) {
	  		self.emit("error", "Request to BF3Stats API failed - Internal server error");
	  	} else if (reply.indexOf("400 - Bad Request") >= 0) {
	  		self.emit("error", "Request to BF3Stats API failed - Bad Request");
	  	} else {
	  		console.log(reply);
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

	// Set up the timeouts
	_.each(self.config.timeouts, function(timeout) {
		  var time = timeunit.toMillis(timeout.timeout.time, timeout.timeout.unit);
			  self.request.setTimeout(time, function() {
			  	// TODO Check whether data exists in the cache of the right age
			  	// TODO Does the configuration indicate that the request should be cancelled
			  	self.cancelRequest();
			  });
		});
	self.request.write(payload);
	self.request.end();

	self.request.on("error", function(err) {
		self.handleError(err);
	});
}

Request.prototype.handleError = function(err) {
	var self = this;
	var handled = false;
	_.each(self.config.errors, function(error) {
		if (error.code === err.code) {
			// TODO See whether there is data in the cache
			handled = false;
		}
	});
	if (!handled) {
		self.emit("error", err);
	}
}

Request.prototype.cancelRequest = function() {
	var self = this;
	if (self.request !== null) {
		self.request.destroy();
	}
};
