import { INPUT } from './input';

const OPP_ROCK = 'A';
const OPP_PAPER = 'B';
const OPP_SCISSORS = 'C';

const OUTCOME_LOSE = 'X';
const OUTCOME_DRAW = 'Y';
const OUTCOME_WIN = 'Z';

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';

const SHAPE_SCORE_MAPPING: { [shape: string]: number } = {
  [ROCK]: 1,
  [PAPER]: 2,
  [SCISSORS]: 3,
};

const OUTCOME_SCORE_MAPPING: { [shape: string]: number } = {
  [OUTCOME_LOSE]: 0,
  [OUTCOME_DRAW]: 3,
  [OUTCOME_WIN]: 6,
};

const SHAPE_TO_PLAY_MAPPING: { [outcome: string]: { [opponentShape: string]: string } } = {
  [OUTCOME_LOSE]: {
    [OPP_ROCK]: SCISSORS,
    [OPP_PAPER]: ROCK,
    [OPP_SCISSORS]: PAPER,
  },
  [OUTCOME_DRAW]: {
    [OPP_ROCK]: ROCK,
    [OPP_PAPER]: PAPER,
    [OPP_SCISSORS]: SCISSORS,
  },
  [OUTCOME_WIN]: {
    [OPP_ROCK]: PAPER,
    [OPP_PAPER]: SCISSORS,
    [OPP_SCISSORS]: ROCK,
  },
};

const determineShapeToPlayAndOutcomeScore = (outcome: string, opponent: string): [string, number] => {
  return [SHAPE_TO_PLAY_MAPPING[outcome][opponent], OUTCOME_SCORE_MAPPING[outcome]];
};

const totalScore = INPUT.split('\n').reduce((totalScore, game) => {
  if (game) {
    const [opponent, outcome] = game.split(' ');
    const [shapeToPlay, outcomeScore] = determineShapeToPlayAndOutcomeScore(outcome, opponent);
    return totalScore + SHAPE_SCORE_MAPPING[shapeToPlay] + outcomeScore;
  }

  return totalScore;
}, 0);

console.log(totalScore);
