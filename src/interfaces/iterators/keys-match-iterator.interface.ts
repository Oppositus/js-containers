export interface KeysMatchIterator<K> {
  keysThatMatch(search: K | K[], wildcard: K): IterableIterator<K>;
}
