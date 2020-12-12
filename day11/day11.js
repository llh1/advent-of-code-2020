const { loadInput } = require('../helpers');

const buildSeatMap = (input) => input.map((row) => row.split(''));

const adjacentSeats = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const getNumberOfAdjacentOccupiedSeats = (x, y, seatMap) => {
  return adjacentSeats.reduce((acc, delta) => {
    const adjacentX = x + delta[0];
    const adjacentY = y + delta[1];
    if (
      adjacentX < 0 ||
      adjacentX > seatMap.length - 1 ||
      adjacentY < 0 ||
      adjacentY > seatMap[0].length - 1
    ) {
      return acc;
    }
    if (seatMap[adjacentX][adjacentY] === '#') {
      return acc + 1;
    }
    return acc;
  }, 0);
};

const run = (seatMap) => {
  const newSeatMap = [];
  let seatMapChanged = false;
  seatMap.forEach((row, rowIndex) => {
    newSeatMap[rowIndex] = [];
    row.forEach((position, columnIndex) => {
      if (position === '.') {
        newSeatMap[rowIndex].push('.');
      } else {
        const numberOfAdjacentSeats = getNumberOfAdjacentOccupiedSeats(
          rowIndex,
          columnIndex,
          seatMap
        );
        if (position === 'L' && numberOfAdjacentSeats === 0) {
          newSeatMap[rowIndex].push('#');
          seatMapChanged = true;
        } else if (position === '#' && numberOfAdjacentSeats >= 4) {
          newSeatMap[rowIndex].push('L');
          seatMapChanged = true;
        } else {
          newSeatMap[rowIndex].push(position);
        }
      }
    });
  });

  if (seatMapChanged) {
    run(newSeatMap);
  } else {
    const numberOfOccupiedSeats = newSeatMap.reduce((acc, row) => {
      return acc + row.filter((p) => p === '#').length;
    }, 0);
    console.log(numberOfOccupiedSeats);
  }
};

const start = () => {
  const input = loadInput('day11/input');
  const seatMap = buildSeatMap(input);
  run(seatMap);
};

start();
