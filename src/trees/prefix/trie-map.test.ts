import { TrieMap } from './trie-map';

describe('TrieMap', () => {
  const eng: string = '\'-abcdefghijklmnopqrstuvwxyz';
  const rus: string = '-абвгдеёжзийклмнопрстуфхцчшщъыьэюя';

  describe('Construction', () => {
    it('Should construct TrieMap with valid alphabet', () => {
      const t1 = new TrieMap(eng);
      const t2 = new TrieMap(rus);

      expect(t1).toBeTruthy();
      expect(t2).toBeTruthy();
    });

    it('Should not construct TrieMap with empty alphabet', () => {
      const t = () => new TrieMap('');

      expect(t).toThrow(TypeError);
      expect(t).toThrow('Alphabet must not be empty');
    });

    it('Should not construct TrieMap with alphabet with duplicated characters', () => {
      const t = () => new TrieMap(eng + 'x');

      expect(t).toThrow(TypeError);
      expect(t).toThrow('Duplicate character x in alphabet');
    });

    it('Should not construct TrieMap with too large alphabet', () => {
      const t = () => new TrieMap(eng);

      TrieMap.setMaxAlphabetLength(10);
      expect(t).toThrow(TypeError);
      expect(t).toThrow('Alphabet length 28 is greater than maximum 10');
      TrieMap.setMaxAlphabetLength(128);
    });
  });

  describe('Tree implementation', () => {
    describe('size', () => {
      it('size should be 0 for new trie', () => {
        const t = new TrieMap(eng);
        expect(t.size).toBe(0);
      });

      it('size should be greater than 0 for trie with entries', () => {
        const t = new TrieMap(eng);

        t.add('test', 0);
        expect(t.size).toBe(1);

        t.add('tester', 1);
        expect(t.size).toBe(2);

        t.add('tester', 2);
        expect(t.size).toBe(2);

      });

      it('size should be 0 after clear', () => {
        const t = new TrieMap(eng);

        t.add('test', 0);
        t.add('tester', 1);
        t.add('tests', 2);

        expect(t.size).toBeGreaterThan(0);

        t.clear();

        expect(t.size).toBe(0);

      });

      it('size should be 0 after deleting all entries', () => {
        const t = new TrieMap(eng);

        t.add('test', 0);
        t.add('tester', 1);
        t.add('tests', 2);

        expect(t.size).toBeGreaterThan(0);

        t.delete('tester');
        t.delete('test');
        t.delete('tests');

        expect(t.size).toBe(0);

      });
    });

    describe('empty', () => {
      it('empty should be true for new trie', () => {
        const t = new TrieMap(eng);
        expect(t.empty).toBeTruthy();
      });

      it('empty should be false for trie with entries', () => {
        const t = new TrieMap(eng);

        t.add('test', 0);
        expect(t.empty).toBeFalsy();

        t.add('tester', 1);
        expect(t.empty).toBeFalsy();

        t.add('tester', 2);
        expect(t.empty).toBeFalsy();

      });

      it('empty should be true after clear', () => {
        const t = new TrieMap(eng);

        t.add('test', 0);
        t.add('tester', 1);
        t.add('tests', 2);

        expect(t.empty).toBeFalsy();

        t.clear();

        expect(t.empty).toBeTruthy();

      });

      it('empty should be true after deleting all entries', () => {
        const t = new TrieMap(eng);

        t.add('test', 0);
        t.add('tester', 1);
        t.add('tests', 2);

        expect(t.empty).toBeFalsy();

        t.delete('tester');
        t.delete('test');
        t.delete('tests');

        expect(t.empty).toBeTruthy();

      });

    });

    describe('clear', () => {
      it('Should clear trie - test 1', () => {
        const t = new TrieMap(eng);
        t.add('a', 0);
        t.add('b', 0);

        t.clear();

        expect(t.empty).toBeTruthy();
        expect(t.size).toBe(0);
        expect(t.has('a')).toBeFalsy();
        expect(t.has('b')).toBeFalsy();
      });

      it('Should clear trie - test 2', () => {
        const t = new TrieMap(eng);
        t.add('a', 0);
        t.add('aa', 0);

        t.clear();

        expect(t.empty).toBeTruthy();
        expect(t.size).toBe(0);
        expect(t.has('a')).toBeFalsy();
        expect(t.has('aa')).toBeFalsy();
      });

      it('Should return number of cleared items', () => {
        const t = new TrieMap(eng);
        t.add('a', 0);
        t.add('aa', 0);
        t.add('aab', 0);
        t.add('aaa', 0);

        const deleted = t.clear();

        expect(t.empty).toBeTruthy();
        expect(t.size).toBe(0);
        expect(t.has('a')).toBeFalsy();
        expect(t.has('aa')).toBeFalsy();
        expect(t.has('aaa')).toBeFalsy();
        expect(t.has('aab')).toBeFalsy();
        expect(deleted).toBe(4);
      });
    });

    describe('has', () => {
      it('Should not have elements that are not added', () => {
        const t = new TrieMap(eng);

        expect(t.has('a')).toBeFalsy();

        t.add('a', 0);
        expect(t.has('b')).toBeFalsy();
      });

      it('Should have added elements', () => {
        const t = new TrieMap(eng);

        const items = ['a', 'aa', 'aaa', 'aab', 'ab'];

        items.forEach(item => t.add(item, 0));

        items.forEach(item => expect(t.has(item)).toBeTruthy());
      });

      it('Should have added elements not depending of insertion order', () => {
        const t = new TrieMap(eng);

        const items = ['aaa', 'aa', 'a', 'aab', 'ab'];

        items.forEach(item => t.add(item, 0));

        expect(t.has('a')).toBeTruthy();
        expect(t.has('aa')).toBeTruthy();
        expect(t.has('aaa')).toBeTruthy();
        expect(t.has('ab')).toBeTruthy();
        expect(t.has('aab')).toBeTruthy();
      });

      it('Should check alphabet', () => {
        const t = new TrieMap(eng);
        t.add('abc', 0);
        const has = () => t.has('ab@');

        expect(has).toThrow(TypeError);
        expect(has).toThrow(`Character ${'@'.charCodeAt(0)} is not in the alphabet`);
      });

      it('Should check key', () => {
        const t = new TrieMap(eng);
        t.add('abc', 0);
        const has1 = () => t.has('');
        const has2 = () => t.has(null);
        const has3 = () => t.has(undefined);

        expect(has1).toThrow(TypeError);
        expect(has1).toThrow('Key is empty');
        expect(has2).toThrow(TypeError);
        expect(has2).toThrow('Key is empty');
        expect(has3).toThrow(TypeError);
        expect(has3).toThrow('Key is empty');
      });
    });

    describe('get', () => {
      it('Should return undefined if there is no element is map', () => {
        const t = new TrieMap(eng);

        expect(t.get('a')).toBeUndefined();
      });

      it('Should return element', () => {
        const t = new TrieMap<number>(eng);

        t.add('aab', 10);
        t.add('aaa', 11);
        t.add('aa', 12);

        expect(t.get('aa')).toBe(12);
        expect(t.get('aab')).toBe(10);
        expect(t.get('aaa')).toBe(11);

      });

      it('Should check alphabet', () => {
        const t = new TrieMap(eng);
        t.add('abc', 0);
        const get = () => t.get('ab@');

        expect(get).toThrow(TypeError);
        expect(get).toThrow(`Character ${'@'.charCodeAt(0)} is not in the alphabet`);
      });

      it('Should check key', () => {
        const t = new TrieMap(eng);
        t.add('abc', 0);
        const get1 = () => t.get('');
        const get2 = () => t.get(null);
        const get3 = () => t.get(undefined);

        expect(get1).toThrow(TypeError);
        expect(get1).toThrow('Key is empty');
        expect(get2).toThrow(TypeError);
        expect(get2).toThrow('Key is empty');
        expect(get3).toThrow(TypeError);
        expect(get3).toThrow('Key is empty');
      });

    });

    describe('add', () => {
      it('Should add key/value to trie', () => {
        const t = new TrieMap(eng);

        t.add('abc', 1);
        expect(t.size).toBe(1);
        expect(t.empty).toBeFalsy();

        t.add('abd', 1);
        expect(t.size).toBe(2);
        expect(t.empty).toBeFalsy();
      });

      it('Should replace value for existing key', () => {
        const t = new TrieMap(eng);

        t.add('abc', 1);
        expect(t.size).toBe(1);
        expect(t.empty).toBeFalsy();
        expect(t.get('abc')).toBe(1);

        t.add('abc', 10);
        expect(t.size).toBe(1);
        expect(t.empty).toBeFalsy();
        expect(t.get('abc')).toBe(10);
      });

      it('Should return trie size after adding value', () => {
        const t = new TrieMap(eng);

        const size1 = t.add('abc', 1);
        expect(t.size).toBe(1);
        expect(t.empty).toBeFalsy();
        expect(t.get('abc')).toBe(1);
        expect(size1).toBe(1);

        const size2 = t.add('abd', 10);
        expect(t.size).toBe(2);
        expect(t.empty).toBeFalsy();
        expect(t.get('abd')).toBe(10);
        expect(size2).toBe(2);

        const size3 = t.add('abc', 10);
        expect(t.size).toBe(2);
        expect(t.empty).toBeFalsy();
        expect(t.get('abc')).toBe(10);
        expect(size3).toBe(2);
      });

      it('Should check alphabet', () => {
        const t = new TrieMap(eng);
        const add = () => t.add('ab@', 0);

        expect(add).toThrow(TypeError);
        expect(add).toThrow(`Character ${'@'.charCodeAt(0)} is not in the alphabet`);
      });

      it('Should check key', () => {
        const t = new TrieMap(eng);
        t.add('abc', 0);
        const add1 = () => t.add('', 1);
        const add2 = () => t.add(null, 2);
        const add3 = () => t.add(undefined, 3);

        expect(add1).toThrow(TypeError);
        expect(add1).toThrow('Key is empty');
        expect(add2).toThrow(TypeError);
        expect(add2).toThrow('Key is empty');
        expect(add3).toThrow(TypeError);
        expect(add3).toThrow('Key is empty');
      });

    });

    describe('delete', () => {
      it('Should handle empty trie', () => {
        const t = new TrieMap(eng);

        const res = t.delete('a');

        expect(res).toBeFalsy();
      });

      it('Should not delete if key not match', () => {
        const t = new TrieMap(eng);
        t.add('abc', 1);

        const res = t.delete('abd');

        expect(res).toBeFalsy();
        expect(t.size).toBe(1);
        expect(t.has('abc')).toBeTruthy();
      });

      it('Should delete if key match', () => {
        const t = new TrieMap(eng);
        t.add('abc', 1);
        t.add('abd', 2);

        const res = t.delete('abc');

        expect(res).toBeTruthy();
        expect(t.size).toBe(1);
        expect(t.has('abc')).toBeFalsy();
        expect(t.has('abd')).toBeTruthy();
      });

      it('Should delete inner nodes', () => {
        const t = new TrieMap(eng);
        t.add('abc', 1);
        t.add('def', 2);

        expect(t['root'].next[1]).toBeNull();
        expect(t['root'].next[2]).toBeTruthy();
        expect(t['root'].next[3]).toBeNull();
        expect(t['root'].next[4]).toBeNull();
        expect(t['root'].next[5]).toBeTruthy();
        expect(t['root'].next[6]).toBeNull();

        t.delete('abc');
        expect(t['root'].next[2]).toBeNull();

        t.delete('def');
        expect(t['root']).toBeNull();

      });

      it('Should check alphabet', () => {
        const t = new TrieMap(eng);
        t.add('abc', 1);
        const del = () => t.delete('ab@');

        expect(del).toThrow(TypeError);
        expect(del).toThrow(`Character ${'@'.charCodeAt(0)} is not in the alphabet`);
      });

      it('Should check key', () => {
        const t = new TrieMap(eng);
        t.add('abc', 0);
        const del1 = () => t.delete('');
        const del2 = () => t.delete(null);
        const del3 = () => t.delete(undefined);

        expect(del1).toThrow(TypeError);
        expect(del1).toThrow('Key is empty');
        expect(del2).toThrow(TypeError);
        expect(del2).toThrow('Key is empty');
        expect(del3).toThrow(TypeError);
        expect(del3).toThrow('Key is empty');
      });

    });

  });

  describe('PrefixTree implementation', () => {
    it('Should return empty string for empty trie', () => {
      const t = new TrieMap(eng);

      expect(t.longestPrefixOf('abc')).toBe('');
    });

    it('Should return empty string if no prefix', () => {
      const t = new TrieMap(eng);
      t.add('abc', 1);

      expect(t.longestPrefixOf('d')).toBe('');
    });

    it('Should return empty string if no value on the key', () => {
      const t = new TrieMap(eng);
      t.add('abc', 1);

      expect(t.longestPrefixOf('ab')).toBe('');
    });

    it('Should return key if value on the key', () => {
      const t = new TrieMap(eng);
      t.add('abc', 1);

      expect(t.longestPrefixOf('abc')).toBe('abc');
    });

    it('Should return key if value on the key and sub-key', () => {
      const t = new TrieMap(eng);
      t.add('abcd', 1);
      t.add('abcdefk', 1);

      expect(t.longestPrefixOf('abcdefk')).toBe('abcdefk');
    });

    it('Should return longest prefix if value on the key', () => {
      const t = new TrieMap(eng);
      t.add('abcd', 1);
      t.add('abcdefg', 1);
      t.add('abcdefk', 1);

      expect(t.longestPrefixOf('abcdefzhrjkt')).toBe('abcd');
      expect(t.longestPrefixOf('abcdefghrjkt')).toBe('abcdefg');
    });

    it('Should check alphabet', () => {
      const t = new TrieMap(eng);
      t.add('abc', 1);
      const lp = () => t.longestPrefixOf('ab@');

      expect(lp).toThrow(TypeError);
      expect(lp).toThrow(`Character ${'@'.charCodeAt(0)} is not in the alphabet`);
    });

    it('Should check key', () => {
      const t = new TrieMap(eng);
      t.add('abc', 0);
      const lp1 = () => t.longestPrefixOf('');
      const lp2 = () => t.longestPrefixOf(null);
      const lp3 = () => t.longestPrefixOf(undefined);

      expect(lp1).toThrow(TypeError);
      expect(lp1).toThrow('Key is empty');
      expect(lp2).toThrow(TypeError);
      expect(lp2).toThrow('Key is empty');
      expect(lp3).toThrow(TypeError);
      expect(lp3).toThrow('Key is empty');
    });

  });

  describe('Iterators', () => {
    describe('Simple iterators', () => {
      describe('Keys iterator', () => {
        it('Should return empty keys iterator for empty trie', () => {
          const t = new TrieMap('eng');
          const keys = t.keys();
          const next = keys.next();

          expect(next.value).toBeUndefined();
          expect(next.done).toBeTruthy();
        });

        it('Should return all keys (1 key)', () => {
          const t = new TrieMap(eng);

          t.add('abcd', 1);

          const keys = t.keys();
          const next1 = keys.next();

          expect(next1.value).toBe('abcd');
          expect(next1.done).toBeFalsy();

          const next2 = keys.next();

          expect(next2.value).toBeUndefined();
          expect(next2.done).toBeTruthy();
        });

        it('Should return all keys (many keys)', () => {
          const t = new TrieMap(eng);

          t.add('abcd', 1);
          t.add('abcde', 1);
          t.add('abcdef', 1);
          t.add('xyz', 1);
          t.add('xyza', 1);
          t.add('xyzb', 1);

          const arr = ['abcd', 'abcde', 'abcdef', 'xyz', 'xyza', 'xyzb'];
          let count = 0;
          for (const k of t.keys()) {
            expect(arr.indexOf(k)).toBeGreaterThanOrEqual(0);
            count += 1;
          }
          expect(count).toBe(6);

        });
      });

      describe('Values iterator', () => {
        it('Should return empty values iterator for empty trie', () => {
          const t = new TrieMap('eng');
          const values = t.values();
          const next = values.next();

          expect(next.value).toBeUndefined();
          expect(next.done).toBeTruthy();
        });

        it('Should return all values (1 value)', () => {
          const t = new TrieMap(eng);

          t.add('abcd', 1);

          const values = t.values();
          const next1 = values.next();

          expect(next1.value).toBe(1);
          expect(next1.done).toBeFalsy();

          const next2 = values.next();

          expect(next2.value).toBeUndefined();
          expect(next2.done).toBeTruthy();
        });

        it('Should return all values (many values)', () => {
          const t = new TrieMap<number>(eng);

          t.add('abcd', 1);
          t.add('abcde', 2);
          t.add('abcdef', 3);
          t.add('xyz', 4);
          t.add('xyza', 5);
          t.add('xyzb', 6);

          const arr = [1, 2, 3, 4, 5, 6];
          let count = 0;
          for (const v of t.values()) {
            expect(arr.indexOf(v)).toBeGreaterThanOrEqual(0);
            count += 1;
          }
          expect(count).toBe(6);

        });
      });

      describe('Entries iterator', () => {
        it('Should return empty entries iterator for empty trie', () => {
          const t = new TrieMap('eng');
          const entries = t.entries();
          const next = entries.next();

          expect(next.value).toBeUndefined();
          expect(next.done).toBeTruthy();
        });

        it('Should return all entries (1 entry)', () => {
          const t = new TrieMap(eng);

          t.add('abcd', 1);

          const entries = t.entries();
          const next1 = entries.next();

          expect(next1.value).toEqual(['abcd', 1]);
          expect(next1.done).toBeFalsy();

          const next2 = entries.next();

          expect(next2.value).toBeUndefined();
          expect(next2.done).toBeTruthy();
        });

        it('Should return all entries (many entries)', () => {
          const t = new TrieMap<number>(eng);

          t.add('abcd', 1);
          t.add('abcde', 2);
          t.add('abcdef', 3);
          t.add('xyz', 4);
          t.add('xyza', 5);
          t.add('xyzb', 6);

          const arr = [
            ['abcd', 1],
            ['abcde', 2],
            ['abcdef', 3],
            ['xyz', 4],
            ['xyza', 5],
            ['xyzb', 6]
          ];
          let count = 0;
          for (const e of t.entries()) {
            const found = arr.find(item => item[0] === e[0]);
            expect(found[0]).toBe(e[0]);
            expect(found[1]).toBe(e[1]);
            count += 1;
          }
          expect(count).toBe(6);

        });
      });

    });
  });

  describe('Prefix iterators', () => {
    describe('KeysWithPrefix iterator', () => {
      it('Should return empty keys iterator for empty trie', () => {
        const t = new TrieMap('eng');
        const keys = t.keysWithPrefix('a');
        const next = keys.next();

        expect(next.value).toBeUndefined();
        expect(next.done).toBeTruthy();
      });

      it('Should return all keys (1 key)', () => {
        const t = new TrieMap(eng);

        t.add('abcd', 1);
        t.add('zbcd', 10);

        const keys = t.keysWithPrefix('a');
        const next1 = keys.next();

        expect(next1.value).toBe('abcd');
        expect(next1.done).toBeFalsy();

        const next2 = keys.next();

        expect(next2.value).toBeUndefined();
        expect(next2.done).toBeTruthy();
      });

      it('Should return all keys (many keys)', () => {
        const t = new TrieMap(eng);

        t.add('abcd', 1);
        t.add('abcde', 1);
        t.add('abcdef', 1);
        t.add('xyz', 1);
        t.add('xyza', 1);
        t.add('xyzb', 1);

        const arr = ['abcd', 'abcde', 'abcdef'];
        let count = 0;
        for (const k of t.keysWithPrefix('ab')) {
          expect(arr.indexOf(k)).toBeGreaterThanOrEqual(0);
          count += 1;
        }
        expect(count).toBe(3);

      });

      it('Should check alphabet', () => {
        const t = new TrieMap(eng);
        const kwp = () => t.keysWithPrefix('ab@c');

        t.add('abcde', 1);

        expect(kwp).toThrow(TypeError);
        expect(kwp).toThrow(`Character ${'@'.charCodeAt(0)} is not in the alphabet`);
      });
    });

    describe('ValuesWithPrefix iterator', () => {
      it('Should return empty values iterator for empty trie', () => {
        const t = new TrieMap('eng');
        const values = t.valuesWithPrefix('a');
        const next = values.next();

        expect(next.value).toBeUndefined();
        expect(next.done).toBeTruthy();
      });

      it('Should return all values (1 value)', () => {
        const t = new TrieMap(eng);

        t.add('abcd', 1);
        t.add('obcd', 10);

        const values = t.valuesWithPrefix('o');
        const next1 = values.next();

        expect(next1.value).toBe(10);
        expect(next1.done).toBeFalsy();

        const next2 = values.next();

        expect(next2.value).toBeUndefined();
        expect(next2.done).toBeTruthy();
      });

      it('Should return all values (many values)', () => {
        const t = new TrieMap<number>(eng);

        t.add('abcd', 1);
        t.add('abcde', 2);
        t.add('abcdef', 3);
        t.add('xyz', 4);
        t.add('xyza', 5);
        t.add('xyzb', 6);

        const arr = [4, 5, 6];
        let count = 0;
        for (const v of t.valuesWithPrefix('xyz')) {
          expect(arr.indexOf(v)).toBeGreaterThanOrEqual(0);
          count += 1;
        }
        expect(count).toBe(3);

      });

      it('Should check alphabet', () => {
        const t = new TrieMap(eng);
        const vwp = () => t.valuesWithPrefix('ab@c');

        t.add('abcde', 1);

        expect(vwp).toThrow(TypeError);
        expect(vwp).toThrow(`Character ${'@'.charCodeAt(0)} is not in the alphabet`);
      });

    });

    describe('EntriesWithPrefix iterator', () => {
      it('Should return empty entries iterator for empty trie', () => {
        const t = new TrieMap('eng');
        const entries = t.entriesWithPrefix('d');
        const next = entries.next();

        expect(next.value).toBeUndefined();
        expect(next.done).toBeTruthy();
      });

      it('Should return all entries (1 entry)', () => {
        const t = new TrieMap(eng);

        t.add('abcd', 1);
        t.add('ebcd', 10);

        const entries = t.entriesWithPrefix('e');
        const next1 = entries.next();

        expect(next1.value).toEqual(['ebcd', 10]);
        expect(next1.done).toBeFalsy();

        const next2 = entries.next();

        expect(next2.value).toBeUndefined();
        expect(next2.done).toBeTruthy();
      });

      it('Should return all entries (many entries)', () => {
        const t = new TrieMap<number>(eng);

        t.add('abcd', 1);
        t.add('abcde', 2);
        t.add('abcdef', 3);
        t.add('xyz', 4);
        t.add('xyza', 5);
        t.add('xyzb', 6);

        const arr = [
          ['xyz', 4],
          ['xyza', 5],
          ['xyzb', 6]
        ];
        let count = 0;
        for (const e of t.entriesWithPrefix('x')) {
          const found = arr.find(item => item[0] === e[0]);
          expect(found[0]).toBe(e[0]);
          expect(found[1]).toBe(e[1]);
          count += 1;
        }
        expect(count).toBe(3);

      });

      it('Should check alphabet', () => {
        const t = new TrieMap(eng);
        const ewp = () => t.entriesWithPrefix('ab@c');

        t.add('abcde', 1);

        expect(ewp).toThrow(TypeError);
        expect(ewp).toThrow(`Character ${'@'.charCodeAt(0)} is not in the alphabet`);
      });


    });

  });

  describe('Match iterators', () => {
    describe('KeysThatMatch iterator', () => {
      it('Should return empty keys iterator for empty trie', () => {
        const t = new TrieMap('eng');
        const keys1 = t.keysThatMatch('a');
        const next1 = keys1.next();

        expect(next1.value).toBeUndefined();
        expect(next1.done).toBeTruthy();

        const keys2 = t.keysThatMatch('?');
        const next2 = keys2.next();

        expect(next2.value).toBeUndefined();
        expect(next2.done).toBeTruthy();
      });

      it('Should return all keys (1 key)', () => {
        const t = new TrieMap(eng);

        t.add('abcd', 1);

        const keys = t.keysThatMatch('a?c?', '?');
        const next1 = keys.next();

        expect(next1.value).toBe('abcd');
        expect(next1.done).toBeFalsy();

        const next2 = keys.next();

        expect(next2.value).toBeUndefined();
        expect(next2.done).toBeTruthy();
      });

      it('Should return all keys (many keys) - 1', () => {
        const t = new TrieMap(eng);

        t.add('abcd', 1);
        t.add('abcde', 1);
        t.add('abcdf', 1);
        t.add('xyz', 1);
        t.add('xyza', 1);
        t.add('xyzb', 1);

        const arr = ['abcde', 'abcdf'];
        let count = 0;
        for (const k of t.keysThatMatch('a?cd?')) {
          expect(arr.indexOf(k)).toBeGreaterThanOrEqual(0);
          count += 1;
        }
        expect(count).toBe(2);

      });

      it('Should return all keys (many keys) - 2', () => {
        const t = new TrieMap(eng);

        t.add('abcd', 1);
        t.add('abcde', 1);
        t.add('abcdef', 1);
        t.add('xyz', 1);
        t.add('xyza', 1);
        t.add('xyzb', 1);

        const arr = ['abcd'];
        let count = 0;
        for (const k of t.keysThatMatch('a?cd')) {
          expect(arr.indexOf(k)).toBeGreaterThanOrEqual(0);
          count += 1;
        }
        expect(count).toBe(1);

      });

      it('Should return all keys (many keys) - 3', () => {
        const t = new TrieMap(eng);

        t.add('abcd', 1);
        t.add('abcde', 1);
        t.add('abcdef', 1);
        t.add('xyz', 1);
        t.add('xyza', 1);
        t.add('xyzb', 1);

        const arr = ['abcd', 'xyza', 'xyzb'];
        let count = 0;
        for (const k of t.keysThatMatch('????')) {
          expect(arr.indexOf(k)).toBeGreaterThanOrEqual(0);
          count += 1;
        }
        expect(count).toBe(3);

      });

      it('Should return all keys (many keys) - 4', () => {
        const t = new TrieMap(eng);

        t.add('abcd', 1);
        t.add('zbcd', 1);

        const arr = ['abcd', 'zbcd'];
        let count = 0;
        for (const k of t.keysThatMatch('?bcd')) {
          expect(arr.indexOf(k)).toBeGreaterThanOrEqual(0);
          count += 1;
        }
        expect(count).toBe(2);
      });

      it('Should check alphabet', () => {
        const t = new TrieMap(eng);
        const ktm = () => t.keysThatMatch('ab@c', '?');

        t.add('abcde', 1);

        expect(ktm).toThrow(TypeError);
        expect(ktm).toThrow(`Character ${'@'.charCodeAt(0)} is not in the alphabet`);
      });

      it('Should check wildcard (character)', () => {
        const t = new TrieMap(eng);
        const ktm = () => t.keysThatMatch('abc', '-');

        t.add('abcde', 1);

        expect(ktm).toThrow(TypeError);
        expect(ktm).toThrow('Alphabet must not include wildcard');
      });

      it('Should check wildcard (length 1)', () => {
        const t = new TrieMap(eng);
        const ktm = () => t.keysThatMatch('abc', '');

        t.add('abcde', 1);

        expect(ktm).toThrow(TypeError);
        expect(ktm).toThrow('Wildcard length must be 1');
      });

      it('Should check wildcard (length 2)', () => {
        const t = new TrieMap(eng);
        const ktm = () => t.keysThatMatch('abc', '*?');

        t.add('abcde', 1);

        expect(ktm).toThrow(TypeError);
        expect(ktm).toThrow('Wildcard length must be 1');
      });

      it('Should check wildcard (length 3)', () => {
        const t = new TrieMap(eng);
        const ktm = () => t.keysThatMatch('abc', null);

        t.add('abcde', 1);

        expect(ktm).toThrow(TypeError);
        expect(ktm).toThrow('Wildcard length must be 1');
      });

    });

    describe('ValuesThatMatch iterator', () => {
      it('Should return empty values iterator for empty trie', () => {
        const t = new TrieMap<number>('eng');
        const values1 = t.valuesThatMatch('a');
        const next1 = values1.next();

        expect(next1.value).toBeUndefined();
        expect(next1.done).toBeTruthy();

        const values2 = t.valuesThatMatch('?');
        const next2 = values2.next();

        expect(next2.value).toBeUndefined();
        expect(next2.done).toBeTruthy();
      });

      it('Should return all values (1 key)', () => {
        const t = new TrieMap<number>(eng);

        t.add('abcd', 1);

        const values = t.valuesThatMatch('a?c?', '?');
        const next1 = values.next();

        expect(next1.value).toBe(1);
        expect(next1.done).toBeFalsy();

        const next2 = values.next();

        expect(next2.value).toBeUndefined();
        expect(next2.done).toBeTruthy();
      });

      it('Should return all values (many keys) - 1', () => {
        const t = new TrieMap<number>(eng);

        t.add('abcd', 1);
        t.add('abcde', 2);
        t.add('abcdf', 3);
        t.add('xyz', 4);
        t.add('xyza', 5);
        t.add('xyzb', 6);

        const arr = [2, 3];
        let count = 0;
        for (const k of t.valuesThatMatch('a?cd?')) {
          expect(arr.indexOf(k)).toBeGreaterThanOrEqual(0);
          count += 1;
        }
        expect(count).toBe(2);

      });

      it('Should return all values (many keys) - 2', () => {
        const t = new TrieMap<number>(eng);

        t.add('abcd', 1);
        t.add('abcde', 2);
        t.add('abcdef', 3);
        t.add('xyz', 4);
        t.add('xyza', 5);
        t.add('xyzb', 6);

        const arr = [1];
        let count = 0;
        for (const k of t.valuesThatMatch('a?cd')) {
          expect(arr.indexOf(k)).toBeGreaterThanOrEqual(0);
          count += 1;
        }
        expect(count).toBe(1);

      });

      it('Should return all values (many keys) - 3', () => {
        const t = new TrieMap<number>(eng);

        t.add('abcd', 1);
        t.add('abcde', 2);
        t.add('abcdef', 3);
        t.add('xyz', 4);
        t.add('xyza', 5);
        t.add('xyzb', 6);

        const arr = [1, 5, 6];
        let count = 0;
        for (const k of t.valuesThatMatch('????')) {
          expect(arr.indexOf(k)).toBeGreaterThanOrEqual(0);
          count += 1;
        }
        expect(count).toBe(3);

      });

      it('Should return all values (many keys) - 4', () => {
        const t = new TrieMap<number>(eng);

        t.add('abcd', 1);
        t.add('zbcd', 2);

        const arr = [1, 2];
        let count = 0;
        for (const k of t.valuesThatMatch('?bcd')) {
          expect(arr.indexOf(k)).toBeGreaterThanOrEqual(0);
          count += 1;
        }
        expect(count).toBe(2);
      });

      it('Should check alphabet', () => {
        const t = new TrieMap(eng);
        const vtm = () => t.valuesThatMatch('ab@c', '?');

        t.add('abcde', 1);

        expect(vtm).toThrow(TypeError);
        expect(vtm).toThrow(`Character ${'@'.charCodeAt(0)} is not in the alphabet`);
      });

      it('Should check wildcard (character)', () => {
        const t = new TrieMap(eng);
        const vtm = () => t.valuesThatMatch('abc', '-');

        t.add('abcde', 1);

        expect(vtm).toThrow(TypeError);
        expect(vtm).toThrow('Alphabet must not include wildcard');
      });

      it('Should check wildcard (length 1)', () => {
        const t = new TrieMap(eng);
        const vtm = () => t.valuesThatMatch('abc', '');

        t.add('abcde', 1);

        expect(vtm).toThrow(TypeError);
        expect(vtm).toThrow('Wildcard length must be 1');
      });

      it('Should check wildcard (length 2)', () => {
        const t = new TrieMap(eng);
        const vtm = () => t.valuesThatMatch('abc', '*?');

        t.add('abcde', 1);

        expect(vtm).toThrow(TypeError);
        expect(vtm).toThrow('Wildcard length must be 1');
      });

      it('Should check wildcard (length 3)', () => {
        const t = new TrieMap(eng);
        const vtm = () => t.valuesThatMatch('abc', null);

        t.add('abcde', 1);

        expect(vtm).toThrow(TypeError);
        expect(vtm).toThrow('Wildcard length must be 1');
      });

    });

    describe('EntriesThatMatch iterator', () => {
      it('Should return empty entries iterator for empty trie', () => {
        const t = new TrieMap<number>('eng');
        const entries1 = t.entriesThatMatch('a');
        const next1 = entries1.next();

        expect(next1.value).toBeUndefined();
        expect(next1.done).toBeTruthy();

        const entries2 = t.entriesThatMatch('?');
        const next2 = entries2.next();

        expect(next2.value).toBeUndefined();
        expect(next2.done).toBeTruthy();
      });

      it('Should return all entries (1 key)', () => {
        const t = new TrieMap<number>(eng);

        t.add('abcd', 1);

        const entries = t.entriesThatMatch('a?c?', '?');
        const next1 = entries.next();

        expect(next1.value).toEqual(['abcd', 1]);
        expect(next1.done).toBeFalsy();

        const next2 = entries.next();

        expect(next2.value).toBeUndefined();
        expect(next2.done).toBeTruthy();
      });

      it('Should return all entries (many keys) - 1', () => {
        const t = new TrieMap<number>(eng);

        t.add('abcd', 1);
        t.add('abcde', 2);
        t.add('abcdf', 3);
        t.add('xyz', 4);
        t.add('xyza', 5);
        t.add('xyzb', 6);

        const arr = [['abcde', 2], ['abcdf', 3]];
        let count = 0;
        for (const k of t.entriesThatMatch('a?cd?')) {
          const found = arr.find(item => item[0] === k[0]);
          expect(found[0]).toBe(k[0]);
          expect(found[1]).toBe(k[1]);
          count += 1;
        }
        expect(count).toBe(2);

      });

      it('Should return all entries (many keys) - 2', () => {
        const t = new TrieMap<number>(eng);

        t.add('abcd', 1);
        t.add('abcde', 2);
        t.add('abcdef', 3);
        t.add('xyz', 4);
        t.add('xyza', 5);
        t.add('xyzb', 6);

        const arr = [['abcd', 1]];
        let count = 0;
        for (const k of t.entriesThatMatch('a?cd')) {
          expect(arr[0][0]).toBe(k[0]);
          expect(arr[0][1]).toBe(k[1]);
          count += 1;
        }
        expect(count).toBe(1);

      });

      it('Should return all entries (many keys) - 3', () => {
        const t = new TrieMap<number>(eng);

        t.add('abcd', 1);
        t.add('abcde', 2);
        t.add('abcdef', 3);
        t.add('xyz', 4);
        t.add('xyza', 5);
        t.add('xyzb', 6);

        const arr = [['abcd', 1], ['xyza', 5], ['xyzb', 6]];
        let count = 0;
        for (const k of t.entriesThatMatch('????')) {
          const found = arr.find(item => item[0] === k[0]);
          expect(found[0]).toBe(k[0]);
          expect(found[1]).toBe(k[1]);
          count += 1;
        }
        expect(count).toBe(3);

      });

      it('Should return all values (many keys) - 4', () => {
        const t = new TrieMap<number>(eng);

        t.add('abcd', 1);
        t.add('zbcd', 2);

        const arr = [['abcd', 1], ['zbcd', 2]];
        let count = 0;
        for (const k of t.entriesThatMatch('?bcd')) {
          const found = arr.find(item => item[0] === k[0]);
          expect(found[0]).toBe(k[0]);
          expect(found[1]).toBe(k[1]);
          count += 1;
        }
        expect(count).toBe(2);
      });

      it('Should check alphabet', () => {
        const t = new TrieMap(eng);
        const etm = () => t.entriesThatMatch('ab@c', '?');

        t.add('abcde', 1);

        expect(etm).toThrow(TypeError);
        expect(etm).toThrow(`Character ${'@'.charCodeAt(0)} is not in the alphabet`);
      });

      it('Should check wildcard (character)', () => {
        const t = new TrieMap(eng);
        const etm = () => t.entriesThatMatch('abc', '-');

        t.add('abcde', 1);

        expect(etm).toThrow(TypeError);
        expect(etm).toThrow('Alphabet must not include wildcard');
      });

      it('Should check wildcard (length 1)', () => {
        const t = new TrieMap(eng);
        const etm = () => t.entriesThatMatch('abc', '');

        t.add('abcde', 1);

        expect(etm).toThrow(TypeError);
        expect(etm).toThrow('Wildcard length must be 1');
      });

      it('Should check wildcard (length 2)', () => {
        const t = new TrieMap(eng);
        const etm = () => t.entriesThatMatch('abc', '*?');

        t.add('abcde', 1);

        expect(etm).toThrow(TypeError);
        expect(etm).toThrow('Wildcard length must be 1');
      });

      it('Should check wildcard (length 3)', () => {
        const t = new TrieMap(eng);
        const etm = () => t.entriesThatMatch('abc', null);

        t.add('abcde', 1);

        expect(etm).toThrow(TypeError);
        expect(etm).toThrow('Wildcard length must be 1');
      });

    });

  });

  describe('Array convertors', () => {
    describe('ToArray convertor', () => {
      it('Should return empty array for empty trie', () => {
        const t = new TrieMap<number>(eng);

        expect(t.toArray()).toEqual([]);
      });

      it('Should return empty array of values (1 key)', () => {
        const t = new TrieMap<number>(eng);
        t.add('abc', 1);

        expect(t.toArray()).toEqual([1]);
      });

      it('Should return empty array of values (many keys)', () => {
        const t = new TrieMap<number>(eng);
        t.add('abc', 1);
        t.add('a', 2);
        t.add('z', 3);
        t.add('zx', 4);

        expect(t.toArray().sort((a, b) => a - b)).toEqual([1, 2, 3, 4]);
      });

    });

    describe('ToArrayWithPrefix convertor', () => {
      it('Should return empty array for empty trie', () => {
        const t = new TrieMap<number>(eng);

        expect(t.toArrayWithPrefix('a')).toEqual([]);
      });

      it('Should return empty array of values (1 key)', () => {
        const t = new TrieMap<number>(eng);
        t.add('abc', 1);
        t.add('zbc', 10);

        expect(t.toArrayWithPrefix('a')).toEqual([1]);
      });

      it('Should return empty array of values (many keys)', () => {
        const t = new TrieMap<number>(eng);
        t.add('abc', 1);
        t.add('a', 2);
        t.add('z', 3);
        t.add('zx', 4);

        expect(t.toArrayWithPrefix('a').sort((a, b) => a - b)).toEqual([1, 2]);
      });

      it('Should check alphabet', () => {
        const t = new TrieMap(eng);
        const avp = () => t.toArrayWithPrefix('ab@c');

        t.add('abcde', 1);

        expect(avp).toThrow(TypeError);
        expect(avp).toThrow(`Character ${'@'.charCodeAt(0)} is not in the alphabet`);
      });

    });

    describe('ToArrayThatMatch convertor', () => {
      it('Should return empty array for empty trie', () => {
        const t = new TrieMap<number>('eng');
        const arr1 = t.toArrayThatMatch('a');
        expect(arr1).toEqual([]);

        const arr2 = t.toArrayThatMatch('?');
        expect(arr2).toEqual([]);
      });

      it('Should return all values (1 key)', () => {
        const t = new TrieMap<number>(eng);

        t.add('abcd', 1);

        const arr1 = t.toArrayThatMatch('a?c?', '?');
        expect(arr1).toEqual([1]);
      });

      it('Should return all values (many keys) - 1', () => {
        const t = new TrieMap<number>(eng);

        t.add('abcd', 1);
        t.add('abcde', 2);
        t.add('abcdf', 3);
        t.add('xyz', 4);
        t.add('xyza', 5);
        t.add('xyzb', 6);

        const arr = [2, 3];
        const res = t.toArrayThatMatch('a?cd?');

        expect(res.sort((a, b) => a - b)).toEqual(arr);
        expect(res.length).toBe(2);
      });

      it('Should return all values (many keys) - 2', () => {
        const t = new TrieMap<number>(eng);

        t.add('abcd', 1);
        t.add('abcde', 2);
        t.add('abcdef', 3);
        t.add('xyz', 4);
        t.add('xyza', 5);
        t.add('xyzb', 6);

        const arr = [1];
        const res = t.toArrayThatMatch('a?cd');

        expect(res).toEqual(arr);
        expect(res.length).toBe(1);

      });

      it('Should return all values (many keys) - 3', () => {
        const t = new TrieMap<number>(eng);

        t.add('abcd', 1);
        t.add('abcde', 2);
        t.add('abcdef', 3);
        t.add('xyz', 4);
        t.add('xyza', 5);
        t.add('xyzb', 6);

        const arr = [1, 5, 6];
        const res = t.toArrayThatMatch('????');

        expect(res.sort((a, b) => a - b)).toEqual(arr);
        expect(res.length).toBe(3);
      });

      it('Should return all values (many keys) - 4', () => {
        const t = new TrieMap<number>(eng);

        t.add('abcd', 1);
        t.add('zbcd', 2);

        const arr = [1, 2];
        const res = t.toArrayThatMatch('?bcd');

        expect(res.sort((a, b) => a - b)).toEqual(arr);
        expect(res.length).toBe(2);
      });

      it('Should check alphabet', () => {
        const t = new TrieMap(eng);
        const atm = () => t.toArrayThatMatch('ab@c', '?');

        t.add('abcde', 1);

        expect(atm).toThrow(TypeError);
        expect(atm).toThrow(`Character ${'@'.charCodeAt(0)} is not in the alphabet`);
      });

      it('Should check wildcard (character)', () => {
        const t = new TrieMap(eng);
        const atm = () => t.toArrayThatMatch('abc', '-');

        t.add('abcde', 1);

        expect(atm).toThrow(TypeError);
        expect(atm).toThrow('Alphabet must not include wildcard');
      });

      it('Should check wildcard (length 1)', () => {
        const t = new TrieMap(eng);
        const atm = () => t.toArrayThatMatch('abc', '');

        t.add('abcde', 1);

        expect(atm).toThrow(TypeError);
        expect(atm).toThrow('Wildcard length must be 1');
      });

      it('Should check wildcard (length 2)', () => {
        const t = new TrieMap(eng);
        const atm = () => t.toArrayThatMatch('abc', '*?');

        t.add('abcde', 1);

        expect(atm).toThrow(TypeError);
        expect(atm).toThrow('Wildcard length must be 1');
      });

      it('Should check wildcard (length 3)', () => {
        const t = new TrieMap(eng);
        const atm = () => t.toArrayThatMatch('abc', null);

        t.add('abcde', 1);

        expect(atm).toThrow(TypeError);
        expect(atm).toThrow('Wildcard length must be 1');
      });

    });
  });
});
