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

const start = () => {
  const input = loadInput('day9/input');
  const numbers = input.map((i) => parseInt(i, 10));

  for (let i = 0; i < numbers.length - PREAMBLE_SIZE; i++) {
    if (!isSumOf2PreambleNumbers(numbers[i + PREAMBLE_SIZE], numbers.slice(i, PREAMBLE_SIZE + i))) {
      console.log(numbers[i + PREAMBLE_SIZE]);
      return;
    }
  }
};

start();
