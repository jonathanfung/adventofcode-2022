import { INPUT } from './input';

const rangeFullyContains = (assignments: number[][]): boolean => {
  const [first, second] = assignments;

  return (
    (first[0] >= second[0] && first[1] <= second[1]) ||
    (second[0] >= first[0] && second[1] <= first[1])
  );
};

const fullyContainedSum = INPUT.split('\n').reduce((sum, pair) => {
  if (pair) {
    const assignments: number[][] = pair.split(',').map((each) => each.split('-').map(Number));
    return rangeFullyContains(assignments) ? sum + 1 : sum;
  }

  return sum;
}, 0);

console.log(fullyContainedSum);
