const fs = require("fs");
const input = fs.readFileSync("./inputs/01.txt", "utf8").split("\n\n").map(e => e.split("\n").map(c => parseInt(c, 10)));

function part1() {
  let max = 0;
  for (const elf of input) {
    let calories = 0;
    for (const snack of elf) {
      calories += snack;
    }
    if (calories > max) max = calories;
  }
  return max;
}

function part2() {
  const calories = input.map(elf => elf.reduce((c, a) => a + c, 0));
  calories.sort((a, b) => b - a);
  return calories[0] + calories[1] + calories[2];
}

console.log("Part 1:", part1());

console.log("Part 2:", part2());
