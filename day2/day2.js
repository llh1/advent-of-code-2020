const { loadInput } = require('../helpers');

const parsePasswordEntry = (passwordEntry) => {
    const matches = [...passwordEntry.matchAll(/^(\d+)-(\d+)\s(\w):\s(.+)$/)];
    const [, min, max, letter, password] = matches[0];
    return {
        password,
        policy: {
            min, max, letter
        }
    };
};

const parsePasswordsList = (passwordsList) => passwordsList.map(entry => parsePasswordEntry(entry));

const isPasswordValid = (password, { min, max, letter }) => {
    const letterCount = password.split(letter).length - 1;
    return min <= letterCount && letterCount <= max;
};

const start = () => {
    const input = loadInput('day2/input');
    const passwordEntries = parsePasswordsList(input);
    const validPasswords = passwordEntries.filter(e => isPasswordValid(e.password, e.policy));
    console.log(validPasswords.length);
};

start();
