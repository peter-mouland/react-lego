# React Lego [![CircleCI](https://circleci.com/gh/peter-mouland/react-lego.svg?style=svg)](https://circleci.com/gh/peter-mouland/react-lego)

> The building blocks of a react app

This repo demonstrates how to plug in other technologies, one block at a time, into React.

### Hear me out!

The concept is to use GitHub's branch-comparison screens to quickly demo the code changes that are needed for *only* the technology you are interested in.

A client-side React app which is fully tested and production ready on the `master` branch.  
From Master, `universal` was created which added Server-side Rendering (SSR) via Express.  
Every other branch then adds one more technology, with the smallest possible changes.

All branches, have been setup with [continuous deployment](https://github.com/peter-mouland/react-lego/wiki/Continuous-Deployement).

[>> More about the concept](https://github.com/peter-mouland/react-lego/wiki)

## Branches available to compare:

* [x] [Client-side app (React)](#react-client-side-app)
  * [x] [Universal React App (Using Koa)](#universal-react-app)
  * [x] [Universal React App (Using Express)](#universal-react-app)
     * [x] [Hot-reloading](#hot-reloading)
     * [x] [Redux](#redux)
       * [x] [Redux with Promise middleware (async on the server)](#redux-with-promise-middleware)
       * [X] [Redux Dev Tools](#redux-dev-tools)
     * [x] [Importing SVGs](#importing-svgs)
     * [x] [Webpack v2](#using-webpack-v2)
       * [x] [Webpack v2 with React-Hot-loader v3](#using-webpack-v2-with-react-hot-loader-v3)
     * [x] [React-Router v4](#using-react-route-v4)
     * [X] [CSS](#css)
       * [x] [CSS Imports](#css-imports)
       * [x] [CSS Modules](#css-modules)
       * [-] [CSS in JS](#css-in-js)
* [x] [Client-side app (Preact)](#preact-client-side-app)

_All branches are written using es6 and babel with webpack._

## React Client-side App 

The aim of the `master` branch was to be as close to production ready as possible (minus universal rendering).

 * [x] Routing ([react-router](https://github.com/reactjs/react-router))
 * [x] CSS ([Sass-loader](https://github.com/jtangelder/sass-loader), [Autoprefixer](https://github.com/postcss/autoprefixer))
 * [x] [tests](/tests/README.md)
  * [x] [unit](/tests/README.md#unit-testing) with [Enzyme](https://github.com/airbnb/enzyme)
  * [x] [functional](/tests/README.md#functional-testing)
  * [x] [end-to-end](/tests/README.md#e2e-testing) with [Nightwatch](http://nightwatchjs.org/) and [BrowserStack](https://www.browserstack.com)
  * [x] [smoke](/tests/README.md#smoke-testing)
  * [ ] [code coverage](/tests/README.md#code-coverage)
 * [x] Code linting with [eslint](http://eslint.org/)
 * [x] CI integration with [CircleCI](https://circleci.com/)
 * [x] Continuous deployment with [Heroku](http://www.heroku.com/)

These have been chosen as _base_ technologies because
(Apart from them being relatively easy to distinguish between),
they are essential when building/deploying to make sure I don't break anything!

### Preact client-side app

 > Changed from the `master` branch. _[compare branches](https://github.com/peter-mouland/react-lego/compare/master...preact)_

Because of [Ben Fletcher](https://github.com/bjfletcher) and [this tweet](https://twitter.com/bjfletcher/status/776481240065114112) I thought i'd give [Preact](https://github.com/developit/preact) a shot.

Turns out it was actually very easy!  After removing a few dependencies we swapped routers for [preact-router](https://github.com/developit/preact-router).

[>> More about adding Preact](https://github.com/peter-mouland/react-lego/wiki/Preact)

## Universal React App (Koa)

 > Based on the `master` branch. _[compare branches](https://github.com/peter-mouland/react-lego/compare/master...koa)_

Using Koa, the App now renders on the server.

Some may find comparing the code [changes between Express and Koa](https://github.com/peter-mouland/react-lego/compare/universal...koa) interesting... 

## Universal React App (Express)

 > Based on the `master` branch. _[compare branches](https://github.com/peter-mouland/react-lego/compare/master...universal)_

Using Express, the App now renders on the server.

### Hot-Reloading

 > Based on the `universal` branch. _[compare branches](https://github.com/peter-mouland/react-lego/compare/universal...react-hot-loader)_

[react-hot-loader](https://github.com/gaearon/react-hot-loader/) allows you to see changes made to any part of your app without having to restart the server.
We are currently using [v3](https://github.com/gaearon/react-hot-loader/tree/next).

[>> More about adding react-hot-loader](https://github.com/peter-mouland/react-lego/wiki/react-hot-loader-v3)

### Redux

 > Based on the `universal` branch. _[compare branches](https://github.com/peter-mouland/react-lego/compare/universal...redux)_

[Redux](https://github.com/reactjs/react-redux) was added with data being hydrated on the server.

The app now has an API which can be called to return the required data.
This data is now formatted inside a reducer.

[>> More about adding Redux](https://github.com/peter-mouland/react-lego/wiki/Redux)

#### Redux with Promise middleware

 > Based on the `redux` branch. _[compare branches](https://github.com/peter-mouland/react-lego/compare/redux...redux-promised)_

This branch allows you to make async requests on the server and hydrate your redux store before rendering the page.
The massive win here is that each container dictates what data it _needs_ while still on the server.

[>> More about adding Promise middleware](https://github.com/peter-mouland/react-lego/wiki/Redux-Promise-Middleware)

#### Redux Dev Tools

 > Based on the `redux` branch. _[compare branches](https://github.com/peter-mouland/react-lego/compare/redux...redux-devtools)_

Add [Redux-DevTools](https://github.com/gaearon/redux-devtools) to the app to help debugging.

[>> More about adding redux-dev-tools](https://github.com/peter-mouland/react-lego/wiki/Redux-dev-tools)

### Importing SVGs

 > Based on the `universal` branch. _[compare branches](https://github.com/peter-mouland/react-lego/compare/universal...svg)_

Using [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools) and [svg-inline-loader](https://github.com/sairion/svg-inline-loader) we are able to directly import SVGs into our JavaScript.
This has the added benefit of :

 * Reusing SVG files (without code duplication)
 * Keep SVGs inline and style them with CSS
 * Serverside rendering of SVG's

[>> More about importing SVGs](https://github.com/peter-mouland/react-lego/wiki/Importing-SVGs)

### Using Webpack v2

 > Based on the `universal` branch _[compare branches](https://github.com/peter-mouland/react-lego/compare/universal...webpack2)_

This was added out of pure interest and I haven't used it in anger yet.
Please take a look at the comparison branch to see how to upgrade from webpack v1 to v2.

[>> More about Webpack v2](https://github.com/peter-mouland/react-lego/wiki/Webpack-v2)

#### Using Webpack v2 with React-Hot-loader v3

 > Based on the `webpack2` branch. _[compare branches](https://github.com/peter-mouland/react-lego/compare/webpack2...webpack2-rhl)_

 Just added as a quick demo to help out and show the 2 working together.
 no changes required to either branch to get them to work together.

### Using React-Router v4

 > Based on the `universal` branch _[compare branches](https://github.com/peter-mouland/react-lego/compare/universal...react-router-4)_

[React Router](https://github.com/ReactTraining/react-router) v4 sees to be very close to being released so I was interested in how hard the upgrade would be.
Easy, it seems - the new syntax includes a lot for JSX which is friendly and more flexible.

[>> More about React-Router v4](https://github.com/peter-mouland/react-lego/wiki/React-Router-v4)

### CSS

In master, we have simply added the CSS into webpack `entry` array to get it to convert Scss into CSS.
these are some other ways to achieve more modular components:

[>> More about the different CSS methods](https://github.com/peter-mouland/react-lego/wiki/CSS)

#### CSS Imports

 > Based on the `universal` branch _[compare branches](https://github.com/peter-mouland/react-lego/compare/universal...css-imports)_

Import your css into your component and use the class names as they are written.  
This method is the least obtrusive and feels most like traditional css.
You must manually take care of css scope using things like BEM or Smaccs.

#### CSS Modules

 > Based on the `universal` branch _[compare branches](https://github.com/peter-mouland/react-lego/compare/universal...css-modules)_

Import your css into your components and add the class names using js object notation.
This method completely changes the css class names output.
Scoping problems are gone, but you must specifically mark 'global' classes.

#### CSS in JS

 > Based on the `universal` branch _[compare branches](https://github.com/peter-mouland/react-lego/compare/universal...css-in-js)_

import your css into your components as Javascript Objects.  
Class names are a thing of the past as are scoping problems.
