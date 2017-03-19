_This version is currently being update for 2017.  The original react-lego, with older version of tech and upgrade paths, can be found [react-lego-2016](https://github.com/peter-mouland/react-lego-2016)_

# React Lego 2017 [![CircleCI](https://circleci.com/gh/peter-mouland/react-lego.svg?style=svg)](https://circleci.com/gh/peter-mouland/react-lego)

> The building blocks of a react app

This repo demonstrates how to plug in other technologies, one block at a time, into React.

### Hear me out!

The concept is to use GitHub's branch-comparison screens to quickly demo the code changes that are needed for *only* the technology you are interested in.

A client-side React app which is fully tested and production ready on the `master` branch.  
From Master, *Server-side Rendering (SSR)* has been added with  `Koa v2` (for `Express` see [react-lego-2016](https://github.com/peter-mouland/react-lego-2016)).  
Every other branch then adds one more technology, with the smallest possible changes.

All branches, have been setup with [continuous deployment](https://github.com/peter-mouland/react-lego/wiki/Continuous-Deployement).

[>> More about the react-lego concept](https://github.com/peter-mouland/react-lego/wiki)

## Technology to Add:

_All branches use babel v6, es2015, React v15.4, [react-router v4](https://github.com/reactjs/react-router), Webpack v2.2 unless otherwise stated_
 
 | category | upgrade path | Client-side App (kb) | comparator 1 | kb | comparator 2 |  kb | 
 | --- | --- | --- | --- | --- | --- | --- |
 | [Client-side Rendering](#client-side) | [React](#react) | 11kb (+ 215kb node_modules) | [Preact](#preact) | 16kb (+ 35kb)
 | [Server-side Rendering](#server-side-rendering-SSR) | [Koa v2](#koa-v2) | 10kb (+ 214kb) |  
 | [CSS](#css) | [CSS Imports](#css-imports)  | 10kb (+ 214kb) |   CSS Modules 
 | State Management | [Redux](#redux) | 12kb (+ 250kb) | 
 | State Management | [Async routes](#redux-with-promise-middleware) | 12kb (+ 252kb) | 
 | State Management | [Redux Dev Tools](#redux-dev-tools)
 | Assests | [Importing SVGs](#importing-svgs) |
 | Assests | Responsive Images with PNGs |
 | Data API | GraphQL
 
## Client-side

The client-side apps are production ready and fully tested, they both use the following :

 * [x] CSS ([Sass-loader](https://github.com/jtangelder/sass-loader), [Autoprefixer](https://github.com/postcss/autoprefixer))
 * [x] [tests](/tests/README.md) (unit, functional, end-to-end + smoke)
 * [x] Code linting with [eslint](http://eslint.org/) (CSS + JS linting)
 * [x] CI integration with [CircleCI](https://circleci.com/)
 * [x] Continuous deployment with [Heroku](http://www.heroku.com/)

*All* other branches include the above and are also production ready.

### React 

 > `master` branch 

### Preact

 > `preact` branch 
 >
 > [Compare Preact with React](https://github.com/peter-mouland/react-lego/compare/master...preact)

Because of [Ben Fletcher](https://github.com/bjfletcher) and [this tweet](https://twitter.com/bjfletcher/status/776481240065114112) I thought i'd give [Preact](https://github.com/developit/preact) a shot.

Turns out it was actually very easy!  After removing a few dependencies we swapped routers for [preact-router](https://github.com/developit/preact-router).

[>> More about adding Preact](https://github.com/peter-mouland/react-lego/wiki/Preact)

## Server-side Rendering (SSR)

### Koa v2

 > `ssr` branch
 >
 > [See code needed to add SSR](https://github.com/peter-mouland/react-lego/compare/master...ssr)

With Async/Await released in Node v7.6, Koa 2 is now live.  

## CSS

In the base branches, we have simply added the CSS into webpack `entry` array to get it to convert Scss into CSS.
these are some other ways to achieve more modular components:

[>> More about the different CSS methods](https://github.com/peter-mouland/react-lego/wiki/CSS)

### CSS Imports

 > `ssr-css` branch
 >
 > [See code needed to add CSS](https://github.com/peter-mouland/react-lego/compare/ssr...ssr-css)


Import your css into your component and use the class names as they are written.  
This method is the least obtrusive and feels most like traditional css.
You must manually take care of css scope using things like BEM or Smaccs.


## Redux
 
 > `ssr-css-redux` branch
 >
 > [See code needed to add redux](https://github.com/peter-mouland/react-lego/compare/ssr-css...ssr-css-redux)
 
[Redux](https://github.com/reactjs/react-redux) was added with data being hydrated on the server.

With Redux, the example app now has an API which can be called to return the required data.
This data is now formatted inside a reducer.

[>> More about adding Redux](https://github.com/peter-mouland/react-lego/wiki/Redux)


## Async routes

 > `ssr-css-redux-async` branch
 >
 > [See code needed to add async routes](https://github.com/peter-mouland/react-lego/compare/ssr-css-redux...ssr-css-redux-async)
 
This branch uses Promise middleware to allow you to make async requests on the server and hydrate your redux store before rendering the page.
The massive win here is that each container dictates what data it _needs_ while still on the server.

[>> More about adding Promise middleware](https://github.com/peter-mouland/react-lego/wiki/Redux-Promise-Middleware)

__________
** Something missing?  Please see [react-lego-2016](https://github.com/peter-mouland/react-lego-2016) or submit a feature request!**
__________

