var config = exports;

config.defaultConfig = {
   "caching": true, // Will the results of a successful API call be cached?
   // List of errors. Defines the data the can be returned in the event of an error
   "errors": [
      {
         "code": "ENOTFOUND",
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
