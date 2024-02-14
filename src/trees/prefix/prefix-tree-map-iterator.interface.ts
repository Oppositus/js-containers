import {
  EntriesMatchIterator,
  EntriesPrefixIterator,
  KeysMatchIterator,
  KeysPrefixIterator,
  ValuesMatchIterator,
  ValuesPrefixIterator
} from '../../interfaces';
import { TreeMapIterator } from '../tree-map-iterator.interface';

export interface PrefixTreeMapIterator<K, V> extends TreeMapIterator<K, V>,
  KeysPrefixIterator<K>, ValuesPrefixIterator<K, V>, EntriesPrefixIterator<K, V>,
  KeysMatchIterator<K>, ValuesMatchIterator<K, V>, EntriesMatchIterator<K, V> {
}
