export interface KeysPrefixIterator<K> {
  keysWithPrefix(prefix: K | K[]): IterableIterator<K>;
}
