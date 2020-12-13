const { loadInput } = require('../helpers');

const getEarliestBusTimestamps = (myTimestamp, availableBusIds) => {
  return availableBusIds.map((id) => ({
    id,
    earliestTimestamp: Math.floor(myTimestamp / id) * id + id,
  }));
};

const start = () => {
  const input = loadInput('day13/input');
  const myEarliestTimestamp = parseInt(input[0], 10);
  const availableBusIds = input[1]
    .split(',')
    .filter((id) => id !== 'x')
    .map((id) => parseInt(id, 10));
  const earliestBusTimestamps = getEarliestBusTimestamps(myEarliestTimestamp, availableBusIds);
  const earliestBus = earliestBusTimestamps.reduce((acc, bus) => {
    return acc && acc.earliestTimestamp > bus.earliestTimestamp ? bus : acc;
  }, earliestBusTimestamps[0]);
  console.log((earliestBus.earliestTimestamp - myEarliestTimestamp) * earliestBus.id);
};

start();
