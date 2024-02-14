import { TreeMap } from '../tree-map.interface';
import { PrefixTreeIterator } from './prefix-tree-iterator.interface';
import { PrefixTreeConvertor } from './prefix-tree-convertor.interface';

export interface PrefixTreeMap<K, V> extends TreeMap<K, V>, PrefixTreeIterator<K, V>, PrefixTreeConvertor<K, V> {
  longestPrefixOf(ket: K): K;
}
