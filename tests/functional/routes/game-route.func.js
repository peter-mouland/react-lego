import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import fs from 'fs';

import Game, { Loading } from '../../../src/app/containers/Game/Game';
import Question from '../../../src/app/components/Question/Question';
import Answer from '../../../src/app/components/Answer/Answer';
import Root from '../../../src/app/Root';
import { findRoute } from '../../../src/app/routes';
import { json } from '../../../src/app/utils';

const fixtures = JSON.parse(fs.readFileSync(__dirname + '/../fixtures/card-80.json', 'utf8'));
const sandbox = sinon.sandbox.create();

describe('Game Route', function () {
  const promise = Promise.resolve(fixtures);

  before(() => {
    sandbox.stub(json, 'get', () => promise)
  });
  after(() => {
    sandbox.restore();
  });

  describe(`should contain  markup`, () => {

    before(() => {
      this.wrapper = mount(<Root location={ '/game/' } />);
    });

    after(() => {
      this.wrapper.unmount();
    });

    it(`should contain the Game container`, () => {
      expect(this.wrapper.find(Game)).to.be.present();
    });

    it(`should contain the 'main' layout`, () => {
      expect(this.wrapper.find('.layout.layout--main')).to.be.present();
      expect(this.wrapper.find('.layout__nav')).to.be.present();
      expect(this.wrapper.find('.layout__content')).to.be.present();
      expect(this.wrapper.find('.layout__footer')).to.be.present();
    });

    it('Should contain a title', () => {
      expect(document.title).to.equal(findRoute('game').meta.title);
    });

    it('should have a nav', () => {
      expect(this.wrapper.find('nav')).to.be.present();
    });

    it('should have a footer', () => {
      expect(this.wrapper.find('footer')).to.be.present();
    });

  });

  describe(`be able to deal a hand`, () => {

    let wrapper;

    beforeEach(() => {
      wrapper = mount(<Root location={ '/game/' } />);
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it(`is not loading before it gets mounted`, () => {
        wrapper = shallow(<Root location={ '/game/' } />);
        expect(wrapper.find(Loading)).not.to.be.present();
    });

    it(`starts loading as soon as the page is mounted`, () => {
        expect(wrapper.find(Loading)).to.be.present();
    });

    it(`removes loading once the json results are returned`, () => {
      return promise.then(() => {
        setImmediate(()=>{
          wrapper.update();
          expect(wrapper.find(Loading)).not.to.be.present();
        })
      })
    });

    it(`renders the question`, () => {
      return promise.then(() => {
        setImmediate(()=>{
          wrapper.update();
          expect(wrapper.find(Question)).to.be.present();
        })
      })
    });

    it(`passes the json response to the Question`, () => {
      return promise.then(() => {
        setImmediate(()=>{
          wrapper.update();
          const questionComponet = wrapper.find(Question);
          expect(questionComponet.props().cards).to.deep.equal([fixtures, fixtures]);
        })
      })
    });

    it(`does not render the answer by default`, () => {
      return promise.then(() => {
        setImmediate(()=>{
          wrapper.update();
          expect(wrapper.find(Answer)).not.to.be.present();
        })
      })
    });

    it(`renders the answer after the 'view answer' button is clicked`, () => {
      return promise.then(() => {
        setImmediate(()=>{
          wrapper.update();
          wrapper.find('button.game__btn--show-answer').simulate('click');
          wrapper.update();
          const answerComponent = wrapper.find(Answer);
          expect(answerComponent).to.be.present();
          expect(answerComponent.props().cards).to.deep.equal([fixtures, fixtures]);
        })
      })
    });
  });
});
