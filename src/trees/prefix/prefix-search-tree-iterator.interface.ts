import {
  EntriesIterator,
  EntriesMatchIterator,
  EntriesPrefixIterator,
  KeysIterator,
  KeysMatchIterator,
  KeysPrefixIterator,
  ToArray,
  ToArrayMatch,
  ToArrayPrefix,
  ValuesIterator,
  ValuesMatchIterator,
  ValuesPrefixIterator
} from '../../interfaces';

export interface PrefixSearchTreeIterator<K, V> extends KeysIterator<string>, ValuesIterator<V>, EntriesIterator<K, V>, ToArray<V>,
  KeysPrefixIterator<K>, ValuesPrefixIterator<K, V>, EntriesPrefixIterator<K, V>, ToArrayPrefix<K, V>,
  KeysMatchIterator<K>, ValuesMatchIterator<K, V>, EntriesMatchIterator<K, V>, ToArrayMatch<K, V> {
}
