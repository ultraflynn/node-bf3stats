var http = require("http");
var querystring = require("querystring");

var API_URL = "api.bf3stats.com";

exports.call = function(content, platform, api, callback) {
	var payload = querystring.stringify(content);
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
	  	var data = JSON.parse(reply);

	  	if (data.status === "error") {
	  		callback(data.error);
	  	} else {
		  	callback(null, data);
	  	}
	  });
	});

	request.write(payload);
	request.end();

	request.on("error", function(err) {
		callback(err)	;
	});
}
