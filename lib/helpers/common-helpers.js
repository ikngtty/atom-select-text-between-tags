'use babel';

export default class CommonHelpers {
  /**
   * Overwrites an array to an array. (Non-destructive)
   * @param {*[]} origin
   * @param {*[]} addition
   * @return {*[]}
   */
  static overwriteArray(origin, addition) {
    // NOTE: Avoid to change origin's value.
    const writtenArray = Array.from(origin);
    writtenArray.length = Math.max(origin.length, addition.length);

    addition.forEach((item, index) => {
      if (item != null) writtenArray[index] = item;
    });
    return writtenArray;
  }

  /**
   * Generates a sequence of numbers.
   * @param {...number} args - Three arguments, which are start, stop and step.
   * [4]        -> start: 0(default), stop: 4 , step: 1(default)
   * [4, 10]    -> start: 4         , stop: 10, step: 1(default)
   * [4, 10, 2] -> start: 4         , stop: 10, step: 2
   * @return {number[]}
   */
  static range(...args) {
    // Validate.
    if (args.length === 0) throw new Error('No arguments.');
    if (args.length > 3) throw new Error('Too many arguments.');

    // Arrange arguments.
    let start = 0, stop, step = 1;
    if (args.length === 1) {
      stop = args[0];
    } else {
      [start, stop, step] = this.overwriteArray([start, stop, step], args);
    }

    // Validate.
    if (step === 0) throw new Error('An endless loop.');

    // Generate.
    const seq = [];
    const staysInSeq = (step > 0) ? (i) => i <= stop : (i) => i >= stop;
    for (let i = start; staysInSeq(i); i += step) {
      seq.push(i);
    }
    return seq;
  }

  /**
   * @callback times~predicate
   */
  /**
   * Repeats the same process.
   * @param {number} num - The number of times we repeat the process.
   * @param {times~predicate} predicate - A repeated process.
   * @return {undefined}
   */
  static times(num, predicate) {
    for (let i = 0; i < num; i++) predicate();
  }

  /**
   * Gets a last item of an array.
   * @param  {*[]} arr
   * @return {*}
   */
  static last(arr) {
    return arr[arr.length - 1];
  }
}
