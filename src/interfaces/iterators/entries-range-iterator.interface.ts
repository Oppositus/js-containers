export interface EntriesRangeIterator<K, V> {
  entriesInRange(from: K, to: K): IterableIterator<[K, V]>;
}
