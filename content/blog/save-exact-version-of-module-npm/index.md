---
title: "Save the exact version of a module with npm"
date: "2015-12-10T11:39:00.000Z"
description: "Save the exact version of a module with npm"
publication_status: published
---

npm is definitely a very useful tool, but its default behaviour is more tailored for module development than for applications.

What I'd like it to do every time I install a dependency is:

1.  save it in my `package.json`
2.  install the _exact_ version of the module, without any caret `^`

**1** is easily achieved with `npm install myModule --save`, while to achieve **2** you have to add an additional `--save-exact`.

Typing this everytime is annoying, but with the use of `~/.npmrc` this behaviour can become a default:

    $ npm config set save=true
    $ npm config set save-exact=true

This will do the trick, and now every time you `npm install myModule`, it will install the exact version (no `^`) and save it in `package.json`.

Happy dev!
