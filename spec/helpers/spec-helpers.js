'use babel';

/**
 * NOTE: Depends on Jasmine 1.3.1.
 */
export default class {

  /**
   * Adds custom useful matchers to a context.
   *
   * HACK: Performance may be bad.
   * In Jasmine 1.3.1, this is designed to be called in 'beforeEach',
   * so this overwrites the same matchers many times.
   *
   * @param {jasmine.Spec} spec - Add them to this. NOTE: The type is uncertain.
   */
  static addMyMatchers(spec) {
    spec.addMatchers({

      /**
       * Compares as same as 'toBe'. In addition, this signalize that
       * the behavior is in preparation.
       *
       * @param  {*} expected - An expected value.
       * @return {boolean} Is the behavior as expected ?
       * @this {jasmine.Matchers} NOTE: The type is unsertain.
       */
      toBeBeforeRun: function(expected) {

        // Compare.
        const pass = (this.actual === expected);

        // Define the error message.
        let message = '';
        if (pass) {
          message = `Expected '${this.actual}' not to be '${expected}'.`;
        } else {
          message = `Expected '${this.actual}' to be '${expected}'.`;
        }
        message += ' This failure occurs in a preparation phase.';
        message += ' The spec is likely to break.';
        this.message = () => message;

        return pass;

      }

    });
  }

};
