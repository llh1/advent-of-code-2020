const { loadInput } = require('../helpers');

const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

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

const getNextPosition = ({ x, y }, slope, patternSize) => ({
  x: (x + slope[0]) % patternSize,
  y: y + slope[1],
});

const followSlope = (treeMatrix, slope, { x, y }, treesCount = 0) => {
  if (hasArrived(treeMatrix, { y })) return treesCount;
  const newTreesCount = treeMatrix[x][y] ? treesCount + 1 : treesCount;
  const nextPosition = getNextPosition({ x, y }, slope, treeMatrix.length);
  return followSlope(treeMatrix, slope, nextPosition, newTreesCount);
};

const start = () => {
  const input = loadInput('day3/input');
  const treeMatrix = generateTreeMatrix(input);

  const treesCounts = slopes.map((slope) => followSlope(treeMatrix, slope, { x: 0, y: 0 }));
  const result = treesCounts.reduce((acc, c) => acc * c, 1);
  console.log(`Multiplying the number of trees encountered: ${result}`);
};

start();
