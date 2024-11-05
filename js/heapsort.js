function heapSort(array) {
  const length = array.length;

  // Build the heap (rearrange the array)
  for (let i = Math.floor(length / 2); i >= 0; i--) {
    heapify(array, length, i);
  }

  // One by one extract elements from the heap
  for (let i = length - 1; i > 0; i--) {
    // Move current root to end
    [array[0], array[i]] = [array[i], array[0]]; // Swap

    // Call heapify on the reduced heap
    heapify(array, i, 0);
  }

  return array;
}

// To maintain the heap property
function heapify(array, length, rootIndex) {
  let largest = rootIndex; // Initialize largest as root
  const leftChild = 2 * rootIndex + 1; // left = 2*i + 1
  const rightChild = 2 * rootIndex + 2; // right = 2*i + 2

  // If left child is larger than root
  if (leftChild < length && array[leftChild] > array[largest]) {
    largest = leftChild;
  }

  // If right child is larger than largest so far
  if (rightChild < length && array[rightChild] > array[largest]) {
    largest = rightChild;
  }

  // If largest is not root
  if (largest !== rootIndex) {
    [array[rootIndex], array[largest]] = [array[largest], array[rootIndex]]; // Swap

    // Recursively heapify the affected sub-tree
    heapify(array, length, largest);
  }
}

// Example usage:
const data = [
  39, 24, 46, 40, 23, 11, 12, 24, 29, 27, 46, 27, 35, 26, 30, 43, 1, 6, 2, 28,
];
const sortedData = heapSort(data);
console.log(...sortedData);
