'use babel';

import { CompositeDisposable } from 'atom';
import TaggedTextStructure from './tagged-text-structure'

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

    const currentCursor = editor.getCursorBufferPosition();

    const structure = new TaggedTextStructure(editor);
    for (const element of structure.getTaggedTextElementsLazy()) {
      if (element.range.containsPoint(currentCursor)) {
        editor.setSelectedBufferRange(element.range);
        break;
      }
    }

    for (const tag of structure.getTags()) {
      console.log(tag);
    }
  }

};
