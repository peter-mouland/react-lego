import { expect } from '../../../tests/support/test.helper';
import { randomRange } from './randomRange';

describe('randomRange', ()=>{
  it('should return an array', () => {
    expect(Array.isArray(randomRange(0,0,0))).to.equal(true, 'is not an array')
  });

  it('should return an array length matching the 3rd argument', () => {
    const arrLength = 1;
    expect(randomRange(0,0, arrLength).length).to.equal(arrLength);
  });

  it('should return a known value when from and to args match', () => {
    const arrLength = 1;
    const fromTo = 1;
    expect(randomRange(fromTo, fromTo, arrLength)[0]).to.equal(fromTo)
  });

  it('returns all values when range matches length', () => {
    const range = randomRange(0, 1, 2);
    expect(range.length).to.equal(2);
    expect(range.includes(0)).to.equal(true, `${range} does not include 0`);
    expect(range.includes(1)).to.equal(true, `${range} does not include 1`);

    const range2 = randomRange(0, 2, 3);
    expect(range2.length).to.equal(3);
    expect(range2.includes(0)).to.equal(true, `${range2} does not include 0`);
    expect(range2.includes(1)).to.equal(true, `${range2} does not include 1`);
    expect(range2.includes(2)).to.equal(true, `${range2} does not include 2`);

    const range3 = randomRange(1, 3, 3);
    expect(range3.length).to.equal(3);
    expect(range3.includes(1)).to.equal(true, `${range3} does not include 0`);
    expect(range3.includes(2)).to.equal(true, `${range3} does not include 1`);
    expect(range3.includes(3)).to.equal(true, `${range3} does not include 2`);
  });
});
