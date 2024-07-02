import { BinaryMaxHeapSet, BinaryMinHeapSet } from './binary-heap-set';

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
    console.log('*** FAIL', `[${index}]`, heap[index], `[${child1}]`, heap[child1], `[${child2}]`, heap[child2]);
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

  return isMinHeap(heap, child1) && isMinHeap(heap, child2);
}

function mergeHeaps(a: number[], b: number[]): number[] {
  const res: number[] = [];

  const n = a.length;
  const m = b.length;

  // vis_next1 & vis_next2 tells us next element of array "a"
  // and array "b" is visited or not respectively.
  let vis_next1 = false;
  let vis_next2 = false;
  // i & j is current index of array "a" and "b" respectively
  let i = 0;
  let j = 0;
  
  // Loop until end of array "a" or "b"
  while (i !== n && j !== m) {
      let max1 = i;
      let max2 = j;

      // Check if next element of array "a" is greater than 
      // current element
      if (i + 1 !== n && !vis_next1 && a[i + 1] > a[i])
          max1 = i + 1;

      // Check if next element of array "b" is greater than 
      // current element
      if (j + 1 !== m && !vis_next2 && b[j + 1] > b[j])
          max2 = j + 1;

      // Compare the maximum elements from both arrays
      if (a[max1] > b[max2]) {
          // console.log(a[max1] + " ");
          res.push(a[max1]);

          // Update index and vis_next1 for array "a"
          if (max1 === i + 1)
              vis_next1 = true;
          else {
              if (vis_next1) {
                  i += 2;
                  vis_next1 = false;
              }
              else
                  i++;
          }
      }
      else {
          // console.log(b[max2] + " ");
          res.push(b[max2]);

          // Update index and vis_next2 for array "b"
          if (max2 === j + 1)
              vis_next2 = true;
          else {
              if (vis_next2) {
                  j += 2;
                  vis_next2 = false;
              }
              else
                  j++;
          }
      }
  }

  // Print remaining elements of array "b" if array "a" is
  // exhausted
  if (i === n) {
      while (j !== m) {
          // console.log(b[j] + " ");
          res.push(b[j]);
          j++;
          if (vis_next2) {
              vis_next2 = false;
              j++;
          }
      }
  }
  // Print remaining elements of array "a" if array "b" is
  // exhausted
  else {
      while (i !== n) {
          // console.log(a[i] + " ");
          res.push(a[i]);
          i++;
          if (vis_next1) {
              vis_next1 = false;
              i++;
          }
      }
  }

  return res;
}

function mergeHeaps2(a: number[], b: number[]): number[] {
  const ans: number[] = [];
  let i = 0;
  let j=0;

  while(i < a.length && j < b.length){
      if(a[i] > b[j]){
          ans.push(a[i++]);
      } else {
          ans.push(b[j++]);
      }
  }
  while(i < a.length) {
    ans.push(a[i++]);
  }

  while(j < b.length) {
    ans.push(b[j++]);
  }
  
  return ans;
}

function mergeHeaps3(a: number[], b: number[]): number[] {
  const res = a.concat(b);
  const h = BinaryMaxHeapSet.heapify(res);
  return h['heap'];
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
  });

  it('Should heapify', () => {
    const arr1: number[] = [];
    const arr2: number[] = [];
    while(arr1.length < 125_342) {
      arr1.push(Math.floor(Math.random() * 100));
    }
    while(arr2.length < 125_342) {
      arr2.push(Math.floor(Math.random() * 100));
    }

    const heap1 = BinaryMaxHeapSet.heapify(arr1);
    // console.log(heap1.print());
    expect(isMaxHeap(heap1['heap'])).toBeTruthy();

    const heap2 = BinaryMinHeapSet.heapify(arr2);
    // console.log(heap2.print());
    expect(isMinHeap(heap2['heap'])).toBeTruthy();
  });

  it('Should Merge 1 using class', () => {
    for (let num = 0; num < 1_000; ++num) {
      console.log('*** TRY:', num);

      const a: number[] = [];
      const b: number[] = [];

      const al = Math.random() * 12_348;
      const bl = Math.random() * 11_348;
      const mx = Math.random() * (al + bl);

      for (let i = 0; i < al; ++i) {
        a.push(Math.floor(Math.random() * mx))
      }
      for (let i = 0; i < bl; ++i) {
        b.push(Math.floor(Math.random() * mx))
      }

      const h1 = BinaryMaxHeapSet.heapify<number>(a);
      const h2 = BinaryMaxHeapSet.heapify<number>(b);

      const h3 = BinaryMaxHeapSet.merge(h1, h2);

      expect(isMaxHeap(h1['heap'])).toBeTruthy();
      expect(isMaxHeap(h2['heap'])).toBeTruthy();

      expect(isMaxHeap(h3['heap'])).toBeTruthy();
    }
  });

  it('Should Merge 1 - test', () => {
    for (let num = 0; num < 1; ++num) {
      console.log('*** TRY:', num);

      // const a: number[] = [
      //   377,
      //   376,                                                                                                                                                            377, 
      //   373,                                                                            376,                                                                            373,                                         373, 
      //   367,                                    368,                                    371,                                    374,                                    366,                     373,                368,                350,
      //   360,                358,                322,                349,                341,                353,                373,                371,                358,                350, 361,      367,      362,      352,      336,      344,
      //   355,      347,      351,      343,      308,      319,      331,      318,      315,      338,      294,      326,      346,      365,      270,      277,      306,      335,      341, 316, 360, 337, 364, 337, 343, 322, 339, 329, 327, 335, 319, 327,
      //   314, 268, 328, 341, 324, 350, 336, 328, 268, 275, 211, 304, 304, 305, 271, 315, 313, 309, 282, 250, 199, 260, 323, 279, 180, 327, 318, 297, 124, 252, 264, 237, 278, 220, 301, 334, 327
      // ];
      // const b: number[] = [
      //   352, 
      //   345,                                                                           331, 
      //   343,                                    345,                                   284,                287,
      //   264,                328,                265,                333,               230,      230,      202,      246,
      //   260,       99,      226,      321,      261,      257,      268,     146,      134,  84, 221,  30,  25,  50,  62, 110,
      //   228, 169,  56,  47,  74, 165, 259,  58, 249, 100,  87, 213, 210, 255, 37, 120,  11
      // ];

      const a: number[] = [
        377,
        376,                                    377, 
        373,                376,                373,                373, 
        367,      368,      371,      374,      366,      373,      368,      350,
        360, 358, 322, 349, 341, 353, 373, 371, 358, 350, 361, 367, 362, 352, 336, 344
      ];
      const b: number[] = [
        352, 
        345,                331, 
        343,      345,      284,      287,
        264, 328, 265, 333, 230, 230, 202, 246
      ];

      expect(isMaxHeap(a)).toBeTruthy();
      expect(isMaxHeap(b)).toBeTruthy();

      const h3 = mergeHeaps2(a, b);

      expect(isMaxHeap(h3)).toBeTruthy();
    }
  });

  it('Should Merge 2', () => {
    for (let num = 0; num < 1000; ++num) {
      const a: number[] = [];
      const b: number[] = [];

      const al = Math.random() * 1_348;
      const bl = Math.random() * 1_348;
      const mx = Math.random() * (al + bl);

      for (let i = 0; i < al; ++i) {
        a.push(Math.floor(Math.random() * mx))
      }
      for (let i = 0; i < bl; ++i) {
        b.push(Math.floor(Math.random() * mx))
      }

      const h1 = BinaryMaxHeapSet.heapify<number>(a);
      const h2 = BinaryMaxHeapSet.heapify<number>(b);


      // Function call
      const res = mergeHeaps3(h1['heap'], h2['heap']);

      expect(isMaxHeap(res)).toBeTruthy();
    }
  });

  it('Should Meld 1', () => {
    for (let num = 0; num < 25; ++num) {
      const a: number[] = [];
      const b: number[] = [];

      const al = Math.random() * 12_348;
      const bl = Math.random() * 12_348;
      const mx = Math.random() * (al + bl);

      for (let i = 0; i < al; ++i) {
        a.push(Math.floor(Math.random() * mx))
      }
      for (let i = 0; i < bl; ++i) {
        b.push(Math.floor(Math.random() * mx))
      }

      const h1 = BinaryMaxHeapSet.heapify<number>(a);
      const h2 = BinaryMaxHeapSet.heapify<number>(b);

      h1.meld(h2);
      expect(isMaxHeap(h1['heap'])).toBeTruthy();
    }
  });
});
