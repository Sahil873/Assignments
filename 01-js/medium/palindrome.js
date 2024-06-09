/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let regex = /[\s.,\/#!$%\^&\*;:{}=\-_`~()\"'?]/g;
  let lowerCased = str.replace(regex, "").toLowerCase();
  let n = lowerCased.length;

  for (let i = 0; i < Math.floor(n / 2); i++) {
    if (lowerCased[i] !== lowerCased[n - i - 1]) {
      return false;
    }
  }
  return true;
}

module.exports = isPalindrome;
