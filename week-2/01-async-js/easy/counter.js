const readline = require("readline");

function clearConsole() {
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
}

let myInterval;
let count = 0;
function counter() {
  myInterval = setInterval(() => {
    clearConsole();
    console.log(`Counter: ${count}`);
    count++;
  }, 1000);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.input.on("keypress", (str, key) => {
  if (key.name === "return") {
    counter();
  }
  if (key.name === "escape") {
    clearInterval(myInterval);
    rl.close();
  }
});

console.log('press "Enter" to start the counter | "esc" to close the counter');
