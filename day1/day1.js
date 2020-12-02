const { loadInput } = require('../helpers');

const isSum2020 = (numbers) => numbers.reduce((a, b) => a + b, 0) === 2020;

const find2EntriesThatSumTo2020 = (numbers) => {
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (isSum2020([numbers[i], numbers[j]])) {
        return [numbers[i], numbers[j]];
      }
    }
  }
  return null;
};

const find3EntriesThatSumTo2020 = (numbers) => {
  for (let i = 0; i < numbers.length - 2; i++) {
    for (let j = i + 1; j < numbers.length - 1; j++) {
      for (let k = j + 1; k < numbers.length; k++) {
        if (isSum2020([numbers[i], numbers[j], numbers[k]])) {
          return [numbers[i], numbers[j], numbers[k]];
        }
      }
    }
  }
  return null;
};

const multiplyEntries = (numbers) => numbers.reduce((a, b) => a * b, 1);

const start = () => {
  const input = loadInput('day1/input').map((n) => parseInt(n, 10));
  const entries2 = find2EntriesThatSumTo2020(input);
  console.log(multiplyEntries(entries2));

  const entries3 = find3EntriesThatSumTo2020(input);
  console.log(multiplyEntries(entries3));
};

start();
