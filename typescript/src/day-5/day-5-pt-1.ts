import { INPUT, TEST } from './input';

type CrateStacks = { [stackNum: string]: string[] };

const stacks: CrateStacks = {};

const processStackLayout = (stacks: CrateStacks, inputLine: string) => {
  const matches = [...inputLine.matchAll(/\[([^\]]+)\]/g)];
  matches.forEach((each) => {
    const [_, match] = each;
    const stackIndex = each.index! / 4 + 1;
    const stack = stacks[stackIndex];

    if (stack) {
      stack.push(match);
    } else {
      stacks[stackIndex] = [match];
    }
  });

  return stacks;
};

const processMoveInstruction = (stacks: CrateStacks, inputLine: string) => {
  const regex = /move (?<quantity>\d+) from (?<from>\d+) to (?<to>\d+)/g;
  const matches = [...inputLine.matchAll(regex)];

  matches.forEach((each) => {
    const { quantity, from, to } = each.groups!;
    for (let i = 0; i < Number.parseInt(quantity); i++) {
      const crate = stacks[from].shift();
      stacks[to].unshift(crate!);
    }
  });
};

INPUT.split('\n').reduce((acc, inputLine) => {
  if (inputLine) {
    if (inputLine.startsWith('move')) {
      processMoveInstruction(stacks, inputLine);
    } else {
      processStackLayout(stacks, inputLine);
    }
  }

  return acc;
}, '');

console.log(stacks);
console.log(Object.values(stacks).reduce((acc, stack) => acc + (stack[0] || ' '), ''));
