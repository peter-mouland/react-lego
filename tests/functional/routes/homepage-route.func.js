import React from 'react';
import { mount } from 'enzyme';

import Root from '../../../src/app/Root';
import { findRoute } from '../../../src/app/routes';

const context = {}
let wrapper

describe('Homepage Route', function () {

  beforeAll(() => {
    wrapper = mount(<Root location={ '/' } context={context} />);
  });

  afterAll(() => {
    wrapper.unmount()
  })

  describe(`should contain  markup`, () => {
    it(`should contain the Homepage container`, () => {
      expect(wrapper.find('#homepage').exists()).toBe(true);
    });

    it(`should contain the 'main' layout`, () => {
      expect(wrapper.find('.layout.layout--main').exists()).toBe(true);
      expect(wrapper.find('.layout__nav').exists()).toBe(true);
      expect(wrapper.find('.layout__content').exists()).toBe(true);
      expect(wrapper.find('.layout__footer').exists()).toBe(true);
    });

    it('Should contain a title', () => {
      expect(document.title).toBe(findRoute('homepage').meta.title);
    });

    it('should have a nav', () => {
      expect(wrapper.find('nav').exists()).toBe(true);
    });

    it('should have a footer', () => {
      expect(wrapper.find('footer').exists()).toBe(true);
    });

  });
});
