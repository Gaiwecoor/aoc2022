const fs = require("fs");
const { Point } = require("./utils");
const input = fs.readFileSync("./inputs/09.txt", "utf8").trim().split("\n");

class Knot extends Point {
  constructor(pt) {
    super(pt);
    this.traversed = new Set([this.label]);
  }

  adjacent(other) {
    if (Math.abs(this.dx(other)) > 1) return false;
    if (Math.abs(this.dy(other)) > 1) return false;
    return true;
  }

  follow(other) {
    if (this.adjacent(other)) return;

    if (this.dx(other) > 0) {
      this.x++;
    } else if (this.dx(other) < 0) {
      this.x--;
    }

    if (this.dy(other) > 0) {
      this.y++;
    } else if (this.dy(other) < 0) {
      this.y--;
    }

    this.traversed.add(this.label);
    this.followedBy?.follow(this);
    return this;
  }

  move(instruction) {
    const [dir, mag] = instruction.split(" ");
    for (let i = 0; i < parseInt(mag, 10); i++) {
      switch(dir) {
        case "U":
          this.y++;
          break;
        case "R":
          this.x++;
          break;
        case "D":
          this.y--;
          break;
        case "L":
          this.x--;
          break;
      }
      this.traversed.add(this.label);
      this.followedBy?.follow(this);
    }
    return this;
  }
}

function snake(length) {
  const rope = Array(length);
  for (let i = 0; i < length; i++) {
    const knot = new Knot();
    if (i > 0) rope[i - 1].followedBy = knot;
    rope[i] = knot;
  }
  for (const instruction of input) {
    rope[0].move(instruction);
  }
  return rope[length - 1].traversed.size;
};

console.log("Part 1:", snake(2));
console.log("Part 2:", snake(10));
