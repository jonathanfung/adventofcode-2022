import { INPUT } from './input';

const rangeOverlaps = (assignments: number[][]): boolean => {
  const [first, second] = assignments;

  return first[1] >= second[0] && first[0] <= second[1];
};

const overlappingSum = INPUT.split('\n').reduce((sum, pair) => {
  if (pair) {
    const assignments: number[][] = pair.split(',').map((each) => each.split('-').map(Number));
    return rangeOverlaps(assignments) ? sum + 1 : sum;
  }

  return sum;
}, 0);

console.log(overlappingSum);
