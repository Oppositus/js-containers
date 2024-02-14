import { KeysMatchIterator, KeysPrefixIterator } from '../../interfaces';
import { TreeSetIterator } from '../tree-set-iterator.interface';

export interface PrefixTreeSetIterator<K> extends TreeSetIterator<K>, KeysPrefixIterator<K>, KeysMatchIterator<K> {
}
