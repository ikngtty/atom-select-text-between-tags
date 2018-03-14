'use babel';

/**
 * NOTE: Depends on Jasmine 1.3.1.
 */
export default class SpecHelpers {

  /**
   * Adds custom useful matchers to a context.
   * HACK: Avoid to overwrite redunduntly.
   * This may be called more than once in a spec.
   * @param {jasmine.Spec} spec - Add them to this.
   */
  static addMyMatchers(spec) {
    spec.addMatchers({

      /**
       * Compares as same as 'toBe'. In addition, this signalize that
       * the behavior is in preparation.
       * @param {*} expected - An expected value.
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

  /**
   * @typedef {Object} expectSelection~StateBeforeRun
   * @property {Range} cursorPosition
   */
  /**
   * @typedef {Object} expectSelection~Selection
   * @property {Range} range
   * @property {string} text
   */
  /**
   * @typedef {Object} expectSelection~ExpectedState
   * @property {expectSelection~Selection} selection
   */
  /**
   * @typedef {Object} expectSelection~TextVerificationOption
   * @property {Range} range
   * @property {string} text
   */
  /**
   * @typedef {Object} expectSelection~Result
   * @property {number} elaspedMs
   */
  /**
   * Expect the whole behavior about selection.
   * NOTE: Atom's global variables are used.
   * NOTE: Requires that a text editor is active.
   * @param {jasmine.Spec} spec
   * @param {expectSelection~StateBeforeRun} stateBeforeRun
   * @param {string} runCommand
   * @param {expectSelection~ExpectedState} expectedState
   * @param {expectSelection~TextVerificationOption[]} textVerificationOptions
   * @return {expectSelection~Result} - an additional result information.
   */
  static expectSelection(
    spec,
    stateBeforeRun,
    runCommand,
    expectedState,
    textVerificationOptions = []) {

      const result = {};
      const textEditor = atom.workspace.getActiveTextEditor();
      const textEditorElement = atom.views.getView(textEditor);

      this.addMyMatchers(spec);

      // Verify text in the editor.
      // (It is expected that the verified part is around the position
      //  the cursor will be set on. The purpose is to detect differnce
      //  between the specified cursor position and the expected one,
      //  or unexpected changes in the text.)
      for (const vOption of textVerificationOptions) {
        textEditor.setSelectedBufferRange(vOption.range);
        const actualText = textEditor.getSelectedText();

        spec.expect(actualText).toBeBeforeRun(vOption.text);
      }

      // Set the cursor.
      textEditor.setCursorBufferPosition(stateBeforeRun.cursorPosition);

      // Run.
      const start = new Date();
      atom.commands.dispatch(textEditorElement, runCommand);
      const end = new Date();
      result.elaspedMs = end - start;

      // Expect results.
      const expectedSelection = expectedState.selection;
      // - Range
      const actualRange = textEditor.getSelectedBufferRange();
      spec.expect(actualRange).toBe(expectedSelection.range);
      // - Text
      const actualText = textEditor.getSelectedText();
      spec.expect(actualText).toBe(expectedSelection.text);

      return result;

  }

}
