# React Lego [![CircleCI](https://circleci.com/gh/peter-mouland/react-lego.svg?style=svg)](https://circleci.com/gh/peter-mouland/react-lego)

> The building blocks of a react app

This repo demonstrates how to plug in other technologies, one block at a time, into React.

### Hear me out!

The concept is to use GitHub's branch-comparison screens to quickly demo the code changes that are needed for *only* the technology you are interested in.

A client-side React app which is fully tested and production ready on the `master` branch.  
From Master, `universal` was created which added *Server-side Rendering (SSR)* via Express.  
Every other branch then adds one more technology, with the smallest possible changes.

All branches, have been setup with [continuous deployment](https://github.com/peter-mouland/react-lego/wiki/Continuous-Deployement).

[>> More about the concept](https://github.com/peter-mouland/react-lego/wiki)

## Technologies:

 > All apps use babel v6, es2015, React v15.1, React-router v1, Webpack v1 unless otherwise stated.
 
Below are the technologies available to compare.  
Each tech has its own branch, and in my experience, can be mixed and matched _almost_ seamlessly!

* [Client-side](#client-side)
    * [React](#react)
    * [Preact (w/ preact-router)](#preact)
* [Server-side Rendering (SSR)](#server-side-rendering-SSR) 
   * [Koa](#koa)
   * [Express](#express)
* [Build Tools](#build-tools)
   * [Webpack v2](#webpack-v2)
* [Hot-Reloading](hot-reloading)
   * [React-hot-loader v3](#react-hot-loader-v3)
* [Routing](#routing)
   * [React-router v4](#react-router-v4)
* [State Management](#state-management)
   * [Redux](#redux)
   * [Redux with Promise middleware (async on the server)](#redux-with-promise-middleware)
   * [Redux Dev Tools](#redux-dev-tools)
* [Importing Assets](#importing-assets)
   * [SVGs](#svgs)
   * [CSS Imports](#css-imports)
   * [CSS Modules](#css-modules)
   * [CSS in JS](#css-in-js)

## Client-side

The client-side apps are production ready and fully tested, they both use the following :

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

*All* other branches include the above and are also production ready.

### React
 > `master` branch

The react app uses [react-router](https://github.com/reactjs/react-router) v2 for routing.

### Preact

 > Branched from `master`: _[compare branches](https://github.com/peter-mouland/react-lego/compare/master...preact)_

Because of [Ben Fletcher](https://github.com/bjfletcher) and [this tweet](https://twitter.com/bjfletcher/status/776481240065114112) I thought i'd give [Preact](https://github.com/developit/preact) a shot.

Turns out it was actually very easy!  After removing a few dependencies we swapped routers for [preact-router](https://github.com/developit/preact-router).

[>> More about adding Preact](https://github.com/peter-mouland/react-lego/wiki/Preact)

## Server-side Rendering (SSR)

### Koa

 > [Add Koa to React branch](https://github.com/peter-mouland/react-lego/compare/master...koa)

Using Koa, the App now renders on the server, [Compare Koa with Express](https://github.com/peter-mouland/react-lego/compare/universal...koa).

#### Koa Branches: 

 * [Add Webpack 2](https://github.com/peter-mouland/react-lego/compare/koa...koa-wp2)
   * [Add React-router 4](https://github.com/peter-mouland/react-lego/compare/koa-wp2...koa-wp2-rr4) to the above
     * [Add React-hot-loader v3](https://github.com/peter-mouland/react-lego/compare/koa-wp2-rr4...koa-wp2-rr4-rhl3) to the above

I simply rebased and rebased and rebased some more :) 
Oh, I did swap in koa's hot middleware, but that was it. And it works, bonus.

### Express

 > [Add Express to React branch](https://github.com/peter-mouland/react-lego/compare/master...universal)

Using Express, the App now renders on the server, [Compare Express with Koa](https://github.com/peter-mouland/react-lego/compare/universal...koa).

#### Express Branches:

 * [Add React-hot-loader v3](https://github.com/peter-mouland/react-lego/compare/universal...react-hot-loader)
 * [Add Webpack 2](https://github.com/peter-mouland/react-lego/compare/universal...webpack2)
   * [Add React-router 4](https://github.com/peter-mouland/react-lego/compare/koa...koa-wp2-rr4) to the above
     * [Add React-hot-loader v3](https://github.com/peter-mouland/react-lego/compare/koa...koa-wp2-rr4-rhl3) to the above

## Build Tools

### Webpack v2
             
This was added out of pure interest and I haven't used it in anger yet.
Take a look at the comparison branch to see how to upgrade from webpack v1 to v2.

Other Webpack v2 Branches:
 * [Koa with Webpack v2](https://github.com/peter-mouland/react-lego/compare/koa...koa-wp2)
 * [Express with Webpack v2](https://github.com/peter-mouland/react-lego/compare/universal...webpack2)

## Hot-Reloading

### React-hot-loader v3

[react-hot-loader](https://github.com/gaearon/react-hot-loader/) allows you to see changes made to any part of your app without having to restart the server.
We are currently using [v3](https://github.com/gaearon/react-hot-loader/tree/next).

[>> More about adding react-hot-loader](https://github.com/peter-mouland/react-lego/wiki/react-hot-loader-v3)

#### RHLv3 Branches

 * [Express with React-hot-loader v3](https://github.com/peter-mouland/react-lego/compare/universal...react-hot-loader)
 * [Express with Webpack v2  React-hot-loader v3](https://github.com/peter-mouland/react-lego/compare/webpack2...webpack2-rhl)
 * [Koa with Webpack v2 and React-hot-loader v3](https://github.com/peter-mouland/react-lego/compare/koa-wp2-rr4...koa-wp2-rr4-rhl3)

## Routing

### React-Router v4

[React Router](https://github.com/ReactTraining/react-router) v4 sees to be very close to being released so I was interested in how hard the upgrade would be.
Easy, it seems - the new syntax includes a lot for JSX which is friendly and more flexible.

[>> More about React-Router v4](https://github.com/peter-mouland/react-lego/wiki/React-Router-v4)

#### React-router v4 Branches
 
 * [Add React-router v4 to Express](https://github.com/peter-mouland/react-lego/compare/universal...react-router-4)
 * [Add React-router v4 to Koa](https://github.com/peter-mouland/react-lego/compare/koa-wp2...koa-wp2-rr4)

## State-Management

### Redux

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

## Importing Assets

In the base branches, we have simply added the CSS into webpack `entry` array to get it to convert Scss into CSS.
these are some other ways to achieve more modular components:

[>> More about the different CSS methods](https://github.com/peter-mouland/react-lego/wiki/CSS)

### SVGs

 > Based on the `universal` branch. _[compare branches](https://github.com/peter-mouland/react-lego/compare/universal...svg)_

Using [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools) and [svg-inline-loader](https://github.com/sairion/svg-inline-loader) we are able to directly import SVGs into our JavaScript.
This has the added benefit of :

 * Reusing SVG files (without code duplication)
 * Keep SVGs inline and style them with CSS
 * Serverside rendering of SVG's

[>> More about importing SVGs](https://github.com/peter-mouland/react-lego/wiki/Importing-SVGs)

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
