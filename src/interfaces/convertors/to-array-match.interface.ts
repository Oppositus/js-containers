export interface ToArrayMatch<K, V> {
  toArrayThatMatch(search: K | K[], wildcard: K): V[];
}
