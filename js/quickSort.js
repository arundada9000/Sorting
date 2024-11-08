function quickSort(arr) {
  // Base case: If the array is of length 0 or 1, it's already sorted
  if (arr.length <= 1) {
    return arr;
  }

  // Helper function to partition the array
  function partition(arr, low, high) {
    let pivot = arr[high]; // Choose the last element as the pivot
    let i = low - 1; // Pointer for the smaller element

    // Traverse the array from low to high-1
    for (let j = low; j < high; j++) {
      // If current element is less than or equal to the pivot
      if (arr[j] <= pivot) {
        i++; // Move the pointer for the smaller element
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
      }
    }

    // Swap the pivot element with the element at i+1 to place the pivot in the correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1; // Return the index of the pivot
  }

  // Recursive function to sort the subarrays
  function quickSortRecursive(arr, low, high) {
    if (low < high) {
      let pi = partition(arr, low, high); // Partitioning index
      quickSortRecursive(arr, low, pi - 1); // Sort left subarray
      quickSortRecursive(arr, pi + 1, high); // Sort right subarray
    }
  }

  // Start the sorting process
  let arrCopy = [...arr]; // Make a copy of the array to avoid mutation of the original
  quickSortRecursive(arrCopy, 0, arrCopy.length - 1);
  return arrCopy;
}

// Example usage:
const arr = [10, 7, 8, 9, 1, 5];
console.log(quickSort(arr)); // Output: [1, 5, 7, 8, 9, 10]
