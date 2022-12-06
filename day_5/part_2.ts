/*
--- Part Two ---
As you watch the crane operator expertly rearrange the crates, you notice the process isn't following your prediction.

Some mud was covering the writing on the side of the crane, and you quickly wipe it away. The crane isn't a CrateMover 9000 - it's a CrateMover 9001.

The CrateMover 9001 is notable for many new and exciting features: air conditioning, leather seats, an extra cup holder, and the ability to pick up and move multiple crates at once.

Again considering the example above, the crates begin in the same configuration:

    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 
Moving a single crate from stack 2 to stack 1 behaves the same as before:

[D]        
[N] [C]    
[Z] [M] [P]
 1   2   3 
However, the action of moving three crates from stack 1 to stack 3 means that those three moved crates stay in the same order, resulting in this new configuration:

        [D]
        [N]
    [C] [Z]
    [M] [P]
 1   2   3
Next, as both crates are moved from stack 2 to stack 1, they retain their order as well:

        [D]
        [N]
[C]     [Z]
[M]     [P]
 1   2   3
Finally, a single crate is still moved from stack 1 to stack 2, but now it's crate C that gets moved:

        [D]
        [N]
        [Z]
[M] [C] [P]
 1   2   3
In this example, the CrateMover 9001 has put the crates in a totally different order: MCD.

Before the rearrangement process finishes, update your simulation so that the Elves know where they should stand to be ready to unload the final supplies. After the rearrangement procedure completes, what crate ends up on top of each stack?

Answer: 
 

Although it hasn't changed, you can still get your puzzle input.

You can also [Share] this puzzle.
*/
// console.time("Part 2");
import fs from "fs";

const [stacksStr, movesStr] = fs
  .readFileSync("./input.txt", "utf8")
  .split("\n\n");
const stackRows = stacksStr.split("\n");

// keep track of the stacks
const stacks: Record<string, string[]> = {};

for (let i = stackRows.length - 2; i >= 0; i--) {
  const row = stackRows[i].split(/\s{4}|\s{1}/);
  row.forEach((crate, index) => {
    if (crate !== "") {
      if (!stacks[index + 1]) stacks[index + 1] = [];
      stacks[index + 1].push(crate[1]);
    }
  });
}

// determine stack positions after moves
movesStr.split("\n").forEach((move) => {
  const [count, from, to] = move.match(/(\d+)/g)!;
  const crates = stacks[from].splice(-count);
  stacks[to].push(...crates);
});
const res = Object.values(stacks).reduce(
  (res, stack) => res + stack[stack.length - 1],
  ""
);

// console.timeEnd("Part 2");