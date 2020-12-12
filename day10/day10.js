const { loadInput } = require('../helpers');

const getDifferences = (adapters) =>
  adapters.map((adapter, index) => {
    if (index === 0) return adapter;
    return adapter - adapters[index - 1];
  });

const getPart1Answer = (adapters) => {
  const adapterDifferences = getDifferences(adapters);
  const difference1 = adapterDifferences.filter((d) => d === 1);
  const difference3 = adapterDifferences.filter((d) => d === 3);
  return difference1.length * difference3.length;
};

const findLeavesCount = (adapters, index = 0, nodesCount = {}) => {
  const currentAdapter = adapters[index];
  const nextAdapters = adapters.slice(index + 1, index + 4).filter((a) => a <= currentAdapter + 3);

  if (nextAdapters.length === 0) {
    return { ...nodesCount, [currentAdapter]: 1 };
  }

  if (nodesCount[currentAdapter]) {
    return { ...nodesCount };
  }

  const childCounts = nextAdapters.reduce((acc, adapter) => {
    const adapterIndex = adapters.indexOf(adapter);
    const leavesCount = findLeavesCount(adapters, adapterIndex, acc);
    return {
      ...acc,
      ...leavesCount,
    };
  }, nodesCount);

  return {
    ...nodesCount,
    ...childCounts,
    [currentAdapter]: nextAdapters.reduce((acc, a) => childCounts[a] + acc, 0),
  };
};

const getPart2Answer = (adapters) => {
  return findLeavesCount(adapters)[0];
};

const start = () => {
  const input = loadInput('day10/input');
  const inputAdapters = ['0', ...input]
    .map((i) => parseInt(i, 10))
    .sort((a, b) => (a < b ? -1 : 1));
  const lastAdapter = inputAdapters[inputAdapters.length - 1] + 3;
  const adapters = [...inputAdapters, lastAdapter];

  const part1 = getPart1Answer(adapters);
  console.log(part1);

  const part2 = getPart2Answer(adapters);
  console.log(part2);
};

start();
