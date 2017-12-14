import React from 'react';
import { mount } from 'enzyme';

import Root from '../../src/app/Root';
import Homepage from '../../src/app/components/Homepage/Homepage';
import NotFound from '../../src/app/components/NotFound/NotFound';
import Game from '../../src/app/components/Game/Game';

const context = {}

describe('Client Render', function () {
  it('Should render the Homepage', () => {
    this.wrapper = mount(<Root location={ '/' } context={context} />);
    expect(this.wrapper.find(Homepage).length).toBe(1);
  });

  describe('404', () => {
    it('should render the 404 route', () => {
      this.wrapper = mount(<Root location={ '/notFound' } context={context} />);
      expect(this.wrapper.find(NotFound).length).toBe(1);
      expect(this.wrapper.find('#not-found').length).toBe(1);
    });
  });

  describe('game', () => {
    it('should render the game page', () => {
      this.wrapper = mount(<Root location={ "/game/" } context={context} />);
      expect(this.wrapper.find(Game).length).toBe(1);
      expect(this.wrapper.find('#game').length).toBe(1);
    });
  });
});
