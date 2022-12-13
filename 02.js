const fs = require("fs");
const input = fs.readFileSync("./inputs/02.txt", "utf8").trim().split("\n").map(e => e.split(" "));

function part1(strategy) {
  const values = {
    A: 1, B: 2, C: 3,
    X: 1, Y: 2, Z: 3,
  }
  let score = 0;

  for (const [ them, me ] of strategy) {
    const diff = values[me] - values[them];
    switch (diff) {
      case 1:
      case -2:
        score += 6;
        break;
      case 0:
        score += 3;
        break;
    }
    score += values[me];
  }

  return score;
}

function part2(strategy) {
  const values = {
    A: 1, B: 2, C: 3,
    X: 0, Y: 3, Z: 6,
  }
  let score = 0;

  for (const [ them, outcome ] of strategy) {
    score += values[outcome];
    switch (outcome) {
      case "X":
        score += ((values[them] + 1) % 3) + 1;
        break;
      case "Y":
        score += values[them];
        break;
      case "Z":
        score += (values[them] % 3) + 1;
        break;
    }
  }

  return score;
}

console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
