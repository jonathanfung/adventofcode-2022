import { INPUT } from './input';

const GROUP_SIZE = 3;

const getPriority = (char: string) => {
  const LOWERCASE_OFFSET = 96;
  const UPPERCASE_OFFSET = 38;

  const priority = char.charCodeAt(0) - LOWERCASE_OFFSET;

  if (priority < 0) {
    return char.charCodeAt(0) - UPPERCASE_OFFSET;
  }

  return priority;
};

const getBadgeItemTypeAndPriority = (groupRucksackItems: string[]): [string, number] => {
  const groupRucksackItemSets: Set<string>[] = groupRucksackItems.map(
    (rucksackItems) => new Set<string>([...rucksackItems])
  );

  let distinctBadgeItemTypes = groupRucksackItemSets[0];
  for (let i = 1; i < groupRucksackItems.length; i++) {
    distinctBadgeItemTypes = new Set<string>(
      [...distinctBadgeItemTypes].filter((char) => groupRucksackItemSets[i].has(char))
    );
  }

  const [badgeItemType] = [...distinctBadgeItemTypes];
  return [badgeItemType, getPriority(badgeItemType)];
};

let currentRucksackGroup: string[] = [];
const prioritySum = INPUT.split('\n').reduce((acc, rucksackContents, i) => {
  currentRucksackGroup.push(rucksackContents);

  if (currentRucksackGroup.length === GROUP_SIZE) {
    const [badgeItemType, priority] = getBadgeItemTypeAndPriority(currentRucksackGroup);
    currentRucksackGroup = [];

    console.log(`Badge Item Type is [${badgeItemType}]`);
    return acc + priority;
  }

  return acc;
}, 0);

console.log(`Final priority sum: ${prioritySum}`);
