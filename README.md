# Apollo Error Reduced Test Case

This app has no graphQL back-end.  Instead, this was a demo/spike into how to use apollo-link-state locally for state-management.

It would also be preferable to get the server to do the data-fetching.

## Problem:

Client-side rendering of apollo-link-state seems to be fine, but I am unable to get the server to render the components with the data. 

## Files of note

 * Container connected to apollo-link-state: [src/app/containers/Homepage.js](https://github.com/peter-mouland/react-lego/blob/apollo-ssr-error/src/app/containers/Homepage.js)
 * Schema: [src/app/schema/schema.js](https://github.com/peter-mouland/react-lego/blob/apollo-ssr-error/src/app/schema/schema.js)
 * SSR Rendering of link-state: [src/server/middleware/set-router-context.js](https://github.com/peter-mouland/react-lego/blob/apollo-ssr-error/src/server/middleware/set-router-context.js)
