const { loadInput } = require('../helpers');

const start = () => {
  const input = loadInput('day10/input');
  const adapters = ['0', ...input].map((i) => parseInt(i, 10)).sort((a, b) => (a < b ? -1 : 1));
  const adapterDifferences = { 1: 0, 2: 0, 3: 1 };

  for (let i = 0; i < adapters.length - 1; i++) {
    const diff = adapters[i + 1] - adapters[i];
    adapterDifferences[diff]++;
  }

  console.log(adapterDifferences[1] * adapterDifferences[3]);
};

start();
