import { RedBlackTree } from './red-black-tree';

describe('Red-Black tree', () => {
  describe('Construction', () => {
    it('Should create empty RBT', () => {
      const rbt = new RedBlackTree<number, number>();

      expect(rbt.size).toBe(0);
      expect(rbt.empty).toBeTruthy();
      expect(rbt['root']).toBeNull();
    });
  });

  describe('Tree implementation', () => {
    describe('Size', () => {
      it('Empty tree shoult have size 0', () => {
        const rbt = new RedBlackTree<number, number>();

        expect(rbt.size).toBe(0);

        rbt.add(1, 1);
        rbt.add(2, 2);

        rbt.clear();
        expect(rbt.size).toBe(0);
      });

      it('Should return size of the tree', () => {
        const rbt = new RedBlackTree<number, number>();

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
        const rbt = new RedBlackTree<number, number>();
        expect(rbt.empty).toBeTruthy();
      });

      it('Cleared tree should be empty', () => {
        const rbt = new RedBlackTree<number, number>();

        rbt.add(1, 1);
        rbt.add(2, 2);
        rbt.add(3, 3);
        rbt.add(4, 4);
        rbt.add(5, 5);

        rbt.clear();

        expect(rbt.empty).toBeTruthy();
      });

      it('Tree with data should not be empty', () => {
        const rbt = new RedBlackTree<number, number>();

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
        const rbt = new RedBlackTree<number, number>();
        rbt.clear();

        expect(rbt.size).toBe(0);
        expect(rbt.empty).toBeTruthy();
      });

      it('Clear tree should delete data', () => {
        const rbt = new RedBlackTree<number, number>();

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
        const rbt = new RedBlackTree<number, number>();
        expect(rbt.has(0)).toBeFalsy();
      });

      it('Should not has element if it not added', () => {
        const rbt = new RedBlackTree<number, number>();
        rbt.add(1, 10);
        rbt.add(2, 10);
        rbt.add(3, 10);
        rbt.add(4, 10);
        rbt.add(5, 10);

        expect(rbt.has(10)).toBeFalsy();
      });

      it('Should has element if it is added', () => {
        const rbt = new RedBlackTree<number, number>();
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
        const rbt = new RedBlackTree<number, number>();

        rbt.add(10, 11);

        expect(rbt.size).toBe(1);
        expect(rbt.empty).toBeFalsy();
        expect(rbt.get(10)).toBe(11);
      });

      it('Should replace value of element if it exists in the tree', () => {
        const rbt = new RedBlackTree<number, number>();

        rbt.add(10, 11);
        rbt.add(10, 12);

        expect(rbt.size).toBe(1);
        expect(rbt.empty).toBeFalsy();
        expect(rbt.get(10)).toBe(12);
      })

    });

    describe('Delete', () => {

    });

    describe('Get', () => {

    });

  });

  describe('Binary Search Tree implementation', () => {
    describe('Floor', () => {

    });

    describe('Ceil', () => {

    });

    describe('Max', () => {

    });

    describe('Min', () => {

    });

    describe('Delete Max', () => {

    });

    describe('Delete Min', () => {

    });

    describe('Height', () => {

    });

    describe('Select', () => {

    });

    describe('Rank', () => {

    });

    describe('Size Of Range', () => {

    });
  });

  describe('Debug', () => {
    const N = 1234;
    const rbt = new RedBlackTree<number, number>();

    beforeEach(() => {
      rbt.clear();

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
      for (let from = 1; from < N; ++from) {
        console.log(`*** From: ${from}`);
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

    it('Should traverse tree in TEST range', () => {
      const from = 12;
      const to = 87;
      let idx = from;

      for (const k of rbt.keysInRange(from, to)) {
        console.log(`*** ${from}..${to}>>> Index ${idx} is ${k}`);
        expect(k).toBe(idx);
        idx += 1;
      }
      expect(idx).toBe(to + 1);
    });

  });
})
