export interface ToArrayPrefix<K, V> {
  toArrayWithPrefix(prefix: K | K[]): V[];
}
