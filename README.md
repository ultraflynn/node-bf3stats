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

Future Enhancements
-------------------
- Implement the signed functions
- Handle the BF3Stats API being completely down
- Implement some caching for when the API is running slowly or down
- Provide a streaming interface over player and server data this enabling
  a client to listen for changes.