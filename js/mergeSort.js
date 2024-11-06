function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }

  const mid = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, mid));
  const right = mergeSort(array.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const sortedArray = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      sortedArray.push(left.shift());
    } else {
      sortedArray.push(right.shift());
    }
  }

  // Concatenate remaining elements
  return sortedArray.concat(left).concat(right);
}

// Example usage
const array = [
  38, 15, 23, 47, 89, 52, 87, 56, 69, 65, 48, 78, 12, 35, 45, 27, 43, 3, 9, 82,
  10,
];
const sortedArray = mergeSort(array);
console.log(...sortedArray); // Output: [3, 9, 10, 27, 38, 43, 82]
