export interface KeysRangeIterator<K> {
  keysInRange(from: K, to: K): IterableIterator<K>;
}
