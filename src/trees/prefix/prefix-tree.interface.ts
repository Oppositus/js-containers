import { Tree } from '../tree.interface';

export interface PrefixTree<K, V> extends Tree<K, V> {
  longestPrefixOf(ket: K): K;
}
