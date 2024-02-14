import { TrieSet } from './trie-set';

describe('TrieSet', () => {
  const eng: string = '\'-abcdefghijklmnopqrstuvwxyz';
  const rus: string = '-абвгдеёжзийклмнопрстуфхцчшщъыьэюя';

  describe('Construction', () => {
    it('Should construct TrieSet with valid alphabet', () => {
      const t1 = new TrieSet(eng);
      const t2 = new TrieSet(rus);

      expect(t1).toBeTruthy();
      expect(t2).toBeTruthy();
    });

    it('Should not construct TrieSet with empty alphabet', () => {
      const t = () => new TrieSet('');

      expect(t).toThrow(TypeError);
      expect(t).toThrow('Alphabet must not be empty');
    });

    it('Should not construct TrieSet with alphabet with duplicated characters', () => {
      const t = () => new TrieSet(eng + 'x');

      expect(t).toThrow(TypeError);
      expect(t).toThrow('Duplicate character x in alphabet');
    });

    it('Should not construct TrieSet with too large alphabet', () => {
      const t = () => new TrieSet(eng);

      TrieSet.setMaxAlphabetLength(10);
      expect(t).toThrow(TypeError);
      expect(t).toThrow('Alphabet length 28 is greater than maximum 10');
      TrieSet.setMaxAlphabetLength(128);
    });
  });

  describe('Tree implementation', () => {
    describe('size', () => {
      it('size should be 0 for new trie', () => {
        const t = new TrieSet(eng);
        expect(t.size).toBe(0);
      });

      it('size should be greater than 0 for trie with entries', () => {
        const t = new TrieSet(eng);

        t.add('test');
        expect(t.size).toBe(1);

        t.add('tester');
        expect(t.size).toBe(2);

        t.add('tester');
        expect(t.size).toBe(2);

      });

      it('size should be 0 after clear', () => {
        const t = new TrieSet(eng);

        t.add('test');
        t.add('tester');
        t.add('tests');

        expect(t.size).toBeGreaterThan(0);

        t.clear();

        expect(t.size).toBe(0);

      });

      it('size should be 0 after deleting all entries', () => {
        const t = new TrieSet(eng);

        t.add('test');
        t.add('tester');
        t.add('tests');

        expect(t.size).toBeGreaterThan(0);

        t.delete('tester');
        t.delete('test');
        t.delete('tests');

        expect(t.size).toBe(0);

      });
    });

    describe('empty', () => {
      it('empty should be true for new trie', () => {
        const t = new TrieSet(eng);
        expect(t.empty).toBeTruthy();
      });

      it('empty should be false for trie with entries', () => {
        const t = new TrieSet(eng);

        t.add('test');
        expect(t.empty).toBeFalsy();

        t.add('tester');
        expect(t.empty).toBeFalsy();

        t.add('tester');
        expect(t.empty).toBeFalsy();

      });

      it('empty should be true after clear', () => {
        const t = new TrieSet(eng);

        t.add('test');
        t.add('tester');
        t.add('tests');

        expect(t.empty).toBeFalsy();

        t.clear();

        expect(t.empty).toBeTruthy();

      });

      it('empty should be true after deleting all entries', () => {
        const t = new TrieSet(eng);

        t.add('test');
        t.add('tester');
        t.add('tests');

        expect(t.empty).toBeFalsy();

        t.delete('tester');
        t.delete('test');
        t.delete('tests');

        expect(t.empty).toBeTruthy();

      });

    });

    describe('clear', () => {
      it('Should clear trie - test 1', () => {
        const t = new TrieSet(eng);
        t.add('a');
        t.add('b');

        t.clear();

        expect(t.empty).toBeTruthy();
        expect(t.size).toBe(0);
        expect(t.has('a')).toBeFalsy();
        expect(t.has('b')).toBeFalsy();
      });

      it('Should clear trie - test 2', () => {
        const t = new TrieSet(eng);
        t.add('a');
        t.add('aa');

        t.clear();

        expect(t.empty).toBeTruthy();
        expect(t.size).toBe(0);
        expect(t.has('a')).toBeFalsy();
        expect(t.has('aa')).toBeFalsy();
      });

      it('Should return number of cleared items', () => {
        const t = new TrieSet(eng);
        t.add('a');
        t.add('aa');
        t.add('aab');
        t.add('aaa');

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
        const t = new TrieSet(eng);

        expect(t.has('a')).toBeFalsy();

        t.add('a');
        expect(t.has('b')).toBeFalsy();
      });

      it('Should have added elements', () => {
        const t = new TrieSet(eng);

        const items = ['a', 'aa', 'aaa', 'aab', 'ab'];

        items.forEach(item => t.add(item));

        items.forEach(item => expect(t.has(item)).toBeTruthy());
      });

      it('Should have added elements not depending of insertion order', () => {
        const t = new TrieSet(eng);

        const items = ['aaa', 'aa', 'a', 'aab', 'ab'];

        items.forEach(item => t.add(item));

        expect(t.has('a')).toBeTruthy();
        expect(t.has('aa')).toBeTruthy();
        expect(t.has('aaa')).toBeTruthy();
        expect(t.has('ab')).toBeTruthy();
        expect(t.has('aab')).toBeTruthy();
      });

      it('Should check alphabet', () => {
        const t = new TrieSet(eng);
        t.add('abc');
        const has = () => t.has('ab@');

        expect(has).toThrow(TypeError);
        expect(has).toThrow(`Character ${'@'.charCodeAt(0)} is not in the alphabet`);
      });

      it('Should check key', () => {
        const t = new TrieSet(eng);
        t.add('abc');
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

    describe('add', () => {
      it('Should add key/value to trie', () => {
        const t = new TrieSet(eng);

        t.add('abc');
        expect(t.size).toBe(1);
        expect(t.empty).toBeFalsy();

        t.add('abd');
        expect(t.size).toBe(2);
        expect(t.empty).toBeFalsy();
      });

      it('Should not duplicate key', () => {
        const t = new TrieSet(eng);

        t.add('abc');
        expect(t.size).toBe(1);
        expect(t.empty).toBeFalsy();
        expect(t.has('abc')).toBeTruthy();

        t.add('abc');
        expect(t.size).toBe(1);
        expect(t.empty).toBeFalsy();
        expect(t.has('abc')).toBeTruthy();
      });

      it('Should return trie size after adding value', () => {
        const t = new TrieSet(eng);

        const size1 = t.add('abc');
        expect(t.size).toBe(1);
        expect(t.empty).toBeFalsy();
        expect(t.has('abc')).toBeTruthy();
        expect(size1).toBe(1);

        const size2 = t.add('abd');
        expect(t.size).toBe(2);
        expect(t.empty).toBeFalsy();
        expect(t.has('abd')).toBeTruthy();
        expect(size2).toBe(2);

        const size3 = t.add('abc');
        expect(t.size).toBe(2);
        expect(t.empty).toBeFalsy();
        expect(t.has('abc')).toBeTruthy();
        expect(size3).toBe(2);
      });

      it('Should check alphabet', () => {
        const t = new TrieSet(eng);
        const add = () => t.add('ab@');

        expect(add).toThrow(TypeError);
        expect(add).toThrow(`Character ${'@'.charCodeAt(0)} is not in the alphabet`);
      });

      it('Should check key', () => {
        const t = new TrieSet(eng);
        t.add('abc');
        const add1 = () => t.add('');
        const add2 = () => t.add(null);
        const add3 = () => t.add(undefined);

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
        const t = new TrieSet(eng);

        const res = t.delete('a');

        expect(res).toBeFalsy();
      });

      it('Should not delete if key not match', () => {
        const t = new TrieSet(eng);
        t.add('abc');

        const res = t.delete('abd');

        expect(res).toBeFalsy();
        expect(t.size).toBe(1);
        expect(t.has('abc')).toBeTruthy();
      });

      it('Should delete if key match', () => {
        const t = new TrieSet(eng);
        t.add('abc');
        t.add('abd');

        const res = t.delete('abc');

        expect(res).toBeTruthy();
        expect(t.size).toBe(1);
        expect(t.has('abc')).toBeFalsy();
        expect(t.has('abd')).toBeTruthy();
      });

      it('Should delete inner nodes', () => {
        const t = new TrieSet(eng);
        t.add('abc');
        t.add('def');

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
        const t = new TrieSet(eng);
        t.add('abc');
        const del = () => t.delete('ab@');

        expect(del).toThrow(TypeError);
        expect(del).toThrow(`Character ${'@'.charCodeAt(0)} is not in the alphabet`);
      });

      it('Should check key', () => {
        const t = new TrieSet(eng);
        t.add('abc');
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
      const t = new TrieSet(eng);

      expect(t.longestPrefixOf('abc')).toBe('');
    });

    it('Should return empty string if no prefix', () => {
      const t = new TrieSet(eng);
      t.add('abc');

      expect(t.longestPrefixOf('d')).toBe('');
    });

    it('Should return empty string if no value on the key', () => {
      const t = new TrieSet(eng);
      t.add('abc');

      expect(t.longestPrefixOf('ab')).toBe('');
    });

    it('Should return key if value on the key', () => {
      const t = new TrieSet(eng);
      t.add('abc');

      expect(t.longestPrefixOf('abc')).toBe('abc');
    });

    it('Should return key if value on the key and sub-key', () => {
      const t = new TrieSet(eng);
      t.add('abcd');
      t.add('abcdefk');

      expect(t.longestPrefixOf('abcdefk')).toBe('abcdefk');
    });

    it('Should return longest prefix if value on the key', () => {
      const t = new TrieSet(eng);
      t.add('abcd');
      t.add('abcdefg');
      t.add('abcdefk');

      expect(t.longestPrefixOf('abcdefzhrjkt')).toBe('abcd');
      expect(t.longestPrefixOf('abcdefghrjkt')).toBe('abcdefg');
    });

    it('Should check alphabet', () => {
      const t = new TrieSet(eng);
      t.add('abc');
      const lp = () => t.longestPrefixOf('ab@');

      expect(lp).toThrow(TypeError);
      expect(lp).toThrow(`Character ${'@'.charCodeAt(0)} is not in the alphabet`);
    });

    it('Should check key', () => {
      const t = new TrieSet(eng);
      t.add('abc');
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
          const t = new TrieSet('eng');
          const keys = t.keys();
          const next = keys.next();

          expect(next.value).toBeUndefined();
          expect(next.done).toBeTruthy();
        });

        it('Should return all keys (1 key)', () => {
          const t = new TrieSet(eng);

          t.add('abcd');

          const keys = t.keys();
          const next1 = keys.next();

          expect(next1.value).toBe('abcd');
          expect(next1.done).toBeFalsy();

          const next2 = keys.next();

          expect(next2.value).toBeUndefined();
          expect(next2.done).toBeTruthy();
        });

        it('Should return all keys (many keys)', () => {
          const t = new TrieSet(eng);

          t.add('abcd');
          t.add('abcde');
          t.add('abcdef');
          t.add('xyz');
          t.add('xyza');
          t.add('xyzb');

          const arr = ['abcd', 'abcde', 'abcdef', 'xyz', 'xyza', 'xyzb'];
          let count = 0;
          for (const k of t.keys()) {
            expect(arr.indexOf(k)).toBeGreaterThanOrEqual(0);
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
        const t = new TrieSet('eng');
        const keys = t.keysWithPrefix('a');
        const next = keys.next();

        expect(next.value).toBeUndefined();
        expect(next.done).toBeTruthy();
      });

      it('Should return all keys (1 key)', () => {
        const t = new TrieSet(eng);

        t.add('abcd');
        t.add('zbcd');

        const keys = t.keysWithPrefix('a');
        const next1 = keys.next();

        expect(next1.value).toBe('abcd');
        expect(next1.done).toBeFalsy();

        const next2 = keys.next();

        expect(next2.value).toBeUndefined();
        expect(next2.done).toBeTruthy();
      });

      it('Should return all keys (many keys)', () => {
        const t = new TrieSet(eng);

        t.add('abcd');
        t.add('abcde');
        t.add('abcdef');
        t.add('xyz');
        t.add('xyza');
        t.add('xyzb');

        const arr = ['abcd', 'abcde', 'abcdef'];
        let count = 0;
        for (const k of t.keysWithPrefix('ab')) {
          expect(arr.indexOf(k)).toBeGreaterThanOrEqual(0);
          count += 1;
        }
        expect(count).toBe(3);

      });

      it('Should check alphabet', () => {
        const t = new TrieSet(eng);
        const kwp = () => t.keysWithPrefix('ab@c');

        t.add('abcde');

        expect(kwp).toThrow(TypeError);
        expect(kwp).toThrow(`Character ${'@'.charCodeAt(0)} is not in the alphabet`);
      });
    });

  });

  describe('Match iterators', () => {
    describe('KeysThatMatch iterator', () => {
      it('Should return empty keys iterator for empty trie', () => {
        const t = new TrieSet('eng');
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
        const t = new TrieSet(eng);

        t.add('abcd');

        const keys = t.keysThatMatch('a?c?', '?');
        const next1 = keys.next();

        expect(next1.value).toBe('abcd');
        expect(next1.done).toBeFalsy();

        const next2 = keys.next();

        expect(next2.value).toBeUndefined();
        expect(next2.done).toBeTruthy();
      });

      it('Should return all keys (many keys) - 1', () => {
        const t = new TrieSet(eng);

        t.add('abcd');
        t.add('abcde');
        t.add('abcdf');
        t.add('xyz');
        t.add('xyza');
        t.add('xyzb');

        const arr = ['abcde', 'abcdf'];
        let count = 0;
        for (const k of t.keysThatMatch('a?cd?')) {
          expect(arr.indexOf(k)).toBeGreaterThanOrEqual(0);
          count += 1;
        }
        expect(count).toBe(2);

      });

      it('Should return all keys (many keys) - 2', () => {
        const t = new TrieSet(eng);

        t.add('abcd');
        t.add('abcde');
        t.add('abcdef');
        t.add('xyz');
        t.add('xyza');
        t.add('xyzb');

        const arr = ['abcd'];
        let count = 0;
        for (const k of t.keysThatMatch('a?cd')) {
          expect(arr.indexOf(k)).toBeGreaterThanOrEqual(0);
          count += 1;
        }
        expect(count).toBe(1);

      });

      it('Should return all keys (many keys) - 3', () => {
        const t = new TrieSet(eng);

        t.add('abcd');
        t.add('abcde');
        t.add('abcdef');
        t.add('xyz');
        t.add('xyza');
        t.add('xyzb');

        const arr = ['abcd', 'xyza', 'xyzb'];
        let count = 0;
        for (const k of t.keysThatMatch('????')) {
          expect(arr.indexOf(k)).toBeGreaterThanOrEqual(0);
          count += 1;
        }
        expect(count).toBe(3);

      });

      it('Should return all keys (many keys) - 4', () => {
        const t = new TrieSet(eng);

        t.add('abcd');
        t.add('zbcd');

        const arr = ['abcd', 'zbcd'];
        let count = 0;
        for (const k of t.keysThatMatch('?bcd')) {
          expect(arr.indexOf(k)).toBeGreaterThanOrEqual(0);
          count += 1;
        }
        expect(count).toBe(2);
      });

      it('Should check alphabet', () => {
        const t = new TrieSet(eng);
        const ktm = () => t.keysThatMatch('ab@c', '?');

        t.add('abcde');

        expect(ktm).toThrow(TypeError);
        expect(ktm).toThrow(`Character ${'@'.charCodeAt(0)} is not in the alphabet`);
      });

      it('Should check wildcard (character)', () => {
        const t = new TrieSet(eng);
        const ktm = () => t.keysThatMatch('abc', '-');

        t.add('abcde');

        expect(ktm).toThrow(TypeError);
        expect(ktm).toThrow('Alphabet must not include wildcard');
      });

      it('Should check wildcard (length 1)', () => {
        const t = new TrieSet(eng);
        const ktm = () => t.keysThatMatch('abc', '');

        t.add('abcde');

        expect(ktm).toThrow(TypeError);
        expect(ktm).toThrow('Wildcard length must be 1');
      });

      it('Should check wildcard (length 2)', () => {
        const t = new TrieSet(eng);
        const ktm = () => t.keysThatMatch('abc', '*?');

        t.add('abcde');

        expect(ktm).toThrow(TypeError);
        expect(ktm).toThrow('Wildcard length must be 1');
      });

      it('Should check wildcard (length 3)', () => {
        const t = new TrieSet(eng);
        const ktm = () => t.keysThatMatch('abc', null);

        t.add('abcde');

        expect(ktm).toThrow(TypeError);
        expect(ktm).toThrow('Wildcard length must be 1');
      });

    });

  });

  describe('Array convertors', () => {
    describe('ToArray convertor', () => {
      it('Should return empty array for empty trie', () => {
        const t = new TrieSet(eng);

        expect(t.toArray()).toEqual([]);
      });

      it('Should return empty array of values (1 key)', () => {
        const t = new TrieSet(eng);
        t.add('abc');

        expect(t.toArray()).toEqual(['abc']);
      });

      it('Should return empty array of values (many keys)', () => {
        const t = new TrieSet(eng);
        t.add('abc');
        t.add('a');
        t.add('z');
        t.add('zx');

        expect(t.toArray().sort()).toEqual(['abc', 'a', 'z', 'zx'].sort());
      });

    });

    describe('ToArrayWithPrefix convertor', () => {
      it('Should return empty array for empty trie', () => {
        const t = new TrieSet(eng);

        expect(t.toArrayWithPrefix('a')).toEqual([]);
      });

      it('Should return empty array of values (1 key)', () => {
        const t = new TrieSet(eng);
        t.add('abc');
        t.add('zbc');

        expect(t.toArrayWithPrefix('a')).toEqual(['abc']);
      });

      it('Should return empty array of values (many keys)', () => {
        const t = new TrieSet(eng);
        t.add('abc');
        t.add('a');
        t.add('z');
        t.add('zx');

        expect(t.toArrayWithPrefix('a').sort()).toEqual(['a', 'abc'].sort());
      });

      it('Should check alphabet', () => {
        const t = new TrieSet(eng);
        const avp = () => t.toArrayWithPrefix('ab@c');

        t.add('abcde');

        expect(avp).toThrow(TypeError);
        expect(avp).toThrow(`Character ${'@'.charCodeAt(0)} is not in the alphabet`);
      });

    });

    describe('ToArrayThatMatch convertor', () => {
      it('Should return empty array for empty trie', () => {
        const t = new TrieSet('eng');
        const arr1 = t.toArrayThatMatch('a');
        expect(arr1).toEqual([]);

        const arr2 = t.toArrayThatMatch('?');
        expect(arr2).toEqual([]);
      });

      it('Should return all values (1 key)', () => {
        const t = new TrieSet(eng);

        t.add('abcd');

        const arr1 = t.toArrayThatMatch('a?c?', '?');
        expect(arr1).toEqual(['abcd']);
      });

      it('Should return all values (many keys) - 1', () => {
        const t = new TrieSet(eng);

        t.add('abcd');
        t.add('abcde');
        t.add('abcdf');
        t.add('xyz');
        t.add('xyza');
        t.add('xyzb');

        const arr = ['abcde', 'abcdf'];
        const res = t.toArrayThatMatch('a?cd?');

        expect(res.sort()).toEqual(arr.sort());
        expect(res.length).toBe(2);
      });

      it('Should return all values (many keys) - 2', () => {
        const t = new TrieSet(eng);

        t.add('abcd');
        t.add('abcde');
        t.add('abcdef');
        t.add('xyz');
        t.add('xyza');
        t.add('xyzb');

        const arr = ['abcd'];
        const res = t.toArrayThatMatch('a?cd');

        expect(res).toEqual(arr);
        expect(res.length).toBe(1);

      });

      it('Should return all values (many keys) - 3', () => {
        const t = new TrieSet(eng);

        t.add('abcd');
        t.add('abcde');
        t.add('abcdef');
        t.add('xyz');
        t.add('xyza');
        t.add('xyzb');

        const arr = ['abcd', 'xyza', 'xyzb'];
        const res = t.toArrayThatMatch('????');

        expect(res.sort()).toEqual(arr.sort());
        expect(res.length).toBe(3);
      });

      it('Should return all values (many keys) - 4', () => {
        const t = new TrieSet(eng);

        t.add('abcd');
        t.add('zbcd');

        const arr = ['abcd', 'zbcd'];
        const res = t.toArrayThatMatch('?bcd');

        expect(res.sort()).toEqual(arr.sort());
        expect(res.length).toBe(2);
      });

      it('Should check alphabet', () => {
        const t = new TrieSet(eng);
        const atm = () => t.toArrayThatMatch('ab@c', '?');

        t.add('abcde');

        expect(atm).toThrow(TypeError);
        expect(atm).toThrow(`Character ${'@'.charCodeAt(0)} is not in the alphabet`);
      });

      it('Should check wildcard (character)', () => {
        const t = new TrieSet(eng);
        const atm = () => t.toArrayThatMatch('abc', '-');

        t.add('abcde');

        expect(atm).toThrow(TypeError);
        expect(atm).toThrow('Alphabet must not include wildcard');
      });

      it('Should check wildcard (length 1)', () => {
        const t = new TrieSet(eng);
        const atm = () => t.toArrayThatMatch('abc', '');

        t.add('abcde');

        expect(atm).toThrow(TypeError);
        expect(atm).toThrow('Wildcard length must be 1');
      });

      it('Should check wildcard (length 2)', () => {
        const t = new TrieSet(eng);
        const atm = () => t.toArrayThatMatch('abc', '*?');

        t.add('abcde');

        expect(atm).toThrow(TypeError);
        expect(atm).toThrow('Wildcard length must be 1');
      });

      it('Should check wildcard (length 3)', () => {
        const t = new TrieSet(eng);
        const atm = () => t.toArrayThatMatch('abc', null);

        t.add('abcde');

        expect(atm).toThrow(TypeError);
        expect(atm).toThrow('Wildcard length must be 1');
      });

    });
  });
});
