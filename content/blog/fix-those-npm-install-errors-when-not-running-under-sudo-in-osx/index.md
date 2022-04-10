---
title: "How to fix 'npm install' errors on OS X"
date: "2014-09-14T17:28:14.000Z"
description: "How to fix 'npm install' errors on OS X"
publication_status: published
---

I've had this problem for a while: fresh nodejs and npm installation, I try to run `npm install` or `npm install -g` and get all kind of errors.

### Errors when running `npm install` without the `-g` flag

When running without the `-g` flag, I usually get, among the others:

    "Error: Attempt to unlock XXX, which hasn't been locked"

### Errors when running `npm install -g`

When you run `npm install` with the `-g` option, you want to be able to run a specific executable (a .js file) from outside any project folder with a `node_modules` directory.  
In this case, you usually get another an access error:

    npm ERR! Error: EACCES, mkdir '/usr/local/lib/node_modules/...'
    npm ERR!  { [Error: EACCES, mkdir '/usr/local/lib/node_modules/...']
    npm ERR!   errno: 3,
    npm ERR!   code: 'EACCES',
    …
    npm ERR! Please try running this command again as root/Administrator.

### Understand what happens under the hood

Let's first have a look at what happens when you run these commands.

#### What happens when you run `npm install` (without the `-g` flag)?

Example for the `traceur` compiler:

    $ npm install traceur
    ...
    traceur@0.0.62 node_modules/traceur

- `npm` creates a `node_modules` folder (if it does not exists) and install the package under that folder

As you can see, it is installed under `node_modules/traceur`.

#### What happens when you run `npm install -g`?

Example for the `traceur` compiler:

    $ npm install traceur -g
    ...
    /usr/local/bin/traceur -> /usr/local/lib/node_modules/traceur/traceur

- `npm` installs the package under `/usr/local/lib/node_modules`
- a symbolic link is created from that folder to `usr/local/bin/`

### The easy and bad solution

In both cases, running `sudo npm install`, immediately fixes the problem.

### The right solution

In **no case** you should run `npm` with `sudo`.  
You can read the [Intro to npm](http://foohack.com/2010/08/intro-to-npm/#what_no_sudo) by Isaac Schlueter for a valid reason.

> Packages can run arbitrary scripts, which makes sudoing a package manager command as safe as a chainsaw haircut

So, the short answer is: **to avoid security issues**.

#### The source of the problem

What is happening when you get the error is that the user you are logged in with does not have the rights to run that command.  
This is usually because `npm` was installed by _root_ and so you are not the owner of that executable file.

#### Fix your `/usr/local` folder

If you run `which npm` on your Mac, you should get:

    $ which npm
    /usr/local/bin/npm

The `/usr/local` folder is the folder where the user install his own stuff, so **it belongs to the user**.  
To fix the problem:

    sudo chown -R $USER /usr/local

Your `npm` will be back to you now.

#### Fix your `~/.npm` folder

Before considering it done, have a look at your home folder: you have a `.npm` folder in it.

You have to make sure that the whole folder belongs to your user and to do that, issue:

    sudo chown -R $USER ~/.npm

The `.npm` folder is now yours and you'll be able to run `npm install` and `npm install -g` without `sudo`: enjoy.

### Recap

When you get weird errors using `npm install` and `npm install -g` that are solved using these commands with `sudo`, have a look at the owner of your `/usr/local` and `~/.npm` folders: changing it to your user will solve the problems.

### Quick and dirty

    sudo chown -R $USER /usr/local
    sudo chown -R $USER ~/.npm

**Sources:**

- [stackoverflow](http://stackoverflow.com/questions/22152162/npm-cannot-install-dependencies-attempt-to-unlock-something-which-hasnt-been)
- [Intro to npm](http://foohack.com/2010/08/intro-to-npm/#what_no_sudo)
- [Aral Balkan's blog](https://aralbalkan.com/scribbles/npm-install-g-please-try-running-this-command-again-as-root-administrator/)
