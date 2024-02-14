import { EntriesIterator, KeysIterator, ValuesIterator } from '../interfaces';

export interface TreeMapIterator<K, V> extends KeysIterator<K>, ValuesIterator<V>, EntriesIterator<K, V> {
}
