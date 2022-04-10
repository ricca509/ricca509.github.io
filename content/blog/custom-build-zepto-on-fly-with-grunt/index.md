---
title: "Custom build Zepto with Grunt and Bower"
date: "2014-11-03T22:34:58.000Z"
description: "Custom build Zepto with Grunt and Bower"
publication_status: published
---

_Workflow: I think it's the most important thing for a frontend developer. I like tweaking, improving and fixing my workflow: it makes me feel safe. It makes my life easier, my job quickly done._

_The following is another piece of my workflow that I am happy to share with you, hopefully it'll make your life easier as well._

> Zepto is a minimalist JavaScript library for modern browsers with a largely jQuery-compatible API. If you use jQuery, you already know how to use Zepto.

At the time of writing, these are the uncompressed sizes of the libraries:

- **jQuery** v2.1.1.js - **247k**
- **Zepto** v.1.1.4 (minimal, no additional modules) - **54.2k**: 159k lighter (64%)
- **Zepto** v.1.1.4 (complete, all additional modules) - **88k**: 193k lighter (78%)

### Zepto plugins and custom builds

Zepto comes, in it's default 'package', as a small library without additional jQuery modules like event, ajax, data, deferred, etc.

You may be perfectly fine with this, but if you want to take advantage of these additional features or you have to integrate Zepto with libraries like Backbone, then you need some additional modules.

In this case, to keep the size as low as possible, you may want to create a custom build of Zepto, tailored on your specific needs.

#### The Zepto online builder

The first place you may want to look into is the online [Zepto builder](http://github.e-sites.nl/zeptobuilder/).  
It lets you choose the plugins and download your custom build.

This may work for you if you just need to quickly build your Zepto, but if you want to integrate this in your workflow, it's probably not the right way.

#### Zepto custom build on fly

If you want to keep using [Bower](http://bower.io/) to handle your dependencies (see [how to integrate Grunt and Bower in your workflow](http://www.ricca509.me/bower-and-grunt-a-practical-workflow/)), then you need more flexibility than having to go and build your library on a website.

The workflow that we'll create will consist of the following steps:

0.  Install Bower and Zepto
1.  Run [Bower](http://bower.io/) to fetch the full Zepto source
2.  Build a custom version of Zepto based on the plugin you need
3.  Run [grunt-bowercopy](https://github.com/timmywil/grunt-bowercopy) to copy the final file in our vendor folder

**Note**: I assume that you are using [load-grunt-config](https://github.com/firstandthird/load-grunt-config) to load your Grunt tasks.

#### Step 1. Install Bower and Zepto

First of all you need to install Bower (I install it locally to avoid any dependency):

    $ npm install --save-dev bower

Now, you are ready to install Zepto:

    $ node_modules/.bin/bower install --save zeptojs

#### Step 2. Run [Bower](http://bower.io/) to fetch the full Zepto source

To do this, I use the [grunt-shell](https://github.com/sindresorhus/grunt-shell) task, perfect to run command-line stuff from Grunt.

    $ npm install --save-dev grunt-shell

Then, in your `shell.js` file (your Grunt task definition):

    // grunt/shell.js

    module.exports = function () {
    	'use strict';
        return {
            options: {
                stderr: true
            },
            runBower: {
                command: 'node_modules/.bin/bower install'
            }
        };
    };

Now, running `grunt shell:runBower` you should see Bower fetching your Zepto.

What you have now is the full source of the library: we need to create our custom build.

#### Step 3. Build Zepto based on the plugins you need

Again, since it is a shell command, the [grunt-shell](https://github.com/sindresorhus/grunt-shell) task will help us.  
You can learn more about creating custom Zepto builds on [GitHub](https://github.com/madrobby/zepto#building).

For our example, we need to create a build with the following plugins: **zepto, event, ajax, form, data, deferred, callbacks**.

We'll create a `buildZepto` task for it in our `shell.js` file:

    // grunt/shell.js

    module.exports = function () {
    	'use strict';
        return {
            options: {
                stderr: true
            },
            runBower: {
                command: 'node ./node_modules/.bin/bower install'
            },
            buildZepto: {
            	command: [
                    'cd bower_components/zeptojs',
                    'npm install',
                    'MODULES="zepto event ajax form data deferred callbacks" npm run-script dist'
                ].join('&&')
            }
        };
    };

Running `grunt shell:buildZepto` will now build your custom Zepto and place it into your `bower_components/zeptojs` folder.

Now it's time to copy just the file that we need in our `vendor` folder.

#### Step 4. Run [grunt-bowercopy](https://github.com/timmywil/grunt-bowercopy) to copy the final file in our vendor folder

There is an awesome Grunt task that will take care of copying just the stuff that you need, from your `bower_components` folder to your `vendor`. It is called [grunt-bowercopy](https://github.com/timmywil/grunt-bowercopy).

So, go ahead and install it:

    $ npm install grunt-bowercopy --save-dev

Now, it's time to configure it, creating a `bowercopy.js` file into your `grunt` folder.

    // grunt/bowercopy.js

    module.exports = function () {
    	'use strict';
        return {
            options: {
                runBower: false
            },
            js: {
                options: {
                    destPrefix: 'js/vendor'
                },
                files: {
                    ...
                    'zepto': 'zeptojs/dist/zepto.js',
    				...
                }
            }
        };
    };

Try to run `grunt bowercopy` now, and you'll find a `zepto.js` file in your `vendor` folder. Amazing, we achieved exactly what we wanted.

#### Wrap it up

To make our life easier, let's create an alias that will do everything for us in one command.  
In our `aliases.js`.

    // grunt/aliases.js

    vendor: ['clean:vendor', 'shell:runBower', 'shell:buildZepto', 'bowercopy:js']

To test it, run `grunt vendor`.

Happy coding,

Riccardo
