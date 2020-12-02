const fs = require('fs');

const loadInput = () =>
  fs
    .readFileSync('./day1/input', { encoding: 'utf8' })
    .split('\n')
    .map((n) => parseInt(n, 10));

const isSum2020 = (num1, num2) => num1 + num2 === 2020;

const findEntriesThatSumTo2020 = (numbers) => {
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (isSum2020(numbers[i], numbers[j])) {
        return [numbers[i], numbers[j]];
      }
    }
  }
  return null;
};

const start = () => {
  const input = loadInput();
  const entries = findEntriesThatSumTo2020(input);
  console.log(entries[0] * entries[1]);
};

start();
