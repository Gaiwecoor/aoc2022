const fs = require("fs");
const input = fs.readFileSync("./inputs/11.txt", "utf8").trim().split("\n\n");

class Monkey {
  constructor(line) {
    const exp = /Monkey \d:\n  Starting items: (.+)\n  Operation: new = (.+)\n  Test: divisible by (\d+)\n    If true: throw to monkey (\d+)\n    If false: throw to monkey (\d+)/
    const [, items, op, mod, pass, fail] = line.match(exp);

    this.items = items.split(", ").map(item => parseInt(item, 10)).map(item => new Item(item));
    this.op = old => eval(`let old = ${old.worry}; ${op}`);
    this.test = [mod, pass, fail].map(e => parseInt(e, 10));

    this.inspectCount = 0;
  }

  inspect(relief = true) {
    const item = this.items[0];
    if (item) {
      item.worry = this.op(item);
      if (relief) item.worry = Math.floor(item / 3);
      item.worry %= this.tree.safety;
      this.inspectCount++;
    }
    return this;
  }

  pass() {
    const [ mod, pass, fail ] = this.test;
    const item = this.items.shift();
    const target = (item % mod == 0) ? pass : fail;
    this.tree[target].items.push(item);
    return item;
  }
}

class Tree extends Array {
  constructor(...tree) {
    super();
    if (Array.isArray(tree[0])) tree = tree[0];
    for (const monkey of tree) {
      this.push(monkey);
    }
  }

  get safety() {
    let mods = this.map(monkey => monkey.test[0]);
    return mods.reduce((a, c) => a * c, 1);
  }
}

class Item {
  constructor(worry) {
    this.worry = worry;
  }

  valueOf() {
    return this.worry;
  }

  toNumber() {
    return this.worry;
  }
}

function setup() {
  const tree = new Tree(input.map(monkey => new Monkey(monkey)));
  for (const monkey of tree) {
    monkey.tree = tree;
  }
  return tree;
}

function keepAway(rounds, relief = true) {
  const tree = setup();
  for (let round = 0; round < rounds; round++) {
    for (let monkey of tree) {
      while (monkey.items.length > 0) {
        monkey.inspect(relief).pass();
      }
    }
  }
  tree.sort((a, b) => b.inspectCount - a.inspectCount);
  return tree[0].inspectCount * tree[1].inspectCount;
}

console.log("Part 1:", keepAway(20, true));

console.log("Part 2:", keepAway(10000, false));
