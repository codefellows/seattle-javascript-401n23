function createArray(size) {
  const result = [];
  for (let i = 0; i < size; i++) {
    result.push(Math.floor(Math.random() * 50));
  }
  return result;
}

let startTime;
let endTime;

function constantTime(arr) {
  startTime = Date.now();
  arr.push("hello");
  endTime = Date.now();
  return `Constant Time function runs in ${endTime - startTime} ms`;
}

// console.log(constantTime(createArray(10)));
// console.log(constantTime(createArray(100000000)));

function linearTime(arr) {
  startTime = Date.now();
  let num;
  for (let i = 0; i < arr.length; i++) {
    num = arr[i];
  }
  endTime = Date.now();
  return `Linear Time function runs in ${endTime - startTime} ms`;
}

let reallyShortArray = createArray(10);
let longArray = createArray(100000);
let shortArray = createArray(100);
let reallyLongArray = createArray(10000000);
let longArray2 = createArray(100500);
let longArray3 = createArray(101000);
// console.log(linearTime(shortArray));
// console.log(linearTime(longArray));
// console.log(linearTime(reallyLongArray));

function quadraticTime(arr) {
  startTime = Date.now();
  let num;
  for (let i = 0; i < arr.length; i++) {
    // num = arr.includes("pizza")
    for (let j = 0; j < arr.length; j++) {
      num = arr[j];
    }
  }
  endTime = Date.now();
  return `Quadratic Time function runs in ${endTime - startTime} ms`;
}

// console.log(quadraticTime(reallyShortArray));
// console.log(quadraticTime(shortArray));
// console.log(quadraticTime(longArray));
// console.log(quadraticTime(longArray2));
// console.log(quadraticTime(longArray3));
// console.log(quadraticTime(reallyLongArray));
function logarithmicTime(arr) {
  startTime = Date.now();
  for (let i = 0; i < arr.length; i++) {
    arr = arr.splice(0, arr.length / 2);
  }
  endTime = Date.now();
  return `Logarithmic Time function runs in ${endTime - startTime} ms`;
}
// console.log(logarithmicTime(reallyShortArray));
// console.log(logarithmicTime(shortArray));
// console.log(logarithmicTime(longArray));
// console.log(logarithmicTime(reallyLongArray));

function countStuff(arr, value) {
  const newArr = [];
  const bool = arr.includes(value);
  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[i]);
  }
  const string = newArr.join(",");
  string += "hey";
}

function constantSpace(arr) {
  let num = 0;
  for (let i = 0; i < arr.length; i++) {
    num = arr[i];
  }
  return num;
}

function linearSpace(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[i]);
  }
  return newArr;
}
