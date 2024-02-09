import { TrieMap } from './trie-map';

describe('TrieMap', () => {
  const eng = '-abcdefghijklmnopqrstuvwxyz';

  it('Test 1', () => {
    const trie = new TrieMap<number>(eng);
    const keys = [
      'talent',
      'taran',
      'taste',
      'terminal',
      'test',
      'tests',
      'tester'
    ];

    keys.forEach((k, i) => trie.add(k, i));

    expect(trie.has('taste'));
  })
});
