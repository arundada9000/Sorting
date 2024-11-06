function heapSort() {
  const length = values.length;

  // Build the heap (rearrange the values)
  for (let i = Math.floor(length / 2); i >= 0; i--) {
    heapify(values, length, i);
  }

  // One by one extract elements from the heap
  for (let i = length - 1; i > 0; i--) {
    // Move current root to end
    [values[0], values[i]] = [values[i], values[0]]; // Swap

    // Call heapify on the reduced heap
    heapify(values, i, 0);
  }

  return values;
}

// To maintain the heap property
function heapify(values, length, rootIndex) {
  let largest = rootIndex; // Initialize largest as root
  const leftChild = 2 * rootIndex + 1; // left = 2*i + 1
  const rightChild = 2 * rootIndex + 2; // right = 2*i + 2

  // If left child is larger than root
  if (leftChild < length && values[leftChild] > values[largest]) {
    largest = leftChild;
  }

  // If right child is larger than largest so far
  if (rightChild < length && values[rightChild] > values[largest]) {
    largest = rightChild;
  }

  // If largest is not root
  if (largest !== rootIndex) {
    [values[rootIndex], values[largest]] = [values[largest], values[rootIndex]]; // Swap

    // Recursively heapify the affected sub-tree
    heapify(values, length, largest);
  }
}

// Example usage:
const values = [
  39, 24, 46, 40, 23, 11, 12, 24, 29, 27, 46, 27, 35, 26, 30, 43, 1, 6, 2, 28,
];

console.log(...heapSort());
