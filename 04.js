const fs = require("fs");
const exp = /(\d+)-(\d+),(\d+)-(\d+)/;
const input = fs.readFileSync("./inputs/04.txt", "utf8").trim().split("\n").map(pair => exp.exec(pair));

function part1(data) {
  let contained = 0;
  for (const pair of data) {
    const [, a1, a2, b1, b2] = pair.map(i => parseInt(i, 10));
    if (((a1 >= b1) && (a2 <= b2)) || ((a1 <= b1) && (a2 >= b2))) {
      contained++;
    }
  }
  return contained;
}

function part2(data) {
  let overlapped = 0;
  for (const pair of data) {
    const [, a1, a2, b1, b2] = pair.map(i => parseInt(i, 10));

    if ((a1 < b1 && a2 < b1) || (b1 < a1 && b2 < a1)) {
      continue;
    }
    overlapped++;
  }
  return overlapped;
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
