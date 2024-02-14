import { TreeMapIterator } from './tree-map-iterator.interface';
import { TreeMapConvertor } from './tree-map-convertor.interface';
import { TreeSet } from './tree-set.interface';

export interface TreeMap<K, V> extends Omit<TreeSet<K>, 'add'>, TreeMapIterator<K, V>, TreeMapConvertor<V> {
  get(key: K): V | undefined;

  add(key: K, value: V): number;
}
