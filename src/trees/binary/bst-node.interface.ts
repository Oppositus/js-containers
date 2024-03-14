interface BstNodeType<K, V> {
  key: K;
  value: V;
}

export interface BstNode<K, V, N = BstNodeType<K, V>> extends BstNodeType<K, V> {
  left: N | null;
  right: N | null;
}
