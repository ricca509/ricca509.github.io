---
title: "Bower and Grunt - A practical workflow"
date: "2014-10-14T21:25:33.000Z"
description: "Bower and Grunt - A practical workflow"
publication_status: published
---

[Bower & Grunt - A practical workflow](https://www.slideshare.net/coppolariccardo/bower-grunt-a-practical-workflow) on my [slideshare](http://www.slideshare.net/coppolariccardo)

Bower is a great tool: it searches, downloads and tracks all our front end dependencies.

But it is not enough: we get all sort of useless files when we download our libraries: `docs/` `test/` `src/` `dist/` all this folders ar useless for us.

1.  We only need _one file_, usually _non minified_ (we all have a uglify task in our workflow, do we?)
2.  We want to be able to copy `css` and `js` to different _vendor_ folder
3.  We do not want to commit our `bower_components` folder
4.  We want just the libraries that we **use** in our vendor folders
5.  We want just **one version** of each library in our vendor folders

So, it is clear that Bower alone is not enough, so I put together a very simple yet powerful workflow to get all these points sorted.

## Step 1: Bower

> A package manager for the web

Use Bower as you always do, saving your dependencies into the `bower.json` file with the `--save` and `--save-dev` flags.

## Step 2: `grunt-bowercopy`

> Consistently positions your dependencies where you want them in your repository

Once you have all your dependencies in your `bower_components` folder, it is time to move them into specific folders (e.g. `/publis/js/vendor/` and `/publis/css/vendor/`): [grunt-bowercopy](https://github.com/timmywil/grunt-bowercopy) is the tool for you.

Install the plugin: `npm install grunt-bowercopy --save-dev`

Now create a Grunt task for it. In your `grunt` folder (you are using [load-grunt-config](https://github.com/firstandthird/load-grunt-config), right?), create a new file: `bowercopy.js`.

The following is just an example. Notice that you don't need to specify the `bower_components` folder in your configuration: grunt-bowercopy will read your `.bowerrc` and will prepend the right folder name for you.

```javascript
"use strict";

module.exports = function () {
  return {
    js: {
      options: {
        destPrefix: "public/js/vendor",
      },
      files: {
        "jquery.js": "jquery/jquery.js",
        "require.js": "requirejs/require.js",
      },
    },
    sass: {
      options: {
        destPrefix: "public/css/vendor",
      },
      files: {
        bootstrap: "bootstrap-sass-official/bootstrap.js",
      },
    },
  };
};
```

If you now run `grunt bowercopy`, it will run `bower install` for you, then will copy the files in the right place: points 1, 2, 3 sorted!

## Step 3: `grunt-contrib-clean`

> Clean files and folders.

Ok, now that we have everything in place, we want to make sure that our vendor folders don't grow, so we'll clean them every time we commit!

Install the plugin: `npm install grunt-contrib-clean --save-dev`

Now in your `grunt` folder, create a new file: `clean.js`.

```javascript
'use strict';

module.exports = function () {
  return {
    {
      vendor: ['public/css/vendor/*', 'public/js/vendor/*']
    }
  };
};
```

Running `grunt clean:vendor` will now delete everything beneath the two vendor folders: points 4 and 5 sorted!

## Everything together

It's time to create an alias an put all this task at work, together!

in your `grunt` folder, add to your `aliases.js`:

```javascript
'use strict';

module.exports = function () {
  return {
    {
      vendor: ['clean:vendor', 'bowercopy'],
      precommit: ['vendor']
    }
  };
};
```

That's it!  
In your `precommit` task, when you lint your files, run your tests and coverage and so on, make sure to include the `vendor` task and your vendor folders will always be clean and lightweight!

**If you commit your dependencies**

Ignore your `bower_components` and commit your clean `/publis/js/vendor/` and `/publis/css/vendor/`.

**If you DO NOT commit your dependencies**

Ignore your `bower_components`, `/publis/js/vendor/` and `/publis/css/vendor/`.  
Have your CI run `grunt vendor` as first step of your workflow.

**Enjoy your coding time!**
