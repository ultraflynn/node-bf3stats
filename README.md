node-bf3stats
=============

A BF3Stats API implementation for Node.js which provides access to all
the API functions and includes fault tolerance, error handling and caching.

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

_0.6.0_
- Streaming interface over the standard API