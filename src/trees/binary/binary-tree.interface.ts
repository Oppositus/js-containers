import { TreeMap } from '../tree-map.interface';
import { BinaryTreeIterator } from './binary-tree-iterator.interface';
import { BinaryTreeConvertor } from './binary-tree-convertor.interface';

export interface BinaryTree<K, V> extends TreeMap<K, V>, BinaryTreeIterator<K, V>, BinaryTreeConvertor<K, V> {
  /**
   * Returns the largest key in the tree less than or equal to key
   */
  floor(key: K): [K, V] | undefined;

  /**
   * Returns the smallest key in the tree greater than or equal to key
   */
  ceil(key: K): [K, V] | undefined;

  max(): [K, V] | undefined;

  min(): [K, V] | undefined;

  deleteMin(): number;

  deleteMax(): number;

  height(): number;

  /**
   * Return the key in the tree of a given rank.
   * This key has the property that there are rank keys in
   * the tree that are smaller. In other words, this key is the
   * (rank + 1)st smallest key in the tree.
   */
  select(rank: number): [K, V] | undefined;

  /**
   * Return the number of keys in the tree strictly less than key.
   */
  rank(key: K): number;

  /**
   * Returns the number of keys in the tree in the given range.
   * If from > to returns 0
   */
  sizeOfRange(from: K, to: K): number;
}
