/**
 * Based on Java Algorithms and Clients https://algs4.cs.princeton.edu/code/
 * https://algs4.cs.princeton.edu/code/edu/princeton/cs/algs4/RedBlackBST.java.html
 */

interface RBTreeNode<K, V> {
  key: K;
  value: V;
  left: RBTreeNode<K, V> | null;
  right: RBTreeNode<K, V> | null;
  /**
   * Use MSB to store "red" flag. Use other bits to store size.
   * 
   * To get red flag:                  Boolean(sizeAndRed & MASK)
   * To set red flag:                  sizeAndRed |= MASK
   * To reset red flag:                sizeAndRed &= MASK_NOT
   * To switch red flag:               sizeAndRed ^= MASK
   * To copy red flag from other node: node.sizeAndRed = (other.sizeAndRed & MASK) | (node.sizeAndRed & MASK_NOT)
   * 
   * To get size: sizeAndRed & MASK_NOT
   * To set size: sizeAndRed = (sizeAndRed & MASK) | newSize
   */
  sizeAndRed: number;
}

interface IteratorState<K, V> {
  parents: [RBTreeNode<K, V>, boolean][];
  center: boolean;
}

const MASK = 1 << Number.MAX_SAFE_INTEGER.toString(2).length;
const MASK_NOT = ~MASK;

export class RedBlackTree<K, V> {
  private root: RBTreeNode<K, V> | null = null;
  private iteratorState: IteratorState<K, V> | null = null;

  /**
   * Number of elemnts in the tree
   * 
   * @returns Number of elemnts in the tree
   */
  get size(): number {
    return (this.root?.sizeAndRed ?? 0) & MASK_NOT;
  }

  /**
   * True if tree is empty (there are no elements in the tree)
   * 
   * @returns true if tree is empty
   */
  get empty(): boolean {
    return !this.root;
  }

  /**
   * Remove all elements from the tree
   * 
   * @returns Number of removed elements (size of the tree before clearing it)
   */
  clear(): number {
    const size = this.size;
    this.root = null;
    return size;
  }

  /**
   * Delete element with specific key from the tree
   * 
   * @param key Key to delete
   * @returns true if element was deleted, false if there is no such element
   * @throws TypeError if key is not specified
   */
  delete(key: K): boolean {
    if (key == null) { // null or undefined keys are not allowed
      throw new TypeError('Key is empty');
    }

    if (!this.has(key)) {
      return false;
    }

    // if both children of root are black, set root to red
    if (!((this.root.left?.sizeAndRed ?? 0) & MASK) && !((this.root.right?.sizeAndRed ?? 0) & MASK)) {
      this.root.sizeAndRed |= MASK;
    }

    this.root = this.innerDelete(this.root, key);

    if (this.root) {
      this.root.sizeAndRed &= MASK_NOT;
    }
  }

  /**
   * Delete element with minimal key from the tree
   */
  deleteMin(): void {
    if (!this.root) {
      return;
    }

    // if both children of root are black, set root to red
    if (!((this.root.left?.sizeAndRed ?? 0) & MASK) && !((this.root.right?.sizeAndRed ?? 0) & MASK)) {
      this.root.sizeAndRed |= MASK;
    }

    this.root = this.innerDeleteMin(this.root);

    if (this.root) {
      this.root.sizeAndRed &= MASK_NOT;
    }
  }

  /**
   * Delete element with maximal key from the tree
   */
  deleteMax(): void {
    if (!this.root) {
      return;
    }

    // if both children of root are black, set root to red
    if (!((this.root.left?.sizeAndRed ?? 0) & MASK) && !((this.root.right?.sizeAndRed ?? 0) & MASK)) {
      this.root.sizeAndRed |= MASK;
    }

    this.root = this.innerDeleteMax(this.root);

    if (this.root) {
      this.root.sizeAndRed &= MASK_NOT;
    }
  }

  /**
   * Check that the tree contains element with given key
   * 
   * @param key Key to check
   * @returns true if the tree has element with given key
   */
  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  /**
   * Add element to the tree. If the tree contains element with given key it's value is changed
   * 
   * @param key Key to add (or modify if the tree contains such key)
   * @param value Value to associate with the key
   * @returns Size of the tree after adding the element
   * @throws TypeError if key is not specified or value is not specified
   */
  add(key: K, value: V): number {
    if (key == null) { // null or undefined keys are not allowed
      throw new TypeError('Key is empty');
    }
    if (value == null) { // no null and undefined
      throw new TypeError('Value is empty');
    }

    this.root = this.innerAdd(this.root, key, value);
    this.root.sizeAndRed &= MASK_NOT;

    return this.root.sizeAndRed & MASK_NOT;
  }

  /**
   * Get value associaited with given key
   * 
   * @param key Key to get from the tree
   * @returns Value assiciated with the key or undefined if the tree does not contains the key
   * @throws TypeError if key is not specified
   */
  get(key: K): V | undefined {
    if (key == null) { // null or undefined keys are not allowed
      throw new TypeError('Key is empty');
    }

    return this.innerGet(this.root, key)?.value;
  }

  /**
   * Get maximal element of the tree
   * 
   * @returns [Key, Value] pair of maximal element or undefined if the tree is empty
   */
  max(): [K, V] | undefined {
    const node = this.innerMinMax(this.root, 'right');
    return node ? [node.key, node.value] : undefined;
  }

  /**
   * Get minimal element of the tree
   * 
   * @returns [Key, Value] pair of minimal element or undefined if the tree is empty
   */
  min(): [K, V] | undefined {
    const node = this.innerMinMax(this.root, 'left');
    return node ? [node.key, node.value] : undefined;
  }

  /**
   * Height of the tree
   * 
   * @returns Height of the tree
   */
  height(): number {
    return this.innerHeight(this.root);
  }

  /**
   * Returns the largest key in the tree less than or equal to the given key
   * 
   * @returns [Key, Value] of found node or undefined
   * @throws TypeError if key is not specified
   */
  floor(key: K): [K, V] | undefined {
    if (key == null) { // null or undefined keys are not allowed
      throw new TypeError('Key is empty');
    }
    if (!this.root) {
      return undefined;
    }

    const node = this.innerFloor(this.root, key);
    return node ? [node.key, node.value] : undefined;
  }

  /**
   * Returns the smallest key in the tree greater than or equal to the given key
   * 
   * @returns [Key, Value] of found node or undefined
   * @throws TypeError if key is not specified
   */
  ceil(key: K): [K, V] | undefined {
    if (key == null) { // null or undefined keys are not allowed
      throw new TypeError('Key is empty');
    }
    if (!this.root) {
      return undefined;
    }
    const node = this.innerCeil(this.root, key);
    return node ? [node.key, node.value] : undefined;
  }

  /**
   * Return the key in the tree of a given rank.
   * This key has the property that there are rank keys in
   * the tree that are smaller. In other words, this key is the
   * (rank + 1)st smallest key in the tree.
   * 
   * @returns [Key, Value] of found node or undefined
   */
  select(rank: number): [K, V] | undefined {
    if (rank < 0 || rank > this.size) {
      return undefined;
    }
    const node = this.innerSelect(this.root, rank);
    return node ? [node.key, node.value] : undefined;
  }

  /**
   * Return the number of keys in the tree strictly less than key.
   * 
   * @returns number of keys in the tree strictly less than key.
   * @throws TypeError if key is not specified
   */
  rank(key: K): number {
    if (key == null) { // null or undefined keys are not allowed
      throw new TypeError('Key is empty');
    }
    return this.innerRank(this.root, key);
  }

  /**
   * Returns the number of keys in the tree in the given range.
   * If from > to returns 0
   * 
   * @param from Minimal value of the key
   * @param to Maximal value of the key
   * @returns Number of keys in range from..to
   * @throws TypeError if from is not specified or to is not specified
   */
  sizeOfRange(from: K, to: K): number {
    if (from == null) { // null or undefined keys are not allowed
      throw new TypeError('Key from is empty');
    }
    if (to == null) { // null or undefined keys are not allowed
      throw new TypeError('Key to is empty');
    }

    if (from > to) {
      return 0;
    }
    if (this.has(to)) {
      return this.rank(to) - this.rank(from) + 1;
    } else {
      return this.rank(to) - this.rank(from);
    }
  }

  /**
   * Iterator for [Key, Value] pairs of the tree. Result is sorted by Key from min to max
   * If tree is modified during iterating result of iteration is unspecified
   * 
   * @returns Iterable iterator that can be used in for-of cycle etc.
   */
  entries(): IterableIterator<[K, V]> {
    const iterator = this.innerTraverse();

    return {
      [Symbol.iterator]() {
        return this;
      },

      next(): IteratorResult<[K, V], [K, V]> {
        const entrie = iterator.next();

        return {
          value: entrie.value,
          done: entrie.done
        }
      }
    }; 
  }

  /**
   * Iterator for Keys of the tree. Result is sorted by Key from min to max
   * If tree is modified during iterating result of iteration is unspecified
   * 
   * @returns Iterable iterator that can be used in for-of cycle etc.
   */
  keys(): IterableIterator<K> {
    const iterator = this.innerTraverse();

    return {
      [Symbol.iterator]() {
        return this;
      },

      next(): IteratorResult<K, K> {
        const entrie = iterator.next();

        return {
          value: entrie.value?.[0],
          done: entrie.done
        }
      }
    };
  }

  /**
   * Iterator for Values of the tree. Result is sorted by Key from min to max
   * If tree is modified during iterating result of iteration is unspecified
   * 
   * @returns Iterable iterator that can be used in for-of cycle etc.
   */
  values(): IterableIterator<V> {
    const iterator = this.innerTraverse();

    return {
      [Symbol.iterator]() {
        return this;
      },

      next(): IteratorResult<V, V> {
        const entrie = iterator.next();

        return {
          value: entrie.value?.[1],
          done: entrie.done
        }
      }
    };
  }

  /**
   * Convert the tree to array. Each array element contains array of [Key, Value] pair.
   * Result is sorted by Key from min to max
   * 
   * @returns Array of [Key, Value] pairs
   */
  toArray(): [K, V][] {
    const iterator = this.innerTraverse();
    return Array.from({
      [Symbol.iterator]() { return iterator; }
    });
  }

  /**
   * Iterator for [Key, Value] pairs in the Key range from..to (including).
   * Result is sorted by Key from min to max
   * If tree is modified during iterating result of iteration is unspecified
   * 
   * @param from Minimal value of the key (including)
   * @param to Maximal value of the key (including)
   * @returns Iterable iterator that can be used in for-of cycle etc.
   */
  entriesInRange(from: K, to: K): IterableIterator<[K, V]> {
    const iterator = this.innerTraverse(from, to);

    return {
      [Symbol.iterator]() {
        return this;
      },

      next(): IteratorResult<[K, V], [K, V]> {
        const entrie = iterator.next();

        return {
          value: entrie.value,
          done: entrie.done
        }
      }
    };
  }

  /**
   * Iterator for Keys in the Key range from..to (including).
   * Result is sorted by Key from min to max
   * If tree is modified during iterating result of iteration is unspecified
   * 
   * @param from Minimal value of the key (including)
   * @param to Maximal value of the key (including)
   * @returns Iterable iterator that can be used in for-of cycle etc.
   */
  keysInRange(from: K, to: K): IterableIterator<K> {
    const iterator = this.innerTraverse(from, to);

    return {
      [Symbol.iterator]() {
        return this;
      },

      next(): IteratorResult<K, K> {
        const entrie = iterator.next();

        return {
          value: entrie.value?.[0],
          done: entrie.done
        }
      }
    };
  }

  /**
   * Iterator for Values in the Key range from..to (including).
   * Result is sorted by Key from min to max
   * If tree is modified during iterating result of iteration is unspecified
   * 
   * @param from Minimal value of the key (including)
   * @param to Maximal value of the key (including)
   * @returns Iterable iterator that can be used in for-of cycle etc
   */
  valuesInRange(from: K, to: K): IterableIterator<V> {
    const iterator = this.innerTraverse(from, to);

    return {
      [Symbol.iterator]() {
        return this;
      },

      next(): IteratorResult<V, V> {
        const entrie = iterator.next();

        return {
          value: entrie.value?.[1],
          done: entrie.done
        }
      }
    };
  }

  /**
   * Convert the tree to array using from..to range (including)
   * Each array element contains array of [Key, Value] pair.
   * Result is sorted by Key from min to max
   * 
   * @returns Array of [Key, Value] pairs
   */
  toArrayInRange(from: K, to: K): [K, V][] {
    const iterator = this.innerTraverse(from, to);
    return Array.from({
      [Symbol.iterator]() { return iterator; }
    });
  }

  private innerGet(node: RBTreeNode<K, V>, key: K): RBTreeNode<K, V> | null {
    while (node) {
      const k = node.key;
      if (k === key) {
        return node;
      }

      node = key < k ? node.left : node.right;
    }
    return null;
  }

  private innerMinMax(node: RBTreeNode<K, V>, direction: 'left' | 'right'): RBTreeNode<K, V> | null {
    if (!node) {
      return null;
    }

    while (node[direction]) {
      node = node[direction];
    }

    return node;
  }

  private innerAdd(node: RBTreeNode<K, V>, key: K, value: V): RBTreeNode<K, V> {
    if (!node) {
      return {key, value, left: null, right: null, sizeAndRed: MASK | 1};
    }

    if (key === node.key) {
      node.value = value;
    } else if (key < node.key) {
      node.left = this.innerAdd(node.left, key, value);
    } else {
      node.right = this.innerAdd(node.right, key, value);
    }

    // fix-up any right-leaning links
    if (((node.right?.sizeAndRed ?? 0) & MASK) && !((node.left?.sizeAndRed ?? 0) & MASK)) {
      node = this.rotateLeft(node);
    }
    if (((node.left?.sizeAndRed ?? 0) & MASK) && ((node.left?.left?.sizeAndRed ?? 0) & MASK)) {
      node = this.rotateRight(node);
    }
    if (((node.left?.sizeAndRed ?? 0) & MASK) && ((node.right?.sizeAndRed ?? 0) & MASK)) {
      this.flipColors(node);
    }

    node.sizeAndRed = (node.sizeAndRed & MASK) |
      (((node.left?.sizeAndRed ?? 0) & MASK_NOT) + ((node.right?.sizeAndRed ?? 0) & MASK_NOT) + 1);

    return node;
  }

  private rotateLeft(node: RBTreeNode<K, V>): RBTreeNode<K, V> {
    const n = node.right;
    node.right = n.left;
    n.left = node;
    n.sizeAndRed = node.sizeAndRed;
    node.sizeAndRed = MASK | // node always marked as red
      (((node.left?.sizeAndRed ?? 0) & MASK_NOT) + ((node.right?.sizeAndRed ?? 0) & MASK_NOT) + 1);
    return n;
  }

  private rotateRight(node: RBTreeNode<K, V>): RBTreeNode<K, V> {
    const n = node.left;
    node.left = n.right;
    n.right = node;
    n.sizeAndRed = node.sizeAndRed;
    node.sizeAndRed = MASK | // node always marked as red
      (((node.left?.sizeAndRed ?? 0) & MASK_NOT) + ((node.right?.sizeAndRed ?? 0) & MASK_NOT) + 1);
    return n;
  }

  private flipColors(node: RBTreeNode<K, V>): void {
    node.sizeAndRed ^= MASK;
    node.left.sizeAndRed ^= MASK;
    node.right.sizeAndRed ^= MASK;
  }

  private innerDeleteMin(node: RBTreeNode<K, V>): RBTreeNode<K, V> | null {
    if (!node.left)
      return null;

    if (!((node.left?.sizeAndRed ?? 0) & MASK) && !((node.left?.left?.sizeAndRed ?? 0) & MASK)) {
      node = this.moveRedLeft(node);
    }

    node.left = this.innerDeleteMin(node.left);
    return this.balance(node);
  }

  private innerDeleteMax(node: RBTreeNode<K, V>): RBTreeNode<K, V> | null {
    if ((node.left?.sizeAndRed ?? 0) & MASK) {
      node = this.rotateRight(node);
    }

    if (!node.right) {
      return null;
    }

    if (!((node.right?.sizeAndRed ?? 0) & MASK) && !((node.right?.left?.sizeAndRed ?? 0) & MASK)) {
      node = this.moveRedRight(node);
    }

    node.right = this.innerDeleteMax(node.right);
    return this.balance(node);
  }

  private innerDelete(node: RBTreeNode<K, V>, key: K): RBTreeNode<K, V> | null {
    if (key < node.key) {
      if (!((node.left?.sizeAndRed ?? 0) & MASK) && !((node.left?.left?.sizeAndRed ?? 0) & MASK)) {
        node = this.moveRedLeft(node);
      }
      node.left = this.innerDelete(node.left, key);
    } else {
      if ((node.left?.sizeAndRed ?? 0) & MASK) {
        node = this.rotateRight(node);
      }
      if (key === node.key && !node.right) {
        return null;
      }
      if (!((node.right?.sizeAndRed ?? 0) & MASK) && !((node.right?.left?.sizeAndRed ?? 0) & MASK)) {
        node = this.moveRedRight(node);
      }
      if (key === node.key) {
        const n: RBTreeNode<K, V> = this.innerMinMax(node.right, 'left');
        node.key = n.key;
        node.value = n.value;
        node.right = this.innerDeleteMin(node.right);
      } else {
        node.right = this.innerDelete(node.right, key);
      }
    }

    return this.balance(node);
  }

  private moveRedLeft(node: RBTreeNode<K, V>): RBTreeNode<K, V> {
    this.flipColors(node);
    if ((node.right?.left?.sizeAndRed ?? 0) & MASK) {
      node.right = this.rotateRight(node.right);
      node = this.rotateLeft(node);
      this.flipColors(node);
    }
    return node;
  }

  private moveRedRight(node: RBTreeNode<K, V>): RBTreeNode<K, V> {
    this.flipColors(node);
    if ((node.left?.left?.sizeAndRed ?? 0) & MASK) {
      node = this.rotateRight(node);
      this.flipColors(node);
    }
    return node;
  }

  private balance(node: RBTreeNode<K, V>): RBTreeNode<K, V> {
    if (((node.right?.sizeAndRed ?? 0) & MASK) && !((node.left?.sizeAndRed ?? 0) & MASK)) {
      node = this.rotateLeft(node);
    }
    if (((node.left?.sizeAndRed ?? 0) & MASK) && ((node.left?.left?.sizeAndRed ?? 0) & MASK)) {
      node = this.rotateRight(node);
    }
    if (((node.left?.sizeAndRed ?? 0) & MASK) && ((node.right?.sizeAndRed ?? 0) & MASK)) {
      this.flipColors(node);
    }

    node.sizeAndRed = (node.sizeAndRed & MASK) |
      (((node.left?.sizeAndRed ?? 0) & MASK_NOT) + ((node.right?.sizeAndRed ?? 0) & MASK_NOT) + 1);
    return node;
  }

  private innerHeight(node: RBTreeNode<K, V>): number {
    if (!node) {
      return -1;
    }
    // fixme - too expensive!
    return 1 + Math.max(this.innerHeight(node.left), this.innerHeight(node.right));
  }

  private innerFloor(node: RBTreeNode<K, V>, key: K): RBTreeNode<K, V> | null {
    if (!node) {
      return null;
    }

    if (key === node.key) {
      return node;
    }
    if (key < node.key) {
      return this.innerFloor(node.left, key);
    }

    const n = this.innerFloor(node.right, key);
    return n ?? node;
  }

  private innerCeil(node: RBTreeNode<K, V>, key: K): RBTreeNode<K, V> | null {
    if (!node) {
      return null;
    }
    if (key === node.key) {
      return node;
    }
    if (key > node.key) {
      return this.innerCeil(node.right, key);
    }
    const n = this.innerCeil(node.left, key);
    return n ?? node;
  }

  private innerSelect(node: RBTreeNode<K, V>, rank: number): RBTreeNode<K, V> | null {
    if (!node) {
      return null;
    }
    const leftSize = (node.left?.sizeAndRed ?? 0) & MASK_NOT;
    if (leftSize > rank) {
      return this.innerSelect(node.left, rank);
    } else if (leftSize < rank) {
      return this.innerSelect(node.right, rank - leftSize - 1);
    } else {
      return node;
    }
  }

  private innerRank(node: RBTreeNode<K, V>, key: K): number {
    if (!node) {
      return 0;
    }

    if (key < node.key) {
      return this.innerRank(node.left, key);
    } else if (key > node.key) {
      return 1 + ((node.left?.sizeAndRed ?? 0) & MASK_NOT) + this.innerRank(node.right, key);
    } else {
      return (node.left?.sizeAndRed ?? 0) & MASK_NOT;
    }
  }

  private innerTraverse(min?: K, max?: K): Iterator<[K, V], [K, V]> {
    this.iteratorState = {
      parents: [[this.root, false]],
      center: false
    };

    return {
      next: (): IteratorResult<[K, V], [K, V]> => {
        const entrie = this.findNextNode(min, max);
        return {
          value: entrie,
          done: !entrie
        }
      }
    };    
  }

  private findNextNode(min?: K, max?: K): [K, V] | undefined {
    if (this.iteratorState.parents.length === 0) {
      return undefined;
    }

    // node - current node to process
    // left - flag indicating is the left sub-tree of the node is processed
    let [node, left] = this.iteratorState.parents.pop();
    
    // Goto right if node's value was returned
    if (this.iteratorState.center) {
      if (node.right) {  
        node = node.right;
        left = false;
        if (!node.left) {
          this.iteratorState.center = false;
          if (max !== undefined) {
            return node.key <= max ? [node.key, node.value] : undefined;
          } else {
            return [node.key, node.value];
          }
        }
      } else {
        if (this.iteratorState.parents.length === 0) {
          return undefined;
        }
        // Keep node in stack for later use
        node = this.iteratorState.parents[this.iteratorState.parents.length - 1][0];
        // Keep this.iteratorState.center true
        if (max !== undefined) {
          return node ? (node.key <= max ? [node.key, node.value] : undefined) : undefined;
        } else {
          return node ? [node.key, node.value] : undefined;
        }
      }
    }

    // left sub-tree was processed but not the node itself
    if (node && left && !this.iteratorState.center) {
      if (max !== undefined && node.key > max) {
        return undefined; // key > max so we are finished
      }
      this.iteratorState.center = true;
      this.iteratorState.parents.push([node, true]);
      return [node.key, node.value];
    }

    // Go up until first unprocessed left sub-tree
    while (node && left) {
      [node, left] = this.iteratorState.parents.pop();
    }

    // Sink to left sub-tree
    while (node.left) {
      if (min !== undefined && node.key < min) {
        node = node.right; // if key < min then go to right subtree
      } else {
        // store node and continue to sink left sub-tree
        this.iteratorState.parents.push([node, true]);
        node = node.left;
      }
    }

    if (min !== undefined && node.key < min) {
      node = this.iteratorState.parents.pop()[0]; // go 1 level up due to sink method
    }
    if (max !== undefined && node.key > max) {
      return undefined; // // key > max so we are finished
    }

    this.iteratorState.center = true;
    this.iteratorState.parents.push([node, true]);
    return [node.key, node.value];
  }
}
