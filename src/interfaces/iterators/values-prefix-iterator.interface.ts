export interface ValuesPrefixIterator<K, V> {
  valuesWithPrefix(prefix: K | K[]): IterableIterator<V>;
}
