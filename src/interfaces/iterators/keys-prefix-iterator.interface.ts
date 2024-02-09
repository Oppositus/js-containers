export interface KeysPrefixIterator<K> {
  keysWithPrefix(prefix: K | K[]): Iterator<K>;
}
