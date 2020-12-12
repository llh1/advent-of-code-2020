const { loadInput } = require('../helpers');

const COMPASS = [
  { cardinalDirection: 'north', delta: [0, 1] },
  { cardinalDirection: 'east', delta: [1, 0] },
  { cardinalDirection: 'south', delta: [0, -1] },
  { cardinalDirection: 'west', delta: [-1, 0] },
];

const rotateLeft = ({ lng, lat }, times = 0) => {
  if (times === 0) return { lng, lat };
  return rotateLeft({ lng: -lat, lat: lng }, times - 1);
};

const rotateRight = ({ lng, lat }, times = 0) => {
  if (times === 0) return { lng, lat };
  return rotateRight({ lng: lat, lat: -lng }, times - 1);
};

const processInstruction = (currentPosition, instruction) => {
  const [, action, value] = instruction.match(/^(\w)(\d+)$/);
  return {
    N: (v) => ({
      ...currentPosition,
      waypoint: { ...currentPosition.waypoint, lat: currentPosition.waypoint.lat + v },
    }),
    S: (v) => ({
      ...currentPosition,
      waypoint: { ...currentPosition.waypoint, lat: currentPosition.waypoint.lat - v },
    }),
    E: (v) => ({
      ...currentPosition,
      waypoint: { ...currentPosition.waypoint, lng: currentPosition.waypoint.lng + v },
    }),
    W: (v) => ({
      ...currentPosition,
      waypoint: { ...currentPosition.waypoint, lng: currentPosition.waypoint.lng - v },
    }),
    L: (v) => ({
      ...currentPosition,
      waypoint: rotateLeft(currentPosition.waypoint, v / 90),
    }),
    R: (v) => ({
      ...currentPosition,
      waypoint: rotateRight(currentPosition.waypoint, v / 90),
    }),
    F: (v) => {
      return {
        ...currentPosition,
        lng: currentPosition.lng + v * currentPosition.waypoint.lng,
        lat: currentPosition.lat + v * currentPosition.waypoint.lat,
      };
    },
  }[action](parseInt(value, 10));
};

const navigate = (instructions, position) => {
  return instructions.reduce((acc, instruction) => processInstruction(acc, instruction), position);
};

const calculateManhattanDistance = (lat, lng) => Math.abs(lat) + Math.abs(lng);

const start = () => {
  const input = loadInput('day12/input');
  const initialDirection = COMPASS.findIndex((c) => c.cardinalDirection === 'east');
  const finalPosition = navigate(input, {
    lat: 0,
    lng: 0,
    direction: initialDirection,
    waypoint: { lat: 1, lng: 10 },
  });
  const manhattanDistance = calculateManhattanDistance(finalPosition.lat, finalPosition.lng);
  console.log(`Manhattan Distance: ${manhattanDistance}`);
};

start();
