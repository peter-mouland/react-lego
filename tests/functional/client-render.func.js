import { mount, expect } from '../support/test.helper';
import { history, router } from '../../src/client-entry';
import Homepage from '../../src/app/containers/Homepage/Homepage';

describe('Client Render', function () {
  beforeEach(() => {
    this.wrapper = mount(router);
    history.push('/');
  });

  afterEach(() => {
    this.wrapper.unmount();
  });

  it('Should render the Homepage', () => {
    expect(this.wrapper.find(Homepage).length).to.equal(1);
  });

  describe('404', () => {
    it('should render the 404 route', () => {
      history.push('/not-found');
      expect(this.wrapper.find('#not-found').length).to.equal(1);
    });
  });

  describe('search', () => {
    it('should render the search page', () => {
      history.push('/search');
      expect(this.wrapper.find('#search').length).to.equal(1);
    });
  });
});
