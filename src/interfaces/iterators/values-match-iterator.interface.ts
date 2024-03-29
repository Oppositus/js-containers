export interface ValuesMatchIterator<K, V> {
  valuesThatMatch(search: K | K[], wildcard: K): IterableIterator<V>;
}
