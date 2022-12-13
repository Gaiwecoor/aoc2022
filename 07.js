const fs = require("fs");
const input = fs.readFileSync("./inputs/07.txt", "utf8").trim().split("\n");

class Directory extends Map {
  constructor({ label, parent }) {
    super();
    this.label = label;
    this.parent = parent;
  }

  get count() {
    return this.super.size;
  }

  get size() {
    let size = 0;
    for (const [label, item] of this) {
      size += item.size;
    }
    return size;
  }
}

class File {
  constructor({ label, size, directory }) {
    this.label = label;
    this.size = size;
    this.parent = directory;
  }
}

const root = new Directory({ label: "/", parent: null });
const directories = new Set([root]);

function setup(data) {
  let cwd = root;

  for (const line of data) {
    const cmd = line.split(" ");
    if (cmd[0] == "$") { // Is Command
      const [, command, param] = cmd;
      if (command == "cd") {
        if (param == "/") cwd = root;
        else if (param == "..") cwd = cwd.parent;
        else cwd = cwd.get(param);
      }
      // Don't do anything with ls
    } else if (cmd[0] == "dir") { // Add dir
      const [, label] = cmd;
      const newDir = new Directory({ label, parent: cwd });
      cwd.set(label, newDir);
      directories.add(newDir);
    } else { // Add file
      const [size, label] = cmd;
      cwd.set(label, new File({ label, size: parseInt(size, 10), directory: cwd }));
    }
  }
}

function part1() {
  let smalldirs = 0;
  for (const dir of directories) {
    const size = dir.size;
    if (size <= 100000) smalldirs += size;
  }
  return smalldirs;
}

function part2() {
  const available = 70000000 - root.size;
  const needed = 30000000 - available;

  let delsize = Infinity;
  for (const dir of directories) {
    const size = dir.size;
    if (size >= needed && size < delsize) delsize = size;
  }
  return delsize;
}

setup(input);
console.log("Part 1:", part1());
console.log("Part 2:", part2());
