import { React, mount, expect } from '../support/test.helper';
import Root, { history } from '../../src/app/Root';
import Homepage from '../../src/app/containers/Homepage/Homepage';

describe('Client Render', function () {
  beforeEach(() => {
    this.wrapper = mount(<Root/>);
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

  describe('game', () => {
    it('should render the game page', () => {
      history.push('/game/');
      expect(this.wrapper.find('#game').length).to.equal(1);
    });
  });
});
