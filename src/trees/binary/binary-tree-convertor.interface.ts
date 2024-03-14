import { ToArrayRange } from '../../interfaces';
import { TreeMapConvertor } from '../tree-map-convertor.interface';

export interface BinaryTreeConvertor<K, V> extends TreeMapConvertor<V>,
  ToArrayRange<K, V> {
}
