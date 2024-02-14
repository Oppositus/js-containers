export interface EntriesIterator<K, V> {
  entries(): IterableIterator<[K, V]>;
}
