const readLine = require("readline");

function clearConsole() {
  readLine.cursorTo(process.stdout, 0, 0);
  readLine.clearScreenDown(process.stdout);
}

let count = 1;
let myTimeout;
function counter() {
  clearConsole();
  console.log(`Counter: ${count}`);
  count++;
  myTimeout = setTimeout(counter, 1000);
}

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.input.on("keypress", (str, key) => {
  if (key.name === "return") {
    counter();
  }
  if (key.name === "escape") {
    clearTimeout(myTimeout);
    rl.close();
  }
});

console.log(
  "Press 'Enter' to start the counter and 'esc' to close the counter"
);
