import Chance from 'chance';

import config from '../../config/environment';
import { fetch } from './fetch';

let axiosStubArguments;
jest.mock('axios', () => (args) => {
  axiosStubArguments = args;
  return Promise.resolve({ status: 200 });
});

const chance = new Chance();

describe('fetch', () => {
  describe(' URL ', () => {
    it('should return url with localhost by default', (done) => {
      const endpoint = `/${chance.word()}`;
      fetch.url(endpoint).then(() => {
        expect(axiosStubArguments).toEqual({
          url: `http://localhost:${config.PORT}${endpoint}`
        });
        done();
      }).catch((e) => {
        done(e);
      });
    });
    it('should return given url if it contains double-slash', (done) => {
      const endpoint = `//${chance.word()}`;
      fetch.url(endpoint).then(() => {
        expect(axiosStubArguments).toEqual({
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
      fetch.url(endpoint, { data }).then(() => {
        expect(axiosStubArguments.data).toEqual(data);
        done();
      }).catch((e) => {
        done(e);
      });
    });
  });
});
