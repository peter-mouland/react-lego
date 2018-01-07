import Chance from 'chance';

import config from '../../config/environment';
import { fetchGraphQL, fetchUrl } from './fetch';

let stubUrl;
let stubOptions;

const chance = new Chance();

describe('fetch', () => {
  describe(' URL ', () => {
    const mockFetch = jest.fn();

    beforeEach(() => {
      global.fetch = mockFetch.mockImplementation((url, options) => {
        stubUrl = url;
        stubOptions = options;
        return Promise.resolve({
          status: 200,
          text: jest.fn()
        });
      });
    });

    afterEach(() => {
      mockFetch.mockRestore();
    });

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

  describe(' graphQL ', () => {
    const mockFetch = jest.fn();
    let mockData;

    beforeEach(() => {
      mockData = `{"data": "${chance.word()}"}`;
      global.fetch = mockFetch.mockImplementation((url, options) => {
        stubUrl = url;
        stubOptions = options;
        return Promise.resolve({
          status: 200,
          text: jest.fn().mockReturnValue(mockData)
        });
      });
    });

    afterEach(() => {
      mockFetch.mockRestore();
    });

    it('should return request options', (done) => {
      const data = chance.sentence();
      fetchGraphQL(data).then(() => {
        expect(stubOptions.method).toEqual('POST');
        expect(stubOptions.headers['Content-Type']).toEqual('application/graphql');
        done();
      }).catch((e) => {
        done(e);
      });
    });

    it('should return request options with data', (done) => {
      const data = chance.sentence();
      fetchGraphQL(data).then(() => {
        expect(stubOptions.body).toEqual(data);
        done();
      }).catch((e) => {
        done(e);
      });
    });

    it('should return graphQL request options with params', (done) => {
      const data = chance.sentence();
      const params = chance.sentence();
      fetchGraphQL(data, params).then(() => {
        expect(stubOptions.params).toEqual(params);
        done();
      }).catch((e) => {
        done(e);
      });
    });
  });
});
