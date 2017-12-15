import React from 'react';
import { mount } from 'enzyme';
import fs from 'fs';

import Root from '../../src/app/Root';
import Homepage from '../../src/app/components/Homepage/Homepage';
import NotFound from '../../src/app/components/NotFound/NotFound';
import Game from '../../src/app/components/Game/Game';

let wrapper;
const context = {}
const mockFixtures = JSON.parse(fs.readFileSync(__dirname + '/fixtures/card-80.json', 'utf8'));

// prevent real API calls going out
jest.mock('../../src/app/utils/fetch', () => ({
  getJSON: () => Promise.resolve({
    cards: [mockFixtures, mockFixtures], question: 'question', answerId: 'answerId', answer: 'answer'
  }),
}));

describe('Client Render', function () {
  afterEach(() => {
    wrapper.unmount()
  })

  it('Should render the Homepage', () => {
    wrapper = mount(<Root location={ '/' } context={context} />);
    expect(wrapper.find(Homepage).length).toBe(1);
  });

  describe('404', () => {
    it('should render the 404 route', () => {
      wrapper = mount(<Root location={ '/notFound' } context={context} />);
      expect(wrapper.find(NotFound).length).toBe(1);
      expect(wrapper.find('#not-found').length).toBe(1);
    });
  });

  describe('game', () => {
    it('should render the game page', () => {
      wrapper = mount(<Root location={ "/game/" } context={context} />);
      expect(wrapper.find(Game).length).toBe(1);
      expect(wrapper.find('#game').length).toBe(1);
    });
  });
});
