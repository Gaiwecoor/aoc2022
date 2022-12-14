const fs = require("fs");
const input = fs.readFileSync("./inputs/14.txt", "utf8").trim().split("\n").map(structure => structure.split(" -> ").map(node => node.split(",").map(n => parseInt(n, 10))));
const { Grid } = require("./utils");

const regolith = new Grid();
let range = -Infinity;
for (const structure of input) {
    for (let i = 1; i < structure.length; i++) {
    const [x0, y0] = structure[i - 1];
    const [x1, y1] = structure[i];
    for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) {
      for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y++) {
        if (y > range) range = y;
        regolith.set(x, y, false);
      }
    }
  }
}

function sandfall(floor = false) {
  let filling = true;
  while (filling && !regolith.has(500, 0)) {
    let x = 500;
    let y = 0;
    while (true) {
      if (y == range + 1) {
        if (floor) regolith.set(x, y, true);
        else filling = false;
        break;
      } else if (!regolith.has(x, y + 1)) {
        y++;
        continue;
      } else if (!regolith.has(x - 1, y + 1)) {
        x--; y++;
        continue;
      } else if (!regolith.has(x + 1, y + 1)) {
        x++; y++;
        continue;
      }
      regolith.set(x, y, true);
      break;
    }
  }
  return regolith.filter(sand => sand).size;
}

console.log("Part 1:", sandfall());
console.log("Part 2:", sandfall(true));
