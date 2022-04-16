---
title: Make alias imports work in Gatsby with TypeScript
date: "2022-04-16T11:00:00Z"
description: "So you want to write `@Components/Button` instead of `../../../../components/Button` in your TypeScript Gatsby app."
publication_status: published
---

_So you want to write `@Components/Button` instead of `../../../../components/Button` in your TypeScript Gatsby app._

There are two important pieces to this: TypeScript and webpack (Gatsby uses webpack under the hood to build your code).

To type check your code, TypeScript needs to know where the alias imports map to.
To build your code, webpack needs to know the same thing to resolve all dependencies.

They both need to be told in order for your code to type check and build properly.

For TypeScript, you define `paths` in the `tsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@Components/*": ["components/*"]
    }
  }
}
```

For webpack, you do a similar thing in `alias`. In case of Gatsby, you have a hook function `onCreateWebpackConfig` in `gatsby-node.ts` to modify the default configuration.

```javascript
const path = require("path");

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@Components": path.resolve(__dirname, "src/components"),
      },
    },
  });
};
```

Copying paths in two places is tedious and prone to error though, and I prefer to have `tsconfig.json` as source of truth then use [tsconfig-paths-webpack-plugin](https://www.npmjs.com/package/tsconfig-paths-webpack-plugin) to automatically pull that configuration in webpack.

```javascript
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      plugins: [new TsconfigPathsPlugin()]
  });
};
```

This concept works with any code that use TypeScript and webpack, but with Gatsby you can use [gatsby-plugin-tsconfig-paths](https://www.gatsbyjs.com/plugins/gatsby-plugin-tsconfig-paths/) in your `gatsby-config.ts` and you won’t have to touch the webpack config at all.

```javascript
// gatsby-config.ts
module.exports = {
  plugins: [
    ...,
    `gatsby-plugin-tsconfig-paths`
  ]
}
```

### Note

There is another [gatsby plugin](https://www.gatsbyjs.com/plugins/gatsby-plugin-alias-imports/) that allows you to define alias in gatsby-config.

This works by simply injecting the options into Webpack using `onCreateWebpackConfig` but won’t do anything for your typescript configuration and you’ll have to manually copy the alias in your `tsconfig.json`.
