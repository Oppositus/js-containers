import { TreeSet } from '../tree-set.interface';
import { PrefixTreeSetConvertor } from './prefix-tree-set-convertor.interface';
import { PrefixTreeSetIterator } from './prefix-tree-set-iterator.interface';

export interface PrefixTreeSet<K> extends TreeSet<K>, PrefixTreeSetIterator<K>, PrefixTreeSetConvertor<K> {
  longestPrefixOf(ket: K): K;
}
