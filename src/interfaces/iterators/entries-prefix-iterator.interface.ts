export interface EntriesPrefixIterator<K, V> {
  entriesWithPrefix(prefix: K | K[]): IterableIterator<[K, V]>;
}
