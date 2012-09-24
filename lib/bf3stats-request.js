var API_URL = "api.bf3stats.com";

exports.call = function(content, platform, api, callback) {
	var options = {
		method: "POST",
		host: API_URL,
		path: "/" + platform + "/" + api + "/",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Content-Length" : content.length
		}
	};

	var request = http.request(options, function(response) {
	  var data = "";

	  response.setEncoding("UTF8");
	  response.on("data", function (chunk) {
	    data += chunk;
	  });
	  response.on("end", function () {
	  	if (data.status === "ok") {
		  	callback(null, data);
	  	} else if (data.status === "error") {
	  		callback(data.error);
	  	} else {
	  		callback("Invalid status returned from " + API_URL + " [" + data.error + "]");
	  	}
	  });
	});

	request.write(content);
	request.end();

	request.on("error", function(err) {
		callback(err)	;
	});
}
