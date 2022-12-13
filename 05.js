const fs = require("fs");
const stacks = fs.readFileSync("./inputs/05a.txt", "utf8").trim().split("\n");
const moves = fs.readFileSync("./inputs/05b.txt", "utf8").trim().split("\n").map(move => /move (\d+) from (\d+) to (\d+)/.exec(move));

class Stack extends Array {
  constructor(items) {
    super(...items);
  }

  to(other, n = 1, upgrade = false) {
    if (upgrade) {
      let moving = [];
      for (let i = 0; i < n; i++) {
        moving.push(this.pop());
      }
      for (const crate of moving.reverse()) {
        other.push(crate);
      }
    } else {
      for (let i = 0; i < n; i++) {
        other.push(this.pop());
      }
    }
    return this;
  }
}

function shellGame(upgrade = false) {
  const stacked = stacks.map(stack => new Stack(stack));
  for (const move of moves) {
    const [, n, from, to] = move;
    stacked[from - 1].to(stacked[to - 1], n, upgrade);
  }

  let msg = "";
  for (const stack of stacked) msg += stack[stack.length - 1]
  return msg;
}

console.log("Part 1:", shellGame(false));
console.log("Part 2:", shellGame(true));
