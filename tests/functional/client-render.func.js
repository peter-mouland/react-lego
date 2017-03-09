import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import Root from '../../src/app/Root';
import Homepage from '../../src/app/containers/Homepage/Homepage';
import NotFound from '../../src/app/containers/NotFound/NotFound';
import Game from '../../src/app/containers/Game/Game';

describe('Client Render', function () {
  it('Should render the Homepage', () => {
    this.wrapper = mount(<Root location={ '/' } />);
    expect(this.wrapper.find(Homepage).length).to.equal(1);
  });

  describe('404', () => {
    it('should render the 404 route', () => {
      this.wrapper = mount(<Root location={ '/notFound' } />);
      expect(this.wrapper.find(NotFound).length).to.equal(1);
      expect(this.wrapper.find('#not-found').length).to.equal(1);
    });
  });

  describe('game', () => {
    it('should render the game page', () => {
      this.wrapper = mount(<Root location={ "/game/" }/>);
      expect(this.wrapper.find(Game).length).to.equal(1);
      expect(this.wrapper.find('#game').length).to.equal(1);
    });
  });
});
