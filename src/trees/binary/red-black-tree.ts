/**
 * Based on Java Algorithms and Clients https://algs4.cs.princeton.edu/code/
 * https://algs4.cs.princeton.edu/code/edu/princeton/cs/algs4/RedBlackBST.java.html
 */

import { BinaryTree } from './binary-tree.interface';
import { BstNode } from './bst-node.interface';

interface RBTreeNode<K, V> extends BstNode<K, V, RBTreeNode<K, V>> {
  isRed: boolean;
  size: number;
}

export class RedBlackTree<K, V> implements BinaryTree<K, V> {
  private root: RBTreeNode<K, V> | null = null;

  get size(): number {
    return this.root ? this.root.size : 0;
  }

  get empty(): boolean {
    return !this.root;
  }

  clear(): number {
    const size = this.size;
    this.root = null;
    return size;
  }

  delete(key: K): boolean {
    if (key == null) { // null or undefined keys are not allowed
      throw new TypeError('Key is empty');
    }

    if (!this.has(key)) {
      return false;
    }

    // if both children of root are black, set root to red
    if (!this.root.left?.isRed && !this.root.right?.isRed) {
      this.root.isRed = true;
    }

    this.root = this.innerDelete(this.root, key);

    if (this.root) {
      this.root.isRed = false;
    }
  }

  deleteMin(): number {
    if (!this.root) {
      return 0;
    }

    // if both children of root are black, set root to red
    if (!this.root.left?.isRed && !this.root.right?.isRed)
      this.root.isRed = true;

    this.root = this.innerDeleteMin(this.root);

    if (this.root) {
      this.root.isRed = false;
    }
  }

  deleteMax(): number {
    if (!this.root) {
      return 0;
    }

    // if both children of root are black, set root to red
    if (!this.root.left?.isRed && !this.root.right?.isRed) {
      this.root.isRed = true;
    }

    this.root = this.innerDeleteMax(this.root);
    if (this.root) {
      this.root.isRed = false;
    }
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  add(key: K, value: V): number {
    if (key == null) { // null or undefined keys are not allowed
      throw new TypeError('Key is empty');
    }
    if (value == null) { // no null and  undefined
      throw new TypeError('Value is empty');
    }

    this.root = this.innerAdd(this.root, key, value);
    this.root.isRed = false;

    return this.root.size;
  }

  get(key: K): V | undefined {
    if (key == null) { // null or undefined keys are not allowed
      throw new TypeError('Key is empty');
    }

    const node = this.innerGet(this.root, key);
    return node?.value;
  }

  max(): [K, V] | undefined {
    const node = this.innerMinMax(this.root, 'right');
    if (node) {
      return [node.key, node.value];
    }
    return undefined;
  }

  min(): [K, V] | undefined {
    const node = this.innerMinMax(this.root, 'left');
    if (node) {
      return [node.key, node.value];
    }
    return undefined;
  }

  height(): number {
    return this.innerHeight(this.root);
  }

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

  select(rank: number): [K, V] | undefined {
    if (rank < 0 || rank > this.size) {
      return undefined;
    }
    const node = this.innerSelect(this.root, rank);
    return node ? [node.key, node.value] : undefined;
  }

  rank(key: K): number {
    if (key == null) { // null or undefined keys are not allowed
      throw new TypeError('Key is empty');
    }
    return this.innerRank(this.root, key);
  }

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

  entries(): IterableIterator<[K, V]> {
    return undefined;
  }

  keys(): IterableIterator<K> {
    return undefined;
  }

  values(): IterableIterator<V> {
    return undefined;
  }

  toArray(): V[] {
    return [];
  }

  entriesInRange(from: K, to: K): IterableIterator<[K, V]> {
    return undefined;
  }

  keysInRange(from: K, to: K): IterableIterator<K> {
    return undefined;
  }

  valuesInRange(from: K, to: V): IterableIterator<V> {
    return undefined;
  }

  toArrayInRange(from: K, to: V): V[] {
    return [];
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

  private innerMinMax(node: RBTreeNode<K, V>, direction: 'left' | 'right'): RBTreeNode<K, V> {
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
      return {key, value, left: null, right: null, isRed: true, size: 1};
    }

    if (key === node.key) {
      node.value = value;
    } else if (key < node.key) {
      node.left = this.innerAdd(node.left, key, value);
    } else {
      node.right = this.innerAdd(node.right, key, value);
    }

    // fix-up any right-leaning links
    if (node.right?.isRed && !node.left?.isRed) {
      node = this.rotateLeft(node);
    }
    if (node.left?.isRed && node.left?.left?.isRed) {
      node = this.rotateRight(node);
    }
    if (node.left?.isRed && node.right?.isRed) {
      this.flipColors(node);
    }

    node.size = (node.left?.size ?? 0) + (node.right?.size ?? 0) + 1;

    return node;
  }

  private rotateLeft(node: RBTreeNode<K, V>): RBTreeNode<K, V> {
    const n = node.right;
    node.right = n.left;
    n.left = node;
    n.isRed = node.isRed;
    node.isRed = true;
    n.size = node.size;
    node.size = (node.left?.size ?? 0) + (node.right?.size ?? 0) + 1;
    return n;
  }

  private rotateRight(node: RBTreeNode<K, V>): RBTreeNode<K, V> {
    const n = node.left;
    node.left = n.right;
    n.right = node;
    n.isRed = node.isRed;
    node.isRed = true;
    n.size = node.size;
    node.size = (node.left?.size ?? 0) + (node.right?.size ?? 0) + 1;
    return n;
  }

  private flipColors(node: RBTreeNode<K, V>): void {
    node.isRed = !node.isRed;
    node.left.isRed = !node.left.isRed;
    node.right.isRed = !node.right.isRed;
  }

  private innerDeleteMin(node: RBTreeNode<K, V>): RBTreeNode<K, V> {
    if (!node.left)
      return null;

    if (!node.left?.isRed && !node.left?.left?.isRed) {
      node = this.moveRedLeft(node);
    }

    node.left = this.innerDeleteMin(node.left);
    return this.balance(node);
  }

  private innerDeleteMax(node: RBTreeNode<K, V>): RBTreeNode<K, V> {
    if (node.left?.isRed) {
      node = this.rotateRight(node);
    }

    if (!node.right) {
      return null;
    }

    if (!node.right?.isRed && !node.right?.left?.isRed) {
      node = this.moveRedRight(node);
    }

    node.right = this.innerDeleteMax(node.right);
    return this.balance(node);
  }

  private innerDelete(node: RBTreeNode<K, V>, key: K): RBTreeNode<K, V> {
    if (key < node.key) {
      if (!node.left?.isRed && !node.left?.left?.isRed) {
        node = this.moveRedLeft(node);
      }
      node.left = this.innerDelete(node.left, key);
    } else {
      if (node.left?.isRed) {
        node = this.rotateRight(node);
      }
      if (key === node.key && !node.right) {
        return null;
      }
      if (!node.right?.isRed && !node.right?.left?.isRed) {
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
    if (node.right?.left?.isRed) {
      node.right = this.rotateRight(node.right);
      node = this.rotateLeft(node);
      this.flipColors(node);
    }
    return node;
  }

  private moveRedRight(node: RBTreeNode<K, V>): RBTreeNode<K, V> {
    this.flipColors(node);
    if (node.left?.left?.isRed) {
      node = this.rotateRight(node);
      this.flipColors(node);
    }
    return node;
  }

  private balance(node: RBTreeNode<K, V>): RBTreeNode<K, V> {
    if (node.right?.isRed && !node.left?.isRed) {
      node = this.rotateLeft(node);
    }
    if (node.left?.isRed && node.left?.left?.isRed) {
      node = this.rotateRight(node);
    }
    if (node.left?.isRed && node.right?.isRed) {
      this.flipColors(node);
    }

    node.size = (node.left?.size ?? 0) + (node.right?.size ?? 0) + 1;
    return node;
  }

  private innerHeight(node: RBTreeNode<K, V>): number {
    if (!node) {
      return -1;
    }
    return 1 + Math.max(this.innerHeight(node.left), this.innerHeight(node.right));
  }

  private innerFloor(node: RBTreeNode<K, V>, key: K): RBTreeNode<K, V> {
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

  private innerCeil(node: RBTreeNode<K, V>, key: K): RBTreeNode<K, V> {
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

  private innerSelect(node: RBTreeNode<K, V>, rank: number): RBTreeNode<K, V> {
    if (!node) {
      return null;
    }
    const leftSize = node.left?.size ?? 0;
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
      return 1 + (node.left?.size ?? 0) + this.innerRank(node.right, key);
    } else {
      return node.left?.size ?? 0;
    }
  }
}
