import { INPUT } from './input';

let currentSumOfCalories = 0;

const maxTotalCalories: number = INPUT.split('\n').reduce(
  (maxTotalCalories, currentFoodCaloriesStr) => {
    if (!currentFoodCaloriesStr) {
      const updatedMax = Math.max(currentSumOfCalories, maxTotalCalories);
      currentSumOfCalories = 0;
      return updatedMax;
    }

    currentSumOfCalories += Number.parseInt(currentFoodCaloriesStr.trim());
    return maxTotalCalories;
  },
  0
);

console.log(maxTotalCalories);
