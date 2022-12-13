class Link {
  constructor({ value, before, after }, closed = false) {
    this.value = value;
    this.before = before;
    this.after = after;
  }

  addAfter(value, returnNew = false) {
    const item = new this.constructor({ value, before: this, after: this.after });
    this.after.before = item;
    this.after = item;
    return returnNew ? item : this;
  }

  addBefore(value, returnNew = false) {
    const item = new this.constructor({ value, before: this.before, after: this });
    this.before.after = item;
    this.before = item;
    return returnNew ? item : this;
  }

  get first() {
    let current = this;
    while (current.before) {
      current = current.before;
    }
    return current;
  }

  get last() {
    let current = this;
    while (current.after) {
      current = current.after;
    }
    return current;
  }

  next(n = 1) {
    let current = this;
    for (let i = 0; i < n; i++) {
      current = current?.after;
    }
    return current;
  }

  previous(n = 1) {
    let current = this;
    for (let i = 0; i < n; i++) {
      current = current?.before;
    }
    return current;
  }

  removeAfter(returnRemoved = false) {
    const removed = this.after;
    removed.after.before = this;
    this.after = removed.after;
    return returnRemoved ? removed : this;
  }

  removeBefore(returnRemoved = false) {
    const removed = this.before;
    removed.before.after = this;
    this.before = removed.before;
    return returnRemoved ? removed : this;
  }
}

class Point {
  constructor(pt = {x: 0, y: 0, z: 0}) {
    this.x = pt.x;
    this.y = pt.y;
    this.z = pt.z
  }

  distance(other) {
    return Math.abs(other.x - this.x) + Math.abs(other.y - this.y) + (Math.abs(other.z - this.z) || 0);
  }

  dx(other) {
    return (other.x - this.x);
  }

  dy(other) {
    return (other.y - this.y);
  }

  dz(other) {
    return (other.z - this.z);
  }

  get label() {
    return `${this.x},${this.y}${this.z !== undefined ? `,${this.z}` : ""}`;
  }
}

class Tree {
  constructor({ label, value }) {
    this.label = label;
    this.value = value;
    this.parents = new UMap();
    this.children = new UMap();
  }

  addChild({ label, value }, returnNew = false) {
    const node = new this.constructor({ label, value });
    this.children.set(node.label, node);
    node.parents.set(this.label, this);
    return returnNew ? node : this;
  }

  addParent({ label, value }, returnNew = false) {
    const node = new this.constructor({ label, value });
    this.parents.set(node.label, node);
    node.children.set(this.label, this);
    return returnNew ? node : this;
  }

  connectChild(other) {
    this.children.set(other.label, other);
    other.parents.set(this.label, this);
    return this;
  }

  connectParent(other) {
    this.parents.set(other.label, other);
    other.children.set(this.label, this);
    return this;
  }
}

class USet extends Set {
  constructor(...data) {
    super(...data);
  }

  clone() {
    const cloned = new this.constructor();
    for (const item of this) {
      cloned.add(item);
    }
    return cloned;
  }

  concat(other) {
    const combined = new this.constructor();
    for (const item of this) {
      combined.add(item);
    }
    for (const item of other) {
      combined.add(item);
    }
    return combined;
  }

  each(fn) {
    for (const item of this) {
      fn(item, this);
    }
    return this;
  }

  every(fn) {
    for (const item of this) {
      if (!fn(item, this)) return false;
    }
    return true;
  }

  equals(other) {
    for (const item of this) {
      if (!other.has(item)) return false;
    }
    return (this.size === other.size)
  }

  filter(fn) {
    const filtered = new this.constructor();
    for (const item of this) {
      if (fn(item, this)) filtered.add(item);
    }
    return filtered;
  }

  find(fn) {
    for (const item of this) {
      if (fn(item, this)) return item;
    }
  }

  first() {
    for (const item of this) {
      return item;
    }
  }

  hasAll(...items) {
    for (const item of items) {
      if (!this.has(item)) return false;
    }
    return true;
  }

  hasAny(...items) {
    for (const item of items) {
      if (this.has(item)) return true;
    }
    return false;
  }

  intersect(other) {
    const intersected = this.clone();
    for (const item of intersected) {
      if (!other.has(item)) intersected.delete(item);
    }
    return intersected;
  }

  last() {
    let element;
    for (const item of this) {
      element = item;
    }
    return item;
  }

  map(fn) {
    const mapped = new this.constructor();
    for (const item of this) {
      mapped.add(fn(item, this));
    }
    return mapped;
  }

  reduce(fn, defaultValue) {
    let accumulator = defaultValue;
    for (const item of this) {
      accumulator = fn(accumulator, item, this);
    }
    return accumulator;
  }

  some(fn) {
    for (const item of this) {
      if (fn(item, this)) return true;
    }
    return false;
  }

  sort(fn) {
    return new this.constructor(Array.from(this).sort(fn));
  }
}

class UMap extends Map {
  constructor(...data) {
    super(...data);
  }

  clone() {
    const cloned = new this.constructor();
    for (const [key, value] of this) {
      cloned.set(key, value);
    }
    return cloned;
  }

  concat(other) {
    const combined = new this.constructor();
    for (const [key, value] of other) {
      combined.set(key, value);
    }
    for (const [key, value] of this) {
      combined.set(key, value);
    }
    return combined;
  }

  each(fn) {
    for (const [key, value] of this) {
      fn(value, key, this);
    }
    return this;
  }

  every(fn) {
    for (const [key, value] of this) {
      if (!fn(value, key, this)) return false;
    }
    return true;
  }

  filter(fn) {
    const filtered = new this.constructor();
    for (const [key, value] of this) {
      if (fn(value, key, this)) filtered.set(key, value);
    }
    return filtered;
  }

  find(fn) {
    for (const [key, value] of this) {
      if (fn(value, key, this)) return value;
    }
  }

  first() {
    for (const [key, value] of this) {
      return value;
    }
  }

  hasAll(...keys) {
    for (const key of keys) {
      if (!this.has(key)) return false;
    }
    return true;
  }

  hasAny(...keys) {
    for (const key of keys) {
      if (this.has(key)) return true;
    }
    return false;
  }

  intersect(other) {
    const intersected = this.clone();
    for (const [key, value] of intersected) {
      if (!other.has(key) || (other.get(key) != value)) intersected.delete(key);
    }
    return intersected;
  }

  last() {
    let element;
    for (const [key, value] of this) {
      element = value;
    }
    return value;
  }

  map(fn) {
    const mapped = new this.constructor();
    for (const [key, value] of this) {
      mapped.set(key, fn(value, key, this));
    }
    return mapped;
  }

  reduce(fn, defaultValue) {
    let accumulator = defaultValue;
    for (const [key, value] of this) {
      accumulator = fn(accumulator, item, key, this);
    }
    return accumulator;
  }

  some(fn) {
    for (const [key, value] of this) {
      if (fn(value, key, this)) return true;
    }
    return false;
  }

  sort(fn) {
    const values = Array.from(this).sort(fn);
    const sorted = new this.constructor();
    for (const [key, value] of values) {
      sorted.set(key, value);
    }
    return sorted;
  }
}

class Grid extends UMap {
  constructor() {
    super();
  }

  delete(x, y) {
    return super.delete(`${x},${y}`);
  }

  filter(fn) {
    const filtered = new this.constructor();
    for (const [key, value] of this) {
      if (fn(value, key, this)) filtered.set(...key.split(","), value);
    }
    return filtered;
  }

  get(x, y) {
    return super.get(`${x},${y}`);
  }

  has(x, y) {
    return super.has(`${x},${y}`);
  }

  set(x, y, value) {
    return super.set(`${x},${y}`, value);
  }

  sort(fn) {
    const values = Array.from(this).sort(fn);
    const sorted = new this.constructor();
    for (const [key, value] of values) {
      sorted.set(...key.split(",").map(c => parseInt(c, 10)), value);
    }
    return sorted;
  }
}

class Web {
  constructor({ label, value }) {
    this.label = label;
    this.value = value;
    this.connections = new UMap();
  }

  addNode({ label, value }, returnNew = false) {
    const node = new this.constructor({ label, value });
    this.connectTo(node);
    return returnNew ? node : this;
  }

  connectTo(other) {
    this.connections.set(other.label, other);
    other.connections.set(this.label, this);
    return this;
  }
}

module.exports = {
  Grid,
  Link,
  Point,
  Tree,
  UMap,
  USet,
  Web,
}
