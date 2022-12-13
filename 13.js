const fs = require("fs");
const input = fs.readFileSync("./inputs/13.txt", "utf8").trim();

function compare(left, right) {
  // -1 means correct, 1 means incorrect, 0 is indeterminate

  // Both Integers
  if (typeof left === "number" && typeof right === "number") {
    if (left < right) return -1;
    if (left > right) return 1;
    return 0;
  }

  // Both Lists
  if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < Math.max(left.length, right.length); i++) {
      const result = compare(left[i], right[i]);
      if (result !== 0) return result;
    }
    return 0;
  }

  // One List
  if (Array.isArray(left) && typeof right == "number") {
    return compare(left, [right]);
  } else if (typeof left == "number" && Array.isArray(right)) {
    return compare([left], right);
  }

  // One Undefined (List length discrepancy)
  if (left === undefined && right !== undefined) {
    return -1;
  } else if (left !== undefined && right === undefined) {
    return 1;
  }

  throw Error("WHAA!?");
}

function part1() {
  const pairs = input.split("\n\n").map(pair => pair.split("\n").map(packet => JSON.parse(packet)));
  let sum = 0;
  for (let i = 0; i < pairs.length; i++) {
    if (compare(pairs[i][0], pairs[i][1]) == -1) sum += (i + 1);
  }
  return sum;
}

function part2() {
  const divider = [[[2]], [[6]]];
  const packets = input.replace(/\n\n/g, "\n").split("\n").map(packet => JSON.parse(packet)).concat(divider);
  packets.sort(compare);
  return (packets.indexOf(divider[0]) + 1) * (packets.indexOf(divider[1]) + 1);
}

console.log("Part 1:", part1());

console.log("Part 2:", part2());
