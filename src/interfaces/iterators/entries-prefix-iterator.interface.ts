export interface EntriesPrefixIterator<K, V> {
  entriesWithPrefix(prefix: K | K[]): Iterator<[K, V]>;
}
