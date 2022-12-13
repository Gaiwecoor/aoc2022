const fs = require("fs");
const input = fs.readFileSync("./inputs/03.txt", "utf8").trim().split("\n");

function value(item) {
  let code = item.charCodeAt(0);
  if (code > 95) return code - 96;
  else return code - 38;
}

function part1(data) {
  let priority = 0;
  for (const rucksack of data) {
    const compA = new Set(rucksack.substr(0, rucksack.length / 2).split(""));
    const compB = new Set(rucksack.substr(rucksack.length / 2).split(""));
    for (const item of compA) {
      if (compB.has(item)) {
        priority += value(item);
      }
    }
  }

  return priority;
}

function part2(data) {
  let priority = 0;
  for (let i = 0; i < data.length; i += 3) {
    const a = new Set(data[i].split(""));
    const b = new Set(data[i + 1].split(""));
    const c = new Set(data[i + 2].split(""));

    for (const item of a) {
      if (!b.has(item)) continue;
      if (!c.has(item)) continue;
      priority += value(item);
      break;
    }
  }
  return priority;
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
