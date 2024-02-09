import { ToArray, ToArrayMatch, ToArrayPrefix } from '../../interfaces';

export interface PrefixSearchTreeConvertor<K, V> extends ToArray<V>, ToArrayPrefix<K, V>, ToArrayMatch<K, V> {
}
