const { loadInput } = require('../helpers');

const COMPASS = [
  { cardinalDirection: 'north', delta: [0, 1] },
  { cardinalDirection: 'east', delta: [1, 0] },
  { cardinalDirection: 'south', delta: [0, -1] },
  { cardinalDirection: 'west', delta: [-1, 0] },
];

const processInstruction = (currentPosition, instruction) => {
  const [, action, valueString] = instruction.match(/^(\w)(\d+)$/);
  const value = parseInt(valueString, 10);
  return {
    N: (v) => ({ ...currentPosition, lat: currentPosition.lat + v }),
    S: (v) => ({ ...currentPosition, lat: currentPosition.lat - v }),
    E: (v) => ({ ...currentPosition, lng: currentPosition.lng + v }),
    W: (v) => ({ ...currentPosition, lng: currentPosition.lng - v }),
    L: (v) => ({
      ...currentPosition,
      direction: (4 + currentPosition.direction - v / 90) % 4,
    }),
    R: (v) => ({ ...currentPosition, direction: (currentPosition.direction + v / 90) % 4 }),
    F: (v) => {
      return {
        ...currentPosition,
        lng: currentPosition.lng + v * COMPASS[currentPosition.direction].delta[0],
        lat: currentPosition.lat + v * COMPASS[currentPosition.direction].delta[1],
      };
    },
  }[action](value);
};

const navigate = (instructions, position) => {
  return instructions.reduce((acc, instruction) => processInstruction(acc, instruction), position);
};

const calculateManhattanDistance = (lat, lng) => Math.abs(lat) + Math.abs(lng);

const start = () => {
  const input = loadInput('day12/input');
  const initialDirection = COMPASS.findIndex((c) => c.cardinalDirection === 'east');
  const finalPosition = navigate(input, { lat: 0, lng: 0, direction: initialDirection });
  const manhattanDistance = calculateManhattanDistance(finalPosition.lat, finalPosition.lng);
  console.log(`Manhattan Distance: ${manhattanDistance}`);
};

start();
