import { INPUT, TEST } from './input';

const rows: number[][] = [];
const columns: number[][] = [];

INPUT.split('\n').forEach((line) => {
  if (line) {
    rows.push([...line].map((treeHeight) => Number.parseInt(treeHeight)));

    [...line].forEach((treeHeight, i) => {
      if (!columns[i]) {
        columns[i] = [];
      }

      columns[i].push(Number.parseInt(treeHeight));
    });
  }
});

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

const calculateViewingDistance = (
  direction: Direction,
  currentTreeHeight: number,
  treesToCheck: number[]
): number => {
  if (direction === Direction.RIGHT || direction === Direction.DOWN) {
    // Going right or down means we traverse the array normally (0..n)
    let viewingDistance = 0;
    for (let i = 0; i < treesToCheck.length; i++) {
      viewingDistance = viewingDistance + 1;
      if (treesToCheck[i] >= currentTreeHeight) {
        break;
      }
    }
    return viewingDistance;
  } else {
    // Going left or up means we traverse the array in reverse (n..0)
    let viewingDistance = 0;
    for (let i = treesToCheck.length - 1; i >= 0; i--) {
      viewingDistance = viewingDistance + 1;
      if (treesToCheck[i] >= currentTreeHeight) {
        break;
      }
    }
    return viewingDistance;
  }
};

let maxScenicScore = Number.MIN_SAFE_INTEGER;
for (let row = 1; row < rows.length - 1; row++) {
  for (let col = 1; col < rows[row].length - 1; col++) {
    const currentTreeHeight = rows[row][col];
    const heightsToTheTop = columns[col].slice(0, row);
    const heightsToTheLeft = rows[row].slice(0, col);
    const heightsToTheBottom = columns[col].slice(row + 1);
    const heightsToTheRight = rows[row].slice(col + 1);

    const up = calculateViewingDistance(Direction.UP, currentTreeHeight, heightsToTheTop);
    const left = calculateViewingDistance(Direction.LEFT, currentTreeHeight, heightsToTheLeft);
    const down = calculateViewingDistance(Direction.DOWN, currentTreeHeight, heightsToTheBottom);
    const right = calculateViewingDistance(Direction.RIGHT, currentTreeHeight, heightsToTheRight);

    const currentScenicScore = up * left * down * right;
    maxScenicScore = Math.max(maxScenicScore, currentScenicScore);
  }
}

console.log(maxScenicScore);
