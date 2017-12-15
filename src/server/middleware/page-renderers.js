import React from 'react';
import { renderToString } from 'react-dom/server';
import debug from 'debug';

import Error500 from '../templates/Error500';

const log = debug('base:page-renderers');

export default function pageRenderers() {
  return async (ctx, next) => {
    ctx.renderPageToString = function renderPageToString(page) {
      return `<!doctype html>${renderToString(page)}`;
    };
    ctx.render500 = function render500(e) {
      log('render500', e);
      ctx.response.status = 500;
      return ctx.renderPageToString(<Error500 />);
    };
    await next();
  };
}
