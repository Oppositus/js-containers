export interface Tree<K, V> {
  size: number;
  empty: boolean;

  clear(): number;

  has(key: K): boolean;

  get(key: K): V | undefined;

  add(key: K, value: V): number;

  delete(key: K): boolean;
}
