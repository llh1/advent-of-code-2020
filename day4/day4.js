const { loadInput } = require('../helpers');

const MANDATORY_PASSPORT_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const validateHgt = (height) => {
  const match = height.match(/^(\d+)(cm|in)$/);
  if (!match) return false;

  const heightValue = parseInt(match[1], 10);
  return match[2] === 'cm'
    ? heightValue >= 150 && heightValue <= 193
    : heightValue >= 59 && heightValue <= 76;
};

const PASSPORT_FIELDS_VALIDATORS = {
  byr: (v) => v >= 1920 && v <= 2002,
  iyr: (v) => v >= 2010 && v <= 2020,
  eyr: (v) => v >= 2020 && v <= 2030,
  hgt: (v) => validateHgt(v),
  hcl: (v) => /^#[a-f0-9]{6}$/.test(v),
  ecl: (v) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(v),
  pid: (v) => /^\d{9}$/.test(v),
};

const isPassportValid = (passport) =>
  MANDATORY_PASSPORT_FIELDS.reduce((isValid, field) => {
    if (!passport[field] || !PASSPORT_FIELDS_VALIDATORS[field](passport[field])) return false;
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
