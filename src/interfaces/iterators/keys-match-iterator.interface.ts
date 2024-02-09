export interface KeysMatchIterator<K> {
  keysThatMatch(search: K | K[], wildcard: K): Iterator<K>;
}
