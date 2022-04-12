---
title: "OS X/Linux: Check who is listening on a port"
date: "2014-09-18T08:31:59.000Z"
description: "OS X/Linux: Check who is listening on a port"
publication_status: published
---

If you ever experienced errors like `Fatal error: Port xxxxx is already in use by another process` you may be interested in finding out who is actually using that port. 

A simple one-liner that works on Mac OSX and Linux will tell you what you need: `lsof -n -i4TCP:$PORT | grep LISTEN $PORT` is the port you are trying to use.
