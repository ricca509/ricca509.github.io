# ricca509.github.io

This application is built using [Gatsby.js](https://www.gatsbyjs.org/) with Markdown files as data source for the content.

It is hosted on GitHub pages and deployed automatically using GitHub actions to riccardocoppola.me. DNS and routing handled through [cloudflare](https://www.cloudflare.com/).

## Run the application locally

To run the application in dev mode, install dependencies (`npm i`) then `npm run develop`.

## Run Storybook

I use [storybook](https://storybook.js.org/) to develop UI components in isolation, to run `npm run storybook`.

## Run integration tests

I use [cypress](https://www.cypress.io/) for UI integration tests. 

Run `npm run integration` to execute tests on a headless browser, against a production version of the application.

Run `npm run integration:dev` to run the application in dev mode and open the Cypress UI.