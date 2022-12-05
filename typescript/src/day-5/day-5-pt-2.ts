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

const processMoveInstructionCrateMover9001 = (stacks: CrateStacks, inputLine: string) => {
  const regex = /move (?<quantity>\d+) from (?<from>\d+) to (?<to>\d+)/g;
  const matches = [...inputLine.matchAll(regex)];

  matches.forEach((each) => {
    const { quantity, from, to } = each.groups!;
    const cratesToPickUp = stacks[from].splice(0, Number.parseInt(quantity));
    stacks[to].unshift(...cratesToPickUp);
  });
};

INPUT.split('\n').forEach((inputLine) => {
  if (inputLine) {
    if (inputLine.startsWith('move')) {
      processMoveInstructionCrateMover9001(stacks, inputLine);
    } else {
      processStackLayout(stacks, inputLine);
    }
  }
});

console.log(stacks);
console.log(Object.values(stacks).reduce((acc, stack) => acc + (stack[0] || ' '), ''));
