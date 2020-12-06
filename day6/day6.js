const { loadInput } = require('../helpers');

const countCombinedYesAnswers = (answers) => [...new Set(answers.split(''))].length;

const getGroupsYesAnswersCount = (input, result = [], index = 0, currentGroupAnswers = '') => {
  if (index === input.length) return result;
  if (input[index] === '') {
    return getGroupsYesAnswersCount(
      input,
      [...result, countCombinedYesAnswers(currentGroupAnswers)],
      index + 1,
      ''
    );
  }

  return getGroupsYesAnswersCount(input, result, index + 1, currentGroupAnswers + input[index]);
};

const start = () => {
  const input = loadInput('day6/input');
  const groupsYesAnswersCount = getGroupsYesAnswersCount(input);
  const countSum = groupsYesAnswersCount.reduce((acc, count) => acc + count, 0);
  console.log(`Sum of yes answers counts: ${countSum}`);
};

start();
