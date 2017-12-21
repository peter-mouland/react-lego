import React from 'react';
import { shallow } from 'enzyme';

import Homepage from './Homepage';

const baseProps = {};

describe('Settings Container', () => {
  it('should have an id of homepage', () => {
    const wrapper = shallow(<Homepage {...baseProps} />);
    expect(wrapper.at(0).props().id).toBe('homepage');
  });
  //  unit testing goes here
});
