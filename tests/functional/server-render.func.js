import { Route } from 'react-router';
import { sinon, React } from '../support/test.helper';
import supertest from 'supertest';
import * as routes from '../../src/app/routes';
import server from '../../src/server/server';

const AppRoute = ({ children }) => <div><h2>App</h2>{children}</div>;
const TestRoute = () => <div>Test Route</div>;
const AnotherRoute = () => <div>Another Route</div>;
const RedirectRoute = () => <div>Never resolved</div>;
const NotFound = () => <div>Not found!</div>;
const BrokenClientRoute = () => {
  throw new Error('new error!');
};
const ReactRoutes = (
  <Route path="/" component={AppRoute}>
    <Route path="tests" component={TestRoute} />
    <Route path="another" component={AnotherRoute} />
    <Route path="broken-client-route" component={BrokenClientRoute} />
    <Route path="redirect" component={RedirectRoute}
      onEnter={(_, redirect) => redirect('/tests/')} />
    <Route path="*" component={NotFound} />
  </Route>
);

describe('Server', function () {
  const assets = {
    javascript: ["/app.js"],
    styles: ["/app.css"]
  };

  before(() => {
    sinon.stub(routes, 'makeRoutes').returns(ReactRoutes);
  });

  after(() => {
    routes.makeRoutes.restore();
  });

  it('should render NotFound with 404 status when not found', (done) => {
    supertest(server)
      .get('/route-that-doesnt-exist/')
      .expect(404, /Not found/)
      .end(done);
  });

  it('should render the ErrorPage when a server route throws', (done) => {
    supertest(server)
      .get('/broken-client-route/')
      .expect(500, /Man down!/)
      .end(done);
  });

  it('should render the ErrorPage when a react route throws', (done) => {
    supertest(server)
      .get('/broken-client-route/')
      .expect(500, /Man down!/)
      .end(done);
  });

  it('Should render a html page', (done) => {
    supertest(server)
      .get('/')
      .expect(200)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(/<!doctype html>/)
      .expect(/<html lang="en"/)
      .expect(/<link href="\/app.css/)
      .expect(/<script src="\/app.js/)
      .end(done);
  });

  it('Should gzip static assets', (done) => {
    return supertest(server)
      .get('/app.js')
      .expect(200)
      .expect('Content-Encoding', 'gzip')
      .end(done);
  });

  it('should render react routes from `makeRoutes()`', (done) => {
    supertest(server)
      .get('/tests/')
      .expect(200)
      // can't test complete match because of generated data-reactids
      .expect(/App/)
      .expect(/Test Route/)
      .end(done);
  });

  it('should support react route redirects', (done) => {
    supertest(server)
      .get('/redirect/')
      .expect(302)
      .expect('location', '/tests/')
      .end(done);
  });

});
