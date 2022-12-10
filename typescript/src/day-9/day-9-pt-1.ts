import { INPUT, TEST } from './input';

// Standard co-ordinate system, origin (0,0)
type Position = [number, number];

const isTouching = ([headX, headY]: Position, [tailX, tailY]: Position): boolean => {
  const adjacentOffsets = [-1, 0, 1];

  for (let i = 0; i < adjacentOffsets.length; i++) {
    for (let j = 0; j < adjacentOffsets.length; j++) {
      if (headX + adjacentOffsets[i] === tailX && headY + adjacentOffsets[j] === tailY) {
        return true;
      }
    }
  }

  return false;
};

const moveTailIfNeeded = (direction: Direction, head: Position, tail: Position): Position => {
  const [headX, headY] = head;
  const [tailX, tailY] = tail;

  if (!isTouching(head, tail) && (headX === tailX || headY === tailY)) {
    if (Math.abs(headX - tailX) >= 2 || Math.abs(headY - tailY)) {
      return moveTailMapping[direction]([tailX, tailY]);
    }
  }

  return tail;
};

const moveTailDiagonallyIfNeeded = (
  direction: Direction,
  head: Position,
  tail: Position
): Position => {
  if (!isTouching(head, tail)) {
    const [headX, headY] = head;
    const [tailX, tailY] = tail;

    if (direction === Direction.L || direction === Direction.R) {
      if (headY > tailY) {
        return moveTailMapping[direction](moveOneUp(tail));
      } else {
        return moveTailMapping[direction](moveOneDown(tail));
      }
    }

    if (direction === Direction.U || direction === Direction.D) {
      if (headX > tailX) {
        return moveTailMapping[direction](moveOneRight(tail));
      } else {
        return moveTailMapping[direction](moveOneLeft(tail));
      }
    }
  }

  return tail;
};

const updateTailPosition = (
  direction: Direction,
  currentHeadPosition: Position,
  currentTailPosition: Position
): Position => {
  let tailPosition = moveTailIfNeeded(direction, currentHeadPosition, currentTailPosition);
  return moveTailDiagonallyIfNeeded(direction, currentHeadPosition, tailPosition);
};

const moveOneUp = ([x, y]: Position): Position => [x, y + 1];
const moveOneDown = ([x, y]: Position): Position => [x, y - 1];
const moveOneLeft = ([x, y]: Position): Position => [x - 1, y];
const moveOneRight = ([x, y]: Position): Position => [x + 1, y];

const move = (
  direction: Direction,
  currentHeadPosition: Position,
  currentTailPosition: Position,
  moveHeadFn: (position: Position) => Position,
  steps: number,
  visited: Set<string>
): [Position, Position] => {
  let headPosition: Position = [...currentHeadPosition];
  let tailPosition: Position = [...currentTailPosition];

  for (let i = 0; i < steps; i++) {
    headPosition = moveHeadFn(headPosition);
    tailPosition = updateTailPosition(direction, headPosition, tailPosition);
    visited.add(`${tailPosition[0]},${tailPosition[1]}`);
  }

  return [headPosition, tailPosition];
};

enum Direction {
  U = 'U',
  D = 'D',
  L = 'L',
  R = 'R',
}

const moveMapping: {
  [dir in Direction]: (
    head: Position,
    tail: Position,
    steps: number,
    visited: Set<string>
  ) => [Position, Position];
} = {
  [Direction.U]: (head, tail, steps, visited) =>
    move(Direction.U, head, tail, moveOneUp, steps, visited),
  [Direction.D]: (head, tail, steps, visited) =>
    move(Direction.D, head, tail, moveOneDown, steps, visited),
  [Direction.L]: (head, tail, steps, visited) =>
    move(Direction.L, head, tail, moveOneLeft, steps, visited),
  [Direction.R]: (head, tail, steps, visited) =>
    move(Direction.R, head, tail, moveOneRight, steps, visited),
};

const moveTailMapping: {
  [dir in Direction]: (position: Position) => Position;
} = {
  [Direction.U]: moveOneUp,
  [Direction.D]: moveOneDown,
  [Direction.L]: moveOneLeft,
  [Direction.R]: moveOneRight,
};

const runSimulation = (input: string) => {
  let currentHeadPosition: Position = [0, 0];
  let currentTailPosition: Position = [0, 0];
  const visitedSet = new Set<string>();

  input
    .split('\n')
    .filter(Boolean)
    .forEach((line) => {
      const [direction, stepsStr]: string[] = line.split(' ');
      const steps = Number.parseInt(stepsStr);

      const [updatedHeadPosition, updatedTailPosition] = moveMapping[direction](
        currentHeadPosition,
        currentTailPosition,
        steps,
        visitedSet
      );

      currentHeadPosition = updatedHeadPosition;
      currentTailPosition = updatedTailPosition;
    });

  return {
    currentHeadPosition,
    currentTailPosition,
    visitedSet,
  };
};

const results = runSimulation(INPUT);
console.log(results.visitedSet.size);
