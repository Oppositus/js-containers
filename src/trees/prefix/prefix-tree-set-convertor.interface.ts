import { ToArrayMatch, ToArrayPrefix } from '../../interfaces';
import { TreeSetConvertor } from '../tree-set-convertor.interface';

export interface PrefixTreeSetConvertor<K> extends TreeSetConvertor<K>, ToArrayPrefix<K, K>, ToArrayMatch<K, K> {
}
