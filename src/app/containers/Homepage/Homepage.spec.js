import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';

import { WrappedComponent as Homepage } from './Homepage';

const baseProps = {};

describe('Homepage Container', () => {
  it('should have an id of homepage', () => {
    const wrapper = shallow(<Homepage { ...baseProps } />);
    expect(wrapper.at(0)).to.have.prop('id', 'homepage');
  });
  //  unit testing goes here
});
