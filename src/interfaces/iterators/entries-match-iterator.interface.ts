export interface EntriesMatchIterator<K, V> {
  entriesThatMatch(search: K | K[], wildcard: K): Iterator<[K, V]>;
}
