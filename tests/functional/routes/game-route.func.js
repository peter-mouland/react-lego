/* global jest, describe, expect, it, test, beforeAll, afterAll, beforeEach, afterEach */
import React from 'react';
import { mount, shallow } from 'enzyme';
import fs from 'fs';

import Game, { Loading } from '../../../src/app/components/Game/Game';
import Question from '../../../src/app/components/Question/Question';
import Answer from '../../../src/app/components/Answer/Answer';
import Root from '../../../src/app/Root';
import { findRoute } from '../../../src/app/routes';
import { json } from '../../../src/app/utils';

const fixtures = JSON.parse(fs.readFileSync(__dirname + '/../fixtures/card-80.json', 'utf8'));
const context = {}

let wrapper;
let jsonGetSpy;

describe('Game Route', function () {
  describe(`should contain  markup`, () => {

    beforeAll(() => {
      wrapper = mount(<Root location={ '/game/' } context={context} />);
    });

    afterAll(() => {
      wrapper.unmount();
    });

    it(`should contain the Game container`, () => {
      expect(wrapper.find(Game).exists()).toBe(true);
    });

    it(`should contain the 'main' layout`, () => {
      expect(wrapper.find('.layout.layout--main').exists()).toBe(true);
      expect(wrapper.find('.layout__nav').exists()).toBe(true);
      expect(wrapper.find('.layout__content').exists()).toBe(true);
      expect(wrapper.find('.layout__footer').exists()).toBe(true);
    });

    it('Should contain a title', () => {
      expect(document.title).toBe(findRoute('game').meta.title);
    });

    it('should have a nav', () => {
      expect(wrapper.find('nav').exists()).toBe(true);
    });

    it('should have a footer', () => {
      expect(wrapper.find('footer').exists()).toBe(true);
    });

  });

  describe(`be able to deal a hand`, () => {

    const promise = Promise.resolve(fixtures);

    beforeAll(() => {
      jsonGetSpy = jest.spyOn(json, 'get').mockReturnValue(promise)
    });

    beforeEach(() => {
      wrapper = mount(<Root location={ '/game/' } context={context}  />);
    });

    afterEach(() => {
      wrapper.unmount();
    });

    afterAll(() => {
      jsonGetSpy.mockReset();
      jsonGetSpy.mockRestore();
    });

    it(`is not loading before it gets mounted`, () => {
        wrapper = shallow(<Root location={ '/game/' } context={context}  />);
        expect(wrapper.find(Loading).exists()).toBe(false);
    });

    it(`starts loading as soon as the page is mounted`, () => {
        expect(wrapper.find(Loading).exists()).toBe(true);
    });

    it(`removes loading once the json results are returned`, () => {
      return promise.then(() => {
        wrapper.update();
        expect(wrapper.find(Loading).exists()).toBe(false);
      })
    });

    it(`renders the question`, () => {
      return promise.then(() => {
        wrapper.update();
        expect(wrapper.find(Question).exists()).toBe(true);
      })
    });

    it(`passes the json response to the Question`, () => {
      return promise.then(() => {
        wrapper.update();
        const questionComponent = wrapper.find(Question);
        expect(questionComponent.props().cards).toEqual([fixtures, fixtures]);
      })
    });

    it(`does not render the answer by default`, () => {
      const answerComponent = wrapper.find(Answer);
      expect(answerComponent.exists()).toBe(false);
    });

    it(`renders the answer after the 'view answer' button is clicked`, () => {
      return promise.then(() => {
        wrapper.update();
        wrapper.find('button.game__btn--show-answer').simulate('click');
        wrapper.update();
        const answerComponent = wrapper.find(Answer);
        expect(answerComponent.exists()).toBe(true);
        expect(answerComponent.props().cards).toEqual([fixtures, fixtures]);
      })
    });
  });
});
