import { expect } from '../../../tests/config/test.helper';
import Chance from 'chance';

import * as reducers from './';
import * as actions from '../actions';

const chance = new Chance();
let fakeState;
let fakeKey;
let fakeValue;

describe('reducers/index', () => {

  beforeEach(()=>{
    fakeKey = chance.word();
    fakeValue = chance.word();
    fakeState = { [fakeKey]: fakeValue };
  });

  context('game reducer', () => {
    it('will always return given state by default', () => {
      expect(reducers.game(fakeState, {})).to.equal(fakeState, 'State should always be returned');
    });

    it('will return loading state if action is pending', () => {
      const type = `${actions.FETCH_HAND}_PENDING`;
      const result = reducers.game(fakeState, { type });
      expect(result.loading).to.deep.equal(true, 'State should be loading');
      expect(result[fakeKey]).to.deep.equal(fakeValue, 'State should still contain existing keys');
    });

    it('will return update state and payload if action is fulfilled', () => {
      const type = `${actions.FETCH_HAND}_FULFILLED`;
      const status = chance.integer();
      const payload = { data: { getDashboard: { message: chance.sentence() } } };
      const result = reducers.game(fakeState, { type, status, payload });
      expect(result.loading).to.deep.equal(false, 'State should be updated');
      expect(result[fakeKey]).to.deep.equal(fakeValue, 'State should be loading');
      expect(result.status).to.deep.equal(status, 'State should be updated');
    });
  });

});
