import React from 'react';
import sinon from 'sinon';
import fs from 'fs';
import { mount } from 'enzyme';
import { expect } from 'chai';

import Root from '../../src/app/Root';
import Homepage from '../../src/app/containers/Homepage/Homepage';
import NotFound from '../../src/app/containers/NotFound/NotFound';
import { fetch } from '../../src/app/utils';

const fixtures = fs.readFileSync(__dirname + '/fixtures/words.text', 'utf8');
const sandbox = sinon.sandbox.create();

describe('Client Render', function () {
  const promise = Promise.resolve(fixtures);

  before(() => {
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
});
