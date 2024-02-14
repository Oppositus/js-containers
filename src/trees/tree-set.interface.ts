import { TreeSetIterator } from './tree-set-iterator.interface';

export interface TreeSet<K> extends TreeSetIterator<K> {
  size: number;
  empty: boolean;

  clear(): number;

  has(key: K): boolean;

  add(key: K): number;

  delete(key: K): boolean;
}
