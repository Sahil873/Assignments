/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }

  const map = new Map();

  for (let ch of str1.toLowerCase()) {
    if (map.has(ch)) {
      map.set(ch, map.get(ch) + 1);
    } else {
      map.set(ch, 1);
    }
  }

  for (let ch of str2.toLowerCase()) {
    if (!map.has(ch)) {
      return false;
    } else {
      map.set(ch, map.get(ch) - 1);
      if (map.get(ch) === 0) {
        map.delete(ch);
      }
    }
  }

  return map.size === 0;
}

module.exports = isAnagram;
