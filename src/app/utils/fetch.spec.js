import Chance from 'chance';

import config from '../../config/environment';
import { fetchUrl } from './fetch';

let stubUrl;
let stubOptions;


const chance = new Chance();

describe('fetch', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url, options) => {
      stubUrl = url;
      stubOptions = options;
      return Promise.resolve({
        status: 200,
        text: jest.fn()
      });
    });
  });

  describe(' URL ', () => {
    it('should return url with localhost by default', (done) => {
      const endpoint = `/${chance.word()}`;
      fetchUrl(endpoint).then(() => {
        expect(stubUrl).toEqual(`http://localhost:${config.PORT}${endpoint}`);
        done();
      }).catch((e) => {
        done(e);
      });
    });
    it('should return given url if it contains double-slash', (done) => {
      const endpoint = `//${chance.word()}`;
      fetchUrl(endpoint).then(() => {
        expect(stubUrl).toEqual(endpoint);
        done();
      }).catch((e) => {
        done(e);
      });
    });

    it('should return request options with data', (done) => {
      const endpoint = chance.word();
      const data = chance.sentence();
      fetchUrl(endpoint, { data }).then(() => {
        expect(stubOptions.data).toEqual(data);
        done();
      }).catch((e) => {
        done(e);
      });
    });
  });
});
