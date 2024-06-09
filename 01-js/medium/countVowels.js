/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  const set = new Set(["a", "e", "i", "o", "u"]);
  let vowelCnt = 0;
  for (let ch of str.toLowerCase()) {
    if (set.has(ch)) {
      vowelCnt++;
    }
  }
  return vowelCnt;
}

module.exports = countVowels;
