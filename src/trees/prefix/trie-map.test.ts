import { TrieMap } from './trie-map';

describe('TrieMap', () => {
  const eng = '\'-abcdefghijklmnopqrstuvwxyz';
  const rus = '-абвгдеёжзийклмнопрстуфхцчшщъыьэюя'

  describe('Construction', () => {
    it('Should construct TrieMap with valid alphabet', () => {
      const t1 = new TrieMap(eng);
      const t2 = new TrieMap(rus);

      expect(t1).toBeTruthy();
      expect(t2).toBeTruthy();
    });

    it('Should not construct TrieMap with empty alphabet', () => {
      const t = () => new TrieMap('');

      expect(t).toThrowError(TypeError);
      expect(t).toThrowError('Alphabet must not be empty');
    });

    it('Should not construct TrieMap with alphabet with duplicated characters', () => {
      const t = () => new TrieMap(eng + 'x');

      expect(t).toThrowError(TypeError);
      expect(t).toThrowError('Duplicate character x in alphabet');
    });

    it('Should not construct TrieMap with too large alphabet', () => {
      const t = () => new TrieMap(eng);

      TrieMap.setMaxAlphabetLength(10);
      expect(t).toThrowError(TypeError);
      expect(t).toThrowError('Alphabet length 28 is greater than maximum 10');
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
      })
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
    });

    describe('get', () => {

    });

    describe('add', () => {

    });

    describe('delete', () => {

    });

  });

  describe('PrefixTree implementation', () => {

  });

  describe('Iterators', () => {

  });

  describe('Prefix iterators', () => {

  });

  describe('Match iterators', () => {

  });

  describe('Array convertors', () => {

  });
});
