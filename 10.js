const fs = require("fs");
const input = fs.readFileSync("./inputs/10.txt", "utf8").trim().split("\n").map(line => line.split(" "));

class Cpu {
  constructor(crt = false) {
    this.cycles = 0;
    this.x = 1;
    this.strength = 0;
    this.crt = crt;
    this.line = "";
  }

  cycle(n = 1) {
    for (let i = 0; i < n; i++) {
      if (this.crt) {
        // CRT (Part 2)
        const pos = this.cycles % 40;
        if (Math.abs(this.x - pos) <= 1) this.line += "#";
        else this.line += " ";

        this.cycles++;

        if (this.cycles % 40 == 0) {
          console.log(this.line);
          this.line = "";
        }
      } else {
        // No CRT (Part 1)
        this.cycles++;
        if ((this.cycles - 20) % 40 == 0) {
          this.strength += this.signal;
        }
      }
    }
  }

  run(op) {
    const [fn, value] = op;
    switch (fn) {
      case "addx":
        this.cycle(2);
        this.x += parseInt(value, 10);
        break;
      case "noop":
        this.cycle();
        break;
    }
  }

  get signal() {
    return this.cycles * this.x;
  }
}

function execute(cycles, crt = false) {
  const cpu = new Cpu(crt);
  let i = 0;
  while (cpu.cycles < cycles) {
    cpu.run(input[i++]);
  }
  return cpu.strength;
}

console.log("Part 1:", execute(220));
console.log("Part 2:", execute(240, true));
