const { loadInput } = require('../helpers');

const parsePasswordEntry = (passwordEntry) => {
  const matches = [...passwordEntry.matchAll(/^(\d+)-(\d+)\s(\w):\s(.+)$/)];
  const [, position1, position2, letter, password] = matches[0];
  return {
    password,
    policy: {
      position1: parseInt(position1, 10),
      position2: parseInt(position2, 10),
      letter,
    },
  };
};

const parsePasswordsList = (passwordsList) =>
  passwordsList.map((entry) => parsePasswordEntry(entry));

const isPasswordValidForRentalPlace = (password, { position1, position2, letter }) => {
  const letterCount = password.split(letter).length - 1;
  return position1 <= letterCount && letterCount <= position2;
};

const isPasswordValidForToboggan = (password, { position1, position2, letter }) => {
  return (password[position1 - 1] === letter) !== (password[position2 - 1] === letter);
};

const start = () => {
  const input = loadInput('day2/input');
  const passwordEntries = parsePasswordsList(input);
  const validPasswordsRentalPlace = passwordEntries.filter((e) =>
    isPasswordValidForRentalPlace(e.password, e.policy)
  );
  console.log(`Rental place has ${validPasswordsRentalPlace.length} valid passwords`);

  const validPasswordsToboggan = passwordEntries.filter((e) =>
    isPasswordValidForToboggan(e.password, e.policy)
  );
  console.log(`Toboggan has ${validPasswordsToboggan.length} valid passwords`);
};

start();
