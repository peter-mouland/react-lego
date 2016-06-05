# Contributing

  * [Prerequisites](#prerequisites)
  * [Workflow](#workflow)
    * [Raise an Issue](#raise-an-issue)
    * [Updating `Master` (Base app)](#updating-master-base-app)
    * [Adding a new technology](#adding-a-new-technology)
    * [Developing](#developing)
    * [Testing](#testing)
    * [Releasing](#releasing)
  * [Styleguides](#Styleguides)

## Prerequisites

 > Clone the project `git clone git@github.com:peter-mouland/...`

PhantomJS v2 i required for tests.  If you haven't already got it installed please do the following:

 * `brew install upx`
 * `npm run phantom:install`

## Workflow

### Updating `Master` (Base app)

1. Raise an issue if there is not already one.
3. Create a branch with your feature or fix and push it to GitHub.
4. Ensure you branch includes at least one new test
6. Create a pull request.

### Adding a new technology

1. Raise an issue if there is not already one.
2. Only one new tech per branch (and PR)
3. Create a new branch with your feature.
 * If there are prerequisites, branch of the required branch
 * if there is no branch that matches the prerequisite, you must create it fist
 * If there are no prerequisites, branch from master
4. Ensure you branch includes at least one new test
6. Create a pull request.

### Developing

 * `npm run start:dev` : the app will be on http://localhost:3000

### Testing

 * `npm test`
 * `npm start && npm run test:e2e-local`

To run the full browserstack suite of feature tests, first start browserstack supplying the browserstack-key

 * `./bin/BrowserStackLocal-osx <PUT-THE-BROWSERSTACK-KEY-HERE>`
 * `npm start && npm run test:e2e -- --bskey=<PUT-THE-BROWSERSTACK-KEY-HERE>`

## Styleguides

 * Use the `.editorconfig` (this will ensure your IDE plays nicely with things like 2 Spaces (not tabs)
 * Components should work without requiring 'build' setup changes
   * i.e. Components can be *enhanced* with webpack updates but updates must not be mandatory
 * Full component functionality should be documented and demo'd
   * the default is demo'd and the ability to change options on the fly is provided


