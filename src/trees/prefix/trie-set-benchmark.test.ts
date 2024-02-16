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

  describe('Benchmark Has', () => {
    const KEYS_SIZE = 50000;
    const TEST_SIZE = 25000;

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

    const prepare = (t: TrieSet, s: Set<string>, keys: string[]): void => {
      const len = Math.ceil((KEYS_SIZE + TEST_SIZE) / 2);
      for (let i = 0; i < len; ++i) {
        const k = keys[Math.floor(Math.random() * keys.length)];
        t.add(k);
        s.add(k);
      }
    }

    const fill = (ks: string[], result: string[]): void => {
      result.length = 0;
      for (let i = 0; i < TEST_SIZE; ++i) {
        result.push(ks[Math.floor(Math.random() * ks.length)]);
      }
    }

    const doTest = (trie: TrieSet, set: Set<string>, min: number, max: number, alphabet: string): void => {
      const keys: string[] = [];
      const ktest: string[] = [];

      const hasFunc = (c: TrieSet | Set<string>, ks: string[]) => {
        const k = ks[Math.floor(Math.random() * ks.length)];
        c.has(k);
      };

      setupTest(min, max, keys, alphabet);
      prepare(trie, set, keys);

      fill(keys, ktest);

      let statTrie: Stats;
      const benchTrieSet = new Benchmark('Test 1', {
        onCycle: () => fill(keys, ktest),
        onComplete: (event: Event) => statTrie = event.target.stats,
        fn: hasFunc.bind(null, trie, keys),
        minSamples: 50
      });
      benchTrieSet.run();

      let statSet: Stats;
      const benchSet = new Benchmark('Test 1', {
        onCycle: () => fill(keys, ktest),
        onComplete: (event: Event) => statSet = event.target.stats,
        fn: hasFunc.bind(null, set, keys),
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

    it('Has benchmark - key size 3-7 (eng)', () => {
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

    it('Has benchmark - key size 3-7 (rus)', () => {
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

    it('Has benchmark - key size 7-12 (eng)', () => {
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

    it('Has benchmark - key size 7-12 (rus)', () => {
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

    it('Has benchmark - key size 12-20 (eng)', () => {
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

    it('Has benchmark - key size 12-20 (rus)', () => {
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

  describe('Benchmark LongestPrefix', () => {
    const KEYS_SIZE = 50000;
    const TEST_SIZE = 25000;

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

    const prepare = (t: TrieSet, s: Set<string>, keys: string[]): void => {
      const len = Math.ceil((KEYS_SIZE + TEST_SIZE) / 2);
      for (let i = 0; i < len; ++i) {
        const k = keys[Math.floor(Math.random() * keys.length)];
        t.add(k);
        s.add(k);
      }
    }

    const fill = (ks: string[], result: string[]): void => {
      result.length = 0;
      for (let i = 0; i < TEST_SIZE; ++i) {
        result.push(ks[Math.floor(Math.random() * ks.length)]);
      }
    }

    const doTest = (trie: TrieSet, set: Set<string>, min: number, max: number, alphabet: string): void => {
      const keys: string[] = [];
      const ktest: string[] = [];

      const prefixTrie = (t: TrieSet, ks: string[]) => {
        const k = ks[Math.floor(Math.random() * ks.length)];
        t.longestPrefixOf(k);
      };

      const prefixSet = (s: Set<string>, ks: string[]) => {
        const k = ks[Math.floor(Math.random() * ks.length)];
        let found = '';
        for (let i of s.keys()) {
          if (i === k) {
            found = i;
            break;
          }
          if (i.length > k.length) {
            i = i.substring(0, k.length);
          }
          if (i.length > found.length && k.startsWith(i)) {
            found = i;
            if (found === k) {
              break;
            }
          }
        }
      };

      setupTest(min, max, keys, alphabet);
      prepare(trie, set, keys);

      fill(keys, ktest);

      let statTrie: Stats;
      const benchTrieSet = new Benchmark('Test 1', {
        onCycle: () => fill(keys, ktest),
        onComplete: (event: Event) => statTrie = event.target.stats,
        fn: prefixTrie.bind(null, trie, keys),
        minSamples: 50
      });
      benchTrieSet.run();

      let statSet: Stats;
      const benchSet = new Benchmark('Test 1', {
        onCycle: () => fill(keys, ktest),
        onComplete: (event: Event) => statSet = event.target.stats,
        fn: prefixSet.bind(null, set, keys),
        minSamples: 50
      });
      benchSet.run();

      console.log(
        `=== Key Size: ${min} - ${max}. ${alphabet}\n`,
        'Mean Set/Trie:     ', statSet.mean / statTrie.mean, '\n',
        'Deviation Set/Trie:', statSet.deviation / statTrie.deviation, '\n',
        'Variance Set/Trie: ', statSet.variance / statTrie.variance
      );
    };

    it('Prefix benchmark - key size 3-7 (eng)', () => {
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

    it('Prefix benchmark - key size 3-7 (rus)', () => {
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

    it('Prefix benchmark - key size 7-12 (eng)', () => {
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

    it('Prefix benchmark - key size 7-12 (rus)', () => {
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

    it('Prefix benchmark - key size 12-20 (eng)', () => {
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

    it('Prefix benchmark - key size 12-20 (rus)', () => {
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

  describe('Benchmark Keys', () => {
    const KEYS_SIZE = 50000;

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

    const prepare = (t: TrieSet, s: Set<string>, keys: string[]): void => {
      for (let i = 0; i < KEYS_SIZE; ++i) {
        const k = keys[Math.floor(Math.random() * keys.length)];
        t.add(k);
        s.add(k);
      }
    }

    const doTest = (trie: TrieSet, set: Set<string>, min: number, max: number, alphabet: string): void => {
      const keys: string[] = [];

      const keysTest = (c: TrieSet | Set<string>) => {
        let count = 0;
        for (const k of c.keys()) {
          count += 1;
        }
      };

      setupTest(min, max, keys, alphabet);
      prepare(trie, set, keys);

      let statTrie: Stats;
      const benchTrieSet = new Benchmark('Test 1', {
        onCycle: () => {
          trie.clear();
          set.clear();
          prepare(trie, set, keys);
        },
        onComplete: (event: Event) => statTrie = event.target.stats,
        fn: keysTest.bind(null, trie),
        minSamples: 50
      });
      benchTrieSet.run();

      let statSet: Stats;
      const benchSet = new Benchmark('Test 1', {
        onCycle: () => {
          trie.clear();
          set.clear();
          prepare(trie, set, keys);
        },
        onComplete: (event: Event) => statSet = event.target.stats,
        fn: keysTest.bind(null, set),
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

    it('Keys benchmark - key size 3-7 (eng)', () => {
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

    it('Keys benchmark - key size 3-7 (rus)', () => {
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

    it('Keys benchmark - key size 7-12 (eng)', () => {
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

    it('Keys benchmark - key size 7-12 (rus)', () => {
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

    it('Keys benchmark - key size 12-20 (eng)', () => {
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

    it('Keys benchmark - key size 12-20 (rus)', () => {
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

  describe('Benchmark Keys with prefix', () => {
    const KEYS_SIZE = 50000;

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

    const prepare = (t: TrieSet, s: Set<string>, keys: string[]): void => {
      for (let i = 0; i < KEYS_SIZE; ++i) {
        const k = keys[Math.floor(Math.random() * keys.length)];
        t.add(k);
        s.add(k);
      }
    }

    const doTest = (trie: TrieSet, set: Set<string>, min: number, max: number, alphabet: string): void => {
      const keys: string[] = [];

      const keysTrie = (t: TrieSet, ks: string[]) => {
        let prefix = ks[Math.floor(Math.random() * ks.length)];
        prefix = prefix.substring(0, Math.ceil(prefix.length / 3));

        let count = 0;
        for (const k of t.keysWithPrefix(prefix)) {
          count += 1;

          if (!k.startsWith(prefix)) {
            console.log('WRONG', k, prefix);
            fail();
            throw new Error('WRONG');
          }
        }
      };

      const keysSet = (s: Set<string>, ks: string[]) => {
        let prefix = ks[Math.floor(Math.random() * ks.length)];
        prefix = prefix.substring(0, Math.ceil(prefix.length / 2));

        let count = 0;
        for (const k of s.keys()) {
          if (k.startsWith(prefix)) {
            count += 1;
          }
        }
      };

      setupTest(min, max, keys, alphabet);
      prepare(trie, set, keys);

      let statTrie: Stats;
      const benchTrieSet = new Benchmark('Test 1', {
        onCycle: () => {
          trie.clear();
          set.clear();
          prepare(trie, set, keys);
        },
        onComplete: (event: Event) => statTrie = event.target.stats,
        fn: keysTrie.bind(null, trie, keys),
        minSamples: 50
      });
      benchTrieSet.run();

      let statSet: Stats;
      const benchSet = new Benchmark('Test 1', {
        onCycle: () => {
          trie.clear();
          set.clear();
          prepare(trie, set, keys);
        },
        onComplete: (event: Event) => statSet = event.target.stats,
        fn: keysSet.bind(null, set, keys),
        minSamples: 50
      });
      benchSet.run();

      console.log(
        `=== Key Size: ${min} - ${max}. ${alphabet}\n`,
        'Mean Set/Trie:     ', statSet.mean / statTrie.mean, '\n',
        'Deviation Set/Trie:', statSet.deviation / statTrie.deviation, '\n',
        'Variance Set/Trie: ', statSet.variance / statTrie.variance
      );
    };

    it('Keys with prefix benchmark - key size 3-7 (eng)', () => {
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

    it('Keys with prefix benchmark - key size 3-7 (rus)', () => {
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

    it('Keys with prefix benchmark - key size 7-12 (eng)', () => {
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

    it('Keys with prefix benchmark - key size 7-12 (rus)', () => {
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

    it('Keys with prefix benchmark - key size 12-20 (eng)', () => {
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

    it('Keys with prefix benchmark - key size 12-20 (rus)', () => {
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

