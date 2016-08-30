# React Lego

> The building blocks of a react app

This repo demonstrates how to plug in other technologies, one block at a time, into React.

### Hear me out!

The concept is to use GitHub's branch-comparison screens to quickly demo the code changes that are needed for *only* the technology you are interested in.

The `Master` branch is a Universal React App, each other branch then adds one more technology, with the smallest possible changes.

**Branches available to compare:**

 * [x] [Base Universal React App](#base-universal-react-app) (master)
   * [x] [Hot-reloading](#hot-reloading) _[>> compare with master](https://github.com/peter-mouland/react-lego/compare/react-hot-loader)_
   * [x] [Redux](#redux) _[>> compare with master](https://github.com/peter-mouland/react-lego/compare/redux)_
      * [x] [with Promise middleware](#redux-with-promise-middleware) _[>> compare with Redux](https://github.com/peter-mouland/react-lego/compare/redux...redux-promised)_
   * [ ] DevTools
   * [ ] Selectors
   * [ ] Adding SVGs
   * [ ] Service Workers

_All branches are written using es6 and babel with webpack._

### Base Universal React App (master)

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
 * [x] continuous deployment with [Heroku](http://www.heroku.com/)

These have been chosen as _base_ technologies for the master branch because
(Apart from them being easy to distinguish between),
they are essential when building/deploying to make sure I don't break anything!

### Hot-Reloading

 > Based on the `master` branch

Hot reloading allows you to see changes made to any part of your app without having to restart the server.

### Redux

 > Based on the `master` branch

[Redux](https://github.com/reactjs/react-redux) was added with data being hydrated on the server.

The app now has an API which can be called to return the required data.
This data is now formatted inside a reducer.

### Redux with Promise middleware

 > Based on the `redux` branch

The concept is that each container should be able to dictate what data it _needs_ while still on the server.

This means that it:
  * hooks in express to Redux
  * Check if the component required needs data
  * fetch only the data that is needed,
  * wait for the promise to finish
  * render the hydrated page on the server
  * send the page and the initial data to the client

A 'timeout' limit has also been set, which means if the server takes too long, the app is rendered without the data and instead fetched on the client.

### DevTools

_to be written_


