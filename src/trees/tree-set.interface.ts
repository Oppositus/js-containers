import { TreeSetIterator } from './tree-set-iterator.interface';
import { TreeSetConvertor } from './tree-set-convertor.interface';

export interface TreeSet<K> extends TreeSetIterator<K>, TreeSetConvertor<K> {
  size: number;
  empty: boolean;

  clear(): number;

  has(key: K): boolean;

  add(key: K): number;

  delete(key: K): boolean;
}
