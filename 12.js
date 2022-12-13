const fs = require("fs");
const input = fs.readFileSync("./inputs/12.txt", "utf8").trim().split("\n");
const { Point, Grid, UMap, USet } = require("./utils");

class State extends Point {
  constructor({ x, y, z, steps = []}) {
    super({ x, y, z });
    this.steps = new USet([...steps]);
  }

  get distance() {
    return this.steps.size + super.distance(target);
  }
}

let current;
let target;
const map = new Grid();

const deltas = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 }
];

function setup() {
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      let char = input[y][x];
      if (char == "S") {
        char = "a";
        current = new State({ x, y, z: char.charCodeAt(0) - 97, steps: [] });
      } else if (char == "E") {
        char = "z";
        target = new Point({ x, y, z: char.charCodeAt(0) - 97 });
      }

      map.set(x, y, new Point({ x, y, z: char.charCodeAt(0) - 97 }));
    }
  }
};

function hike() {
  try {
    const pool = new Grid();
    const complete = new Grid();

    while (current.label !== target.label) {
      const { x, y } = current;
      for (const delta of deltas) {
        const x0 = x + delta.x;
        const y0 = y + delta.y;
        const step = map.get(x0, y0);
        if (step && (step.z - current.z <= 1) && !complete.has(x0, y0) && !pool.has(x0, y0)) {
          n = new State(step);
          n.steps = current.steps.clone();
          n.steps.add(current.label);
          pool.set(x0, y0, n);
        }
      }

      complete.set(x, y, current);
      current = pool.sort((a, b) => a[1].distance - b[1].distance).first();
      pool.delete(current.x, current.y);
    }
    return current.steps.size;
  } catch(error) {
    return Infinity;
  }
}

function part1() {
  return hike();
}

function part2() {
  let min = Infinity;
  for (const [, start] of map.filter(point => point.z == 0)) {
    let base = start;
    current = new State(start);
    min = Math.min(min, hike());
  };

  return min;
}

setup();

console.log("Part 1:", part1());
console.log("Part 2:", part2());
