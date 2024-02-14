import { ToArrayMatch, ToArrayPrefix } from '../../interfaces';
import { TreeMapConvertor } from '../tree-map-convertor.interface';

export interface PrefixTreeConvertor<K, V> extends TreeMapConvertor<V>, ToArrayPrefix<K, V>, ToArrayMatch<K, V> {
}
