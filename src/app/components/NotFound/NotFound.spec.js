import React from 'react';
import { shallow } from 'enzyme';

import NotFound from './NotFound';
import { copy } from './notFound-copy';

describe('NotFound', () => {
  it('should render with an id', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find('#not-found')).toHaveLength(1);
  });

  it('should have a title and blurb', () => {
    const wrapper = shallow(<NotFound />);
    const title = wrapper.find('h2');
    expect(title.text()).toBe(copy.title);
    expect(wrapper.text()).toContain(copy.blurb);
  });
});
