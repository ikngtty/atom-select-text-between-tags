'use babel';

// import SelectTextBetweenTags from '../lib/select-text-between-tags';
import SpecHelpers from './helpers/spec-helpers';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('select-text-between-tags', () => {

  describe('when the :select event is triggred', () => {

    describe('it selects text between tags', () => {
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

      it('runs as expected when the cursor is '
          + 'in text between tags', () => {

        // Set the cursor.
        textEditor.setSelectedBufferRange([[8, 54], [8, 62]]);
        // - Check whether this position is as expected.
        expect(textEditor.getSelectedText()).toBeBeforeRun('a sample');

        // Run.
        atom.commands.dispatch(textEditorElement, 'select-text-between-tags:select');

        // Selection results in as below.
        expect(textEditor.getSelectedBufferRange()).toBe([8, 39], [8, 68]);
        expect(textEditor.getSelectedText()).toBe('Hello! This is a sample file.');

      });

      it('runs as expected when the cursor is '
          + 'on left end of text between tags', () => {

        // Set the cursor.
        const cursorPosition = [8, 39];
        // - Check whether this position is as expected.
        textEditor.setSelectedBufferRange([cursorPosition, [8, 45]]);
        expect(textEditor.getSelectedText()).toBeBeforeRun('Hello!');
        // - Set it.
        textEditor.setCursorBufferPosition(cursorPosition);

        // Run.
        atom.commands.dispatch(textEditorElement, 'select-text-between-tags:select');

        // Selection results in as below.
        expect(textEditor.getSelectedBufferRange()).toBe([8, 39], [8, 68]);
        expect(textEditor.getSelectedText()).toBe('Hello! This is a sample file.');

      });

      it('runs as expected when the cursor is '
          + 'on right end of text between tags', () => {

        // Set the cursor.
        const cursorPosition = [8, 68];
        // - Check whether this position is as expected.
        textEditor.setSelectedBufferRange([[8, 63], cursorPosition]);
        expect(textEditor.getSelectedText()).toBeBeforeRun('file.');
        // - Set it.
        textEditor.setCursorBufferPosition(cursorPosition);

        // Run.
        atom.commands.dispatch(textEditorElement, 'select-text-between-tags:select');

        // Selection results in as below.
        expect(textEditor.getSelectedBufferRange()).toBe([8, 39], [8, 68]);
        expect(textEditor.getSelectedText()).toBe('Hello! This is a sample file.');

      });

      it('runs as expected when the cursor is '
          + 'in a start tag', () => {

        // Set the cursor.
        textEditor.setSelectedBufferRange([[8, 7], [8, 22]]);
        // - Check whether this position is as expected.
        expect(textEditor.getSelectedText()).toBeBeforeRun("span id='title'");

        // Run.
        atom.commands.dispatch(textEditorElement, 'select-text-between-tags:select');

        // Selection results in as below.
        expect(textEditor.getSelectedBufferRange()).toBe([8, 39], [8, 68]);
        expect(textEditor.getSelectedText()).toBe('Hello! This is a sample file.');

      });

      it('runs as expected when the cursor is '
          + 'in an end tag', () => {

        // Set the cursor.
        textEditor.setSelectedBufferRange([[8, 69], [8, 74]]);
        // - Check whether this position is as expected.
        expect(textEditor.getSelectedText()).toBeBeforeRun('/span');

        // Run.
        atom.commands.dispatch(textEditorElement, 'select-text-between-tags:select');

        // Selection results in as below.
        expect(textEditor.getSelectedBufferRange()).toBe([8, 39], [8, 68]);
        expect(textEditor.getSelectedText()).toBe('Hello! This is a sample file.');

      });

      it('runs as expected when the cursor is '
          + 'on left end of a start tag', () => {

        // Set the cursor.
        const cursorPosition = [8, 6];
        // - Check whether this position is as expected.
        textEditor.setSelectedBufferRange([cursorPosition, [8, 22]]);
        expect(textEditor.getSelectedText()).toBeBeforeRun("<span id='title'");
        // - Set it.
        textEditor.setCursorBufferPosition(cursorPosition);

        // Run.
        atom.commands.dispatch(textEditorElement, 'select-text-between-tags:select');

        // Selection results in as below.
        expect(textEditor.getSelectedBufferRange()).toBe([8, 39], [8, 68]);
        expect(textEditor.getSelectedText()).toBe('Hello! This is a sample file.');

      });

      it('runs as expected when the cursor is '
          + 'on right end of an end tag', () => {

        // Set the cursor.
        const cursorPosition = [8, 75];
        // - Check whether this position is as expected.
        textEditor.setSelectedBufferRange([[8, 68], cursorPosition]);
        expect(textEditor.getSelectedText()).toBeBeforeRun('</span>');
        // - Set it.
        textEditor.setCursorBufferPosition(cursorPosition);

        // Run.
        atom.commands.dispatch(textEditorElement, 'select-text-between-tags:select');

        // Selection results in as below.
        expect(textEditor.getSelectedBufferRange()).toBe([8, 39], [8, 68]);
        expect(textEditor.getSelectedText()).toBe('Hello! This is a sample file.');

      });

      it('selects latter text when the cursor is '
          + 'on right end of an end tag and left end of a start tag', () => {

        // Set the cursor.
        const cursorPosition = [9, 34];
        // - Check whether this position is as expected.
        textEditor.setSelectedBufferRange([[9, 27], cursorPosition]);
        expect(textEditor.getSelectedText()).toBeBeforeRun('</span>');
        textEditor.setSelectedBufferRange([cursorPosition, [9, 51]]);
        expect(textEditor.getSelectedText()).toBeBeforeRun("<span id='right'>");
        // - Set it.
        textEditor.setCursorBufferPosition(cursorPosition);

        // Run.
        atom.commands.dispatch(textEditorElement, 'select-text-between-tags:select');

        // Selection results in as below.
        expect(textEditor.getSelectedBufferRange()).toBe([9, 51], [9, 57]);
        expect(textEditor.getSelectedText()).toBe('b a r');

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
