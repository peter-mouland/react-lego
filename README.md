# React Lego

> The building blocks of a react app

This repo demonstrates how to plug in other technologies, one block at a time, into React.

### Hear me out!

The concept is to use GitHub's branch-comparison screens to quickly demo the code changes that are needed for *only* the technology you are interested in.

The `Master` branch is a Universal React App, each other branch then adds one more technology, with the smallest possible changes.

[More about the concept >>](https://github.com/peter-mouland/react-lego/wiki)

**Branches available to compare:**

 * [x] [Base Universal React App](#base-universal-react-app) (master)
   * [x] [Hot-reloading](#hot-reloading) >> _[compare with master](https://github.com/peter-mouland/react-lego/compare/react-hot-loader)_
   * [x] [Redux](#redux) >> _[compare with master](https://github.com/peter-mouland/react-lego/compare/redux)_
      * [x] [with Promise middleware](#redux-with-promise-middleware) >> _[compare with Redux](https://github.com/peter-mouland/react-lego/compare/redux...redux-promised)_
      * [X] [DevTools](#devtools) >> _[compare with Redux](https://github.com/peter-mouland/react-lego/compare/redux...redux-devtools)_
   * [x] [Importing SVGs](#importing-svgs) >> _[compare with master](https://github.com/peter-mouland/react-lego/compare/svg)_
   * [ ] Selectors
   * [ ] Service Workers

_All branches are written using es6 and babel with webpack._

### Base Universal React App (master)

The aim of the `Master` branch was to be production ready.
This means _all_ other branches are also production ready. i.e. the have :

 * [x] Universal rendering
 * [x] Routing ([react-router](https://github.com/reactjs/react-router))
 * [x] CSS ([Sass-loader](https://github.com/jtangelder/sass-loader), [Autoprefixer](https://github.com/postcss/autoprefixer))
 * [x] [tests](/tests/README.md)
  * [x] [unit](/tests/README.md#unit-testing) with [Enzyme](https://github.com/airbnb/enzyme)
  * [x] [functional](/tests/README.md#functional-testing)
  * [x] [end-to-end](/tests/README.md#e2e-testing) with [Nightwatch](http://nightwatchjs.org/) and [BrowserStack](https://www.browserstack.com)
  * [ ] [smoke](/tests/README.md#smoke-testing)
  * [ ] [code coverage](/tests/README.md#code-coverage)
 * [x] Code linting with [eslint](http://eslint.org/)
 * [x] CI integration with [CircleCI](https://circleci.com/)
 * [x] Continuous deployment with [Heroku](http://www.heroku.com/)

These have been chosen as _base_ technologies for the master branch because
(Apart from them being relatively easy to distinguish between),
they are essential when building/deploying to make sure I don't break anything!

### Hot-Reloading

 > Based on the `master` branch. _[compare branches](https://github.com/peter-mouland/react-lego/compare/react-hot-loader)_

[react-hot-loader](https://github.com/gaearon/react-hot-loader/) allows you to see changes made to any part of your app without having to restart the server.
We are currently using [v3.beta2](https://github.com/gaearon/react-hot-loader/pull/240).

### Redux

 > Based on the `master` branch. _[compare branches](https://github.com/peter-mouland/react-lego/compare/redux)_

[Redux](https://github.com/reactjs/react-redux) was added with data being hydrated on the server.

The app now has an API which can be called to return the required data.
This data is now formatted inside a reducer.

### Redux with Promise middleware

 > Based on the `redux` branch. _[compare branches](https://github.com/peter-mouland/react-lego/compare/redux...redux-promised)_

The concept is that each container should be able to dictate what data it _needs_ while still on the server.

This means that it:
  * hooks in express to Redux
  * Check if the component required needs data
  * fetch only the data that is needed,
  * wait for the promise to finish
  * render the hydrated page on the server
  * send the page and the initial data to the client

A 'timeout' limit has also been set, which means if the server takes too long, the app is rendered without the data and instead fetched on the client.

I built this sollution after reading this [excellent article from Smashing Magazine](https://www.smashingmagazine.com/2016/03/server-side-rendering-react-node-express/)
as well as this [blog post on Medium by Milo Mordaunt](https://medium.com/front-end-developers/handcrafting-an-isomorphic-redux-application-with-love-40ada4468af4#.zeh2drhox)

### DevTools

 > Based on the `redux` branch. _[compare branches](https://github.com/peter-mouland/react-lego/compare/redux...redux-devtools)_

Add [Redux-DevTools](https://github.com/gaearon/redux-devtools) to the app to help debugging.

### Importing SVGs

 > Based on the `master` branch. _[compare branches](https://github.com/peter-mouland/react-lego/compare/svg)_

Using [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools) and [svg-inline-loader](https://github.com/sairion/svg-inline-loader) we are able to directly import SVGs into our JavaScript.
This has the added benefit of :

 * Reusing SVG files (without code duplication)
 * Keep SVGs inline and style them with CSS

[More about importing SVGs >>](https://github.com/peter-mouland/react-lego/wiki/Importing-SVGs)
