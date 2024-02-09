import { PrefixSearchTreeIterator } from './prefix-search-tree-iterator.interface';
import { PrefixTree } from './prefix-tree.interface';

interface ArrayTrieNode<T> {
  next: ArrayTrieNode<T>[];
  value?: T;
}

export class TrieMap<T> implements PrefixTree<string, T>, PrefixSearchTreeIterator<string, T> {

  private static maxAlphabetLength = 128;

  private root: ArrayTrieNode<T> | undefined = undefined;
  private alphabet = new Map<number, number>();
  private reverseAlphabet = new Map<number, string>();
  private readonly len: number = 0;
  private siz = 0;
  private readonly arrayTemplate: ArrayTrieNode<T>[];

  constructor(alphabet: string) {
    for (let i = 0, l = alphabet.length; i < l; ++i) {
      const char = alphabet.charAt(i);
      const code = char.charCodeAt(0);
      if (this.alphabet.has(code)) {
        throw new TypeError(`Duplicate character ${char} in alphabet`);
      }
      this.alphabet.set(code, i);
      this.reverseAlphabet.set(i, char);
    }
    this.len = this.alphabet.size;

    if (this.len > TrieMap.maxAlphabetLength) {
      throw new TypeError(`Alphabet length ${this.len} is greater than maximum ${TrieMap.maxAlphabetLength}`);
    }

    this.arrayTemplate = [];
    for (let i = 0; i < this.siz; ++i) {
      this.arrayTemplate.push(null);
    }
  }

  //#region Tree implementation
  get size(): number {
    return this.siz;
  }

  get empty(): boolean {
    return this.siz === 0;
  }

  static setMaxAlphabetLength(length: number): void {
    TrieMap.maxAlphabetLength = length;
  }

  clear(): number {
    const siz = this.siz;
    this.root = undefined;
    return siz;
  }

  has(key: string): boolean {
    return !!this.get(key);
  }

  get(key: string): T | undefined {
    if (!key) {
      throw new TypeError('Key is empty');
    }
    const node = this.innerGet(this.root, key, 0);
    return node?.value;
  }

  add(key: string, value: T): number {
    if (!key) {
      throw new TypeError('Key is empty');
    }
    this.root = this.innerAdd(this.root, key, 0, value);
    return this.siz;
  }

  delete(key: string): boolean {
    if (!key) {
      throw new TypeError('Key is empty');
    }
    const sizeBefore = this.siz;
    this.root = this.innerDelete(this.root, key, 0);
    return this.siz < sizeBefore;
  }

  //#endregion

  //#region PrefixTree implementation
  longestPrefixOf(key: string): string {
    if (!key) {
      throw new TypeError('Key is empty');
    }
    const length = this.innerPrefix(this.root, key, 0, -1);
    return length < 0 ? '' : key.substring(0, length);
  }

  //#endregion

  //#region Iterators
  keys(): Iterator<string> {
    return this.keysWithPrefix('');
  }

  values(): Iterator<T> {
    return this.valuesWithPrefix('');
  }

  entries(): Iterator<[string, T]> {
    return this.entriesWithPrefix('');
  }

  //#endregion

  //#region PrefixIterators
  entriesWithPrefix(prefix: string): Iterator<[string, T]> {
    return this.mapWithPrefix(prefix).entries();
  }

  keysWithPrefix(prefix: string): Iterator<string> {
    return this.mapWithPrefix(prefix).keys();
  }


  valuesWithPrefix(prefix: string): IterableIterator<T> {
    return this.mapWithPrefix(prefix).values();
  }

  //#endregion

  //#region MatchIterators
  entriesThatMatch(search: string, wildcard: string = '?'): Iterator<[string, T]> {
    if (wildcard.length !== 1) {
      throw new TypeError('Wildcard length must be 1');
    }
    if (this.alphabet.has(wildcard.charCodeAt(0))) {
      throw new TypeError('Alphabet must not include wildcard');
    }
    return this.mapThatMatch(search, wildcard).entries();
  }

  keysThatMatch(search: string, wildcard: string = '?'): Iterator<string> {
    if (wildcard.length !== 1) {
      throw new TypeError('Wildcard length must be 1');
    }
    if (this.alphabet.has(wildcard.charCodeAt(0))) {
      throw new TypeError('Alphabet must not include wildcard');
    }
    return this.mapThatMatch(search, wildcard).keys();
  }

  valuesThatMatch(search: string, wildcard: string = '?'): IterableIterator<T> {
    if (wildcard.length !== 1) {
      throw new TypeError('Wildcard length must be 1');
    }
    if (this.alphabet.has(wildcard.charCodeAt(0))) {
      throw new TypeError('Alphabet must not include wildcard');
    }
    return this.mapThatMatch(search, wildcard).values();
  }

  //#endregion

  //#region Array convertors
  toArray(): T[] {
    return this.toArrayWithPrefix('');
  }

  toArrayWithPrefix(prefix: string): T[] {
    return Array.from(this.valuesWithPrefix(prefix));
  }

  toArrayThatMatch(search: string, wildcard: string = '?'): T[] {
    if (wildcard.length !== 1) {
      throw new TypeError('Wildcard length must be 1');
    }
    if (this.alphabet.has(wildcard.charCodeAt(0))) {
      throw new TypeError('Alphabet must not include wildcard');
    }
    return Array.from(this.valuesThatMatch(search));
  }

  //#endregion

  //#region Private methods
  private createNode(): ArrayTrieNode<T> {
    return {
      next: Array.from<ArrayTrieNode<T>>(this.arrayTemplate)
    };
  }

  private innerGet(node: ArrayTrieNode<T>, key: string, index: number): ArrayTrieNode<T> | null {
    if (!node) {
      return null;
    }
    if (index === key.length) {
      return node;
    }

    const char = key.charCodeAt(index);
    if (!this.alphabet.has(char)) {
      throw new TypeError(`Character ${char} is not in the alphabet`);
    }
    const ci = this.alphabet.get(char);
    return this.innerGet(node.next[ci], key, index + 1);
  }

  private innerAdd(node: ArrayTrieNode<T>, key: string, index: number, value: T): ArrayTrieNode<T> {
    if (!node) {
      node = this.createNode();
    }
    if (index == key.length) {
      if (node.value === undefined) {
        this.siz += 1;
      }
      node.value = value;
    } else {
      const char = key.charCodeAt(index);
      if (!this.alphabet.has(char)) {
        throw new TypeError(`Character ${char} is not in the alphabet`);
      }
      const ci = this.alphabet.get(char);
      node.next[ci] = this.innerAdd(node.next[ci], key, index + 1, value);
    }
    return node;
  }

  private innerDelete(node: ArrayTrieNode<T>, key: string, index: number): ArrayTrieNode<T> | null {
    if (!node) {
      return null;
    }
    if (index == key.length) {
      if (node.value !== undefined) {
        this.siz -= 1;
      }
      node.value = undefined;
    } else {
      const char = key.charCodeAt(index);
      if (!this.alphabet.has(char)) {
        throw new TypeError(`Character ${char} is not in the alphabet`);
      }
      const ci = this.alphabet.get(char);
      node.next[ci] = this.innerDelete(node.next[ci], key, index + 1);
    }

    // Remove sub-trie rooted at x if it is completely empty
    if (node.value !== undefined) {
      return node;
    }

    for (let i = 0; i < this.len; ++i) {
      if (node.next[i] !== null)
        return node;
    }
    return null;
  }

  private innerPrefix(node: ArrayTrieNode<T>, key: string, index: number, length: number): number {
    if (!node) {
      return length;
    }
    if (node.value !== undefined) {
      length = index;
    }
    if (index === key.length) {
      return length;
    }
    const char = key.charCodeAt(index);
    if (!this.alphabet.has(char)) {
      throw new TypeError(`Character ${char} is not in the alphabet`);
    }
    const ci = this.alphabet.get(char);
    return this.innerPrefix(node.next[ci], key, index + 1, length);
  }

  private nodeWithPrefix(node: ArrayTrieNode<T>, prefix: string, index: number): ArrayTrieNode<T> | null {
    if (!node) {
      return null;
    }

    if (index === prefix.length) {
      return node;
    }

    const char = prefix.charCodeAt(index);
    if (!this.alphabet.has(char)) {
      throw new TypeError(`Character ${char} is not in the alphabet`);
    }
    const ci = this.alphabet.get(char);
    return this.nodeWithPrefix(node.next[ci], prefix, index + 1);
  }

  private mapWithPrefix(prefix: string): Map<string, T> {
    const map = new Map<string, T>();
    const start = this.nodeWithPrefix(this.root, prefix, 0);
    if (start) {
      this.collect(start, map, prefix);
    }
    return map;
  }

  private mapThatMatch(prefix: string, wildcard: string): Map<string, T> {
    const map = new Map<string, T>();
    this.collectThatMatch(this.root, map, '', prefix, 0, wildcard);
    return map;
  }

  private collect(node: ArrayTrieNode<T>, map: Map<string, T>, key: string): void {
    if (!node) {
      return;
    }

    if (node.value !== undefined) {
      map.set(key, node.value);
    }

    for (let i = 0; i < this.len; ++i) {
      if (node.next[i] !== null) {
        this.collect(node.next[i], map, key + this.reverseAlphabet.get(i));
      }
    }
  }

  private collectThatMatch(node: ArrayTrieNode<T>, map: Map<string, T>, key: string, prefix: string, index: number, wildcard: string): void {
    if (!node) {
      return;
    }

    if (index === prefix.length) {
      if (node.value !== undefined) {
        map.set(key, node.value);
      }
      return;
    }

    const char = prefix.charAt(index);
    if (char === wildcard) {
      for (let i = 0; i < this.len; ++i) {
        if (node.next[i] !== null) {
          this.collectThatMatch(node.next[i], map, key + this.reverseAlphabet.get(i), prefix, index + 1, wildcard);
        }
      }
    } else {
      const ch = char.charCodeAt(0);
      if (!this.alphabet.has(ch)) {
        throw new TypeError(`Character ${ch} is not in the alphabet`);
      }
      const ci = this.alphabet.get(ch);
      this.collectThatMatch(node.next[ci], map, key + this.reverseAlphabet.get(ci), prefix, index + 1, wildcard);
    }
  }

  //#endregion
}
