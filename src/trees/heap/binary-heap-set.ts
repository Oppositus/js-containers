/**
 * Based on Java Algorithms and Clients https://algs4.cs.princeton.edu/code/
 * https://algs4.cs.princeton.edu/code/edu/princeton/cs/algs4/MaxPQ.java.html
 * https://algs4.cs.princeton.edu/code/edu/princeton/cs/algs4/MinPQ.java.html
 */

class BinaryHeapSet<K> {
  protected heap: K[] = [];

  protected constructor(private comparator: (a: K, b: K) => boolean) {    
  }

  get size(): number {
    return this.heap.length;
  }

  get empty(): boolean {
    return this.heap.length === 0;
  }

  insert(key: K): number {
    const index = this.heap.push(key) - 1;
    this.swim(index);
    return this.size;
  }

  delete(key: K): boolean {
    const index = this.heap.indexOf(key);
    if (index < 0) {
      return false;
    }

    this.exch(index, this.heap.length - 1);
    this.heap.pop();
    this.sink(index);

    return true;
  }

  replace(key: K): K | undefined {
    const root = this.heap[0];
    this.heap[0] = key;
    this.sink(0);
    return root;
  }

  merge(): void {

  }

  meld(): void {

  }

  update(key: K, newKey: K): boolean {
    const index = this.heap.indexOf(key);
    if (index < 0) {
      return false;
    }

    this.heap[index] = newKey;

    const parent = (index - 1) / 2;
    if (parent >= 0 && this.compare(parent, index)) {
      this.swim(index);
    } else {
      const child1 = index * 2 + 1;
      const child2 = index * 2 + 2;

      const minChild = this.compare(child1, child2) ? child1 : child2;
      if (!this.compare(index, minChild)) {
        this.sink(index);
      }
    }
  }

  has(key: K): boolean {
    return this.heap.includes(key);
  }

  // todo
  /*
  increaseKey(key: K, delta: K): boolean {
    const index = this.heap.indexOf(key);
    if (index < 0) {
      return false;
    }

    this.heap[index] += delta;
    this.swim(index);

    return true;
  }
  */

  // todo
  /*
  decreaseKey(key: K, delta: K): boolean {
    const index = this.heap.indexOf(key);
    if (index < 0) {
      return false;
    }
    this.heap[index] -= delta;
    this.sink(index);

    return true;
  }
  */

  // print(): string {
  //   let size = 1;
  //   let index = 0;
  //   let pad = 0;
  //   let result = '';
  //   while (index < this.heap.length) {
  //     let line = ''.padEnd(pad, ' ');
  //     let printed = 1;

  //     for (let i = index; i < index + size && i < this.heap.length; ++i) {
  //       line += this.heap[i] + (printed % 2 === 0 ? ' / ' : ', ');
  //       printed += 1;
  //     }
  //     line = line.substring(0, line.length - 2);
  //     pad = line.length;
  //     index += size;
  //     size *= 2;
  //     result += line + '\n';
  //   }

  //   return result;
  // }

  protected root(): K | undefined {
    return this.heap[0];
  }

  protected delRoot(): K | undefined {
    const root = this.heap[0];
    this.exch(0, this.heap.length - 1);
    this.heap.pop();
    this.sink(0);
    return root;
  }
  
  private swim(index: number): void {
    while (index > 0 && this.compare(Math.floor((index - 1) / 2), index)) {
      this.exch(Math.floor((index - 1) / 2), index);
      index = Math.floor((index - 1) / 2);
    }
  }

  private sink(index: number): void {
    while ((index - 1) * 2 <= this.heap.length) {
      let child = index * 2 + 1;
      // find and use max child to swap
      if (child < this.heap.length - 1 && this.compare(child, child + 1)) {
        child += 1;
      }
      if (!this.compare(index, child)) {
        break; 
      }
      this.exch(index, child);
      index = child;
    }
  }
  
  private exch(i: number, j: number): void {
    const swap = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = swap;
  }

  private compare(i: number, j: number): boolean {
    return this.comparator(this.heap[i], this.heap[j]);
  }
}

export class BinaryMaxHeapSet<K> extends BinaryHeapSet<K> {
  constructor() {
    super((a: K, b: K) => a < b); // Correct!
  }

  max(): K | undefined {
    return this.root();
  }

  delMax(): K | undefined {
    return this.delRoot();
  }
}

export class BinaryMinHeapSet<K> extends BinaryHeapSet<K> {
  constructor() {
    super((a: K, b: K) => a > b); // Correct!
  }

  min(): K | undefined {
    return this.root();
  }

  delMin(): K | undefined {
    return this.delRoot();
  }
}
