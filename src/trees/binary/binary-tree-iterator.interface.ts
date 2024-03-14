import { TreeMapIterator } from '../tree-map-iterator.interface';
import { EntriesRangeIterator, KeysRangeIterator, ValuesRangeIterator } from '../../interfaces';

export interface BinaryTreeIterator<K, V> extends TreeMapIterator<K, V>,
  EntriesRangeIterator<K, V>, KeysRangeIterator<K>, ValuesRangeIterator<K, V> {
}
