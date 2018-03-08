'use babel';

// import SelectTextBetweenTags from '../lib/select-text-between-tags';
import SpecHelpers from './helpers/spec-helpers';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('select-text-between-tags', () => {

  describe('when the :select event is triggred', () => {
    const runCommand = 'select-text-between-tags:select';

    describe('it selects text between tags', () => {

      const selectionHello = {
        range: [[8, 39], [8, 68]],
        text: 'Hello! This is a sample file.'
      };

      // NOTE: An arrow function cannot be used, cuz it makes 'this' indicate
      // an unexpected object.
      // NOTE: I wanna use 'beforeAll' to avoid to call this many times,
      // but unfortunetely our Jasmine's version is 1.3.1.
      beforeEach(function() {

        SpecHelpers.addMyMatchers(this);

        // NOTE: It needs to be done in order to get an active text editor
        // in each spec.
        waitsForPromise(() => atom.workspace.open('sample.html'));

      });

      it('runs as expected when the cursor is '
          + 'in text between tags', () => {

        const stateBeforeRun = {
          cursorPosition: [8, 56]
        };

        const textVerificationOptions = [
          {range: [[8, 54], [8, 62]], text: 'a sample'}
        ];

        const expectedState = {
          selection: selectionHello
        }

        SpecHelpers.expectSelection(
          stateBeforeRun, runCommand, expectedState, textVerificationOptions
        );

      });

      it('runs as expected when the cursor is '
          + 'on left end of text between tags', () => {

        const stateBeforeRun = {
          cursorPosition: [8, 39]
        };

        const textVerificationOptions = [
          {range: [[8, 39], [8, 45]], text: 'Hello!'}
        ];

        const expectedState = {
          selection: selectionHello
        }

        SpecHelpers.expectSelection(
          stateBeforeRun, runCommand, expectedState, textVerificationOptions
        );

      });

      it('runs as expected when the cursor is '
          + 'on right end of text between tags', () => {

        const stateBeforeRun = {
          cursorPosition: [8, 68]
        };

        const textVerificationOptions = [
          {range: [[8, 63], [8, 68]], text: 'file.'}
        ];

        const expectedState = {
          selection: selectionHello
        }

        SpecHelpers.expectSelection(
          stateBeforeRun, runCommand, expectedState, textVerificationOptions
        );

      });

      it('runs as expected when the cursor is '
          + 'in a start tag', () => {

        const stateBeforeRun = {
          cursorPosition: [8, 12]
        };

        const textVerificationOptions = [
          {range: [[8, 7], [8, 22]], text: "span id='title'"}
        ];

        const expectedState = {
          selection: selectionHello
        }

        SpecHelpers.expectSelection(
          stateBeforeRun, runCommand, expectedState, textVerificationOptions
        );

      });

      it('runs as expected when the cursor is '
          + 'in an end tag', () => {

        const stateBeforeRun = {
          cursorPosition: [8, 72]
        };

        const textVerificationOptions = [
          {range: [[8, 69], [8, 74]], text: '/span'}
        ];

        const expectedState = {
          selection: selectionHello
        }

        SpecHelpers.expectSelection(
          stateBeforeRun, runCommand, expectedState, textVerificationOptions
        );

      });

      it('runs as expected when the cursor is '
          + 'on left end of a start tag', () => {

        const stateBeforeRun = {
          cursorPosition: [8, 6]
        };

        const textVerificationOptions = [
          {range: [[8, 6], [8, 22]], text: "<span id='title'"}
        ];

        const expectedState = {
          selection: selectionHello
        }

        SpecHelpers.expectSelection(
          stateBeforeRun, runCommand, expectedState, textVerificationOptions
        );

      });

      it('runs as expected when the cursor is '
          + 'on right end of an end tag', () => {

        const stateBeforeRun = {
          cursorPosition: [8, 75]
        };

        const textVerificationOptions = [
          {range: [[8, 68], [8, 75]], text: '</span>'}
        ];

        const expectedState = {
          selection: selectionHello
        }

        SpecHelpers.expectSelection(
          stateBeforeRun, runCommand, expectedState, textVerificationOptions
        );

      });

      it('selects latter text when the cursor is '
          + 'on right end of an end tag and left end of a start tag', () => {

        const stateBeforeRun = {
          cursorPosition: [9, 34]
        };

        const textVerificationOptions = [
          {range: [[9, 27], [9, 34]], text: '</span>'},
          {range: [[9, 34], [9, 51]], text: "<span id='right'>"}
        ];

        const expectedState = {
          selection: {
            range: [[9, 51], [9, 57]],
            text: 'b a r'
          }
        }

        SpecHelpers.expectSelection(
          stateBeforeRun, runCommand, expectedState, textVerificationOptions
        );
        
      });

      // TODO: multilines situation

    });

    describe('it is fast enough', () => {

      it('runs as expected when text is long', () => {
        // TODO:
        throw 'not implemented';
      });

      it('runs as expected when text is nested deeply', () => {
        // TODO:
        throw 'not implemented';
      });

    });

  });

});
