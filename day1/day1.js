const fs = require('fs');

const loadInput = () =>
  fs.readFileSync('./input', { encoding: 'utf8' }).split('\n');

console.log(loadInput());
