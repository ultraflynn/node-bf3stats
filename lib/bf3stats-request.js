var http = require("http");
var querystring = require("querystring");
var events = require("events");
var util = require("util");

var API_URL = "api.bf3stats.com";
var RESPONSIVENESS_TIMEOUT = 2000;
var HTTP_TIMEOUT = 20000;

exports.request = function(configure, content, platform, api, callback) {
	var request = new ServerRequest(content, platform, api);
	configure(request);
	var response = new ClientResponse(callback);
	// response.setMaxListeners(25);
	response.notifyStart();
	start(request, response);
};

function start(clientRequest, clientResponse) {
	var payload = clientRequest.content === null ? "" : querystring.stringify(clientRequest.content);
	var options = {
		method: "POST",
		host: API_URL,
		path: "/" + clientRequest.platform + "/" + clientRequest.api + "/",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Content-Length" : payload.length
		}
	};

	clientRequest.request = http.request(options, function(response) {
	  var reply = "";

	  response.setEncoding("UTF8");
	  response.on("data", function (chunk) {
	    reply += chunk;
	  });
	  response.on("end", function () {
	  	if (reply.indexOf("ERROR 500: Internal server error") >= 0) {
	  		clientResponse.emit("error", "Request to BF3Stats API failed");
	  	} else {
		  	var data = JSON.parse(reply);
	  		if (data.status === "error") {
		  		clientResponse.emit("error", data.error);
		  	} else {
		  		clientResponse.emit("data", data);
		  	}
		  }
	  });
	});

	clientRequest.request.write(payload);
	clientRequest.request.end();

	clientRequest.request.on("error", function(err) {
		clientResponse.emit("error", err);
	});
}

function ServerRequest(content, platform, api) {
	var self = this;
	self.content = content;
	self.platform = platform;
	self.api = api;
	self.request = null;
}

ServerRequest.prototype.stop = function() {
	var self = this;

	if (self.request !== null) {
		self.request.destroy();
	}
};

function ClientResponse(callback) {
	var self = this;
	self.callback = callback;
}

util.inherits(ClientResponse, events.EventEmitter);

// Give the client the opportunity to register listeners
ClientResponse.prototype.notifyStart = function() {
	var self = this;
	self.callback(this);
};
