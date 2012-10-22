var winston = require("winston");

var DEFAULT_OPTIONS = {
   "caching": true, // Will the results of a successful API call be cached?
   // List of errors. Defines the data the can be returned in the event of an error
   "errors": [
      {
         "name": "ENOTFOUND",
         "cache-item-max-age": {
            "time": 1,
            "unit": "hours"
         }
      }
   ],
   // List of timeouts. The last timeout will always cancel the request
   "timeouts": [
      {
         "name": "fast-response", // simply describes why the timeout is being set
         // when this timeout will fire
         "timeout": {
            "time": 2, // how many units must pass before the timeout is triggered
            "unit": "seconds" // milliseconds | seconds | minutes
         },
         // maximum age of the data that can be returned
         "cache-item-max-age": {
            "time": 20,
            "unit": "minutes"
         }
      },
      {
         "name": "slow-response",
         "timeout": {
            "time": 10,
            "unit": "seconds"
         },
         "cache-item-max-age": {
            "time": 1,
            "unit": "hour"
         }
      },
      {
         "name": "platform-maximum",
         "timeout": {
            "time": 20,
            "unit": "seconds"
         }
         // cache-item-max-age not specified so any age data will do
      }
   ]
};

exports.newInstance = function(options) {
   return new DataCache(options);
};

function DataCache(options) {
   var self = this;
   self.options = options | DEFAULT_OPTIONS;
}

DataCache.prototype.attach = function(request, response) {

}

DataCache.prototype.store = function(data) {
};

DataCache.prototype.configureRequest = function(request) {
   // request.setTimeout(RESPONSIVENESS_TIMEOUT, function() {
   //    clientResponse.emit("slow", request);
   // });

   // request.setTimeout(HTTP_TIMEOUT, function() {
   //    request.destroy();
   //    clientResponse.emit("timeout", "Request to BF3Stats API timed out");
   // });
};