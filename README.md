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

### What else the Base React app have?

It is production ready and fully tested :

 * [x] CSS ([Sass-loader](https://github.com/jtangelder/sass-loader), [Autoprefixer](https://github.com/postcss/autoprefixer))
 * [x] [tests](/tests/README.md) (unit, functional, end-to-end + smoke)
 * [x] Code linting with [eslint](http://eslint.org/) (CSS + JS linting)
 * [x] CI integration with [CircleCI](https://circleci.com/)
 * [x] Continuous deployment with [Heroku](http://www.heroku.com/)

*All* other branches include the above and build on this base.

## Technology to Add:

_All branches use [babel v6](https://github.com/babel/babel), es2015, [React v15.4](https://github.com/facebook/react), [react-router v4](https://github.com/reactjs/react-router), [Webpack v2.2](https://github.com/webpack/webpack) unless otherwise stated_
 
The `Code changes` column is where you go if you want to see how the code changed from the previous branch.
 This is a great place to see how to do it yourself.
 
 | Category | New Tech | Code changes | Client-side App (kb) | Comparator | kb |  |
 | --- | --- | --- | --- | --- | --- | --- | 
 | Client-side Rendering | [React](https://github.com/peter-mouland/react-lego/tree/master/) | - | 11kb (+ 215kb node_modules) | Preact > [Preact code vs React](https://github.com/peter-mouland/react-lego/compare/master...preact) | 16kb (+ 35kb) | [>> More about adding Preact](https://github.com/peter-mouland/react-lego/wiki/Preact)
 | Server-side Rendering | [Koa v2](https://github.com/peter-mouland/react-lego/tree/ssr) | [add SSR](https://github.com/peter-mouland/react-lego/compare/master...ssr) | 10kb (+ 214kb) |  
 | CSS | [CSS Imports](https://github.com/peter-mouland/react-lego/tree/ssr-css)  | [add CSS](https://github.com/peter-mouland/react-lego/compare/ssr...ssr-css)| 10kb (+ 214kb) |   CSS Modules  | | [>> More about adding CSS](https://github.com/peter-mouland/react-lego/wiki/CSS) |
 | State Management | [Redux](https://github.com/peter-mouland/react-lego/tree/ssr-css-redux) | [add redux](https://github.com/peter-mouland/react-lego/compare/ssr-css...ssr-css-redux)| 12kb (+ 250kb) |  | | [>> More about adding Redux](https://github.com/peter-mouland/react-lego/wiki/Redux) |
 | State Management | [Async routes](https://github.com/peter-mouland/react-lego/tree/ssr-css-redux-async) | [add async routes](https://github.com/peter-mouland/react-lego/compare/ssr-css-redux...ssr-css-redux-async) | 12kb (+ 252kb) |  | | [>> More about adding Promise middleware](https://github.com/peter-mouland/react-lego/wiki/Redux-Promise-Middleware)
 | State Management | Redux Dev Tools
 | Assets | Importing SVGs |
 | Assets | Responsive Images with PNGs |
 | Data API | [GraphQL](https://github.com/peter-mouland/react-lego/tree/ssr-css-redux-async-graphql) |  [add GraphQL](https://github.com/peter-mouland/react-lego/compare/ssr-css-redux-async...ssr-css-redux-async-graphql) | 12kb (+ 253kb) |
 
 
## What else ?

I have a few articles that may be interesting to read covering all the branches in this repo: [>> wiki](https://github.com/peter-mouland/react-lego/wiki)

__________
** Something missing?  Please see [react-lego-2016](https://github.com/peter-mouland/react-lego-2016) or submit a feature request!**
__________

