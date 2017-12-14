import * as utils from '../../utils/randomRange';
import Hand from './hand';

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

describe('Hand', () => {
  beforeEach(() => {
    stub = jest.spyOn(utils, 'randomRange');
  });

  afterEach(() => {
    stub.mockReset();
    stub.mockRestore();
  });

  it('throws an error when no cards are passed', () => {
    const instantiateHand = () => new Hand();
    expect(instantiateHand).toThrow(Error);
  });

  it('should return a question which matches the answer and fact', () => {
    stub
      .mockReturnValueOnce([0])
      .mockReturnValueOnce([2]);
    expect(new Hand(cards).question).toBe('Who\'s key2 is 2?');

    stub
      .mockReturnValueOnce([1])
      .mockReturnValueOnce([2]);
    expect(new Hand(cards).question).toBe('Who\'s key2 is 21?');

    stub
      .mockReturnValueOnce([1])
      .mockReturnValueOnce([3]);
    expect(new Hand(cards).question).toBe('Who\'s key3 is 31?');
  });

  it('should return taller/smaller when the answer key is height', () => {
    stub.mockReturnValueOnce([0]);
    stub.mockReturnValueOnce([6]);
    expect(new Hand(cards).question).toBe('Who\'s height is smaller, card1 or card2?');

    stub.mockReturnValueOnce([1]);
    stub.mockReturnValueOnce([6]);
    expect(new Hand(cards).question).toBe('Who\'s height is taller, card1 or card2?');
  });

  it('should return answer `both` when both cards matches the answer and fact', () => {
    stub.mockReturnValueOnce([0]);
    stub.mockReturnValueOnce([4]);
    expect(new Hand(cards).answer).toBe('both');

    stub.mockReturnValueOnce([1]);
    stub.mockReturnValueOnce([4]);
    expect(new Hand(cards).answer).toBe('both');

    stub.mockReturnValueOnce([1]);
    stub.mockReturnValueOnce([5]);
    expect(new Hand(cards).answer).toBe('both');
  });

  it('should return answer key `name`', () => {
    stub.mockReturnValueOnce([0]);
    stub.mockReturnValueOnce([1]);
    expect(new Hand(cards).answer).toBe('card1');

    stub.mockReturnValueOnce([1]);
    stub.mockReturnValueOnce([2]);
    expect(new Hand(cards).answer).toBe('card2');
  });

  it('should return answer unknown when wrong answer value is unknown', () => {
    stub.mockReturnValueOnce([0]);
    stub.mockReturnValueOnce([1]);
    expect(new Hand(cards).answer).toBe('card1');

    stub.mockReturnValueOnce([1]);
    stub.mockReturnValueOnce([1]);
    expect(new Hand(cards).answer).toBe('unknown');

    stub.mockReturnValueOnce([1]);
    stub.mockReturnValueOnce([7]);
    expect(new Hand(cards).answer).toBe('both');
  });

  it('should return the correct answer card', () => {
    stub.mockReturnValueOnce([0]);
    stub.mockReturnValueOnce([1]);
    expect(new Hand(cards).answerId).toBe(fakeCard1.url);

    stub.mockReturnValueOnce([1]);
    stub.mockReturnValueOnce([1]);
    expect(new Hand(cards).answerId).toBe(fakeCard2.url);
  });
});
