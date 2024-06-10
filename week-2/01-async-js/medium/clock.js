const readLine = require("readline");

function clearConsole() {
  readLine.cursorTo(process.stdout, 0, 0);
  readLine.clearScreenDown(process.stdout);
}

function formatTime(time) {
  return Math.floor(time / 10) === 0 ? "0" + time : time;
}

function getFormattedTime(hours, mins, secs) {
  return `${formatTime(hours)}:${formatTime(mins)}::${formatTime(secs)}`;
}

function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  let mins = now.getMinutes();
  let secs = now.getSeconds();
  let time = getFormattedTime(hours, mins, secs);
  let noon = hours >= 12 && hours <= 23 && mins <= 59;

  console.log(`${time} ${noon ? "PM" : "AM"}`);
}

function displayClock() {
  clearConsole();
  getCurrentTime();
}

setInterval(displayClock, 1000);
