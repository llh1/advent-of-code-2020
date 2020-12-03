const { loadInput } = require('../helpers');

const generateTreeMatrix = (input) =>
  input.reduce((result, line) => {
    line.split('').forEach((point, i) => {
      const isTree = point === '#';
      if (!result[i]) result.push([]);
      result[i].push(isTree);
    });
    return result;
  }, []);

const hasArrived = (treeMatrix, { y }) => y > treeMatrix[0].length;

const getNextPosition = ({ x, y }, patternSize) => ({
  x: (x + 3) % patternSize,
  y: y + 1,
});

const followSlope = (treeMatrix, { x, y }, treesCount = 0) => {
  if (hasArrived(treeMatrix, { y })) return treesCount;
  const newTreesCount = treeMatrix[x][y] ? treesCount + 1 : treesCount;
  const nextPosition = getNextPosition({ x, y }, treeMatrix.length);
  return followSlope(treeMatrix, nextPosition, newTreesCount);
};

const start = () => {
  const input = loadInput('day3/input');
  const treeMatrix = generateTreeMatrix(input);
  const treesCount = followSlope(treeMatrix, { x: 0, y: 0 });
  console.log(`Number of trees: ${treesCount}`);
};

start();
