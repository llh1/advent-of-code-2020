const { loadInput } = require('../helpers');

const MANDATORY_PASSPORT_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
// const OPTIONAL_PASSPORT_FIELDS = ['cid'];

const isPassportValid = (passport) =>
  MANDATORY_PASSPORT_FIELDS.reduce((isValid, field) => {
    if (!passport[field]) return false;
    return isValid;
  }, true);

const parsePassportProperties = (rawProperties) => {
  const matches = [...rawProperties.matchAll(/(\w{3}):([^\s]+)/g)];
  return matches.reduce((acc, match) => {
    const [, field, value] = match;
    acc[field] = value;
    return acc;
  }, {});
};

const parsePassportData = (data, index = 0, currentPassport = {}, passports = []) => {
  if (index === data.length) return passports;
  if (data[index] === '') {
    return parsePassportData(data, index + 1, {}, [
      ...passports,
      { passport: currentPassport, isValid: isPassportValid(currentPassport) },
    ]);
  }
  return parsePassportData(
    data,
    index + 1,
    { ...currentPassport, ...parsePassportProperties(data[index]) },
    passports
  );
};

const start = () => {
  const input = loadInput('day4/input.txt');
  const passports = parsePassportData(input);
  const validPassportsCount = passports.filter((p) => p.isValid).length;
  console.log(`Number of valid passports: ${validPassportsCount}`);
};

start();
