const { loadInput } = require('../helpers');

const SHINY_GOLD = 'shiny gold';

const parseBagRuleContent = (content) => {
  const matches = [...content.matchAll(/(\d+)\s([\w\s]+)\sbags?/g)];
  return matches.map((match) => ({
    count: parseInt(match[1], 10),
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

const findContainersOf = (bagColor, bagRules, result = []) =>
  Object.keys(bagRules).reduce((acc, bagRuleColor) => {
    if (!acc.includes(bagRuleColor) && isColorIncluded(bagColor, bagRules[bagRuleColor])) {
      return findContainersOf(bagRuleColor, bagRules, [...acc, bagRuleColor]);
    }
    return acc;
  }, result);

const findIndividualBagsCountInside = (bagColor, bagRules) => {
  if (bagRules[bagColor].length === 0) return 0;
  return bagRules[bagColor].reduce((acc, rule) => {
    return acc + rule.count + rule.count * findIndividualBagsCountInside(rule.color, bagRules);
  }, 0);
};

const start = () => {
  const input = loadInput('day7/input');
  const bagRules = parseBagRules(input);

  const containers = findContainersOf(SHINY_GOLD, bagRules);
  console.log(`${containers.length} bags can contain a ${SHINY_GOLD} bag.`);

  const individualBags = findIndividualBagsCountInside(SHINY_GOLD, bagRules);
  console.log(`A single ${SHINY_GOLD} bag must contain ${individualBags} other bags.`);
};

start();
