const fs = require("fs");

fs.writeFile("b.txt", "Hello World", "utf-8", (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("file written successfully");
  }
});

let a = 0;
for (let i = 0; i < 10000000000; i++) {
  a += i;
}
console.log("After expensive operation");

// If there is a very expensive operation after a asynchronous operation then the asynchronous function waits till it is over. It waits in the call back queue until the call stack is free.
