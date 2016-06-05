# React Lego

> The building blocks of a react app

This repo demonstrates how to plug in other technologies, one block at a time, into React.

### Hear me out!

The concept is to use GitHub's branch-comparison screens to quickly demo the code changes that are needed for *only* the technology you are interested in.

The `Master` branch is a Universal React App, each other branch then adds one more technology, with the smallest possible changes.

**Branches available to compare:**

 * [ ] Universal React App (master)
 * [ ] DevTools
 * [ ] Hot-reloading
 * [ ] Redux
 * [ ] Selectors
 * [ ] Adding SVGs
 * [ ] Service Workers

### Universal React App (master)

The aim of the `Master` branch was to be production ready.
This means _all_ other branches are also production ready. i.e. the have :

 * [x] universal rendering (_every_ app should be rendered on the server first!)
 * [x] Routing ([react-router](https://github.com/reactjs/react-router))
 * [x] CSS ([Sass-loader](https://github.com/jtangelder/sass-loader), [Autoprefixer](https://github.com/postcss/autoprefixer))
 * [x] [tests](/tests/README.md)
  * [x] [unit](/tests/README.md#unit-testing) with [Enzyme](https://github.com/airbnb/enzyme)
  * [x] [functional](/tests/README.md#functional-testing)
  * [x] [end-to-end](/tests/README.md#e2e-testing) with [Nightwatch](http://nightwatchjs.org/) and [BrowserStack](https://www.browserstack.com)
  * [ ] [smoke](/tests/README.md#smoke-testing)
  * [ ] [code coverage](/tests/README.md#code-coverage)
 * [x] code linting with [eslint](http://eslint.org/)
 * [x] CI integration with [CircleCI](https://circleci.com/)
 * [ ] continuous deployment with [Heroku](http://www.heroku.com/)

These have been chosen as _base_ technologies for the master branch because (Apart from them being easy to distinguish between),
they are essential when building/deploying to make sure I don't break anything!

_All branches are written using es6 and babel with webpack._
