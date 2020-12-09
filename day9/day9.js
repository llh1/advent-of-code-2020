const { loadInput } = require('../helpers');

const PREAMBLE_SIZE = 25;

const isSumOf2PreambleNumbers = (number, lastNumbers) => {
  for (let i = 0; i < lastNumbers.length; i++) {
    for (let j = i + 1; j < lastNumbers.length; j++) {
      if (lastNumbers[i] + lastNumbers[j] === number) return true;
    }
  }
  return false;
};

const findContiguousSetWhichSumTo = (weaknessNumber, numberList) => {
  let contiguousSet = [];
  for (let i = 0; i < numberList.length; i++) {
    contiguousSet.push(numberList[i]);
    for (let j = i + 1; j < numberList.length; j++) {
      contiguousSet.push(numberList[j]);
      const sum = contiguousSet.reduce((acc, n) => acc + n, 0);
      if (sum === weaknessNumber) {
        return contiguousSet;
      }
      if (sum >= weaknessNumber) {
        contiguousSet = [];
        break;
      }
    }
  }
};

const start = () => {
  const input = loadInput('day9/input');
  const numbers = input.map((i) => parseInt(i, 10));
  let weaknessNumber;
  for (let i = 0; i < numbers.length - PREAMBLE_SIZE; i++) {
    if (!isSumOf2PreambleNumbers(numbers[i + PREAMBLE_SIZE], numbers.slice(i, PREAMBLE_SIZE + i))) {
      weaknessNumber = numbers[i + PREAMBLE_SIZE];
      break;
    }
  }

  const contiguousSet = findContiguousSetWhichSumTo(weaknessNumber, numbers);
  const encryptionWeakness = Math.min(...contiguousSet) + Math.max(...contiguousSet);
  console.log(`Encryption weakness: ${encryptionWeakness}`);
};

start();
