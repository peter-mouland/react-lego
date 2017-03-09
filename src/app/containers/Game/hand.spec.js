import { expect, sinon } from '../../../../tests/config/test.helper';
import * as utils from '../../../app/utils/randomRange';
import Hand from './hand';

const sanbox = sinon.sandbox.create();
let stub;
const fakeCard1 = {
  name: 'card1',
  key1: 'unknown',
  key2: 2,
  key3: 3,
  key4: 4,
  key5: 5,
  height: 6,
  key7: 'unknown',
  url: 'url/card1',
};
const fakeCard2 = {
  name: 'card2',
  key1: 11,
  key2: 21,
  key3: 31,
  key4: 4,
  key5: 5,
  height: 61,
  key7: 'unknown',
  url: 'url/card2',
};
const cards = [fakeCard1, fakeCard2];

describe('Hand', ()=>{

  beforeEach(()=>{
    stub = sanbox.stub(utils, 'randomRange');
  });

  afterEach(()=>{
    sanbox.restore();
  });

  it.skip('throws an error when no cards are passed', () => {
    expect(new Hand).to.throw(Error)
  });

  it('should return a question which matches the answer and fact', () => {

    stub.withArgs(0,1,1).returns([0]);
    stub.withArgs(0,7,1).returns([2]);
    expect(new Hand(cards).question).to.equal(`Who's key2 is 2?`);

    stub.withArgs(0,1,1).returns([1]);
    stub.withArgs(0,7,1).returns([2]);
    expect(new Hand(cards).question).to.equal(`Who's key2 is 21?`);

    stub.withArgs(0,1,1).returns([1]);
    stub.withArgs(0,7,1).returns([3]);
    expect(new Hand(cards).question).to.equal(`Who's key3 is 31?`);
  });

  it('should return taller/smaller when the answer key is height', () => {
    stub.withArgs(0,1,1).returns([0]);
    stub.withArgs(0,7,1).returns([6]);
    expect(new Hand(cards).question).to.equal(`Who's height is smaller, card1 or card2?`);

    stub.withArgs(0,1,1).returns([1]);
    stub.withArgs(0,7,1).returns([6]);
    expect(new Hand(cards).question).to.equal(`Who's height is taller, card1 or card2?`);
  });

  it('should return answer `both` when both cards matches the answer and fact', () => {
    stub.withArgs(0,1,1).returns([0]);
    stub.withArgs(0,7,1).returns([4]);
    expect(new Hand(cards).answer).to.equal(`both`);

    stub.withArgs(0,1,1).returns([1]);
    stub.withArgs(0,7,1).returns([4]);
    expect(new Hand(cards).answer).to.equal(`both`);

    stub.withArgs(0,1,1).returns([1]);
    stub.withArgs(0,7,1).returns([5]);
    expect(new Hand(cards).answer).to.equal(`both`);
  });

  it('should return answer key `name`', () => {

    stub.withArgs(0,1,1).returns([0]);
    stub.withArgs(0,7,1).returns([1]);
    expect(new Hand(cards).answer).to.equal(`card1`)

    stub.withArgs(0,1,1).returns([1]);
    stub.withArgs(0,7,1).returns([2]);
    expect(new Hand(cards).answer).to.equal(`card2`)
  });

  it('should return answer unknown when wrong answer value is unknown', () => {

    stub.withArgs(0,1,1).returns([0]);
    stub.withArgs(0,7,1).returns([1]);
    expect(new Hand(cards).answer).to.equal(`card1`)

    stub.withArgs(0,1,1).returns([1]);
    stub.withArgs(0,7,1).returns([1]);
    expect(new Hand(cards).answer).to.equal(`unknown`)

    stub.withArgs(0,1,1).returns([1]);
    stub.withArgs(0,7,1).returns([7]);
    expect(new Hand(cards).answer).to.equal(`both`)
  });

  it('should return the correct answer card', () => {

    stub.withArgs(0,1,1).returns([0]);
    stub.withArgs(0,7,1).returns([1]);
    expect(new Hand(cards).answerId).to.equal(fakeCard1.url);

    stub.withArgs(0,1,1).returns([1]);
    stub.withArgs(0,7,1).returns([1]);
    expect(new Hand(cards).answerId).to.equal(fakeCard2.url);
  });
});
