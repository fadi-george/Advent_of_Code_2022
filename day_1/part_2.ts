/*
--- Part Two ---
By the time you calculate the answer to the Elves' question, they've already realized that the Elf carrying the most Calories of food might eventually run out of snacks.

To avoid this unacceptable situation, the Elves would instead like to know the total Calories carried by the top three Elves carrying the most Calories. That way, even if one of those Elves runs out of snacks, they still have two backups.

In the example above, the top three Elves are the fourth Elf (with 24000 Calories), then the third Elf (with 11000 Calories), then the fifth Elf (with 10000 Calories). The sum of the Calories carried by these three elves is 45000.

Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?
*/
import { readInput } from "../helpers";

const input = readInput().concat([""]);
const totals: number[] = [];

let elfIndex = 0;
let total = 0;
let maxCalories = 0;
input.forEach((calories, index) => {
  if (calories === "") {
    if (total > maxCalories) maxCalories = total;
    totals[elfIndex] = total;
    elfIndex++;
    total = 0;
  } else {
    total += parseInt(calories);
  }
});

const top3Calories = totals
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((a, b) => a + b, 0);
console.log(top3Calories);
