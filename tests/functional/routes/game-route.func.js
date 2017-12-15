/* global jest, describe, expect, it, test, beforeAll, afterAll, beforeEach, afterEach */
import React from 'react';
import { mount, shallow } from 'enzyme';
import fs from 'fs';

import Game, { Loading } from '../../../src/app/components/Game/Game';
import Question from '../../../src/app/components/Question/Question';
import Answer from '../../../src/app/components/Answer/Answer';
import Root from '../../../src/app/Root';
import { findRoute } from '../../../src/app/routes';

const mockFixtures = JSON.parse(fs.readFileSync(__dirname + '/../fixtures/card-80.json', 'utf8'));
const context = {}
let wrapper;

// prevent real API calls going out
jest.mock('../../../src/app/utils/fetch', () => ({
  getJSON: () => Promise.resolve({
    cards: [mockFixtures, mockFixtures], question: 'question', answerId: 'answerId', answer: 'answer'
  }),
}));

describe('Game Route', function () {
  beforeEach(() => {
    wrapper = mount(<Root location={ '/game/' } context={context} />);
  })

  afterEach(() => {
    wrapper.unmount();
  });

  describe(`should contain  markup`, () => {
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
    it(`is not loading before it gets mounted`, () => {
        wrapper = shallow(<Root location={ '/game/' } context={context}  />);
        expect(wrapper.find(Loading).exists()).toBe(false);
    });

    it.skip(`starts loading as soon as the page is mounted`, () => {
        expect(wrapper.find(Loading).exists()).toBe(true);
    });

    it(`removes loading once the json results are returned`, () => {
      wrapper.update();
      expect(wrapper.find(Loading).exists()).toBe(false);
    });

    it(`renders the question`, () => {
      wrapper.update();
      expect(wrapper.find(Question).exists()).toBe(true);
    });

    it(`passes the json response to the Question`, () => {
      wrapper.update();
      const questionComponent = wrapper.find(Question);
      expect(questionComponent.props().cards[0].__typename).toEqual("Card");
      expect(questionComponent.props().cards[1].__typename).toEqual("Card");
      expect(questionComponent.props().cards[0]).toEqual(expect.objectContaining(mockFixtures));
      expect(questionComponent.props().cards[1]).toEqual(expect.objectContaining(mockFixtures));
    });

    it(`does not render the answer by default`, () => {
      wrapper.update();
      const answerComponent = wrapper.find(Answer);
      expect(answerComponent.exists()).toBe(false);
    });

    it(`renders the answer after the 'view answer' button is clicked`, () => {
      wrapper.update();
      wrapper.find('button.game__btn--show-answer').simulate('click');
      wrapper.update();
      const answerComponent = wrapper.find(Answer);
      expect(answerComponent.exists()).toBe(true);
      expect(answerComponent.props().cards[0].__typename).toEqual("Card");
      expect(answerComponent.props().cards[1].__typename).toEqual("Card");
      expect(answerComponent.props().cards[0]).toEqual(expect.objectContaining(mockFixtures));
      expect(answerComponent.props().cards[1]).toEqual(expect.objectContaining(mockFixtures));
    });
  });
});
