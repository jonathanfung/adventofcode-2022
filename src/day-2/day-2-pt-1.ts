import { INPUT } from './input';

const OPP_ROCK = 'A';
const OPP_PAPER = 'B';
const OPP_SCISSORS = 'C';

const ME_ROCK = 'X';
const ME_PAPER = 'Y';
const ME_SCISSORS = 'Z';

const SHAPE_SCORE_MAPPING: { [shape: string]: number } = {
  [ME_ROCK]: 1,
  [ME_PAPER]: 2,
  [ME_SCISSORS]: 3,
};

const determineOutcomeScore = (me: string, opponent: string): number => {
  if (
    (me === ME_ROCK && opponent === OPP_SCISSORS) ||
    (me === ME_PAPER && opponent === OPP_ROCK) ||
    (me === ME_SCISSORS && opponent === OPP_PAPER)
  ) {
    return 6;
  } else if (
    (me === ME_ROCK && opponent === OPP_ROCK) ||
    (me === ME_PAPER && opponent === OPP_PAPER) ||
    (me === ME_SCISSORS && opponent === OPP_SCISSORS)
  ) {
    return 3;
  } else {
    return 0;
  }
};

const totalScore = INPUT.split('\n').reduce((totalScore, game) => {
  if (game) {
    const [opponent, me] = game.split(' ');
    return totalScore + SHAPE_SCORE_MAPPING[me] + determineOutcomeScore(me, opponent);
  }

  return totalScore;
}, 0);

console.log(totalScore);
