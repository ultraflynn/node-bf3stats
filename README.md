node-bf3stats
=============

A BF3Stats API implementation for Node.js which provides acceess to all
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