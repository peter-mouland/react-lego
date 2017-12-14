import React from 'react';
import { mount } from 'enzyme';

import Root from '../../../src/app/Root';
import { findRoute } from '../../../src/app/routes';

const context = {}

describe('Homepage Route', function () {

  beforeAll(() => {
    this.wrapper = mount(<Root location={ '/' } context={context} />);
  });

  describe(`should contain  markup`, () => {
    it(`should contain the Homepage container`, () => {
      expect(this.wrapper.find('#homepage').exists()).toBe(true);
    });

    it(`should contain the 'main' layout`, () => {
      expect(this.wrapper.find('.layout.layout--main').exists()).toBe(true);
      expect(this.wrapper.find('.layout__nav').exists()).toBe(true);
      expect(this.wrapper.find('.layout__content').exists()).toBe(true);
      expect(this.wrapper.find('.layout__footer').exists()).toBe(true);
    });

    it('Should contain a title', () => {
      expect(document.title).toBe(findRoute('homepage').meta.title);
    });

    it('should have a nav', () => {
      expect(this.wrapper.find('nav').exists()).toBe(true);
    });

    it('should have a footer', () => {
      expect(this.wrapper.find('footer').exists()).toBe(true);
    });

  });
});
