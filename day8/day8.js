const { loadInput } = require('../helpers');

const execute = (instructions, instructionIndex, accumulator) => {
  const [, operation, argument] = instructions[instructionIndex].match(/^(\w+)\s([+-]\d+)$/);
  switch (operation) {
    case 'nop':
      return [accumulator, instructionIndex + 1];
    case 'acc':
      return [accumulator + parseInt(argument, 10), instructionIndex + 1];
    case 'jmp':
      return [accumulator, instructionIndex + parseInt(argument, 10)];
    default:
      throw new Error('Invalid operation');
  }
};

const runInstructions = (
  instructions,
  accumulator = 0,
  instructionIndex = 0,
  executedIndex = []
) => {
  if (executedIndex.includes(instructionIndex)) return accumulator;

  const [newAccumulator, nextInstructionIndex] = execute(
    instructions,
    instructionIndex,
    accumulator
  );
  return runInstructions(instructions, newAccumulator, nextInstructionIndex, [
    ...executedIndex,
    instructionIndex,
  ]);
};

const start = () => {
  const input = loadInput('day8/input');
  const accumulatorValue = runInstructions(input);
  console.log(
    `Immediately before the program would run an instruction a second time, the value in the accumulator is ${accumulatorValue}.`
  );
};

start();
