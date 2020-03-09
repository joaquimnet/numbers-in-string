/**
 * Extracts numbers from a string.
 *
 * @param {string} str The string to extract numbers from.
 * @param {function} filter An optional function filter function.
 * @returns {number[]} Array of extracted numbers.
 */
function numbers(str, filter) {
  if (!str || typeof str !== 'string') {
    return [];
  }

  // removes everything that isn't a number, a dot, a minus sign or a plus sign
  let string = str
    .replace(/[^0-9.\-+]/g, ' ')
    // multiple dots get replaced with space
    .replace(/[.][.]+/g, ' ')
    // collapses minus signs
    .replace(/[-][-]+/g, '-')
    // removes plus signs
    .replace(/(?<=\d)\+(?=\d)/g, ' ')
    .replace(/\+/g, '')
    // collapses all spaces
    .replace(/\s\s+/g, ' ')
    // splits at spaces
    .split(/ +/g);

  // converts everything to numbers and removes the NaN's
  const extractedNums = string.map(n => parseFloat(n)).filter(n => !Number.isNaN(n));

  if (filter && typeof filter === 'function') {
    return extractedNums.filter(filter);
  }
  return extractedNums;
}

module.exports = numbers;
