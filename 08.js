const fs = require("fs");
const { Grid, USet } = require("./utils");
const input = fs.readFileSync("./inputs/08.txt", "utf8").trim().split("\n");

const forest = new Grid();
const size = {};

function setup(data) {
  size.y = data.length;
  size.x = data[0].length;

  for (let y = 0; y < size.y; y++) {
    for (let x = 0; x < size.x; x++) {
      forest.set(x, y, parseInt(data[y][x], 10));
    }
  }
}

function part1() {
  const north = new USet();
  const east = new USet();
  const south = new USet();
  const west = new USet();

  for (let y = 0; y < size.y; y++) {
    let max = -Infinity;
    for (let x = 0; x < size.x; x++) {
      const tree = forest.get(x, y);
      if (tree > max) {
        west.add(`${x},${y}`);
        max = tree;
      }
    }

    max = -Infinity;
    for (let x = size.x - 1; x >= 0; x--) {
      const tree = forest.get(x, y);
      if (tree > max) {
        east.add(`${x},${y}`);
        max = tree;
      }
    }
  }

  for (let x = 0; x < size.x; x++) {
    let max = -Infinity;
    for (let y = 0; y < size.y; y++) {
      const tree = forest.get(x, y);
      if (tree > max) {
        north.add(`${x},${y}`);
        max = tree;
      }
    }

    max = -Infinity;
    for (let y = size.y - 1; y >= 0; y--) {
      const tree = forest.get(x, y);
      if (tree > max) {
        south.add(`${x},${y}`);
        max = tree;
      }
    }
  }

  return north.concat(east).concat(south).concat(west).size;
}

function part2() {
  let max = 0;
  for (let y = 1; y < size.y - 1; y++) {
    for (let x = 1; x < size.x - 1; x++) {
      const tree = forest.get(x, y);
      let view = 1;
      let count;

      // North
      count = 0;
      for (let j = y - 1; j >= 0; j--) {
        count++;
        if (forest.get(x, j) >= tree) break;
      }
      view *= count;

      // East
      count = 0;
      for (let i = x + 1; i < size.x; i++) {
        count++;
        if (forest.get(i, y) >= tree) break;
      }
      view *= count;

      // South
      count = 0;
      for (let j = y + 1; j < size.y; j++) {
        count++;
        if (forest.get(x, j) >= tree) break;
      }
      view *= count;

      // West
      count = 0;
      for (let i = x - 1; i >= 0; i--) {
        count++;
        if (forest.get(i, y) >= tree) break;
      }
      view *= count;

      if (view > max) max = view;
    }
  }
  return max;
}

setup(input);
console.log("Part 1:", part1());
console.log("Part 2:", part2());
