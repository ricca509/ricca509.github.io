---
title: "Dockerize your tests to run everywhere"
date: "2016-09-05T09:30:00.000Z"
description: "? Dockerize your tests to run everywhere"
publication_status: published
---

With integration tests being an integral part of a webapp workflow, we should always try to find ways to make them run smoother and make our lives easier.

_Note: This post was updated on May 2019_

## My dilemma

I've been working with Selenium Webdriver/WebdriverIO for years now, and the biggest complaint I have is that **I need to have a selenium server running before starting my tests.**

This may seem like a minor problem, but it means having another tab open in my terminal, starting/stopping that process, and it all get way more difficult when you try to automate it in a CI environment. In addition to that, you need Java installed to run the Selenium server (or you can use the [selenium-standalone](https://www.npmjs.com/package/selenium-standalone) npm package, which removes the dependency from Java but still needs to be started/stopped).

While solutions like [Browserstack](https://www.browserstack.com/) and [Saucelabs](https://saucelabs.com) are quite popular, they are not the quickest way of getting a feedback and **sometimes you just want a quick run on Chrome to check that everything is ok**.

So how do you solve the problem of having to constantly start and stop your Selenium server? In other words, how do you create a container that runs in isolation and takes care of starting/stopping a selenium server for you? (plus running your tests, of course).

## Enter the Docker (and Docker Compose) World

I am addicted to [Docker](https://www.docker.com/): I'd containerize everything now.  
It is such a clean way of dealing with (or not dealing with, even better) OS compatibility that it's a no brainer.

Let's apply it to a simple test case: running the webdriverIO example.

    const assert = require('assert');

    describe('webdriver.io page', () => {
      it('should have the right title', () => {
        browser.url('http://webdriver.io');
        const title = browser.getTitle();
        assert.equal(title, 'WebdriverIO · Next-gen WebDriver test framework for Node.js');
      });
    });

Of course, our application will also have its own `package.json` with all the dependencies listed there and a `wdio.conf` with all the WebdriverIO configuration, but hey, we all know that!

    ├── Dockerfile
    ├── README.md
    ├── docker-compose.yml
    ├── package.json
    ├── test
    │   └── index.spec.js
    └── wdio.conf.js

Our package.json defines a test script like this: `"test: wdio wdio.conf"`.

To run the tests we need to install the npm dependencies and run the npm command:

    $ npm i
    $ npm test

### Building the app

No need to install node.js, no need to install npm. Just Docker and a Dockerfile, like this:

    FROM node:8
    ADD . /app
    WORKDIR /app
    RUN npm i

This is just a definition of what we want, a recipe. To build an image from it, we need some Docker magic ([docker build](https://docs.docker.com/v1.8/reference/commandline/build/)):

    docker build -t webdriverapp .

In plain English: "Build the Dockerfile in this folder and name the result 'webdriverapp'". The result of a build is an image.

To run the image, and create a container, we need some more Docker magic ([docker run](https://docs.docker.com/engine/reference/run/)):

    docker run --rm -ti webdriverapp npm test

In plain English: "Run the command `npm test` from the image named "webdriverapp" in interactive mode (`-ti`) and remove the container afterwards (`--rm`).

We're good! Run it, and you'll get an error saying that we need a Selenium server running!

### docker-compose

We definitely need more than just a containerized version of our app: we need a whole stack (which, in this case, is a Selenium server, but it could be a Redis server, a mongodb server, etc) of applications that run in isolation and can communicate with each other.

[Docker Hub](https://hub.docker.com/) is like npm for Docker, you can find all sorts of pre-built images there. Turns out, the Selenium guys published a dockerized version of a standalone Selenium, [selenium/standalone-chrome](https://hub.docker.com/r/selenium/standalone-chrome/). Running it with docker will create a container with a selenium server listening on the default port 4444 (always remember that when you run a container that listens on a port, you have to map that port on your host).

    docker run -p 4444:4444 selenium/standalone-chrome

**What we want now is to compose an architecture where the Selenium server is listening and our app is started and connects to it.**

[docker-compose](https://docs.docker.com/compose/) is the answer.  
It lets us create a file (`docker-compose.yml`) where we define our stack and how different applications interact with each other.  
Easier done than said:

    app:
      build: .
      command: npm test -- --host selenium
      links:
        - selenium

    selenium:
      image: selenium/standalone-chrome
      expose:
        - "4444"
      log_driver: "none"

The file defines two applications: `app` and `selenium`:

- `app` needs to be built, and the Dockerfile is in the same directory as docker-compose.yml (`build: .`).  
  When started, we want to run a specific command: `command: npm test -- --host selenium`  
  We also want it to have a link to the `selenium` app.
- `selenium`, instead, doesn't need to be built, it uses a pre-built image from Docker Hub: `image: selenium/standalone-chrome`. It also exposes the port 4444.

_Note that docker-compose creates a host for every application that exposes a port, and the hostname is the application name: `selenium` in this case._ This is why we pass the option `--host selenium` to WebdriverIO: to tell it where the server is listening.

Time to build the stack:

    docker-compose build .

And run it:

    docker-compose up .

Done!

### GitHub repo

A fully working code example can be found on [GitHub](https://github.com/ricca509/dockerize-webdriverio).

## Conclusions

Docker and docker-compose can help us in many different ways: we can compose entire stacks in minutes. Need a Redis database? Add it to docker-compose. Need a RabbitMq queue? Add it!  
It is a simple and effective way to package an app and its dependencies.  
Of course in production you'll have your services hosted somewhere: no problem! You can have different [docker-compose files for different environments](https://docs.docker.com/compose/production/), all defining different stacks!

There is so much to learn and experiment with!  
My suggestion is to start with the [Docker blog](https://blog.docker.com/) and the [docker weekly newsletter](https://blog.docker.com/docker-weekly-archives/), then the sky is the limit!
