export interface EntriesIterator<K, V> {
  entries(): Iterator<[K, V]>;
}
