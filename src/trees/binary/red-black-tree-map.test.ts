import { RedBlackTreeMap } from './red-black-tree-map';

describe('Red-Black tree', () => {
  describe('Construction', () => {
    it('Should create empty RBT', () => {
      const rbt = new RedBlackTreeMap<number, number>();

      expect(rbt.size).toBe(0);
      expect(rbt.empty).toBeTruthy();
      expect(rbt['root']).toBeNull();
    });
  });

  describe('Tree implementation', () => {
    describe('Size', () => {
      it('Empty tree shoult have size 0', () => {
        const rbt = new RedBlackTreeMap<number, number>();

        expect(rbt.size).toBe(0);

        rbt.add(1, 1);
        rbt.add(2, 2);

        rbt.clear();
        expect(rbt.size).toBe(0);
      });

      it('Should return size of the tree', () => {
        const rbt = new RedBlackTreeMap<number, number>();

        rbt.add(1, 1);
        expect(rbt.size).toBe(1);

        rbt.add(2, 2);
        expect(rbt.size).toBe(2);

        rbt.add(3, 3);
        rbt.add(4, 4);
        rbt.add(5, 5);
        rbt.add(6, 6);
        expect(rbt.size).toBe(6);
      });
    });

    describe('Empty', () => {
      it('Just created tree should be empty', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        expect(rbt.empty).toBeTruthy();
      });

      it('Cleared tree should be empty', () => {
        const rbt = new RedBlackTreeMap<number, number>();

        rbt.add(1, 1);
        rbt.add(2, 2);
        rbt.add(3, 3);
        rbt.add(4, 4);
        rbt.add(5, 5);

        rbt.clear();

        expect(rbt.empty).toBeTruthy();
      });

      it('Tree with data should not be empty', () => {
        const rbt = new RedBlackTreeMap<number, number>();

        rbt.add(1, 1);
        expect(rbt.empty).toBeFalsy();

        rbt.add(2, 2);
        rbt.add(3, 3);
        rbt.add(4, 4);
        rbt.add(5, 5);

        expect(rbt.empty).toBeFalsy();
      });
    });

    describe('Clear', () => {
      it('Clear empty tree should be ok', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        rbt.clear();

        expect(rbt.size).toBe(0);
        expect(rbt.empty).toBeTruthy();
      });

      it('Clear tree should delete data', () => {
        const rbt = new RedBlackTreeMap<number, number>();

        rbt.add(1, 1);
        rbt.add(2, 2);
        rbt.add(3, 3);
        rbt.add(4, 4);
        rbt.add(5, 5);
        expect(rbt.size).toBe(5);
        expect(rbt.empty).toBeFalsy();

        rbt.clear();

        expect(rbt.size).toBe(0);
        expect(rbt.empty).toBeTruthy();
        expect(rbt['root']).toBeNull();
      });

    });

    describe('Has', () => {
      it('Should not has element in empty tree', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        expect(rbt.has(0)).toBeFalsy();
      });

      it('Should not has element if it not added', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        rbt.add(1, 10);
        rbt.add(2, 10);
        rbt.add(3, 10);
        rbt.add(4, 10);
        rbt.add(5, 10);

        expect(rbt.has(10)).toBeFalsy();
      });

      it('Should has element if it is added', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        rbt.add(1, 10);
        rbt.add(2, 10);
        rbt.add(3, 10);
        rbt.add(4, 10);
        rbt.add(5, 10);

        expect(rbt.has(1)).toBeTruthy();
        expect(rbt.has(2)).toBeTruthy();
        expect(rbt.has(3)).toBeTruthy();
        expect(rbt.has(4)).toBeTruthy();
        expect(rbt.has(5)).toBeTruthy();
      });
    });

    describe('Add', () => {
      it('Should add element to the tree', () => {
        const rbt = new RedBlackTreeMap<number, number>();

        rbt.add(10, 11);

        expect(rbt.size).toBe(1);
        expect(rbt.empty).toBeFalsy();
        expect(rbt.get(10)).toBe(11);
      });

      it('Should replace value of element if it exists in the tree', () => {
        const rbt = new RedBlackTreeMap<number, number>();

        rbt.add(10, 11);
        rbt.add(10, 12);

        expect(rbt.size).toBe(1);
        expect(rbt.empty).toBeFalsy();
        expect(rbt.get(10)).toBe(12);
      });

      it('Should add multiple items', () => {
        const source = Array.from(Array(85_732).keys());
        const rbt = new RedBlackTreeMap<number, number>();

        for (const s of source) {
          rbt.add(s, s * 2);
        }

        for (const s of source) {
          expect(rbt.get(s)).toBe(s * 2);
        }
      });

      it('Should return size ot the tree after adding value', () => {
        const rbt = new RedBlackTreeMap<number, number>();

        let size = rbt.add(1, 1);
        expect(size).toBe(1);

        size = rbt.add(1, 2); // replace
        expect(size).toBe(1);

        size = rbt.add(2, 2);
        expect(size).toBe(2);

        const source = Array.from(Array(1_592).keys());
        let sz = rbt.size;

        for (const s of source) {
          size = rbt.add(s + 100, s * 2);
          expect(size).toBe(sz + 1);
          sz = size;
        }
      });

      it('Should return size ot the tree after adding value (test 2)', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        const source = Array.from(Array(19_592).keys());

        let index = 1;
        for (const s of source) {
          const size = rbt.add(s, s * 2);
          
          expect(size).toBe(index);
          index += 1;
        }
      });
    });

    describe('Delete', () => {
      it('Should not delete from empty tree', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        const deleted = rbt.delete(1);

        expect(deleted).toBeFalsy();
      });

      it('Should delete element', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        rbt.add(1, 1);
        const deleted = rbt.delete(1);

        expect(deleted).toBeTruthy();
        expect(rbt.size).toBe(0);
        expect(rbt.empty).toBeTruthy();
        expect(rbt.has(1)).toBeFalsy();
      });

      it('Should delete element in large tree', () => {
        const N = 5_592;
        const rbt = new RedBlackTreeMap<number, number>();
        const source = Array.from(Array(N).keys());

        for (const s of source) {
          rbt.add(s, s * 2);
        }

        const deleted = rbt.delete(3_482);

        expect(deleted).toBeTruthy();
        expect(rbt.size).toBe(N - 1);
        expect(rbt.empty).toBeFalsy();
        expect(rbt.has(3_482)).toBeFalsy();
      });

      it('Should not delete unexisting element', () => {
        const N = 1_063;
        const rbt = new RedBlackTreeMap<number, number>();
        const source = Array.from(Array(N).keys());

        for (const s of source) {
          rbt.add(s, s * 2);
        }

        const deleted = rbt.delete(3_482);

        expect(deleted).toBeFalsy();
        expect(rbt.size).toBe(N);
        expect(rbt.empty).toBeFalsy();
      });
    });

    describe('Get', () => {
      it('Should not get from empty tree', () => {
        const rbt = new RedBlackTreeMap<number, number>();

        expect(rbt.get(1)).toBeUndefined();
      });

      it('Should not get element that was not added', () => {
        const rbt = new RedBlackTreeMap<number, number>();

        rbt.add(1, 1);
        rbt.add(2, 2);
        rbt.add(3, 3);
        rbt.add(4, 4);
        rbt.add(5, 5);

        expect(rbt.get(6)).toBeUndefined();
      });

      it('Should get element that was added', () => {
        const rbt = new RedBlackTreeMap<number, number>();

        rbt.add(1, 1);
        rbt.add(2, 2);
        rbt.add(3, 3);
        rbt.add(4, 4);
        rbt.add(5, 5);

        expect(rbt.get(1)).toBe(1);
        expect(rbt.get(2)).toBe(2);
        expect(rbt.get(3)).toBe(3);
        expect(rbt.get(4)).toBe(4);
        expect(rbt.get(5)).toBe(5);
      });
    });

  });

  describe('Binary Search Tree implementation', () => {
    describe('Floor', () => {
      it('Should return undefined for empty tree', () => {
        const rbt = new RedBlackTreeMap<number, number>();

        expect(rbt.floor(10)).toBeUndefined();
      });

      it('Should return undefined if there are no keys less than given', () => {
        const rbt = new RedBlackTreeMap<number, number>();

        rbt.add(10, 10);
        rbt.add(11, 11);
        rbt.add(12, 12);
        rbt.add(13, 13);
        rbt.add(14, 14);
        rbt.add(15, 15);

        expect(rbt.floor(5)).toBeUndefined();
      });
      
      it('Should return key if there are key equal to given', () => {
        const rbt = new RedBlackTreeMap<number, number>();

        rbt.add(10, 10);
        rbt.add(11, 11);
        rbt.add(12, 12);
        rbt.add(13, 13);
        rbt.add(14, 14);
        rbt.add(15, 15);

        expect(rbt.floor(11)).toEqual([11, 11]);
      });
      
      it('Should return greatest key less than given if there are no key equal to given', () => {
        const rbt = new RedBlackTreeMap<number, number>();

        rbt.add(10, 10);
        rbt.add(100, 100);
        rbt.add(200, 200);
        rbt.add(300, 300);
        rbt.add(400, 400);
        rbt.add(500, 500);

        expect(rbt.floor(50)).toEqual([10, 10]);
        expect(rbt.floor(301)).toEqual([300, 300]);
      });
      
    });

    describe('Ceil', () => {
      it('Should return undefined for empty tree', () => {
        const rbt = new RedBlackTreeMap<number, number>();

        expect(rbt.ceil(10)).toBeUndefined();
      });

      it('Should return undefined if there are no keys greater than given', () => {
        const rbt = new RedBlackTreeMap<number, number>();

        rbt.add(10, 10);
        rbt.add(11, 11);
        rbt.add(12, 12);
        rbt.add(13, 13);
        rbt.add(14, 14);
        rbt.add(15, 15);

        expect(rbt.ceil(20)).toBeUndefined();
      });
      
      it('Should return key if there are key equal to given', () => {
        const rbt = new RedBlackTreeMap<number, number>();

        rbt.add(10, 10);
        rbt.add(11, 11);
        rbt.add(12, 12);
        rbt.add(13, 13);
        rbt.add(14, 14);
        rbt.add(15, 15);

        expect(rbt.ceil(13)).toEqual([13, 13]);
      });
      
      it('Should return greatest key less than given if there are no key equal to given', () => {
        const rbt = new RedBlackTreeMap<number, number>();

        rbt.add(10, 10);
        rbt.add(100, 100);
        rbt.add(200, 200);
        rbt.add(300, 300);
        rbt.add(400, 400);
        rbt.add(500, 500);

        expect(rbt.ceil(50)).toEqual([100, 100]);
        expect(rbt.ceil(301)).toEqual([400, 400]);
      });

    });

    describe('Max', () => {
      it('Should return undefined for empty tree', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        expect(rbt.max()).toBeUndefined();
      });

      it('Should return maximum for tree with nodes', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        const source = Array.from(Array(6_732).keys());

        for (const s of source) {
          rbt.add(s, s * 2);
        }

        expect(rbt.max()).toEqual([source[source.length - 1], source[source.length - 1] * 2]);
      });
    });

    describe('Min', () => {
      it('Should return undefined for empty tree', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        expect(rbt.min()).toBeUndefined();
      });

      it('Should return maximum for tree with nodes', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        const source = Array.from(Array(6_732).keys());

        for (const s of source) {
          rbt.add(s, s * 2);
        }

        expect(rbt.min()).toEqual([source[0], source[0] * 2]);
      });

    });

    describe('Delete Max', () => {
      it('Should return false for empty tree', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        expect(rbt.deleteMax()).toBeFalsy();
      });

      it('Should delete root and return true for tree with 1 element', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        rbt.add(1, 1);
        
        expect(rbt.deleteMax()).toBeTruthy();
        expect(rbt.size).toBe(0);
        expect(rbt.empty).toBeTruthy();
        expect(rbt.has(1)).toBeFalsy();
      });

      it('Should delete maximal element and return true', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        rbt.add(1, 1);
        rbt.add(2, 2);
        rbt.add(3, 3);
        rbt.add(4, 4);
        rbt.add(5, 5);
        
        expect(rbt.deleteMax()).toBeTruthy();
        expect(rbt.size).toBe(4);
        expect(rbt.empty).toBeFalsy();
        expect(rbt.has(5)).toBeFalsy();
      });
    });

    describe('Delete Min', () => {
      it('Should return false for empty tree', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        expect(rbt.deleteMin()).toBeFalsy();
      });

      it('Should delete root and return true for tree with 1 element', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        rbt.add(1, 1);
        
        expect(rbt.deleteMin()).toBeTruthy();
        expect(rbt.size).toBe(0);
        expect(rbt.empty).toBeTruthy();
        expect(rbt.has(1)).toBeFalsy();
      });

      it('Should delete minimal element and return true', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        rbt.add(1, 1);
        rbt.add(2, 2);
        rbt.add(3, 3);
        rbt.add(4, 4);
        rbt.add(5, 5);
        
        expect(rbt.deleteMin()).toBeTruthy();
        expect(rbt.size).toBe(4);
        expect(rbt.empty).toBeFalsy();
        expect(rbt.has(1)).toBeFalsy();
      });
    });

    describe.skip('Height', () => {
      // Height to expensive
      // Todo: rewrite .height() and write tests
    });

    describe('Select', () => {
      it('Should return undefined for empty tree', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        expect(rbt.select(0)).toBeUndefined();
      });

      it('Should return undefined if key < 0', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        rbt.add(1, 1);
        rbt.add(2, 2);
        rbt.add(3, 3);
        rbt.add(4, 4);
        rbt.add(5, 5);

        expect(rbt.select(-4)).toBeUndefined();
      });
      
      it('Should return undefined if key >= size', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        rbt.add(1, 1);
        rbt.add(2, 2);
        rbt.add(3, 3);
        rbt.add(4, 4);
        rbt.add(5, 5);

        expect(rbt.select(rbt.size)).toBeUndefined();
        expect(rbt.select(rbt.size + 1)).toBeUndefined();
        expect(rbt.select(rbt.size + 34)).toBeUndefined();
      });
      
      it('Should return node with given rank', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        rbt.add(1, 1);
        rbt.add(2, 2);
        rbt.add(3, 3);
        rbt.add(4, 4);
        rbt.add(5, 5);

        expect(rbt.select(0)).toEqual([1, 1]);
        expect(rbt.select(1)).toEqual([2, 2]);
        expect(rbt.select(2)).toEqual([3, 3]);
        expect(rbt.select(3)).toEqual([4, 4]);
        expect(rbt.select(4)).toEqual([5, 5]);
      });
      
    });

    describe('Rank', () => {
      it('Should return 0 for empty tree', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        expect(rbt.rank(0)).toBe(0);
      });

      it('Should return rank of the key', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        rbt.add(1, 1);
        rbt.add(2, 2);
        rbt.add(3, 3);
        rbt.add(4, 4);
        rbt.add(5, 5);

        expect(rbt.rank(0)).toBe(0);
        expect(rbt.rank(1)).toBe(0);
        expect(rbt.rank(2)).toBe(1);
        expect(rbt.rank(3)).toBe(2);
        expect(rbt.rank(4)).toBe(3);
        expect(rbt.rank(5)).toBe(4);
        expect(rbt.rank(6)).toBe(5);
        expect(rbt.rank(7)).toBe(5);
      });
    });

    describe('Size Of Range', () => {
      it('Should return 0 for empty tree', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        expect(rbt.sizeOfRange(0, 10)).toBe(0);
      });

      it('Should return 0 if to > from', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        rbt.add(1, 1);
        rbt.add(2, 2);
        rbt.add(3, 3);
        rbt.add(4, 4);
        rbt.add(5, 5);

        expect(rbt.sizeOfRange(10, 0)).toBe(0);
      });

      it('Should return 1 if from === to and key exists', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        rbt.add(1, 1);
        rbt.add(2, 2);
        rbt.add(3, 3);
        rbt.add(4, 4);
        rbt.add(5, 5);

        expect(rbt.sizeOfRange(3, 3)).toBe(1);
      });

      it('Should return 0 if from === to and key is not exists', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        rbt.add(1, 1);
        rbt.add(2, 2);
        
        rbt.add(4, 4);
        rbt.add(5, 5);

        expect(rbt.sizeOfRange(3, 3)).toBe(0);
      });

      it('Should return size if from < min and to > max', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        rbt.add(1, 1);
        rbt.add(2, 2);
        rbt.add(3, 3);
        rbt.add(4, 4);
        rbt.add(5, 5);

        expect(rbt.sizeOfRange(0, 6)).toBe(5);
      });

      it('Should return size of range for given range', () => {
        const rbt = new RedBlackTreeMap<number, number>();
        rbt.add(10, 1);
        rbt.add(20, 2);
        rbt.add(30, 3);
        rbt.add(40, 4);
        rbt.add(50, 5);

        expect(rbt.sizeOfRange(11, 19)).toBe(0);
        expect(rbt.sizeOfRange(9, 19)).toBe(1);
        expect(rbt.sizeOfRange(9, 20)).toBe(2);
        expect(rbt.sizeOfRange(9, 21)).toBe(2);
        expect(rbt.sizeOfRange(20, 50)).toBe(4);
        expect(rbt.sizeOfRange(20, 51)).toBe(4);
        expect(rbt.sizeOfRange(20, 49)).toBe(3);
        expect(rbt.sizeOfRange(21, 49)).toBe(2);
      });

    });
  });

  describe('Iterators', () => {
    describe('Full iterators', () => {
      let rbt: RedBlackTreeMap<number, number>;

      beforeEach(() => {
        rbt = new RedBlackTreeMap<number, number>();
        const MIN = 3_674;
        const ADD = 1_824;
        const size = MIN + Math.floor(Math.random() * ADD);

        for (let i = 1; i <= size; ++i) {
          rbt.add(i, -i * 2);
        }
      });

      describe('Entries', () => {
        it('Should not iterate empty tree', () => {
          rbt.clear();
          for (const e of rbt.entries()) {
            fail(e.toString());
          }
        });

        it('Should iterate all K-V pairs in ascending order', () => {
          const max = rbt.size;
          let prevKey = -1;
          let index = 1;
          
          for (const [k, v] of rbt.entries()) {
            expect(k).toBe(index);
            expect(k).toBeGreaterThan(prevKey);
            expect(v).toBe(-k * 2);

            prevKey = k;
            index += 1;
          }

          expect(index).toBe(max + 1);
        });
      });

      describe.skip('Keys', () => {
        // Keys uses same iterator as Entries
      });

      describe.skip('Values', () => {
        // Values uses same iterator as Entries
      });

      describe('To Array', () => {
        it('Should return [] for empty tree', () => {
          rbt.clear();

          expect(rbt.toArray()).toEqual([]);
        });

        it('Should return array of [K, V] pairs', () => {
          const result = rbt.toArray();
          expect(result.length).toBe(rbt.size);

          let prevKey = -1;
          let index = 1;

          for (const [k, v] of result) {
            expect(k).toEqual(index);
            expect(k).toBeGreaterThan(prevKey);
            expect(v).toBe(-k * 2);

            prevKey = k;
            index += 1;
          }
        })
      });

    });

    describe('Range iterators', () => {

      let rbt: RedBlackTreeMap<number, number>;

      beforeEach(() => {
        rbt = new RedBlackTreeMap<number, number>();
        const MIN = 3_674;
        const ADD = 1_824;
        const size = MIN + Math.floor(Math.random() * ADD);

        for (let i = 1; i <= size * 3; i += 3) {
          rbt.add(i, -i * 2);
        }
      });

      describe('Entries in range', () => {
        it('Should not iterate empty tree', () => {
          rbt.clear();
          for (const e of rbt.entriesInRange(0, 1_000_000)) {
            fail(e.toString());
          }
        });

        it('Should not iterate if from > to', () => {
          for (const e of rbt.entriesInRange(1000, 500)) {
            fail(e.toString());
          }
        });

        it('Should not iterate if range from..to does not in tree', () => {
          rbt.clear();
          rbt.add(1, 1);
          rbt.add(10, 10);
          for (const e of rbt.entriesInRange(2, 9)) {
            fail(e.toString());
          }
        });

        it('Should iterate all K-V pairs in ascending order (keys in tree)', () => {
          const max = rbt.size * 3;
          let prevKey = -1;
          let index = 1;
          
          for (const [k, v] of rbt.entriesInRange(rbt.min()?.[0] ?? 0, rbt.max()?.[0] ?? 0)) {
            expect(k).toBe(index);
            expect(k).toBeGreaterThan(prevKey);
            expect(v).toBe(-k * 2);

            prevKey = k;
            index += 3;
          }

          expect(index).toBe(max + 1);
        });

        it('Should iterate all K-V pairs in ascending order (from not in tree)', () => {
          const max = rbt.size * 3;
          let prevKey = -1;
          let index = 1;
          
          for (const [k, v] of rbt.entriesInRange((rbt.min()?.[0] ?? 0) - 1, rbt.max()?.[0] ?? 0)) {
            expect(k).toBe(index);
            expect(k).toBeGreaterThan(prevKey);
            expect(v).toBe(-k * 2);

            prevKey = k;
            index += 3;
          }

          expect(index).toBe(max + 1);
        });

        it('Should iterate all K-V pairs in ascending order (to not in tree)', () => {
          const max = rbt.size * 3;
          let prevKey = -1;
          let index = 1;
          
          for (const [k, v] of rbt.entriesInRange(rbt.min()?.[0] ?? 0, (rbt.max()?.[0] ?? 0) + 1)) {
            expect(k).toBe(index);
            expect(k).toBeGreaterThan(prevKey);
            expect(v).toBe(-k * 2);

            prevKey = k;
            index += 3;
          }

          expect(index).toBe(max + 1);
        });

        it('Should iterate all K-V pairs in ascending order (from and to not in tree)', () => {
          const max = rbt.size * 3;
          let prevKey = -1;
          let index = 1;
          
          for (const [k, v] of rbt.entriesInRange((rbt.min()?.[0] ?? 0) - 1, (rbt.max()?.[0] ?? 0) + 1)) {
            expect(k).toBe(index);
            expect(k).toBeGreaterThan(prevKey);
            expect(v).toBe(-k * 2);

            prevKey = k;
            index += 3;
          }

          expect(index).toBe(max + 1);
        });

        it('Should iterate sub-range (keys in tree)', () => {
          const from = rbt.select(Math.floor(rbt.size / 3));
          const to = rbt.select(Math.floor(rbt.size * 2 / 3));

          if (!from || !to) {
            expect(false).toBeTruthy();
            return;
          }

          let k1 = from[0];
          let k2 = to[0];

          while (!rbt.has(k1)) {
            k1 += 1;
          }
          while (!rbt.has(k2)) {
            k2 -= 1;
          }

          let prevKey = -1;
          for (const [k, v] of rbt.entriesInRange(k1, k2)) {
            if (prevKey === -1) {
              expect(k).toBe(k1);
            } else {
              expect(k).toBeGreaterThan(prevKey);
            }

            expect(v).toBe(-k * 2);
            expect(k).toBeGreaterThanOrEqual(k1);
            expect(k).toBeLessThanOrEqual(k2);

            prevKey = k;
          }
        });

        it('Should iterate sub-range (from is not in tree)', () => {
          const from = rbt.select(Math.floor(rbt.size / 3));
          const to = rbt.select(Math.floor(rbt.size * 2 / 3));

          if (!from || !to) {
            expect(false).toBeTruthy();
            return;
          }

          let k1 = from[0];
          let k2 = to[0];

          while (rbt.has(k1)) {
            k1 += 1;
          }
          while (!rbt.has(k2)) {
            k2 -= 1;
          }

          let prevKey = -1;
          for (const [k, v] of rbt.entriesInRange(k1, k2)) {
            if (prevKey === -1) {
              expect(k).toBeGreaterThan(k1);
            } else {
              expect(k).toBeGreaterThan(prevKey);
            }

            expect(v).toBe(-k * 2);
            expect(k).toBeGreaterThanOrEqual(k1);
            expect(k).toBeLessThanOrEqual(k2);

            prevKey = k;
          }
        });

        it('Should iterate sub-range (to is not in tree)', () => {
          const from = rbt.select(Math.floor(rbt.size / 3));
          const to = rbt.select(Math.floor(rbt.size * 2 / 3));

          if (!from || !to) {
            expect(false).toBeTruthy();
            return;
          }

          let k1 = from[0];
          let k2 = to[0];

          while (!rbt.has(k1)) {
            k1 += 1;
          }
          while (rbt.has(k2)) {
            k2 -= 1;
          }

          let prevKey = -1;
          for (const [k, v] of rbt.entriesInRange(k1, k2)) {
            if (prevKey === -1) {
              expect(k).toBe(k1);
            } else {
              expect(k).toBeGreaterThan(prevKey);
            }

            expect(v).toBe(-k * 2);
            expect(k).toBeGreaterThanOrEqual(k1);
            expect(k).toBeLessThanOrEqual(k2);

            prevKey = k;
          }
        });

        it('Should iterate sub-range (from and to is not in tree)', () => {
          const from = rbt.select(Math.floor(rbt.size / 3));
          const to = rbt.select(Math.floor(rbt.size * 2 / 3));

          if (!from || !to) {
            expect(false).toBeTruthy();
            return;
          }

          let k1 = from[0];
          let k2 = to[0];

          while (rbt.has(k1)) {
            k1 += 1;
          }
          while (rbt.has(k2)) {
            k2 -= 1;
          }

          let prevKey = -1;
          for (const [k, v] of rbt.entriesInRange(k1, k2)) {
            if (prevKey === -1) {
              expect(k).toBeGreaterThan(k1);
            } else {
              expect(k).toBeGreaterThan(prevKey);
            }

            expect(v).toBe(-k * 2);
            expect(k).toBeGreaterThan(k1);
            expect(k).toBeLessThan(k2);

            prevKey = k;
          }
        });
      });

      describe.skip('Keys in range', () => {
        // Keys uses same iterator as Entries
      });

      describe.skip('Values in range', () => {
        // Values uses same iterator as Entries
      });

      describe('To Array in range', () => {
        it('Should return [] for empty tree', () => {
          rbt.clear();
          expect(rbt.toArrayInRange(10, 50)).toEqual([]);
        });

        it('Should return [] if from > to', () => {
          expect(rbt.toArrayInRange(rbt.max()![0], 0)).toEqual([]);
        });

        it('Should return array of [K, V] pairs', () => {
          // toArrayInRange uses same iterator as Entries, so can do just a generic test

          const from = rbt.select(Math.floor(rbt.size / 3));
          const to = rbt.select(Math.floor(rbt.size * 2 / 3));

          if (!from || !to) {
            expect(false).toBeTruthy();
            return;
          }

          let k1 = from[0];
          let k2 = to[0];

          while (!rbt.has(k1)) {
            k1 += 1;
          }
          while (!rbt.has(k2)) {
            k2 -= 1;
          }
          
          const result = rbt.toArrayInRange(k1, k2);
          expect(result.length).toBe(rbt.rank(k2) - rbt.rank(k1) + 1);

          let prevKey = -1;

          for (const [k, v] of result) {
            expect(k).toBeGreaterThan(prevKey);
            expect(v).toBe(-k * 2);
            prevKey = k;
          }
        });
      });

    });

  });

  describe.skip('Brute force', () => {
    const N = 1234;
    let rbt: RedBlackTreeMap<number, number>;

    beforeEach(() => {
      rbt = new RedBlackTreeMap<number, number>();

      // Fill N nodes
      for (let i = 1; i <= N; ++i) {
        rbt.add(i, i)
      }
    });

    it('Should traverse tree all', () => {
      let idx = 1;

      for (const k of rbt.keys()) {
        // console.log(`*** >>> Index ${idx} is ${k}`);
        expect(k).toBe(idx);
        idx += 1;
      }
      expect(idx).toBe(N + 1);
    });

    it.skip('Should traverse tree in range', () => {
      // too expensive

      for (let from = 1; from < N; ++from) {
        // console.log(`*** From: ${from}`);
        for (let to = from; to < N; ++to) {
          let idx = from;
          // console.log(`*** ${from}..${to}`);
          for (const k of rbt.keysInRange(from, to)) {
            // console.log(`*** ${from}..${to} >>> Index ${idx} is ${k}`);
            // expect(k).toBe(idx);
            if (k !== idx) {
              fail();
            }
            idx += 1;
          }
          expect(idx).toBe(to + 1);
        }
      }
    });

    it.skip('Should traverse tree in TEST range', () => {
      const from = 12;
      const to = 87;
      let idx = from;

      for (const k of rbt.keysInRange(from, to)) {
        // console.log(`*** ${from}..${to}>>> Index ${idx} is ${k}`);
        expect(k).toBe(idx);
        idx += 1;
      }
      expect(idx).toBe(to + 1);
    });

  });
})
