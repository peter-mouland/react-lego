import { randomRange } from './randomRange';

describe('randomRange', () => {
  it('should return an array', () => {
    expect(Array.isArray(randomRange(0, 0, 0))).toBe(true, 'is not an array');
  });

  it('should return an array length matching the 3rd argument', () => {
    const arrLength = 1;
    expect(randomRange(0, 0, arrLength)).toHaveLength(arrLength);
  });

  it('should return a known value when from and to args match', () => {
    const arrLength = 1;
    const fromTo = 1;
    expect(randomRange(fromTo, fromTo, arrLength)[0]).toBe(fromTo);
  });

  it('returns all values when range matches length', () => {
    const range = randomRange(0, 1, 2);
    expect(range).toHaveLength(2);
    expect(range.includes(0)).toBe(true, `${range} does not include 0`);
    expect(range.includes(1)).toBe(true, `${range} does not include 1`);

    const range2 = randomRange(0, 2, 3);
    expect(range2).toHaveLength(3);
    expect(range2.includes(0)).toBe(true, `${range2} does not include 0`);
    expect(range2.includes(1)).toBe(true, `${range2} does not include 1`);
    expect(range2.includes(2)).toBe(true, `${range2} does not include 2`);

    const range3 = randomRange(1, 3, 3);
    expect(range3).toHaveLength(3);
    expect(range3.includes(1)).toBe(true, `${range3} does not include 0`);
    expect(range3.includes(2)).toBe(true, `${range3} does not include 1`);
    expect(range3.includes(3)).toBe(true, `${range3} does not include 2`);
  });
});
