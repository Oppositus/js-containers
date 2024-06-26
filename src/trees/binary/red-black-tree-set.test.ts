import { RedBlackTreeSet } from './red-black-tree-set';

describe('Red-Black tree', () => {
  describe('Construction', () => {
    it('Should create empty RBT', () => {
      const rbt = new RedBlackTreeSet<number>();

      expect(rbt.size).toBe(0);
      expect(rbt.empty).toBeTruthy();
      expect(rbt['root']).toBeNull();
    });
  });

  describe('Tree implementation', () => {
    describe('Size', () => {
      it('Empty tree shoult have size 0', () => {
        const rbt = new RedBlackTreeSet<number>();

        expect(rbt.size).toBe(0);

        rbt.add(1);
        rbt.add(2);

        rbt.clear();
        expect(rbt.size).toBe(0);
      });

      it('Should return size of the tree', () => {
        const rbt = new RedBlackTreeSet<number>();

        rbt.add(1);
        expect(rbt.size).toBe(1);

        rbt.add(2);
        expect(rbt.size).toBe(2);

        rbt.add(3);
        rbt.add(4);
        rbt.add(5);
        rbt.add(6);
        expect(rbt.size).toBe(6);
      });
    });

    describe('Empty', () => {
      it('Just created tree should be empty', () => {
        const rbt = new RedBlackTreeSet<number>();
        expect(rbt.empty).toBeTruthy();
      });

      it('Cleared tree should be empty', () => {
        const rbt = new RedBlackTreeSet<number>();

        rbt.add(1);
        rbt.add(2);
        rbt.add(3);
        rbt.add(4);
        rbt.add(5);

        rbt.clear();

        expect(rbt.empty).toBeTruthy();
      });

      it('Tree with data should not be empty', () => {
        const rbt = new RedBlackTreeSet<number>();

        rbt.add(1);
        expect(rbt.empty).toBeFalsy();

        rbt.add(2);
        rbt.add(3);
        rbt.add(4);
        rbt.add(5);

        expect(rbt.empty).toBeFalsy();
      });
    });

    describe('Clear', () => {
      it('Clear empty tree should be ok', () => {
        const rbt = new RedBlackTreeSet<number>();
        rbt.clear();

        expect(rbt.size).toBe(0);
        expect(rbt.empty).toBeTruthy();
      });

      it('Clear tree should delete data', () => {
        const rbt = new RedBlackTreeSet<number>();

        rbt.add(1);
        rbt.add(2);
        rbt.add(3);
        rbt.add(4);
        rbt.add(5);
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
        const rbt = new RedBlackTreeSet<number>();
        expect(rbt.has(0)).toBeFalsy();
      });

      it('Should not has element if it not added', () => {
        const rbt = new RedBlackTreeSet<number>();
        rbt.add(1);
        rbt.add(2);
        rbt.add(3);
        rbt.add(4);
        rbt.add(5);

        expect(rbt.has(10)).toBeFalsy();
      });

      it('Should has element if it is added', () => {
        const rbt = new RedBlackTreeSet<number>();
        rbt.add(1);
        rbt.add(2);
        rbt.add(3);
        rbt.add(4);
        rbt.add(5);

        expect(rbt.has(1)).toBeTruthy();
        expect(rbt.has(2)).toBeTruthy();
        expect(rbt.has(3)).toBeTruthy();
        expect(rbt.has(4)).toBeTruthy();
        expect(rbt.has(5)).toBeTruthy();
      });
    });

    describe('Add', () => {
      it('Should add element to the tree', () => {
        const rbt = new RedBlackTreeSet<number>();

        rbt.add(10);

        expect(rbt.size).toBe(1);
        expect(rbt.empty).toBeFalsy();
        expect(rbt.has(10)).toBeTruthy();
      });

      it('Should do nothing if key exists in the tree', () => {
        const rbt = new RedBlackTreeSet<number>();

        rbt.add(10);
        rbt.add(10);

        expect(rbt.size).toBe(1);
        expect(rbt.empty).toBeFalsy();
        expect(rbt.has(10)).toBeTruthy();
      });

      it('Should add multiple items', () => {
        const source = Array.from(Array(85_732).keys());
        const rbt = new RedBlackTreeSet<number>();

        for (const s of source) {
          rbt.add(s);
        }

        for (const s of source) {
          expect(rbt.has(s)).toBeTruthy();
        }
      });

      it('Should return size ot the tree after adding value', () => {
        const rbt = new RedBlackTreeSet<number>();

        let size = rbt.add(1);
        expect(size).toBe(1);

        size = rbt.add(1); // same key
        expect(size).toBe(1);

        size = rbt.add(2);
        expect(size).toBe(2);

        const source = Array.from(Array(1_592).keys());
        let sz = rbt.size;

        for (const s of source) {
          size = rbt.add(s + 100);
          expect(size).toBe(sz + 1);
          sz = size;
        }
      });

      it('Should return size ot the tree after adding value (test 2)', () => {
        const rbt = new RedBlackTreeSet<number>();
        const source = Array.from(Array(19_592).keys());

        let index = 1;
        for (const s of source) {
          const size = rbt.add(s);
          
          expect(size).toBe(index);
          index += 1;
        }
      });
    });

    describe('Delete', () => {
      it('Should not delete from empty tree', () => {
        const rbt = new RedBlackTreeSet<number>();
        const deleted = rbt.delete(1);

        expect(deleted).toBeFalsy();
      });

      it('Should delete element', () => {
        const rbt = new RedBlackTreeSet<number>();
        rbt.add(1);
        const deleted = rbt.delete(1);

        expect(deleted).toBeTruthy();
        expect(rbt.size).toBe(0);
        expect(rbt.empty).toBeTruthy();
        expect(rbt.has(1)).toBeFalsy();
      });

      it('Should delete element in large tree', () => {
        const N = 5_592;
        const rbt = new RedBlackTreeSet<number>();
        const source = Array.from(Array(N).keys());

        for (const s of source) {
          rbt.add(s);
        }

        const deleted = rbt.delete(3_482);

        expect(deleted).toBeTruthy();
        expect(rbt.size).toBe(N - 1);
        expect(rbt.empty).toBeFalsy();
        expect(rbt.has(3_482)).toBeFalsy();
      });

      it('Should not delete unexisting element', () => {
        const N = 1_063;
        const rbt = new RedBlackTreeSet<number>();
        const source = Array.from(Array(N).keys());

        for (const s of source) {
          rbt.add(s);
        }

        const deleted = rbt.delete(3_482);

        expect(deleted).toBeFalsy();
        expect(rbt.size).toBe(N);
        expect(rbt.empty).toBeFalsy();
      });
    });
  });

  describe('Binary Search Tree implementation', () => {
    describe('Floor', () => {
      it('Should return undefined for empty tree', () => {
        const rbt = new RedBlackTreeSet<number>();

        expect(rbt.floor(10)).toBeUndefined();
      });

      it('Should return undefined if there are no keys less than given', () => {
        const rbt = new RedBlackTreeSet<number>();

        rbt.add(10);
        rbt.add(11);
        rbt.add(12);
        rbt.add(13);
        rbt.add(14);
        rbt.add(15);

        expect(rbt.floor(5)).toBeUndefined();
      });
      
      it('Should return key if there are key equal to given', () => {
        const rbt = new RedBlackTreeSet<number>();

        rbt.add(10);
        rbt.add(11);
        rbt.add(12);
        rbt.add(13);
        rbt.add(14);
        rbt.add(15);

        expect(rbt.floor(11)).toBe(11);
      });
      
      it('Should return greatest key less than given if there are no key equal to given', () => {
        const rbt = new RedBlackTreeSet<number>();

        rbt.add(10);
        rbt.add(100);
        rbt.add(200);
        rbt.add(300);
        rbt.add(400);
        rbt.add(500);

        expect(rbt.floor(50)).toBe(10);
        expect(rbt.floor(301)).toBe(300);
      });
      
    });

    describe('Ceil', () => {
      it('Should return undefined for empty tree', () => {
        const rbt = new RedBlackTreeSet<number>();

        expect(rbt.ceil(10)).toBeUndefined();
      });

      it('Should return undefined if there are no keys greater than given', () => {
        const rbt = new RedBlackTreeSet<number>();

        rbt.add(10);
        rbt.add(11);
        rbt.add(12);
        rbt.add(13);
        rbt.add(14);
        rbt.add(15);

        expect(rbt.ceil(20)).toBeUndefined();
      });
      
      it('Should return key if there are key equal to given', () => {
        const rbt = new RedBlackTreeSet<number>();

        rbt.add(10);
        rbt.add(11);
        rbt.add(12);
        rbt.add(13);
        rbt.add(14);
        rbt.add(15);

        expect(rbt.ceil(13)).toBe(13);
      });
      
      it('Should return greatest key less than given if there are no key equal to given', () => {
        const rbt = new RedBlackTreeSet<number>();

        rbt.add(10);
        rbt.add(100);
        rbt.add(200);
        rbt.add(300);
        rbt.add(400);
        rbt.add(500);

        expect(rbt.ceil(50)).toBe(100);
        expect(rbt.ceil(301)).toBe(400);
      });

    });

    describe('Max', () => {
      it('Should return undefined for empty tree', () => {
        const rbt = new RedBlackTreeSet<number>();
        expect(rbt.max()).toBeUndefined();
      });

      it('Should return maximum for tree with nodes', () => {
        const rbt = new RedBlackTreeSet<number>();
        const source = Array.from(Array(6_732).keys());

        for (const s of source) {
          rbt.add(s);
        }

        expect(rbt.max()).toBe(source[source.length - 1]);
      });
    });

    describe('Min', () => {
      it('Should return undefined for empty tree', () => {
        const rbt = new RedBlackTreeSet<number>();
        expect(rbt.min()).toBeUndefined();
      });

      it('Should return maximum for tree with nodes', () => {
        const rbt = new RedBlackTreeSet<number>();
        const source = Array.from(Array(6_732).keys());

        for (const s of source) {
          rbt.add(s);
        }

        expect(rbt.min()).toEqual(source[0]);
      });

    });

    describe('Delete Max', () => {
      it('Should return false for empty tree', () => {
        const rbt = new RedBlackTreeSet<number>();
        expect(rbt.deleteMax()).toBeFalsy();
      });

      it('Should delete root and return true for tree with 1 element', () => {
        const rbt = new RedBlackTreeSet<number>();
        rbt.add(1);
        
        expect(rbt.deleteMax()).toBeTruthy();
        expect(rbt.size).toBe(0);
        expect(rbt.empty).toBeTruthy();
        expect(rbt.has(1)).toBeFalsy();
      });

      it('Should delete maximal element and return true', () => {
        const rbt = new RedBlackTreeSet<number>();
        rbt.add(1);
        rbt.add(2);
        rbt.add(3);
        rbt.add(4);
        rbt.add(5);
        
        expect(rbt.deleteMax()).toBeTruthy();
        expect(rbt.size).toBe(4);
        expect(rbt.empty).toBeFalsy();
        expect(rbt.has(5)).toBeFalsy();
      });
    });

    describe('Delete Min', () => {
      it('Should return false for empty tree', () => {
        const rbt = new RedBlackTreeSet<number>();
        expect(rbt.deleteMin()).toBeFalsy();
      });

      it('Should delete root and return true for tree with 1 element', () => {
        const rbt = new RedBlackTreeSet<number>();
        rbt.add(1);
        
        expect(rbt.deleteMin()).toBeTruthy();
        expect(rbt.size).toBe(0);
        expect(rbt.empty).toBeTruthy();
        expect(rbt.has(1)).toBeFalsy();
      });

      it('Should delete minimal element and return true', () => {
        const rbt = new RedBlackTreeSet<number>();
        rbt.add(1);
        rbt.add(2);
        rbt.add(3);
        rbt.add(4);
        rbt.add(5);
        
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
        const rbt = new RedBlackTreeSet<number>();
        expect(rbt.select(0)).toBeUndefined();
      });

      it('Should return undefined if key < 0', () => {
        const rbt = new RedBlackTreeSet<number>();
        rbt.add(1);
        rbt.add(2);
        rbt.add(3);
        rbt.add(4);
        rbt.add(5);

        expect(rbt.select(-4)).toBeUndefined();
      });
      
      it('Should return undefined if key >= size', () => {
        const rbt = new RedBlackTreeSet<number>();
        rbt.add(1);
        rbt.add(2);
        rbt.add(3);
        rbt.add(4);
        rbt.add(5);

        expect(rbt.select(rbt.size)).toBeUndefined();
        expect(rbt.select(rbt.size + 1)).toBeUndefined();
        expect(rbt.select(rbt.size + 34)).toBeUndefined();
      });
      
      it('Should return node with given rank', () => {
        const rbt = new RedBlackTreeSet<number>();
        rbt.add(1);
        rbt.add(2);
        rbt.add(3);
        rbt.add(4);
        rbt.add(5);

        expect(rbt.select(0)).toBe(1);
        expect(rbt.select(1)).toBe(2);
        expect(rbt.select(2)).toBe(3);
        expect(rbt.select(3)).toBe(4);
        expect(rbt.select(4)).toBe(5);
      });
      
    });

    describe('Rank', () => {
      it('Should return 0 for empty tree', () => {
        const rbt = new RedBlackTreeSet<number>();
        expect(rbt.rank(0)).toBe(0);
      });

      it('Should return rank of the key', () => {
        const rbt = new RedBlackTreeSet<number>();
        rbt.add(1);
        rbt.add(2);
        rbt.add(3);
        rbt.add(4);
        rbt.add(5);

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
        const rbt = new RedBlackTreeSet<number>();
        expect(rbt.sizeOfRange(0, 10)).toBe(0);
      });

      it('Should return 0 if to > from', () => {
        const rbt = new RedBlackTreeSet<number>();
        rbt.add(1);
        rbt.add(2);
        rbt.add(3);
        rbt.add(4);
        rbt.add(5);

        expect(rbt.sizeOfRange(10, 0)).toBe(0);
      });

      it('Should return 1 if from === to and key exists', () => {
        const rbt = new RedBlackTreeSet<number>();
        rbt.add(1);
        rbt.add(2);
        rbt.add(3);
        rbt.add(4);
        rbt.add(5);

        expect(rbt.sizeOfRange(3, 3)).toBe(1);
      });

      it('Should return 0 if from === to and key is not exists', () => {
        const rbt = new RedBlackTreeSet<number>();
        rbt.add(1);
        rbt.add(2);
        
        rbt.add(4);
        rbt.add(5);

        expect(rbt.sizeOfRange(3, 3)).toBe(0);
      });

      it('Should return size if from < min and to > max', () => {
        const rbt = new RedBlackTreeSet<number>();
        rbt.add(1);
        rbt.add(2);
        rbt.add(3);
        rbt.add(4);
        rbt.add(5);

        expect(rbt.sizeOfRange(0, 6)).toBe(5);
      });

      it('Should return size of range for given range', () => {
        const rbt = new RedBlackTreeSet<number>();
        rbt.add(10);
        rbt.add(20);
        rbt.add(30);
        rbt.add(40);
        rbt.add(50);

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
      let rbt: RedBlackTreeSet<number>;

      beforeEach(() => {
        rbt = new RedBlackTreeSet<number>();
        const MIN = 3_674;
        const ADD = 1_824;
        const size = MIN + Math.floor(Math.random() * ADD);

        for (let i = 1; i <= size; ++i) {
          rbt.add(i);
        }
      });

      describe('Keys', () => {
        it('Should not iterate empty tree', () => {
          rbt.clear();
          for (const e of rbt.keys()) {
            fail(e.toString());
          }
        });

        it('Should iterate all Keys in ascending order', () => {
          const max = rbt.size;
          let prevKey = -1;
          let index = 1;
          
          for (const k of rbt.keys()) {
            expect(k).toBe(index);
            expect(k).toBeGreaterThan(prevKey);

            prevKey = k;
            index += 1;
          }

          expect(index).toBe(max + 1);
        });
      });

      describe('To Array', () => {
        it('Should return [] for empty tree', () => {
          rbt.clear();

          expect(rbt.toArray()).toEqual([]);
        });

        it('Should return array of keys', () => {
          const result = rbt.toArray();
          expect(result.length).toBe(rbt.size);

          let prevKey = -1;
          let index = 1;

          for (const k of result) {
            expect(k).toEqual(index);
            expect(k).toBeGreaterThan(prevKey);

            prevKey = k;
            index += 1;
          }
        })
      });

    });

    describe('Range iterators', () => {

      let rbt: RedBlackTreeSet<number>;

      beforeEach(() => {
        rbt = new RedBlackTreeSet<number>();
        const MIN = 3_674;
        const ADD = 1_824;
        const size = MIN + Math.floor(Math.random() * ADD);

        for (let i = 1; i <= size * 3; i += 3) {
          rbt.add(i);
        }
      });

      describe('Keys in range', () => {
        it('Should not iterate empty tree', () => {
          rbt.clear();
          for (const e of rbt.keysInRange(0, 1_000_000)) {
            fail(e.toString());
          }
        });

        it('Should not iterate if from > to', () => {
          for (const e of rbt.keysInRange(1000, 500)) {
            fail(e.toString());
          }
        });

        it('Should not iterate if range from..to does not in tree', () => {
          rbt.clear();
          rbt.add(1);
          rbt.add(10);
          for (const e of rbt.keysInRange(2, 9)) {
            fail(e.toString());
          }
        });

        it('Should iterate all Keys in ascending order (keys in tree)', () => {
          const max = rbt.size * 3;
          let prevKey = -1;
          let index = 1;
          
          for (const k of rbt.keysInRange(rbt.min() ?? 0, rbt.max() ?? 0)) {
            expect(k).toBe(index);
            expect(k).toBeGreaterThan(prevKey);

            prevKey = k;
            index += 3;
          }

          expect(index).toBe(max + 1);
        });

        it('Should iterate all Keys in ascending order (from not in tree)', () => {
          const max = rbt.size * 3;
          let prevKey = -1;
          let index = 1;
          
          for (const k of rbt.keysInRange((rbt.min() ?? 0) - 1, rbt.max() ?? 0)) {
            expect(k).toBe(index);
            expect(k).toBeGreaterThan(prevKey);

            prevKey = k;
            index += 3;
          }

          expect(index).toBe(max + 1);
        });

        it('Should iterate all Keys in ascending order (to not in tree)', () => {
          const max = rbt.size * 3;
          let prevKey = -1;
          let index = 1;
          
          for (const k of rbt.keysInRange(rbt.min() ?? 0, (rbt.max() ?? 0) + 1)) {
            expect(k).toBe(index);
            expect(k).toBeGreaterThan(prevKey);

            prevKey = k;
            index += 3;
          }

          expect(index).toBe(max + 1);
        });

        it('Should iterate all Keys in ascending order (from and to not in tree)', () => {
          const max = rbt.size * 3;
          let prevKey = -1;
          let index = 1;
          
          for (const k of rbt.keysInRange((rbt.min() ?? 0) - 1, (rbt.max() ?? 0) + 1)) {
            expect(k).toBe(index);
            expect(k).toBeGreaterThan(prevKey);

            prevKey = k;
            index += 3;
          }

          expect(index).toBe(max + 1);
        });

        it('Should iterate sub-range (keys in tree)', () => {
          const from = rbt.select(Math.floor(rbt.size / 3));
          const to = rbt.select(Math.floor(rbt.size * 2 / 3));

          if (from === undefined || to === undefined) {
            expect(false).toBeTruthy();
            return;
          }

          let k1 = from;
          let k2 = to;

          while (!rbt.has(k1)) {
            k1 += 1;
          }
          while (!rbt.has(k2)) {
            k2 -= 1;
          }

          let prevKey = -1;
          for (const k of rbt.keysInRange(k1, k2)) {
            if (prevKey === -1) {
              expect(k).toBe(k1);
            } else {
              expect(k).toBeGreaterThan(prevKey);
            }

            expect(k).toBeGreaterThanOrEqual(k1);
            expect(k).toBeLessThanOrEqual(k2);

            prevKey = k;
          }
        });

        it('Should iterate sub-range (from is not in tree)', () => {
          const from = rbt.select(Math.floor(rbt.size / 3));
          const to = rbt.select(Math.floor(rbt.size * 2 / 3));

          if (from === undefined || to === undefined) {
            expect(false).toBeTruthy();
            return;
          }

          let k1 = from;
          let k2 = to;

          while (rbt.has(k1)) {
            k1 += 1;
          }
          while (!rbt.has(k2)) {
            k2 -= 1;
          }

          let prevKey = -1;
          for (const k of rbt.keysInRange(k1, k2)) {
            if (prevKey === -1) {
              expect(k).toBeGreaterThan(k1);
            } else {
              expect(k).toBeGreaterThan(prevKey);
            }

            expect(k).toBeGreaterThanOrEqual(k1);
            expect(k).toBeLessThanOrEqual(k2);

            prevKey = k;
          }
        });

        it('Should iterate sub-range (to is not in tree)', () => {
          const from = rbt.select(Math.floor(rbt.size / 3));
          const to = rbt.select(Math.floor(rbt.size * 2 / 3));

          if (from === undefined || to === undefined) {
            expect(false).toBeTruthy();
            return;
          }

          let k1 = from;
          let k2 = to;

          while (!rbt.has(k1)) {
            k1 += 1;
          }
          while (rbt.has(k2)) {
            k2 -= 1;
          }

          let prevKey = -1;
          for (const k of rbt.keysInRange(k1, k2)) {
            if (prevKey === -1) {
              expect(k).toBe(k1);
            } else {
              expect(k).toBeGreaterThan(prevKey);
            }

            expect(k).toBeGreaterThanOrEqual(k1);
            expect(k).toBeLessThanOrEqual(k2);

            prevKey = k;
          }
        });

        it('Should iterate sub-range (from and to is not in tree)', () => {
          const from = rbt.select(Math.floor(rbt.size / 3));
          const to = rbt.select(Math.floor(rbt.size * 2 / 3));

          if (from === undefined || to === undefined) {
            expect(false).toBeTruthy();
            return;
          }

          let k1 = from;
          let k2 = to;

          while (rbt.has(k1)) {
            k1 += 1;
          }
          while (rbt.has(k2)) {
            k2 -= 1;
          }

          let prevKey = -1;
          for (const k of rbt.keysInRange(k1, k2)) {
            if (prevKey === -1) {
              expect(k).toBeGreaterThan(k1);
            } else {
              expect(k).toBeGreaterThan(prevKey);
            }

            expect(k).toBeGreaterThan(k1);
            expect(k).toBeLessThan(k2);

            prevKey = k;
          }
        });
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

          let k1 = from;
          let k2 = to;

          while (!rbt.has(k1)) {
            k1 += 1;
          }
          while (!rbt.has(k2)) {
            k2 -= 1;
          }
          
          const result = rbt.toArrayInRange(k1, k2);
          expect(result.length).toBe(rbt.rank(k2) - rbt.rank(k1) + 1);

          let prevKey = -1;

          for (const k of result) {
            expect(k).toBeGreaterThan(prevKey);
            prevKey = k;
          }
        });
      });

    });

  });

  describe.skip('Brute force', () => {
    const N = 1234;
    let rbt: RedBlackTreeSet<number>;

    beforeEach(() => {
      rbt = new RedBlackTreeSet<number>();

      // Fill N nodes
      for (let i = 1; i <= N; ++i) {
        rbt.add(i);
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
