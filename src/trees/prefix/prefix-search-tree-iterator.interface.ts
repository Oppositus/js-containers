import {
  EntriesIterator,
  EntriesMatchIterator,
  EntriesPrefixIterator,
  KeysIterator,
  KeysMatchIterator,
  KeysPrefixIterator,
  ValuesIterator,
  ValuesMatchIterator,
  ValuesPrefixIterator
} from '../../interfaces';

export interface PrefixSearchTreeIterator<K, V> extends KeysIterator<string>, ValuesIterator<V>, EntriesIterator<K, V>,
  KeysPrefixIterator<K>, ValuesPrefixIterator<K, V>, EntriesPrefixIterator<K, V>,
  KeysMatchIterator<K>, ValuesMatchIterator<K, V>, EntriesMatchIterator<K, V> {
}
