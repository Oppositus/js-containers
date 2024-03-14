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

    });

    describe('Add', () => {

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
})
