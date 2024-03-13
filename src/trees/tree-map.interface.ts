import { TreeMapIterator } from './tree-map-iterator.interface';
import { TreeMapConvertor } from './tree-map-convertor.interface';
import { TreeSet } from './tree-set.interface';

type BaseTree<K> = Omit<
  Omit<TreeSet<K>, 'add'>,
  'toArray'
>;

export interface TreeMap<K, V> extends BaseTree<K>, TreeMapIterator<K, V>, TreeMapConvertor<V> {
  get(key: K): V | undefined;

  add(key: K, value: V): number;
}
