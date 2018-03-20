'use babel';

// import SelectTextBetweenTags from '../lib/select-text-between-tags';
import FixturesPath from './constants/fixtures-path';
import SpecHelpers from './helpers/spec-helpers';
import createLargeText from './scripts/create-large-text';
import createDeepText from './scripts/create-deep-text';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('select-text-between-tags', () => {
  beforeEach(() => {
    atom.packages.activatePackage('select-text-between-tags');
  });

  describe('when the :select event is triggred', () => {
    const runCommand = 'select-text-between-tags:select';

    describe('it selects text between tags', () => {
      const sampleTextPath = FixturesPath.sampleTextPath;
      const selectionHello = {
        range: [[8, 39], [8, 68]],
        text: 'Hello! This is a sample file.'
      };

      // NOTE: I wanna use 'beforeAll' to avoid to call this many times,
      // but unfortunetely our Jasmine's version is probably 1.3.1.
      beforeEach(() => {
        // NOTE: It needs to be done in order to get an active text editor
        // in each spec.
        waitsForPromise(() => atom.workspace.open(sampleTextPath));
      });

      // NOTE: An arrow function cannot be used, cuz it makes 'this' indicate
      // an unexpected object.
      it('does when the cursor is as <foo>ab[I]cd</foo>', function() {
        const stateBeforeRun = {
          cursorPosition: [8, 56]
        };
        const textVerificationOptions = [
          {range: [[8, 54], [8, 62]], text: 'a sample'}
        ];
        const expectedState = {
          selection: selectionHello
        };

        SpecHelpers.expectSelection(
          this, stateBeforeRun, runCommand, expectedState,
          textVerificationOptions
        );
      });

      it('does when the cursor is as <foo>[I]abcd</foo>', function() {
        const stateBeforeRun = {
          cursorPosition: [8, 39]
        };
        const textVerificationOptions = [
          {range: [[8, 39], [8, 45]], text: 'Hello!'}
        ];
        const expectedState = {
          selection: selectionHello
        };

        SpecHelpers.expectSelection(
          this, stateBeforeRun, runCommand, expectedState,
          textVerificationOptions
        );
      });

      it('does when the cursor is as <foo>abcd[I]</foo>', function() {
        const stateBeforeRun = {
          cursorPosition: [8, 68]
        };
        const textVerificationOptions = [
          {range: [[8, 63], [8, 68]], text: 'file.'}
        ];
        const expectedState = {
          selection: selectionHello
        };

        SpecHelpers.expectSelection(
          this, stateBeforeRun, runCommand, expectedState,
          textVerificationOptions
        );
      });

      it('does when the cursor is as <fo[I]o>abcd</foo>', function() {
        const stateBeforeRun = {
          cursorPosition: [8, 12]
        };
        const textVerificationOptions = [
          {range: [[8, 7], [8, 22]], text: "span id='title'"}
        ];
        const expectedState = {
          selection: selectionHello
        };

        SpecHelpers.expectSelection(
          this, stateBeforeRun, runCommand, expectedState,
          textVerificationOptions
        );
      });

      it('does when the cursor is as <foo>abcd</fo[I]o>', function() {
        const stateBeforeRun = {
          cursorPosition: [8, 72]
        };
        const textVerificationOptions = [
          {range: [[8, 69], [8, 74]], text: '/span'}
        ];
        const expectedState = {
          selection: selectionHello
        };

        SpecHelpers.expectSelection(
          this, stateBeforeRun, runCommand, expectedState,
          textVerificationOptions
        );
      });

      it('does when the cursor is as [I]<foo>abcd</foo>', function() {
        const stateBeforeRun = {
          cursorPosition: [8, 6]
        };
        const textVerificationOptions = [
          {range: [[8, 6], [8, 22]], text: "<span id='title'"}
        ];
        const expectedState = {
          selection: selectionHello
        };

        SpecHelpers.expectSelection(
          this, stateBeforeRun, runCommand, expectedState,
          textVerificationOptions
        );
      });

      it('does when the cursor is as <foo>abcd</foo>[I]', function() {
        const stateBeforeRun = {
          cursorPosition: [8, 75]
        };
        const textVerificationOptions = [
          {range: [[8, 68], [8, 75]], text: '</span>'}
        ];
        const expectedState = {
          selection: selectionHello
        };

        SpecHelpers.expectSelection(
          this, stateBeforeRun, runCommand, expectedState,
          textVerificationOptions
        );
      });

      // A canceled idea.
      xit('selects latter text when the cursor is ' +
          'as <foo>abcd</foo>[I]<bar>efgh</bar>', function() {
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
        };

        SpecHelpers.expectSelection(
          this, stateBeforeRun, runCommand, expectedState,
          textVerificationOptions
        );
      });

      it('can selects multiline', function() {
        const stateBeforeRun = {
          cursorPosition: [11, 19]
        }
        const textVerificationOptions = [
          {range: [[11, 16], [11, 20]], text: 'used'}
        ];
        const expectedState = {
          selection: {
            range: [[10, 23], [13, 6]],
            text:
`
        This is used for tests.
        <strong>If you edit this, the tests may break.</strong>
      `
          }
        };

        SpecHelpers.expectSelection(
          this, stateBeforeRun, runCommand, expectedState,
          textVerificationOptions
        );
      })

      it('skips empty elements like <br>', function() {
        const stateBeforeRun = {
          cursorPosition: [16, 37]
        }
        const textVerificationOptions = [
          {range: [[16, 34], [16, 42]], text: 'contains'}
        ];
        const expectedState = {
          selection: {
            range: [[16, 26], [16, 58]],
            text: 'This<br>contains<br>breaks.<br/>'}
        };

        SpecHelpers.expectSelection(
          this, stateBeforeRun, runCommand, expectedState,
          textVerificationOptions
        );
      })

      // TODO: Implement a <li> pattern.
      xit('does when the cursor is as <li>ab[I]cd<li>efgh '
          + 'about tags like <li>, which end tag can be omitted',
          function() {
        const stateBeforeRun = {
          cursorPosition: [18, 22]
        }
        const textVerificationOptions = [
          {range: [[18, 20], [18, 23]], text: '2nd'}
        ];
        const expectedState = {
          selection: {
            range: [[18, 20], [18, 24]],
            text: '2nd '}
        };

        SpecHelpers.expectSelection(
          this, stateBeforeRun, runCommand, expectedState,
          textVerificationOptions
        );
      })

    });

    describe('it is fast enough', () => {
      it('is when text is large', function() {
        const textPath = FixturesPath.largeTextPath;
        waitsForPromise(async function() {
          await createLargeText();
          await atom.workspace.open(textPath);
        });

        const stateBeforeRun = {
          cursorPosition: [9999, 23]
        }
        const textVerificationOptions = [
          {range: [[9999, 22], [9999, 24]], text: 'is'}
        ];
        const expectedState = {
          selection: {
            range: [[9999, 17], [9999, 34]],
            text: 'This is contents.'}
        };
        runs(() => {
          const result = SpecHelpers.expectSelection(
            this, stateBeforeRun, runCommand, expectedState,
            textVerificationOptions
          );

          console.log('Performance when text is large: '
                      + `${result.elaspedMs}ms`);
          // NOTE: Required speed is defined just with my feelings.
          expect(result.elaspedMs).toBeLessThan(300);
        });
      });

      it('is when text is nested deeply', function() {
        const textPath = FixturesPath.deepTextPath;
        waitsForPromise(async function() {
          await createDeepText();
          await atom.workspace.open(textPath);
        });

        const stateBeforeRun = {
          cursorPosition: [7003, 24]
        }
        const textVerificationOptions = [
          {range: [[7003, 23], [7003, 25]], text: 'is'}
        ];
        const expectedState = {
          selection: {
            range: [[7003, 18], [7003, 35]],
            text: 'This is contents.'}
        };
        runs(() => {
          const result = SpecHelpers.expectSelection(
            this, stateBeforeRun, runCommand, expectedState,
            textVerificationOptions
          );

          console.log('Performance when text is nested deeply: '
                      + `${result.elaspedMs}ms`);
          // NOTE: Required speed is defined just with my feelings.
          expect(result.elaspedMs).toBeLessThan(300);
        });
      });
    });
  });
});
