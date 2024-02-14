import { TreeMap } from '../tree-map.interface';
import { PrefixTreeMapIterator } from './prefix-tree-map-iterator.interface';
import { PrefixTreeMapConvertor } from './prefix-tree-map-convertor.interface';

export interface PrefixTreeMap<K, V> extends TreeMap<K, V>, PrefixTreeMapIterator<K, V>, PrefixTreeMapConvertor<K, V> {
  longestPrefixOf(ket: K): K;
}
