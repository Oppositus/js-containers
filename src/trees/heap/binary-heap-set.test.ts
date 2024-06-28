import { BinaryMaxHeapSet } from './binary-heap-set';

function isMaxHeap<K>(heap: K[], index: number = 0): boolean {
  if (index >= heap.length) {
    return true;
  }

  const child1 = 2 * index + 1;
  const child2 = 2 * index + 2;

  let isChild1Ok = false;
  let isChild2Ok = false;

  // console.log('Check', index, 'vs', child1, 'and', child2);

  if (child1 < heap.length) {
    isChild1Ok = heap[index] >= heap[child1];
  } else {
    isChild1Ok = true;
  }

  if (child2 < heap.length) {
    isChild2Ok = heap[index] >= heap[child2];
  } else {
    isChild2Ok = true;
  }

  if (!isChild1Ok || !isChild2Ok) {
    // console.log('*** FAIL', heap[index], heap[child1], heap[child2]);
    return false;
  }

  return isMaxHeap(heap, child1) && isMaxHeap(heap, child2);
}

function isMinHeap<K>(heap: K[], index: number = 0): boolean {
  if (index >= heap.length) {
    return true;
  }

  const child1 = 2 * index + 1;
  const child2 = 2 * index + 2;

  let isChild1Ok = false;
  let isChild2Ok = false;

  // console.log('Check', index, 'vs', child1, 'and', child2);

  if (child1 < heap.length) {
    isChild1Ok = heap[index] <= heap[child1];
  } else {
    isChild1Ok = true;
  }

  if (child2 < heap.length) {
    isChild2Ok = heap[index] <= heap[child2];
  } else {
    isChild2Ok = true;
  }

  if (!isChild1Ok || !isChild2Ok) {
    // console.log('*** FAIL', heap[index], heap[child1], heap[child2]);
    return false;
  }

  return isMaxHeap(heap, child1) && isMaxHeap(heap, child2);
}

describe('MaxHeap', () => {
  it('Should construct heap', () => {
    const heap = new BinaryMaxHeapSet<number>();

    for (let i = 0; i < 255; ++i) {
      const k = Math.floor(Math.random() * 1_000 + 1);
      heap.insert(k);
    }

    // console.log(heap.print());

    expect(isMaxHeap(heap['heap'])).toBeTruthy();

    let max = heap.delMax();
    while (max !== undefined) {
      // console.log('Deleted', max);
      expect(isMaxHeap(heap['heap'])).toBeTruthy();
      max = heap.delMax();
    }
  })
});
