
/* eslint-disable */
export  function randomRange(from, to, length) {
  if (to < from) return [];
  const returnArray = [];
  let loopCount = 0;
  randomRangeLoop:
    while (loopCount < length) {
      const randomInt = Math.floor(Math.random() * (to - from + 1)) + from;
      let i = 0;
      while (i < loopCount) {
        if (returnArray[i++] === randomInt) continue randomRangeLoop;
      }
      returnArray[loopCount++] = randomInt;
    }
  return returnArray;
}
/* eslint-disable */
