import { INPUT } from './input';

let currentSumOfCalories = 0;

const calorieTotals: number[] = INPUT.split('\n').reduce(
  (acc: number[], currentFoodCaloriesStr: string) => {
    if (!currentFoodCaloriesStr) {
      acc.push(currentSumOfCalories);
      currentSumOfCalories = 0;
      return acc;
    }

    currentSumOfCalories += Number.parseInt(currentFoodCaloriesStr.trim());
    return acc;
  },
  []
);

const topThreeTotalCalories = calorieTotals
  .sort((a, b) => a - b)
  .slice(-3)
  .reduce((sum, calories) => sum + calories);
console.log(topThreeTotalCalories);
