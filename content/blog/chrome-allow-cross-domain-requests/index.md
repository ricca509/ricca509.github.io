---
title: "Chrome: Allow Cross-domain requests [OSX and Win]"
date: "2016-03-30T14:42:14.000Z"
description: "Chrome: Allow Cross-domain requests [OSX and Win]"
publication_status: published
---

#### Problem

During the development process of an application, we are often required to call services from domains different to the one our application is being served from, using AJAX requests.

This is not possible, as outlined on [Wikipedia](https://en.wikipedia.org/wiki/Same-origin_policy):

> In computing, the same-origin policy is an important concept in the web application security model. Under the policy, a web browser permits scripts contained in a first web page to access data in a second web page, but only if both web pages have the same origin. An origin is defined as a combination of URI scheme, hostname, and port number.

#### Solution

In that case, you need to instruct your browser to "disable" the same-origin-policy check.

Two possible ways:

- install a Chrome extension: [Allow-Control-Allow-Origin: \*](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en)
- start a new instance of Chrome with the right flags

**Note** From Chrome version 22+ you will get an error message that says:

    You are using an unsupported command-line flag: --disable-web-security. Stability and security will suffer.

You can ignore the message as it won't affect your session.

#### Test it!

To prove that the solution is working, open this [fiddle](http://jsfiddle.net/6WHKQ/24/) and play around with the console open: you will get no errors.

_Enjoy Chrome freedom!_
