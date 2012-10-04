node-bf3stats
=============

A BF3Stats API implementation for Node.js which provides access to all
the API functions and includes fault tolerance, error handling and caching.

[github.com/ultraflynn/node-bf3stats](https://github.com/ultraflynn/node-bf3stats#readme "node-bf3stats")

[npmjs.org/package/node-bf3stats](https://npmjs.org/package/node-bf3stats "npm install node-bf3stats")

Overview
--------
The BF3Stats API provides the following functions:
- playerlist
- player
- dogtags
- server
- onlinestats
- updateplayer *
- TODO *

There are 2 kinds of function, unsigned and signed. The unsigned functions
do not require your application to be registered, the signed one's do.

As well as providing access to these function this implementation also
handles errors encountered whilst making these calls. In addition by
default this interface will cache data and use that cached data in the
event of the API being unavailable of running slowly. This behaviour
can be configured by the client.

Usage
-----
TODO

Current State
-------------
The unsigned functions are all now available for use. They provide
appropriate error handling for when the BF3Stats API is either running
slowly or is returning Server 500 errors.

Caching
-------
The rationale for the caching is that there are occasions when the BF3Stats
API is either down, responding with a Server 500 or just very slow. To
mitigate this node-bf3stats offers some protection against these events.
Firstly it's error handling is unified, regardless of the error condition
it will be communicated back to the caller in the _err_ object in the
callback. Secondly, by default, the API actively caches the data.

There are 2 timeouts at play here:
- A responsiveness timeout - this provides feedback that the request is
  taking longer than the caller would like. Default is 2 secs which seems
  reasonable for a web request.
- A platform timeout - the hosting platform will most likely set a
  maximum run time for a request. For Heroku this is 30 secs. Should a
  request reach that timeout (or close to) it should be cancelled. Default
  for this value is 20 secs.

Both default values can be changed of course.

Caching uses these timeouts and the results of calls to retain the data from
the last successful call.

Versioning
----------
I have yet to tag a version but that's only because I've forgotten to so
far. The current version released to npm is 0.1.0 so when the first tag
I create will be 0.1.1. From that point on I shall tag in github when I
release a version to npm.

The versioning strategy is pretty standard, odd releases are unstable, even
are stable. Thus the first stable release will be 0.2.0

The roadmap of releases looks like this:

_0.2.0_
- Full support for the API (both signed and unsigned action)
- Caching
- Error handling

_0.4.0_
- Retry support during signed action
- Retry support on failed API requests

_0.6.0_
- Streaming interface over the standard API