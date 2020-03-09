const numbers = require('..');

describe('>> number extraction', () => {
  test('should return an empty array for invalid inputs', () => {
    expect(numbers(' ')).toEqual([]);
    expect(numbers('')).toEqual([]);
    expect(numbers('.')).toEqual([]);
    expect(numbers()).toEqual([]);
    expect(numbers(null)).toEqual([]);
    expect(numbers({})).toEqual([]);
    expect(numbers('Infinity')).toEqual([]);
    expect(numbers(Infinity)).toEqual([]);
    expect(numbers('NaN')).toEqual([]);
    expect(numbers(NaN)).toEqual([]);
    expect(numbers(123)).toEqual([]);
  });

  test('should extract numbers from string', () => {
    expect(numbers('0')).toEqual([0]);
    expect(numbers('0.0')).toEqual([0.0]);
    expect(numbers('.0')).toEqual([0.0]);
    expect(numbers('0.000001')).toEqual([0.000001]);
    expect(numbers('123')).toEqual([123]);
    expect(numbers('123,4')).toEqual([123, 4]);
    expect(numbers('123 4')).toEqual([123, 4]);
    expect(numbers('123.4')).toEqual([123.4]);
    expect(numbers('123.')).toEqual([123]);
    expect(numbers('.4')).toEqual([0.4]);
    expect(numbers('1......4')).toEqual([1, 4]);
    expect(numbers('1,,,,,,,,,4')).toEqual([1, 4]);
    expect(numbers('123!!!!!7897 >>>>>28')).toEqual([123, 7897, 28]);
    expect(numbers('[123,12,22]: 28 (14) **99** (0 )0 1_2')).toEqual([
      123,
      12,
      22,
      28,
      14,
      99,
      0,
      0,
      1,
      2,
    ]);
    expect(numbers('!randomnumber min 25 max 88')).toEqual([25, 88]);
    expect(numbers('!randomnumber min -100 max 100')).toEqual([-100, 100]);
    expect(numbers('0[object Object]-4[object Object]')).toEqual([0, -4]);
  });

  test('should handle plus and minus signs', () => {
    expect(numbers('+123')).toEqual([123]);
    expect(numbers('-123')).toEqual([-123]);
    expect(numbers('+-123')).toEqual([-123]);
    expect(numbers('-+123')).toEqual([-123]);
    expect(numbers('+123+123')).toEqual([123, 123]);
    expect(numbers('-+++++++123')).toEqual([-123]);
    expect(numbers('+--------123')).toEqual([-123]);
    expect(numbers('+++123')).toEqual([123]);
    expect(numbers('-- 123 123 -+123 -123 +123 - - - 123')).toEqual([
      123,
      123,
      -123,
      -123,
      123,
      123,
    ]);
  });
});
