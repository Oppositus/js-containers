import { PrefixTreeMap } from './prefix-tree-map.interface';

interface ArrayTrieMapNode<T> {
  next: ArrayTrieMapNode<T>[];
  value?: T;
  useCount: number;
}

interface IteratorState<T> {
  prevState: IteratorState<T> | null;
  node: ArrayTrieMapNode<T>;
  index: number;
  key: string;
}

export class TrieMap<T> implements PrefixTreeMap<string, T> {
  private static maxAlphabetLength = 128;

  private root: ArrayTrieMapNode<T> | undefined = undefined;
  private siz = 0;

  private alphabet = new Map<number, number>();
  private reverseAlphabet = new Map<number, string>();
  private readonly len: number = 0;

  private readonly arrayTemplate: ArrayTrieMapNode<T>[];

  private iteratorState: IteratorState<T> = null;

  //#region Construction

  constructor(alphabet: string) {
    if (!alphabet) {
      throw new TypeError('Alphabet must not be empty');
    }

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
    for (let i = 0; i < this.len; ++i) {
      this.arrayTemplate.push(null);
    }
  }

  //#endregion

  //#region TreeSet implementation

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
    this.siz = 0;
    return siz;
  }

  has(key: string): boolean {
    return this.get(key) !== undefined;
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

  //#region TreeMap implementation

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

  keys(): IterableIterator<string> {
    return this.keysWithPrefix('');
  }

  values(): IterableIterator<T> {
    return this.valuesWithPrefix('');
  }

  entries(): IterableIterator<[string, T]> {
    return this.entriesWithPrefix('');
  }

  //#endregion

  //#region Prefix Iterators

  entriesWithPrefix(prefix: string): IterableIterator<[string, T]> {
    const start = this.nodeWithPrefix(this.root, prefix, 0);

    this.iteratorState = {
      prevState: null,
      node: start,
      index: -1,
      key: prefix
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    return {
      [Symbol.iterator]() {
        return this;
      },

      next(): IteratorResult<[string, T], [string, T]> {
        const [key, value] = that.findNextNode();

        return {
          value: value ? [key, value] : undefined,
          done: !key
        }
      }
    };

  }

  keysWithPrefix(prefix: string): IterableIterator<string> {
    const start = this.nodeWithPrefix(this.root, prefix, 0);

    this.iteratorState = {
      prevState: null,
      node: start,
      index: -1,
      key: prefix
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    return {
      [Symbol.iterator]() {
        return this;
      },

      next(): IteratorResult<string, string> {
        const [key] = that.findNextNode();

        return {
          value: key,
          done: !key
        }
      }
    };
  }

  valuesWithPrefix(prefix: string): IterableIterator<T> {
    const start = this.nodeWithPrefix(this.root, prefix, 0);

    this.iteratorState = {
      prevState: null,
      node: start,
      index: -1,
      key: prefix
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    return {
      [Symbol.iterator]() {
        return this;
      },

      next(): IteratorResult<T, T> {
        const [, value] = that.findNextNode();

        return {
          value: value,
          done: value === undefined
        }
      }
    };

  }

  //#endregion

  //#region Match Iterators

  entriesThatMatch(search: string, wildcard: string = '?'): IterableIterator<[string, T]> {
    if (!wildcard || wildcard.length !== 1) {
      throw new TypeError('Wildcard length must be 1');
    }
    if (this.alphabet.has(wildcard.charCodeAt(0))) {
      throw new TypeError('Alphabet must not include wildcard');
    }
    return this.mapThatMatch(search, wildcard).entries();
  }

  keysThatMatch(search: string, wildcard: string = '?'): IterableIterator<string> {
    if (!wildcard || wildcard.length !== 1) {
      throw new TypeError('Wildcard length must be 1');
    }
    if (this.alphabet.has(wildcard.charCodeAt(0))) {
      throw new TypeError('Alphabet must not include wildcard');
    }
    return this.mapThatMatch(search, wildcard).keys();
  }

  valuesThatMatch(search: string, wildcard: string = '?'): IterableIterator<T> {
    if (!wildcard || wildcard.length !== 1) {
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
    if (!wildcard || wildcard.length !== 1) {
      throw new TypeError('Wildcard length must be 1');
    }
    if (this.alphabet.has(wildcard.charCodeAt(0))) {
      throw new TypeError('Alphabet must not include wildcard');
    }
    return Array.from(this.valuesThatMatch(search));
  }

  //#endregion

  //#region Private methods

  private createNode(): ArrayTrieMapNode<T> {
    return {
      next: this.arrayTemplate.slice(),
      value: undefined,
      useCount: 0
    };
  }

  private innerGet(node: ArrayTrieMapNode<T>, key: string, index: number): ArrayTrieMapNode<T> | null {
    while (node) {
      if (index === key.length) {
        return node;
      }

      const char = key.charCodeAt(index++);
      const ci = this.alphabet.get(char);
      if (ci === undefined) {
        throw new TypeError(`Character ${char} is not in the alphabet`);
      }
      node = node.next[ci];
    }

    return null;
  }

  private innerAdd(node: ArrayTrieMapNode<T>, key: string, index: number, value: T): ArrayTrieMapNode<T> {
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
      const ci = this.alphabet.get(char);
      if (ci === undefined) {
        throw new TypeError(`Character ${char} is not in the alphabet`);
      }
      if (!node.next[ci]) {
        node.useCount += 1;
      }
      node.next[ci] = this.innerAdd(node.next[ci], key, index + 1, value);
    }
    return node;
  }

  private innerDelete(node: ArrayTrieMapNode<T>, key: string, index: number): ArrayTrieMapNode<T> | null {
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
      const ci = this.alphabet.get(char);
      if (ci === undefined) {
        throw new TypeError(`Character ${char} is not in the alphabet`);
      }
      const isFilled = !!node.next[ci];
      node.next[ci] = this.innerDelete(node.next[ci], key, index + 1);
      if (isFilled && !node.next[ci]) {
        node.useCount -= 1;
      }
    }

    // Remove sub-trie rooted at x if it is completely empty
    if (node.value !== undefined || node.useCount > 0) {
      return node;
    }
    return null;
  }

  private innerPrefix(node: ArrayTrieMapNode<T>, key: string, index: number, length: number): number {
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
    const ci = this.alphabet.get(char);
    if (ci === undefined) {
      throw new TypeError(`Character ${char} is not in the alphabet`);
    }
    return this.innerPrefix(node.next[ci], key, index + 1, length);
  }

  private nodeWithPrefix(node: ArrayTrieMapNode<T>, prefix: string, index: number): ArrayTrieMapNode<T> | null {
    if (!node) {
      return null;
    }

    if (index === prefix.length) {
      return node;
    }

    const char = prefix.charCodeAt(index);
    const ci = this.alphabet.get(char);
    if (ci === undefined) {
      throw new TypeError(`Character ${char} is not in the alphabet`);
    }
    return this.nodeWithPrefix(node.next[ci], prefix, index + 1);
  }

  private mapThatMatch(prefix: string, wildcard: string): Map<string, T> {
    const map = new Map<string, T>();
    this.collectThatMatch(this.root, map, '', prefix, 0, wildcard);
    return map;
  }

  private collectThatMatch(node: ArrayTrieMapNode<T>, map: Map<string, T>, key: string, prefix: string, index: number, wildcard: string): void {
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
      const ci = this.alphabet.get(ch);
      if (ci === undefined) {
        throw new TypeError(`Character ${ch} is not in the alphabet`);
      }
      this.collectThatMatch(node.next[ci], map, key + this.reverseAlphabet.get(ci), prefix, index + 1, wildcard);
    }
  }

  private findNextNode(): [string | undefined, T | undefined] {
    const state = this.iteratorState;

    if (!state) {
      return [undefined, undefined];
    }

    if (!state.node) {
      this.iteratorState = state.prevState;
      return this.findNextNode();
    }

    if (state.index < 0) {
      state.index = 0;
      if (state.node.value !== undefined) {
        return [state.key, state.node.value];
      }
    }

    for (let i = state.index; i < this.len; ++i) {
      if (state.node.next[i]) {
        state.index = i + 1;
        this.iteratorState = {
          prevState: state,
          node: state.node.next[i],
          index: -1,
          key: state.key + this.reverseAlphabet.get(i)
        }
        return this.findNextNode();
      }
    }

    this.iteratorState = state.prevState;
    return this.findNextNode();
  }

  //#endregion
}
