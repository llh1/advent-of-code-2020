const { loadInput } = require('../helpers');

const decipherRow = (rowChars, lower = 0, upper = 127) => {
  if (rowChars.length === 0) return lower;
  const nextChar = rowChars.shift();
  switch (nextChar) {
    case 'F':
      return decipherRow(rowChars, lower, Math.floor((upper + lower) / 2));
    case 'B':
      return decipherRow(rowChars, Math.ceil((upper + lower) / 2), upper);
    default:
      throw new Error('Invalid row character');
  }
};

const decipherColumn = (columnChars, lower = 0, upper = 7) => {
  if (columnChars.length === 0) return lower;
  const nextChar = columnChars.shift();
  switch (nextChar) {
    case 'L':
      return decipherColumn(columnChars, lower, Math.floor((upper + lower) / 2));
    case 'R':
      return decipherColumn(columnChars, Math.ceil((upper + lower) / 2), upper);
    default:
      throw new Error('Invalid column character');
  }
};

const decipherBinarySpacePartitioning = (seat) => {
  const [, rawRow, rawColumn] = seat.match(/^([B|F]{7})([L|R]{3})$/);
  const rowNumber = decipherRow(rawRow.split(''));
  const columnNumber = decipherColumn(rawColumn.split(''));
  return {
    seatId: rowNumber * 8 + columnNumber,
    row: rowNumber,
    column: columnNumber,
    binarySpacePartition: seat,
  };
};

const findMySeatId = (seatIdsList) => {
  for (let row = 0; row <= 127; row++) {
    for (let column = 0; column <= 7; column++) {
      const seatId = row * 8 + column;
      if (
        !seatIdsList.includes(seatId) &&
        seatIdsList.includes(seatId + 1) &&
        seatIdsList.includes(seatId - 1)
      ) {
        return seatId;
      }
    }
  }
  return null;
};

const start = () => {
  const input = loadInput('day5/input');
  const boardingPassList = input.map((seat) => decipherBinarySpacePartitioning(seat));
  const highestSeatId = boardingPassList.reduce((acc, pass) => {
    if (pass.seatId > acc) return pass.seatId;
    return acc;
  }, 0);

  console.log(`The highest seat ID on a boarding pass is ${highestSeatId}`);

  const mySeatId = findMySeatId(boardingPassList.map((pass) => pass.seatId));
  console.log(`My seat ID is ${mySeatId}`);
};

start();
