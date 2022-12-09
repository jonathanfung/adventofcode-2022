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

const isVisible = (currentTreeHeight: number, treeHeightsToCheck: number[]): boolean => {
  return treeHeightsToCheck.find((height) => height >= currentTreeHeight) !== undefined
    ? false
    : true;
};

let visibleInteriorCount = 0;
for (let row = 1; row < rows.length - 1; row++) {
  for (let col = 1; col < rows[row].length - 1; col++) {
    const currentTreeHeight = rows[row][col];
    const heightsToTheLeft = rows[row].slice(0, col);
    const heightsToTheRight = rows[row].slice(col + 1);
    const heightsToTheTop = columns[col].slice(0, row);
    const heightsToTheBottom = columns[col].slice(row + 1);

    if (
      isVisible(currentTreeHeight, heightsToTheLeft) ||
      isVisible(currentTreeHeight, heightsToTheRight) ||
      isVisible(currentTreeHeight, heightsToTheTop) ||
      isVisible(currentTreeHeight, heightsToTheBottom)
    ) {
      visibleInteriorCount++;
    }
  }
}

const visiblePerimeterCount = rows.length * 2 + columns.length * 2 - 4;
console.log(visiblePerimeterCount + visibleInteriorCount);
