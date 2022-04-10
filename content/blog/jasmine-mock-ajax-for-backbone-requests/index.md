---
title: "Jasmine: mock an endpoint using $.ajax and Promises for Backbone"
date: "2014-09-23T15:03:35.000Z"
description: "Jasmine: mock an endpoint using $.ajax and Promises for Backbone"
publication_status: published
---

_The aim of this post is to write a mock version of the `$.ajax` that will let your code use promises and Backbone perform its stuff._

It is often required to test how collections and models behave when you ask them to fetch data from the server.

To test the flow completely, I prefer not to mock the `sync` of `fetch` methods. I instead do a step back and mock the `$.ajax`, to make sure everything is working fine.

### But I want to use promises

To add a layer of complexity, I really like to use _promises_ when I fetch collections or model, like this:

    myCollection.fetch(options).done(function () {
    	// cool stuff
    });

Now, even if it is just a detail, when you mock the `$.ajax` you need to keep that in mind, since you will also have to provide a promise as part of the mock.

### Code setup

This is the simple collection we'll be testing:

    var Comments = Bakbone.Collection.extend({
        url: '/comments'
    });

And this is the JSON we expect from the server:

    [
      { "name" : "Richard",
        "text" : "What a beautiful day"
      },
      { "name" : "Mark",
        "text" : "What a rainy day"
      }
    ]

When we fetch this data from the server, we expect to get two models inside our collection.

Our simple test, just to show how to mock the `$.ajax` method and be able to use promises:

    describe('The Comments collection', function () {
    	beforeEach(function () {
        	this.collection = new Comments();
        });

    	it('should fetch data from the server', function (done) {
        	// If the 'done' method is called,
            // the $.ajax correctly return a promise
            this.collection.fetch().done(function () {
            	// If the collection's length is as expected
                // the $.ajax is letting Backbone do it's magic
            	expect(this.collection.length).toEqual(2);
                done();
            });
        });
    }),

### First attempt to mock `$.ajax`

We can start writing a simple mock for the `$.ajax` this way:

    spyOn($, 'ajax').and.callFake(function () {
        var d = $.Deferred(),
            response = {
                your_response
            };

        // Resolving the promise
        d.resolve(response);
    	// Returning the promise to be used in our code
        return d.promise();
    });

We are creating a `Deferred` object and returning a `promise`, the _read-only_ version of the deferred. This will let our test go into the `done` callback. Anyway, even if it passes the first step, the expectation will fail: the lenght of the collection is 0.

### Delving into Backbone code: `fetch`

To understand why our code is not completely working, we need to know more about the [Backbone implementation](http://backbonejs.org/docs/backbone.html): check the `fetch` [source code](http://backbonejs.org/docs/backbone.html#section-112) for the Collection.

    // From the Backbone source code...
    fetch: function (options) {
      ...
      options.success = function (resp) {
          // Something to do when the data come back
      };
      ...
      return this.sync('read', this, options);
    },
    ...

As you can see, Backbone prepares a `options.success` callback and passes it to the `sync` method (`return this.sync('read', this, options)`), that will pass it straight to the `$.ajax` method.  
Bingo!

In our case, we are resolving a promise, but not calling any callback, so Backbone will never get any data back from the call!

### A working mock of `$.ajax`

Keeping in mind that the `success` callback is passed as part of the `options` object to the `$.ajax` method, all we have to do is call it passing our `response`.

    spyOn($, 'ajax').and.callFake(function (options) {
        var d = $.Deferred(),
            response = {
                your_response
            };

        // Resolving the promise
        d.resolve(response);
    	// Calling the Backbone's callback
        options.success(response);
    	// Returning the promise to be used in our code
        return d.promise();
    });

Try again, and your test will pass.

A good way to learn new things is always to look at the source code :-)

Riccardo

osxlinux-check-who-is-listening-on-a-port --- title: "OS X/Linux: Check who is listening on a port" date: "2014-09-18T08:31:59.000Z" description: "OS X/Linux: Check who is listening on a port" publication_status: published ---

If you ever experienced errors like `Fatal error: Port xxxxx is already in use by another process`  
you may be interested in finding out who is actually using that port.

A simple one-liner that works on Mac OSX and Linux will tell you what you need:

    lsof -n -i4TCP:$PORT | grep LISTEN

`$PORT` is the port you are trying to use.
