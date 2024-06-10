const fs = require("fs");

fs.readFile("./1-counter.md", "utf-8", (err, data) => {
  console.log(data);
});

let a = 0;
for (let i = 0; i < 1000000000; i++) {
  a += i;
}
console.log("After expensive operation");

// If there is a very expensive operation after a asynchronous operation then the asynchronous function waits till it is over. It waits in the call back queue until the call stack is free.
