'use babel';

import { CompositeDisposable } from 'atom';
import TaggedElementScanner from './scanners/tagged-element-scanner';

// For release.
import logger from './loggers/empty-logger';
// For debug.
// import logger from './loggers/console-logger';

export default {
  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-text-editor', {
      'select-text-between-tags:select': () => this.select()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
    return {};
  },

  select() {
    const editor = atom.workspace.getActiveTextEditor();
    if (!editor) return;

    const cursor = editor.getCursorBufferPosition();
    const scanner = new TaggedElementScanner(editor, logger);
    scanner.scan((arg) => {
      const element = arg.taggedElement;
      if (element.range && element.range.containsPoint(cursor)) {
        editor.setSelectedBufferRange(element.contentRange);
        arg.stopScan();
      }
    });
  }

};
