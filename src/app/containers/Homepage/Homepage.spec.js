import { expect } from 'chai';
import { h } from 'preact';
import { shallow } from 'enzyme';

import Homepage from './Homepage';

const baseProps = {};

describe('Settings Container', () => {
  it('should have an id of homepage', () => {
    const wrapper = shallow(<Homepage { ...baseProps } />);
    expect(wrapper.at(0)).to.have.prop('id', 'homepage');
  });
  //  unit testing goes here
});
