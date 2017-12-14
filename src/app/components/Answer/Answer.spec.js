import Chance from 'chance';
import React from 'react';
import { shallow } from 'enzyme';

import Answer, { AnswerOption } from './Answer';

const chance = new Chance();
const fakeCard = () => ({
  url: chance.url()
});
let baseProps = {};

describe('Answer Component', () => {
  it('is visible if showAnswer is passed', () => {
    const card1 = fakeCard();
    const card2 = fakeCard();
    baseProps = { cards: [card1, card2], showAnswer: true };
    const wrapper = shallow(<Answer { ...baseProps } />);
    expect(wrapper.get(0).props.className).toContain('visible');
  });

  it('is hidden if showAnswer isn\'t passed', () => {
    const card1 = fakeCard();
    const card2 = fakeCard();
    baseProps = { cards: [card1, card2], showAnswer: false };
    const wrapper = shallow(<Answer { ...baseProps } />);
    expect(wrapper.get(0).props.className).toContain('hidden');
  });

  it('2 answer options, passing in a card to each', () => {
    const card1 = fakeCard();
    const card2 = fakeCard();
    baseProps = { cards: [card1, card2], showAnswer: true };
    const wrapper = shallow(<Answer { ...baseProps } />);
    expect(wrapper.find(AnswerOption).get(0).props).toEqual({ card: card1, isAnswer: false });
    expect(wrapper.find(AnswerOption).get(1).props).toEqual({ card: card2, isAnswer: false });
  });

  it('sets isAnswer for an answerOptions with matching id/url', () => {
    const card1 = fakeCard();
    const card2 = fakeCard();
    baseProps = { cards: [card1, card2], answerId: card2.url, showAnswer: false };
    const wrapper = shallow(<Answer { ...baseProps } />);
    expect(wrapper.find(AnswerOption).get(0).props.isAnswer).toBe(false);
    expect(wrapper.find(AnswerOption).get(1).props.isAnswer).toBe(true);
  });
});


describe('AnswerOption Component', () => {
  it('hightlights the options using class answer-option--answer', () => {
  });

  it('doesnt hightlight the option', () => {
  });

  it('displays a key for each item', () => {
  });

  it('displays a value for each item', () => {
  });
});
