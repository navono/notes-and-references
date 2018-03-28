const fs = require("fs");
const cache = [];

function inconsistentRead(filename, callback) {
  console.log(4);
  if (cache[filename]) {
    console.log(5);
    // invoked synchronously
    callback(cache[filename]);

    // 异步改造
    // process.nextTick(() => callback(cache[filename]));
  } else {
    // asynchronous function
    fs.readFile(filename, "utf8", (err, data) => {
      console.log(6);
      cache[filename] = data;
      callback(data);
    })
  }
}

// test
function createFileReader(filename) {
  console.log(1);
  const listeners = [];
  inconsistentRead(filename, value => {
    console.log(listeners);
    listeners.forEach(listener => listener(value));
  });

  return {
    onDataReady: listener => { console.log(3); listeners.push(listener); }
  };
}

const reader1 = createFileReader("getter.js");
reader1.onDataReady(data => {
  console.log("First call data: " + data);

  // try to read again from the same file
  const reader2 = createFileReader("getter.js");
  reader2.onDataReady(data => {
    console.log("Second call data: " + data);
  });
});
