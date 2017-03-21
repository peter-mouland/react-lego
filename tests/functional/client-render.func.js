import React from 'react';
import sinon from 'sinon';
import fs from 'fs';
import { mount } from 'enzyme';
import { expect } from 'chai';

import Root from '../../src/app/Root';
import Homepage from '../../src/app/containers/Homepage/Homepage';
import NotFound from '../../src/app/containers/NotFound/NotFound';
import Game from '../../src/app/containers/Game/Game';
import { json, fetch } from '../../src/app/utils';

const fixtures = JSON.parse(fs.readFileSync(__dirname + '/fixtures/card-80.json', 'utf8'));
const sandbox = sinon.sandbox.create();

describe('Client Render', function () {
  const promise = Promise.resolve(fixtures);

  before(() => {
    sandbox.stub(json, 'get', () => promise)
    sandbox.stub(fetch, 'graphQL', () => promise)
  });
  after(() => {
    sandbox.restore();
  });

  it('Should render the Homepage', () => {
    this.wrapper = mount(<Root location={ '/' } context={{}} />);
    expect(this.wrapper.find(Homepage).length).to.equal(1);
  });

  describe('404', () => {
    it('should render the 404 route', () => {
      this.wrapper = mount(<Root location={ '/notFound' } context={{}} />);
      expect(this.wrapper.find(NotFound).length).to.equal(1);
      expect(this.wrapper.find('#not-found').length).to.equal(1);
    });
  });

  describe('game', () => {
    it('should render the game page', () => {
      this.wrapper = mount(<Root location={ "/game" } context={{}} />);
      expect(this.wrapper.find(Game).length).to.equal(1);
      expect(this.wrapper.find('#game').length).to.equal(1);
    });
  });
});
