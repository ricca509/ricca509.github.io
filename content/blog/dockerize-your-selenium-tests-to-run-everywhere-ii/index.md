---
title: "Dockerize your tests to run everywhere - Part II"
date: "2018-12-01T22:53:00.000Z"
description: "? Dockerize your tests to run everywhere - Part II"
publication_status: published
---

In the [first part](/blog/dockerize-your-selenium-tests-to-run-everywhere/) of this series, I presented a simple solution to run selenium based tests from inside a container, using [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/).  
While this solution serves the cause of orchestrating the Selenium server and the tests, it does not address more specific problems that would inevitably happen in a Continuous Integration environment.

There are a few improvements than can be made:

- Prebuild the Docker image for better performances
- Specify dependencies among the containers to run the tests only when all the dependencies are ready (selenium, the app itself, ...)
- Specify browser type/version
- Stop the containers when the tests are completed
- Report the right exit code to the CI when the Docker container ends its execution, in order to correctly mark the build

### Prebuild the Docker image

This is what the [docker-compose.yml](https://github.com/ricca509/dockerize-webdriverio/blob/master/docker-compose.yml) file looked like in [part I](/dockerize-your-selenium-tests-to-run-everywhere/):

    app.local:
      build: .
      command: npm test -- --host selenium
      links:
        - selenium

I am changing the tests to point to a locally running application, so it needs to be running alongside the tests:

    # package.json

    ...
    "scripts": {
      "start: "node src/index.js",
      "test": "wdio wdio.conf"
    },
    ...

To run it, another container can be added to the `docker-compose.yml` file:

    app.local:
      build: .
      command: npm start

    tests:
      build: .
      command: npm test -- --host selenium
      ...

Here I basically want to run two different commands from the same Docker image, but _it is being built twice now_.  
The solution to this problem is to pre-build the image and then run commands from it. This also makes the `docker-compose` file cleaner.

To do this I'm going to use a small shell scripts that builds the image and then starts `docker-compose`:

    #!/usr/bin/env bash

    echo "Starting Docker build"

    DOCKER_IMAGE="integration-tests:${BUILD_COUNTER:-0}"

    docker build --rm -t ${DOCKER_IMAGE} . && docker-compose up

1.  I am declaring what the name of the image will be (note that I'm assuming that a `BUILD_COUNTER` env variable is available, in case it's not it'll fallback to zero).
2.  I'm building the image, tagging it with the name chosen in point 1. If the build is succesfull, the stack is started.

With the image being built outside our Docker compose orchestration, the `docker-compose.yml` file can be updated:

    app.local:
      image: integration-tests:${BUILD_COUNTER:-0}
      command: npm start

    tests:
      image: integration-tests:${BUILD_COUNTER:-0}
      command: npm test -- --host selenium
      ...

_NOTE: The `${BUILDCOUNTER:-0}` syntax allows to refer to an environment variable (`BUILDCOUNTER`) and in case it is not defined, Docker will fall back to `0`. Find more information about environment variables interpolation on the [Docker website](https://docs.docker.com/compose/environment-variables/)._

Now two isolated containers are using the same image to run different commands.

This is the `docker-compose.yml` file so far:

    app.local:
      image: integration-tests:${BUILD_COUNTER:-0}
      command: npm start
      expose:
        - "3000"

    tests:
      image: integration-tests:${BUILD_COUNTER:-0}
      command: npm test -- --host selenium

    selenium:
      image: selenium/standalone-chrome
      expose:
        - "4444"
      log_driver: "none"

### Specify dependencies between the containers

Another subtle problem that can arise as the number of independent containers increases, is managing the dependencies among them: what if the tests start before the Selenium server is ready, or before the mock server is listening?  
This may not happen every time, but it's a problem that can seriously undermine the stability of our tests, and in turn our confidence in them.

To define dependencies in a `docker-compose` file, [`depends_on`](https://docs.docker.com/compose/compose-file/#depends_on) is the way to go.

From the official Docker documentation, `depends_on`:

> Express dependency between services, which has two effects:
>
> - `docker-compose up` will start services in dependency order.
> - `docker-compose up SERVICE` will automatically include `SERVICE`'s dependencies.

but also

> There are several things to be aware of when using `depends_on`:
>
> - `depends_on` will not wait for the dependencies to be "ready" before  
>   starting `SERVICE` - only until they have been started. If you need to wait for a service to be ready, see [Controlling startup order](https://docs.docker.com/compose/startup-order) for more on this problem and strategies for solving it.
> - Version 3 no longer supports the `condition` form of `depends_on`.
> - The `depends_on` option is ignored when [deploying a stack in swarm mode](/engine/reference/commandline/stack_deploy.md) with a version 3 Compose file.

With this in mind, the configuration can be improved like this:

    app.local:
      image: integration-tests:${BUILD_COUNTER:-0}
      command: npm start
      expose:
        - "3000"

    tests:
      image: integration-tests:${BUILD_COUNTER:-0}
      command: npm test -- --host selenium
      depends_on:
        - selenium
        - app.local

    selenium:
      image: selenium/standalone-chrome
      expose:
        - "4444"
      log_driver: "none"

Now the `tests` container will wait until `app.local` and `selenium` have been started.

This, though, doesn't mean that the services are ready and listening. The "readiness" of the service is specific to every application, so Docker cannot help here: [wait-for-it](https://github.com/vishnubob/wait-for-it) can.

> `wait-for-it.sh` is a pure bash script that will wait on the availability of a host and TCP port. It is useful for synchronizing the spin-up of interdependent services, such as linked docker containers.

With `wait-for-it` the `docker-compose.yml` becomes:

    tests:
        image: integration-tests:${BUILD_COUNTER:-0}
        command: ["./wait-for-it.sh", "selenium:4444", "--", "npm", "test", "--", "--hostname", "selenium"]
        depends_on:
          - selenium
          - app.local

_**Note**: This setup is only waiting for selenium to be "ready" as it's the slowest of the two services.  
Waiting on a condition like the above for multiple services (for example selenium on port 4444 and app.local on port 3000) is a problem for which I haven't found an elegant solution yet, so there's a tradeoff here (although a possible workaround can be found on [github](https://github.com/vishnubob/wait-for-it/issues/2#issuecomment-193334505))._

### Choose a specific browser/browser version

Usually, tests need to target a specific browser version/make.

To do this the `docker-compose` configuration can be tweaked to run a [Selenium grid](https://github.com/SeleniumHQ/selenium/wiki/Grid2) (hub) and have different browsers connect to it.

The grid can:

- scale by distributing tests on several machines ( **parallel execution** )
- manage multiple environments from a central point, **making it easy to run the tests against a vast combination of browsers/OS**.
- minimize the maintenance time for the grid by allowing you to implement custom hooks to leverage virtual infrastructure for instance.

For now the second point is of more interest, but parallel execution is definitely a very nice to have feature.

With the grid, we need at least one node (browser) that will connect to it and eventually run the tests.

The configuration for Selenium looks like this at the moment:

    selenium:
      image: selenium/standalone-chrome
      expose:
        - "4444"
      log_driver: "none"

The new configuration, a bit more verbose:

      selenium-hub:
        image: selenium/hub:3.141.59-neon
        container_name: selenium-hub
        expose:
          - "4444"
      chrome:
        image: selenium/node-chrome:3.141.59-neon
        volumes:
          - /dev/shm:/dev/shm
        depends_on:
          - selenium-hub
          - app.local
        environment:
          - HUB_HOST=selenium-hub
          - HUB_PORT=4444
          - CHROME_VERSION=62.0.3202.94

The `selenium-hub` container will accept connections from the nodes.  
The `chrome` container depends on `selenium-hub`.  
A link to the `tests` container is added so that this container (chrome) can talk to the application.  
The grid's hostname and port can be specified through environment variables (`HUB_HOST=selenium-hub`, `HUB_PORT=4444`), same for the browser's version required (`CHROME_VERSION=62.0.3202.94`).

The new `docker-compose` file, including all the improvements so far:

    version: "3"
    services:
      app.local:
        image: integration-tests:${BUILD_COUNTER:-0}
        command: npm start
        expose:
          - "3000"

      tests:
        image: integration-tests:${BUILD_COUNTER:-0}
        command: ["./wait-for-it.sh", "selenium-hub:4444", "--", "npm", "test", "--", "--hostname", "selenium-hub"]
        depends_on:
          - selenium-hub
          - app.local

      selenium-hub:
        image: selenium/hub:3.141.59-neon
        container_name: selenium-hub
        expose:
          - "4444"

      chrome:
        image: selenium/node-chrome:3.141.59-neon
        volumes:
          - /dev/shm:/dev/shm
        depends_on:
          - selenium-hub
          - app.local
        environment:
          - HUB_HOST=selenium-hub
          - HUB_PORT=4444
          - CHROME_VERSION=google-chrome-stable

_**Note**: I added versions to the docker images to make sure new releases don't break the example :)  
Also note that the name `app.local` was chosen because Chrome tends to redirect non-local domains to https. To prevent this from happening I added the `.local` domain to the dns name._

### Stop the container when the tests are completed and report the right exit code to CI

The current configuration starts up all the containers in order, runs the tests with a specific browser, but never stops the container because `selenium-hub` and `app.local` are long running processes that listen on a port forever.  
Regardless of when the tests are completed, these services will keep listening and never return: **the CI process will therefore never complete**.

All the containers need to be stopped when the tests are completed, the exit code from the `tests` container taken and returned to the CI, so that it can mark the build as passing or failing.

`docker-compose` accepts `--abort-on-container-exit` and `--exit-code-from SERVICE`:

- `--abort-on-container-exit` stops all containers if any container was stopped.
- `--exit-code-from SERVICE` return the exit code of the selected `SERVICE` container. Implies `--abort-on-container-exit`.

The bash script can be now modified to include these two options:

    #!/usr/bin/env bash

    echo "Starting Docker build"

    DOCKER_IMAGE="integration-tests:${BUILD_COUNTER:-0}"

    echo DOCKER_IMAGE: ${DOCKER_IMAGE}

    docker build --rm -t ${DOCKER_IMAGE} .
    docker-compose up --exit-code-from tests
    docker-compose down

_**Note**: I added `docker-compose down` to cleanup after everything's done._

### Conclusions

Making the tests execution more reliable and flexible helps a lot with achieving that confidence that is so needed when it comes to functional/e2e tests being used as gatekeepers to production.

Part III will look into debugging during execution using the browser running inside the container and saving reports on the CI to be used for port-mortem analysis.

You can find a working version of this example on [Github](https://github.com/ricca509/dockerize-webdriverio/tree/part-2).

Happy hacking!
