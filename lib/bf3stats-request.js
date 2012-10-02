var http = require("http");
var querystring = require("querystring");

var API_URL = "api.bf3stats.com";
var HTTP_TIMEOUT = 20000;

exports.call = function(content, platform, api, callback) {
	var payload = content === null ? "" : querystring.stringify(content);
	var options = {
		method: "POST",
		host: API_URL,
		path: "/" + platform + "/" + api + "/",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Content-Length" : payload.length
		}
	};

	var request = http.request(options, function(response) {
	  var reply = "";

	  response.setEncoding("UTF8");
	  response.on("data", function (chunk) {
	    reply += chunk;
	  });
	  response.on("end", function () {
	  	if (reply.indexOf("ERROR 500: Internal server error") >= 0) {
				throwError("failed", "Request to BF3Stats API failed", callback);
	  	} else {
		  	var data = JSON.parse(reply);
	  		if (data.status === "error") {
		  		callback(data.error);
		  	} else {
			  	callback(null, data);
		  	}
		  }
	  });
	});

	request.setTimeout(HTTP_TIMEOUT, function() {
		request.destroy();
		throwError("timeout", "Request to BF3Stats API timed out", callback);
	});

	request.write(payload);
	request.end();

	request.on("error", function(err) {
		throwError("http-error", err, callback);
	});
}

function throwError(error, reason, callback) {
		callback({
			"error": error,
			"reason": reason
		});
}