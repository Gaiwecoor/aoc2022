const fs = require("fs");
const input = fs.readFileSync("./inputs/06.txt", "utf8").trim();

function detect(length) {
  for (let i = 0; i < input.length - length; i++) {
    const characters = new Set(input.substr(i, length).split(""));
    if (characters.size == length) {
      return i + length;
    }
  }
}

console.log("Part 1:", detect(4));
console.log("Part 2:", detect(14));
