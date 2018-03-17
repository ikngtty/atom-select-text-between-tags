'use babel';

import { CompositeDisposable } from 'atom';
import TagScanner from './tag-scanner';
import TaggedElementScanner from './tagged-element-scanner';

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

    const tagScanner = new TagScanner(editor);
    tagScanner.scan((arg) => {
      console.log(arg.tag);
      if (arg.tag.range.compare([[21, 0], [21, 0]]) > 0) {
        arg.stopScan();
      }
    });

    const scanner = new TaggedElementScanner(editor);
    scanner.scan((arg) => {
      console.log(arg.taggedElement);
    });
  }

};
