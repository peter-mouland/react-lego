import React from 'react';
import { shallow } from 'enzyme';

import Game from './Game';

const baseProps = {};

describe('Game Container', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 200,
        text: jest.fn()
      }));
  });

  it('should have an id of game', () => {
    const wrapper = shallow(<Game {...baseProps} />);
    expect(wrapper.at(0).props().id).toBe('game');
  });
  //  unit testing goes here
});
