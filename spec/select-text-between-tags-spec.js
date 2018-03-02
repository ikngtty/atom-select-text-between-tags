'use babel';

// import SelectTextBetweenTags from '../lib/select-text-between-tags';
import SpecHelpers from './helpers/spec-helpers';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('select-text-between-tags', () => {

  describe('when the :select event is triggred', () => {

    describe('it selects between tags', () => {
      let textEditor, textEditorElement;

      // NOTE: An arrow function cannot be used, cuz it makes 'this' indicate
      // an unexpected object.
      // NOTE: I wanna use 'beforeAll' to avoid to call this many times,
      // but Jasmine's version is 1.3.1.
      beforeEach(function() {

        SpecHelpers.addMyMatchers(this);

        // Open the text file prepared for these tests.
        waitsForPromise(() => atom.workspace.open('sample.html')
          .then(() => {
            textEditor = atom.workspace.getActiveTextEditor();
            textEditorElement = atom.views.getView(textEditor);
          }));

      });

      it('runs as expected when the cursor is in text between tags', () => {

        // Set the cursor.
        textEditor.setSelectedBufferRange([[8, 54], [8, 62]]);
        expect(textEditor.getSelectedText()).toBeBeforeRun('a sample');

        // Run.
        atom.commands.dispatch(textEditorElement, 'select-text-between-tags:select');

        // Selection results in as below.
        expect(textEditor.getSelectedBufferRange()).toBe([8, 39], [8, 68]);
        expect(textEditor.getSelectedText()).toBe('Hello! This is a sample file.');

      });

      // TODO: other cursor

    });

    describe('it is fast enough', () => {

      it('runs as expected when text is long', () => {
        // TODO:
      });

      it('runs as expected when text is nested deeply', () => {
        // TODO:
      });

    });

  });

});
