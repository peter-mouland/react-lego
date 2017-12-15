import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import path from 'path';
import fs from 'fs-extra';
import supertest from 'supertest';

import { TESTS, DIST } from '../../src/config/paths';
import mapWebpackAssets from '../../src/server/utils/mapWebpackAssets';

const fixtureAssets = require('./fixtures/webpack-assets.json');
const fakeMakeRoutes = jest.fn();
const fakeGetRoutesConfig = jest.fn();
let server
const assets = mapWebpackAssets(fixtureAssets);

const AppRoute = ({ children }) => <div><h2>App</h2>{children}</div>;
const TestRoute = () => <div>Test Route</div>;
const AnotherRoute = () => <div>Another Route</div>;
const RedirectRoute = (props) => <Redirect to={{ pathname: '/tests/', state: { from: props.location } }} />;
const NotFound = () => <div>Not found!</div>;
const BrokenClientRoute = () => {
  throw new Error('new error!');
};
const ReactRoutes = () => (
  <AppRoute >
    <Switch>
      <Route path="/" exact component={AppRoute} />
      <Route path="/tests/" component={TestRoute} />
      <Route path="/another/" component={AnotherRoute} />
      <Route path="/broken-client-route/" component={BrokenClientRoute} />
      <Route path="/redirect/" render={RedirectRoute} />
      <Route component={NotFound} />
    </Switch>
  </AppRoute>
);

const setupMocks = (mockRoutes) => {
  jest.doMock('../../src/app/routes', mockRoutes);
  server = require('../../src/server/server') // eslint-disable-line
};


describe('Server', function () {
  beforeEach(() => {
    jest.resetModules();
    setupMocks(() => ({
      getRoutesConfig: fakeGetRoutesConfig.mockImplementation(() =>
        [
          {
            exact: true,
            path: '/',
            component: AppRoute
          },
          {
            path: '/tests/',
            component: TestRoute
          },
          {
            path: '/redirect/',
            component: RedirectRoute
          }
        ]
      ),
      makeRoutes: fakeMakeRoutes.mockImplementation(() => ReactRoutes())
    }));
  });

  afterEach(() => {
    fakeMakeRoutes.mockReset();
    fakeMakeRoutes.mockRestore();
    fakeGetRoutesConfig.mockReset();
    fakeGetRoutesConfig.mockRestore();
  });

  it('should render NotFound with 404 status when not found', (done) => {
    supertest(server(assets).callback())
      .get('/route-that-doesnt-exist/')
      .expect(404, /Not found/)
      .end(done);
  });

  it('should render the ErrorPage when a server route throws', (done) => {
    supertest(server(assets).callback())
      .get('/broken-client-route/')
      .expect(500, /Man down!/)
      .end(done);
  });

  it('Should render a html page', (done) => {
    supertest(server(assets).callback())
      .get('/')
      .expect(200)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(/<!doctype html>/)
      .expect(/<html lang="en"/)
      .expect(/<link href="\/app-/)
      .expect(/<script src="\/vendor-/)
      .expect(/<script src="\/app-/)
      .end(done);
  });

  it('Should gzip koaStatic assets', (done) => {
    const testStatic = path.join(TESTS, 'functional','fixtures','public');
    fs.copySync(path.join(testStatic), DIST, { recursive: true });
    supertest(server(assets, testStatic).callback())
      .get(assets.javascript[0])
      .expect(200)
      .expect('Content-Encoding', 'gzip')
      .end(()=>{
        // remove only files that were added
        // fs.removeSync(DIST);
        done();
      });
  });

  it('should render react routes from `makeRoutes()`', (done) => {
    supertest(server(assets).callback())
      .get('/tests/')
      .expect(200)
      // can't test complete match because of generated data-reactids
      .expect(/App/)
      .expect(/Test Route/)
      .end(done);
  });

  it.skip('should support react route redirects', (done) => {
    supertest(server(assets).callback())
      .get('/redirect/')
      .expect(301)
      .expect('location', '/tests/')
      .end(done);
  });
});
