/**
 * Based on Java Algorithms and Clients https://algs4.cs.princeton.edu/code/
 * https://algs4.cs.princeton.edu/code/edu/princeton/cs/algs4/MaxPQ.java.html
 * https://algs4.cs.princeton.edu/code/edu/princeton/cs/algs4/MinPQ.java.html
 * 
 * Based on:
 * https://www.geeksforgeeks.org/building-heap-from-array/
 * https://www.baeldung.com/cs/merge-two-max-heaps/
 */

type Comparator<K> = (a: K, b: K) => boolean;

class BinaryHeapSet<K> {
  protected heap: K[] = [];

  protected static makeHeap<K>(source: K[], comparator:  Comparator<K>): K[] {
    const heapify = (arr: K[], i: number): void => {
      let curr = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;
  
      if (l < arr.length && comparator(arr[curr], arr[l])) {
        curr = l;
      }
  
      if (r < arr.length && comparator(arr[curr], arr[r])) {
        curr = r;
      }
  
      if (curr !== i) {
          BinaryHeapSet.exch<K>(arr, i, curr);
          heapify(arr, curr);
      }
    }

    const start = Math.floor(source.length / 2) - 1;

    for (let i = start; i >= 0; --i) {
      heapify(source, i);
    }

    return source;
  }

  protected static mergeHeaps<K>(source1: K[], source2: K[], comparator:  Comparator<K>): K[] {
    if (source1.length === 0) {
      return source2.slice(0);
    }
    if (source2.length === 0) {
      return source1.slice(0);
    }

    // Use stright forward solution. Other has errors
    return BinaryHeapSet.makeHeap(source1.concat(source2), comparator);
  }

  private static exch<K>(arr: K[], i: number, j: number): void {
    const swap = arr[i];
    arr[i] = arr[j];
    arr[j] = swap;
  }

  protected constructor(private comparator:  Comparator<K>) {
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

    this.heap[index] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.sink(index);

    return true;
  }

  replaceRoot(key: K): K | undefined {
    const root = this.heap[0];
    this.heap[0] = key;
    this.sink(0);
    return root;
  }

  update(key: K, newKeyOrUpdateFunc: K | ((oldKey: K) => K)): boolean {
    const index = this.heap.indexOf(key);
    if (index < 0) {
      return false;
    }

    if (newKeyOrUpdateFunc instanceof Function) {
      this.heap[index] = newKeyOrUpdateFunc(this.heap[index]);
    } else {
      this.heap[index] = newKeyOrUpdateFunc;
    }

    const parent = Math.floor((index - 1) / 2);
    if (parent >= 0 && this.compareByIndex(parent, index)) {
      this.swim(index);
    } else {
      let child = -1;
      const child1 = index * 2 + 1;
      const child2 = index * 2 + 2;

      if (child1 < this.heap.length && child2 < this.heap.length) {
        child = this.compareByIndex(child1, child2) ? child1 : child2;
      } else {
        if (child1 < this.heap.length) {
          child = child1;
        }
        if (child2 < this.heap.length) {
          child = child2;
        }
      }

      if (child >= 0 && !this.compareByIndex(index, child)) {
        this.sink(index);
      }
    }

    return true;
  }

  has(key: K): boolean {
    return this.heap.includes(key);
  }

  print(): string {
    let size = 1;
    let index = 0;
    let pad = 0;
    let result = '';
    while (index < this.heap.length) {
      let line = ''.padEnd(pad, ' ');
      let printed = 1;

      for (let i = index; i < index + size && i < this.heap.length; ++i) {
        line += this.heap[i] + (printed % 2 === 0 ? ' / ' : ', ');
        printed += 1;
      }
      line = line.substring(0, line.length - 2);
      pad = line.length;
      index += size;
      size *= 2;
      result += line + '\n';
    }

    return result;
  }

  /**
   * Destructive merge
   * 
   * @throws TypeError if heaps are not compatible
   */
  protected meldHeap(other: BinaryHeapSet<K>): void {
    if (other.heap.length === 0) {
      return;
    }

    if (this.heap.length === 0) {
      this.heap = other.heap;
      other.heap = [];
      return;
    }

    // Just for perfomance
    if (this.heap.length > other.heap.length) {
      const heap = this.heap;
      this.heap = other.heap;
      other.heap = heap;
    }

    const len = this.heap.length;
    for (let i = 0; i < len; ++i) {
      const top = this.heap[i];
      const otherTop = other.heap[0];
      if (this.comparator(top, otherTop)) {
        this.heap[i] = otherTop;
        other.heap[0] = top;
        other.sink(0);
      }
    }

    this.heap.push(...other.heap);

    for (let i = len, l = this.heap.length; i < l; ++i) {
      this.swim(i);
    }

    other.heap = [];
  }

  protected delRoot(): K | undefined {
    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const root = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.sink(0);
    return root;
  }
  
  private swim(index: number): void {
    while (index > 0 && this.compareByIndex(Math.floor((index - 1) / 2), index)) {
      BinaryHeapSet.exch(this.heap, Math.floor((index - 1) / 2), index);
      index = Math.floor((index - 1) / 2);
    }
  }

  private sink(index: number): void {
    while ((index - 1) * 2 <= this.heap.length) {
      let child = index * 2 + 1;
      // find and use max child to swap
      if (child < this.heap.length - 1 && this.compareByIndex(child, child + 1)) {
        child += 1;
      }
      if (!this.compareByIndex(index, child)) {
        break; 
      }

      BinaryHeapSet.exch(this.heap, index, child);
      index = child;
    }
  }
  
  private compareByIndex(i: number, j: number): boolean {
    return this.comparator(this.heap[i], this.heap[j]);
  }
}

export class BinaryMaxHeapSet<K> extends BinaryHeapSet<K> {
  static heapify<K>(source: K[]): BinaryMaxHeapSet<K> {
    const heap = new BinaryMaxHeapSet<K>();
    heap.heap = super.makeHeap(source.slice(0), BinaryMaxHeapSet.cmpFunc<K>);
    return heap;
  }

  /**
   * Non-Destructive merge
   */
  static merge<K>(heap1: BinaryMaxHeapSet<K>, heap2: BinaryMaxHeapSet<K>): BinaryMaxHeapSet<K> {
    const heap = new BinaryMaxHeapSet<K>();
    heap.heap = BinaryHeapSet.mergeHeaps(heap1.heap, heap2.heap, BinaryMaxHeapSet.cmpFunc<K>);
    return heap;
  }  

  private static cmpFunc = <K>(a: K, b: K) => a < b;  // Correct comparision!

  constructor(){
    super(BinaryMaxHeapSet.cmpFunc<K>);
  }

  max(): K | undefined {
    return this.heap[0];
  }

  delMax(): K | undefined {
    return this.delRoot();
  }

  meld(other: BinaryMaxHeapSet<K>): void {
    this.meldHeap(other);
  }
}

export class BinaryMinHeapSet<K> extends BinaryHeapSet<K> {
  /**
   * Source array is changed!!!
   * 
   * @param source 
   * @returns 
   */
  static heapify<K>(source: K[]): BinaryMinHeapSet<K> {
    const heap = new BinaryMinHeapSet<K>();
    heap.heap = super.makeHeap(source.slice(0), BinaryMinHeapSet.cmpFunc<K>);
    return heap;
  }

  /**
   * Non-Destructive merge
   */
  static merge<K>(heap1: BinaryMinHeapSet<K>, heap2: BinaryMinHeapSet<K>): BinaryMinHeapSet<K> {
    const heap = new BinaryMinHeapSet<K>();
    heap.heap = BinaryHeapSet.mergeHeaps(heap1.heap, heap2.heap, BinaryMinHeapSet.cmpFunc<K>);
    return heap;
  }  
  
  private static cmpFunc = <K>(a: K, b: K) => a > b;  // Correct comparision!

  constructor() {
    super(BinaryMinHeapSet.cmpFunc<K>);
  }

  min(): K | undefined {
    return this.heap[0];
  }

  delMin(): K | undefined {
    return this.delRoot();
  }

  meld(other: BinaryMinHeapSet<K>): void {
    this.meldHeap(other);
  }
}
