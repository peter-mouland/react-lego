import React from 'react';
import { shallow } from 'enzyme';

import Game from './Game';

const mockFixtures = require('../../../../tests/fixtures/card-80.js');

const baseProps = {};
const mockText = jest.fn();

describe('Game Container', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 200,
        text: mockText.mockReturnValue(() => mockFixtures())
      }));
  });

  it('should have an id of game', () => {
    const wrapper = shallow(<Game {...baseProps} />, { disableLifecycleMethods: true });
    expect(wrapper.at(0).props().id).toBe('game');
  });
  //  unit testing goes here
});
