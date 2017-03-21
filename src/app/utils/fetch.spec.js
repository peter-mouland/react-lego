import { expect, sinon } from '../../../tests/config/test.helper';
import config from '../../config/environment';

import Chance from 'chance';
import proxyquire from 'proxyquire';

const chance = new Chance();
const sandbox = sinon.sandbox.create();
let axiosStub;
let axiosStubArguments;
let fetchLib;
let fetch;
let json;

describe('fetch', ()=>{

  beforeEach(() => {
    axiosStub = ({ ...args }) => {
      axiosStubArguments = args;
      return Promise.resolve({ status: 200 });
    };
    fetchLib = proxyquire('./fetch', {
      'axios': axiosStub
    });
    fetch = fetchLib.fetch;
    json = fetchLib.json;
  });

  afterEach(()=>{
    sandbox.restore();
  });

  context(' URL ', ()=>{
    it('should return url with localhost by default', (done) => {
      const endpoint = '/' + chance.word();
      fetch.url(endpoint).then(() => {
        expect(axiosStubArguments).to.deep.equal({
          url: `http://localhost:${config.PORT}${endpoint}`
        });
        done();
      }).catch((e) => {
        done(e);
      })
    });
    it('should return given url if it contains double-slash', (done) => {
      const endpoint = `//${chance.word()}`;
      fetch.url(endpoint).then(() => {
        expect(axiosStubArguments).to.deep.equal({
          url: endpoint
        });
        done();
      }).catch((e) => {
        done(e);
      });
    });

    it('should return request options with data', (done) => {
      const endpoint = chance.word();
      const data = chance.sentence();
      fetch.url(endpoint, { data }).then(()=>{
        expect(axiosStubArguments.data).to.equal(data);
        done();
      }).catch((e)=>{
        done(e);
      })
    });
  });
  context(' graphQL ', ()=>{
    it('should return request options', (done) => {
      fetch.graphQL().then(() => {
        expect(axiosStubArguments.method).to.equal('POST')
        expect(axiosStubArguments.headers['Content-Type']).to.equal('application/graphql')
        done()
      }).catch((e) => {
        done(e)
      })
    });

    it('should return request options with local graphQL endpoint', (done) => {
      fetch.graphQL().then(() => {
        expect(axiosStubArguments.url).to.equal("http://localhost:3000/graphql");
        done()
      }).catch((e) => {
        done(e)
      })
    });

    it('should return request options with data', (done) => {
      const data = chance.sentence();
      fetch.graphQL(data).then(()=>{
        expect(axiosStubArguments.data).to.equal(data)
        done()
      }).catch((e)=>{
        done(e)
      })
    });

    it('should return graphQL request options with params', (done) => {
      const data = chance.sentence();
      const params = chance.sentence();
      fetch.graphQL(data, params).then(()=>{
        expect(axiosStubArguments.params).to.equal(params)
        done()
      }).catch((e)=>{
        done(e)
      })
    });

  });
});
