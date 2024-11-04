function shellSort() {
  let n = values.length;

  // Start with a big gap, then reduce the gap
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Perform a gapped insertion sort for this gap size
    for (let i = gap; i < n; i++) {
      // Save values[i] in temp and make a hole at position i
      let temp = values[i];
      let j;

      // Shift earlier gap-sorted elements up until the correct location for values[i] is found
      for (j = i; j >= gap && values[j - gap] > temp; j -= gap) {
        values[j] = values[j - gap];
      }

      // Put temp (the original values[i]) in its correct location
      values[j] = temp;
    }
  }
  return values;
}

let values = [12, 34, 54, 2, 3];
console.log("Original array:", ...values);
shellSort();
console.log("Sorted array:", ...values);
