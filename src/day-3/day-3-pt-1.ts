import { INPUT } from './input';

const getPriority = (char: string) => {
  const LOWERCASE_OFFSET = 96;
  const UPPERCASE_OFFSET = 38;

  const priority = char.charCodeAt(0) - LOWERCASE_OFFSET;

  if (priority < 0) {
    return char.charCodeAt(0) - UPPERCASE_OFFSET;
  }

  return priority;
};

const prioritySum = INPUT.split('\n').reduce((acc, rucksackContents) => {
  if (rucksackContents) {
    const splitIndex = rucksackContents.length / 2;
    const rucksackCompartments = [
      rucksackContents.slice(0, splitIndex),
      rucksackContents.slice(splitIndex),
    ];

    const compartment1 = new Set<string>([...rucksackCompartments[0]]);
    const compartment2 = new Set<string>([...rucksackCompartments[1]]);

    const [duplicateItem] = [...compartment1].filter((char) => compartment2.has(char));
    return acc + getPriority(duplicateItem);
  }
  return acc;
}, 0);

console.log(prioritySum);
