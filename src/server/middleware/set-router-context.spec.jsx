import React from 'react';
import { Route } from 'react-router-dom';
import Chance from 'chance';

const chance = new Chance();
const fakeMakeRoutes = jest.fn();
const fakeGetRoutesConfig = jest.fn();
let middleWare;
let ctx;

const AppRoute = () => <div><h2>fake App Route</h2>children</div>;
const ReactRoutes = (path = '/') => <Route path={path} exact component={AppRoute} />;

const setupMocks = (mockRoutes) => {
  jest.doMock('../../app/routes', mockRoutes);
  const setRouterContext = require('./set-router-context'); // eslint-disable-line global-require
  middleWare = setRouterContext();
};

describe('set-router-context', () => {
  beforeEach(() => {
    ctx = {
      request: {
        url: chance.word()
      },
      response: chance.word()
    };
    jest.resetModules();
  });

  afterEach(() => {
    fakeMakeRoutes.mockReset();
    fakeMakeRoutes.mockRestore();
    fakeGetRoutesConfig.mockReset();
    fakeGetRoutesConfig.mockRestore();
  });

  it('sets ctx.markup based on the req.url', (done) => {
    setupMocks(() => ({
      getRoutesConfig: fakeGetRoutesConfig.mockImplementation(() =>
        [{ path: ctx.request.url, component: {} }]),
      makeRoutes: fakeMakeRoutes.mockImplementation(() => ReactRoutes(ctx.request.url))
    }));
    return middleWare(ctx, () => {
      expect(ctx.markup).toContain('fake App Route</h2>');
      done();
    });
  });

  it('sets ctx.status = 200 based on if the req.url is matched', (done) => {
    setupMocks(() => ({
      getRoutesConfig: fakeGetRoutesConfig.mockImplementation(() =>
        [{ path: ctx.request.url, component: {} }]),
      makeRoutes: fakeMakeRoutes.mockImplementation(() => ReactRoutes(ctx.request.url))
    }));
    return middleWare(ctx, () => {
      expect(ctx.status).toBe(200);
      done();
    });
  });

  it('sets ctx.status = 404 based on if the req.url is not matched', (done) => {
    setupMocks(() => ({
      getRoutesConfig: fakeGetRoutesConfig.mockImplementation(() =>
        [{ path: chance.word(), component: {} }]),
      makeRoutes: fakeMakeRoutes.mockImplementation(() => ReactRoutes())
    }));
    return middleWare(ctx, () => {
      expect(ctx.status).toBe(404);
      done();
    });
  });
});
