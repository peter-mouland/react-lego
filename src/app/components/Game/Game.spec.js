import React from 'react';
import { shallow } from 'enzyme';

import Game from './Game';

const baseProps = {};

describe('Game Container', () => {
  it('should have an id of game', () => {
    const wrapper = shallow(<Game { ...baseProps } />);
    expect(wrapper.at(0).props().id).toBe('game');
  });
  //  unit testing goes here
});
