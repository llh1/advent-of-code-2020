const { loadInput } = require('../helpers');

const SHINY_GOLD = 'shiny gold';

const parseBagRuleContent = (content) => {
  const matches = [...content.matchAll(/(\d+)\s([\w\s]+)\sbags?/g)];
  return matches.map((match) => ({
    count: match[1],
    color: match[2],
  }));
};

const parseBagRules = (rules) =>
  rules.reduce((acc, rule) => {
    const [, bagColor, rawBagContent] = rule.match(/^([\w\s)]+)\sbags\scontain\s(.*)\.$/);
    return {
      ...acc,
      [bagColor]: parseBagRuleContent(rawBagContent),
    };
  }, {});

const isColorIncluded = (color, contentList) => !!contentList.find((c) => c.color === color);

const findContainersOf = (bagColor, bagRules, result = []) => {
  return Object.keys(bagRules).reduce((acc, bagRuleColor) => {
    if (!acc.includes(bagRuleColor) && isColorIncluded(bagColor, bagRules[bagRuleColor])) {
      return findContainersOf(bagRuleColor, bagRules, [...acc, bagRuleColor]);
    }
    return acc;
  }, result);
};

const start = () => {
  const input = loadInput('day7/input');
  const bagRules = parseBagRules(input);
  const containers = findContainersOf(SHINY_GOLD, bagRules);
  console.log(`${containers.length} bags can contain a ${SHINY_GOLD} bag.`);
};

start();
