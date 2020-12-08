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
  if (instructions.length <= instructionIndex) {
    return { status: 'COMPLETE', accumulator };
  }

  if (executedIndex.includes(instructionIndex)) {
    return { status: 'ERROR', accumulator };
  }

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

const replaceNextNopJmp = (fromIndex, instructions) => {
  const remainingChangeableInstructions = instructions.slice(fromIndex);
  const nextNopJmpIndex = remainingChangeableInstructions.findIndex((i) => /nop|jmp/.test(i));
  const newInstructions = [...instructions];
  newInstructions[nextNopJmpIndex + fromIndex] = remainingChangeableInstructions[
    nextNopJmpIndex
  ].startsWith('nop')
    ? remainingChangeableInstructions[nextNopJmpIndex].replace('nop', 'jmp')
    : remainingChangeableInstructions[nextNopJmpIndex].replace('jmp', 'nop');
  return newInstructions;
};

const start = () => {
  const input = loadInput('day8/input');
  const instructionsCount = input.length;
  let instructions = input;

  for (let i = 0; i < instructionsCount; i++) {
    const result = runInstructions(instructions);
    if (result.status === 'ERROR') {
      instructions = replaceNextNopJmp(i, input);
      console.log(instructions);
    } else {
      console.log(
        `Immediately before the program would run an instruction a second time, the value in the accumulator is ${result.accumulator}.`
      );
      return;
    }
  }
};

start();
