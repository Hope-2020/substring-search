/**
 * @param {string} word
 * @return {number[]}
 */
const buildPatternTable = (word) => {
  const patternTable = [0];
  let prefixIndex = 0;
  let suffixIndex = 1;

  while (suffixIndex < word.length) {
    if (word[prefixIndex] === word[suffixIndex]) {
      patternTable[suffixIndex] = prefixIndex + 1;
      suffixIndex += 1;
      prefixIndex += 1;
    } else if (prefixIndex === 0) {
      patternTable[suffixIndex] = 0;
      suffixIndex += 1;
    } else {
      prefixIndex = patternTable[prefixIndex - 1];
    }
  }

  return patternTable;
}
  
  /**
   * @param {string} text
   * @param {string} word
   * @return {number}
   */
export function knuthMorrisPratt(text, word) {
  let count = 0;
  let textIndex = 0;
  let wordIndex = 0;

  const patternTable = buildPatternTable(word);

  while (textIndex < text.length) {
    if (text[textIndex] === word[wordIndex]) {
        // We've found a match.
        if (wordIndex === word.length - 1) {
            let m = text.charCodeAt(textIndex - word.length);                 
            let n = text.charCodeAt(textIndex + 1);
            if ((n < 65 || (n > 90 && n <97) || n > 122) && (textIndex < word.length || m < 65 || (m > 90 && m <97) || m > 122) ) count += 1;
            wordIndex = -1;
        }
        wordIndex += 1;
        textIndex += 1;
    } else if (wordIndex > 0) {
        wordIndex = patternTable[wordIndex - 1];
    } else {
        wordIndex = 0;
        textIndex += 1;
    }
  }
  
  return count;
}

export function sortbyDesc(val) {
  let ret = {};
  let keys = Object.keys(val);
  keys.sort((a, b) => {
    return val[a] - val[b];
  }).reverse().forEach((k) => {
    ret[k] = val[k];
  });

  return ret;
}
