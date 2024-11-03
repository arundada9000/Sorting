const values = [];
for (let i = 0; i <= randomGenerator(); i++) {
  values.push(randomGenerator());
}
console.log("Before : ", ...values);

function randomGenerator() {
  return Math.floor(Math.random() * 100);
}

function getMax() {
  let max = values[0];
  for (let i = 1; i < values.length; i++) {
    if (values[i] > max) {
      max = values[i];
    }
  }
  return max;
}

function countingSort(exp) {
  let output = new Array(values.length).fill(0);
  let count = new Array(10).fill(0);

  for (let i = 0; i < values.length; i++) {
    const index = Math.floor(values[i] / exp) % 10;
    count[index]++;
  }

  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  for (let i = values.length - 1; i >= 0; i--) {
    const index = Math.floor(values[i] / exp) % 10;
    output[count[index] - 1] = values[i];
    count[index]--;
  }

  for (let i = 0; i < values.length; i++) {
    values[i] = output[i];
  }
}

function radixSort() {
  const max = getMax();

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSort(exp);
  }

  return values;
}

// console.log("Sorted Array:", ...radixSort());
radixSort();
console.log("After :", ...values);
