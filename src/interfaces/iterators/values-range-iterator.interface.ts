export interface ValuesRangeIterator<K, V> {
  valuesInRange(from: K, to: V): IterableIterator<V>;
}
