import { PrefixTreeSet } from './prefix-tree-set.interface';

interface ArrayTrieSetNode {
  next: ArrayTrieSetNode[];
  isString: boolean;
  useCount: number;
}

interface IteratorState {
  prevState: IteratorState | null;
  node: ArrayTrieSetNode;
  index: number;
  key: string;
}

export class TrieSet implements PrefixTreeSet<string> {
  private static maxAlphabetLength = 128;

  private root: ArrayTrieSetNode | undefined = undefined;
  private siz = 0;

  private alphabet = new Map<number, number>();
  private reverseAlphabet = new Map<number, string>();
  private readonly len: number = 0;

  private readonly arrayTemplate: ArrayTrieSetNode[];

  private iteratorState: IteratorState = null;

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

    if (this.len > TrieSet.maxAlphabetLength) {
      throw new TypeError(`Alphabet length ${this.len} is greater than maximum ${TrieSet.maxAlphabetLength}`);
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
    TrieSet.maxAlphabetLength = length;
  }

  clear(): number {
    const siz = this.siz;
    this.root = undefined;
    this.siz = 0;
    return siz;
  }

  has(key: string): boolean {
    if (!key) {
      throw new TypeError('Key is empty');
    }
    return this.innerHas(this.root, key, 0);
  }

  delete(key: string): boolean {
    if (!key) {
      throw new TypeError('Key is empty');
    }
    const sizeBefore = this.siz;
    this.root = this.innerDelete(this.root, key, 0);
    return this.siz < sizeBefore;
  }

  add(key: string): number {
    if (!key) {
      throw new TypeError('Key is empty');
    }
    this.root = this.innerAdd(this.root, key, 0);
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

  //#endregion

  //#region Prefix Iterators

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
        const key = that.findNextKey();

        return {
          value: key,
          done: !key
        }
      }
    };
  }

  //#endregion

  //#region Match Iterators

  keysThatMatch(search: string, wildcard: string = '?'): IterableIterator<string> {
    if (!wildcard || wildcard.length !== 1) {
      throw new TypeError('Wildcard length must be 1');
    }
    if (this.alphabet.has(wildcard.charCodeAt(0))) {
      throw new TypeError('Alphabet must not include wildcard');
    }
    return this.setThatMatch(search, wildcard).keys();
  }

  //#endregion

  //#region Array convertors

  toArray(): string[] {
    return this.toArrayWithPrefix('');
  }

  toArrayWithPrefix(prefix: string): string[] {
    return Array.from(this.keysWithPrefix(prefix));
  }

  toArrayThatMatch(search: string, wildcard: string = '?'): string[] {
    if (!wildcard || wildcard.length !== 1) {
      throw new TypeError('Wildcard length must be 1');
    }
    if (this.alphabet.has(wildcard.charCodeAt(0))) {
      throw new TypeError('Alphabet must not include wildcard');
    }
    return Array.from(this.keysThatMatch(search));
  }

  //#endregion

  //#region Private methods

  private createNode(): ArrayTrieSetNode {
    return {
      next: this.arrayTemplate.slice(),
      isString: false,
      useCount: 0
    };
  }

  private innerHas(node: ArrayTrieSetNode, key: string, index: number): boolean {
    while (node) {
      if (index === key.length) {
        return node.isString;
      }

      const char = key.charCodeAt(index++);
      const ci = this.alphabet.get(char);
      if (ci === undefined) {
        throw new TypeError(`Character ${char} is not in the alphabet`);
      }
      node = node.next[ci];
    }

    return false;
  }

  private innerAdd(node: ArrayTrieSetNode, key: string, index: number): ArrayTrieSetNode {
    if (!node) {
      node = this.createNode();
    }
    if (index == key.length) {
      if (!node.isString) {
        this.siz += 1;
      }
      node.isString = true;
    } else {
      const char = key.charCodeAt(index);
      const ci = this.alphabet.get(char);
      if (ci === undefined) {
        throw new TypeError(`Character ${char} is not in the alphabet`);
      }
      if (!node.next[ci]) {
        node.useCount += 1;
      }
      node.next[ci] = this.innerAdd(node.next[ci], key, index + 1);
    }
    return node;
  }

  private innerDelete(node: ArrayTrieSetNode, key: string, index: number): ArrayTrieSetNode | null {
    if (!node) {
      return null;
    }
    if (index == key.length) {
      if (node.isString) {
        this.siz -= 1;
      }
      node.isString = false;
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
    if (node.isString || node.useCount > 0) {
      return node;
    }
    return null;
  }

  private innerPrefix(node: ArrayTrieSetNode, key: string, index: number, length: number): number {
    if (!node) {
      return length;
    }
    if (node.isString) {
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

  private nodeWithPrefix(node: ArrayTrieSetNode, prefix: string, index: number): ArrayTrieSetNode | null {
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

  private setThatMatch(prefix: string, wildcard: string): Set<string> {
    const set = new Set<string>();
    this.collectThatMatch(this.root, set, '', prefix, 0, wildcard);
    return set;
  }

  private collectThatMatch(node: ArrayTrieSetNode, set: Set<string>, key: string, prefix: string, index: number, wildcard: string): void {
    if (!node) {
      return;
    }

    if (index === prefix.length) {
      if (node.isString) {
        set.add(key);
      }
      return;
    }

    const char = prefix.charAt(index);
    if (char === wildcard) {
      for (let i = 0; i < this.len; ++i) {
        if (node.next[i] !== null) {
          this.collectThatMatch(node.next[i], set, key + this.reverseAlphabet.get(i), prefix, index + 1, wildcard);
        }
      }
    } else {
      const ch = char.charCodeAt(0);
      const ci = this.alphabet.get(ch);
      if (ci === undefined) {
        throw new TypeError(`Character ${ch} is not in the alphabet`);
      }
      this.collectThatMatch(node.next[ci], set, key + this.reverseAlphabet.get(ci), prefix, index + 1, wildcard);
    }
  }

  private findNextKey(): string | undefined {
    const state = this.iteratorState;

    if (!state) {
      return undefined;
    }

    if (!state.node) {
      this.iteratorState = state.prevState;
      return this.findNextKey();
    }

    if (state.index < 0) {
      state.index = 0;
      if (state.node.isString) {
        return state.key;
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
        return this.findNextKey();
      }
    }

    this.iteratorState = state.prevState;
    return this.findNextKey();
  }

  //#endregion
}
