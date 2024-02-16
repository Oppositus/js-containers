import Benchmark = require('benchmark');
import { TrieSet } from './trie-set';
import { Event, Stats } from 'benchmark';

describe('Benchmark TrieSet vs Set', () => {
  const eng: string = '\'-abcdefghijklmnopqrstuvwxyz';
  const rus: string = '-абвгдеёжзийклмнопрстуфхцчшщъыьэюя';

  describe('Benchmark Add', () => {
    const KEYS_SIZE = 100000;

    const setupTest = (min: number, max: number, result: string[], alphabet: string): void => {
      for (let i = 0; i < KEYS_SIZE; ++i) {
        const len = min + Math.ceil(Math.random() * (max - min));
        let str = '';
        for (let j = 0; j < len; ++j) {
          str += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }
        result.push(str);
      }
    };

    const doTest = (trie: TrieSet, set: Set<string>, min: number, max: number, alphabet: string): void => {
      const keys: string[] = [];

      const addFunc = (c: TrieSet | Set<string>, ks: string[]) => {
        const k = ks[Math.floor(Math.random() * ks.length)];
        c.add(k);
      };

      setupTest(min, max, keys, alphabet);

      let statTrie: Stats;
      const benchTrieSet = new Benchmark('Test 1', {
        onCycle: () => trie.clear(),
        onComplete: (event: Event) => statTrie = event.target.stats,
        fn: addFunc.bind(null, trie, keys),
        minSamples: 50
      });
      benchTrieSet.run();

      let statSet: Stats;
      const benchSet = new Benchmark('Test 1', {
        onCycle: () => set.clear(),
        onComplete: (event: Event) => statSet = event.target.stats,
        fn: addFunc.bind(null, set, keys),
        minSamples: 50
      });
      benchSet.run();

      console.log(
        `=== Key Size: ${min} - ${max}. ${alphabet}\n`,
        'Mean Trie/Set:     ', statTrie.mean / statSet.mean, '\n',
        'Deviation Trie/Set:', statTrie.deviation / statSet.deviation, '\n',
        'Variance Trie/Set: ', statTrie.variance / statSet.variance
      );
    };

    it('Add benchmark - key size 3-7 (eng)', () => {
      const MIN_KEY_LENGTH = 3;
      const MAX_KEY_LENGTH = 7;

      doTest(
        new TrieSet(eng),
        new Set<string>(),
        MIN_KEY_LENGTH,
        MAX_KEY_LENGTH,
        eng
      );
    });

    it('Add benchmark - key size 3-7 (rus)', () => {
      const MIN_KEY_LENGTH = 3;
      const MAX_KEY_LENGTH = 7;

      doTest(
        new TrieSet(rus),
        new Set<string>(),
        MIN_KEY_LENGTH,
        MAX_KEY_LENGTH,
        rus
      );
    });

    it('Add benchmark - key size 7-12 (eng)', () => {
      const MIN_KEY_LENGTH = 7;
      const MAX_KEY_LENGTH = 12;

      doTest(
        new TrieSet(eng),
        new Set<string>(),
        MIN_KEY_LENGTH,
        MAX_KEY_LENGTH,
        eng
      );
    });

    it('Add benchmark - key size 7-12 (rus)', () => {
      const MIN_KEY_LENGTH = 7;
      const MAX_KEY_LENGTH = 12;

      doTest(
        new TrieSet(rus),
        new Set<string>(),
        MIN_KEY_LENGTH,
        MAX_KEY_LENGTH,
        rus
      );
    });

    it('Add benchmark - key size 12-20 (eng)', () => {
      const MIN_KEY_LENGTH = 12;
      const MAX_KEY_LENGTH = 20;

      doTest(
        new TrieSet(eng),
        new Set<string>(),
        MIN_KEY_LENGTH,
        MAX_KEY_LENGTH,
        eng
      );
    });

    it('Add benchmark - key size 12-20 (rus)', () => {
      const MIN_KEY_LENGTH = 12;
      const MAX_KEY_LENGTH = 20;

      doTest(
        new TrieSet(rus),
        new Set<string>(),
        MIN_KEY_LENGTH,
        MAX_KEY_LENGTH,
        rus
      );
    });

  });

  describe('Benchmark Delete', () => {
    const KEYS_SIZE = 75000;

    const setupTest = (min: number, max: number, result: string[], alphabet: string): void => {
      for (let i = 0; i < KEYS_SIZE; ++i) {
        const len = min + Math.ceil(Math.random() * (max - min));
        let str = '';
        for (let j = 0; j < len; ++j) {
          str += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }
        result.push(str);
      }
    };

    const fill = (c: TrieSet | Set<string>, keys: string[]): void => {
      for (let i = 0; i < keys.length; ++i) {
        c.add(keys[i]);
      }
    };

    const doTest = (trie: TrieSet, set: Set<string>, min: number, max: number, alphabet: string): void => {
      const keys: string[] = [];

      const delFunc = (c: TrieSet | Set<string>, ks: string[]) => {
        const k = ks[Math.floor(Math.random() * ks.length)];
        c.delete(k);
      };

      setupTest(min, max, keys, alphabet);

      fill(trie, keys);
      let statTrie: Stats;
      const benchTrieSet = new Benchmark('Test 1', {
        onCycle: () => {
          trie.clear();
          fill(trie, keys);
        },
        onComplete: (event: Event) => statTrie = event.target.stats,
        fn: delFunc.bind(null, trie, keys),
        minSamples: 50
      });
      benchTrieSet.run();

      fill(set, keys);
      let statSet: Stats;
      const benchSet = new Benchmark('Test 1', {
        onCycle: () => {
          set.clear();
          fill(set, keys);
        },
        onComplete: (event: Event) => statSet = event.target.stats,
        fn: delFunc.bind(null, set, keys),
        minSamples: 50
      });
      benchSet.run();

      console.log(
        `=== Key Size: ${min} - ${max}. ${alphabet}\n`,
        'Mean Trie/Set:     ', statTrie.mean / statSet.mean, '\n',
        'Deviation Trie/Set:', statTrie.deviation / statSet.deviation, '\n',
        'Variance Trie/Set: ', statTrie.variance / statSet.variance
      );
    };

    it('Delete benchmark - key size 3-7 (eng)', () => {
      const MIN_KEY_LENGTH = 3;
      const MAX_KEY_LENGTH = 7;

      doTest(
        new TrieSet(eng),
        new Set<string>(),
        MIN_KEY_LENGTH,
        MAX_KEY_LENGTH,
        eng
      );
    });

    it('Delete benchmark - key size 3-7 (rus)', () => {
      const MIN_KEY_LENGTH = 3;
      const MAX_KEY_LENGTH = 7;

      doTest(
        new TrieSet(rus),
        new Set<string>(),
        MIN_KEY_LENGTH,
        MAX_KEY_LENGTH,
        rus
      );
    });

    it('Delete benchmark - key size 7-12 (eng)', () => {
      const MIN_KEY_LENGTH = 7;
      const MAX_KEY_LENGTH = 12;

      doTest(
        new TrieSet(eng),
        new Set<string>(),
        MIN_KEY_LENGTH,
        MAX_KEY_LENGTH,
        eng
      );
    });

    it('Delete benchmark - key size 7-12 (rus)', () => {
      const MIN_KEY_LENGTH = 7;
      const MAX_KEY_LENGTH = 12;

      doTest(
        new TrieSet(rus),
        new Set<string>(),
        MIN_KEY_LENGTH,
        MAX_KEY_LENGTH,
        rus
      );
    });

    it('Delete benchmark - key size 12-20 (eng)', () => {
      const MIN_KEY_LENGTH = 12;
      const MAX_KEY_LENGTH = 20;

      doTest(
        new TrieSet(eng),
        new Set<string>(),
        MIN_KEY_LENGTH,
        MAX_KEY_LENGTH,
        eng
      );
    });

    it('Delete benchmark - key size 12-20 (rus)', () => {
      const MIN_KEY_LENGTH = 12;
      const MAX_KEY_LENGTH = 20;

      doTest(
        new TrieSet(rus),
        new Set<string>(),
        MIN_KEY_LENGTH,
        MAX_KEY_LENGTH,
        rus
      );
    });

  });
});

