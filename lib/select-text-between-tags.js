'use babel';

import { CompositeDisposable } from 'atom';
import TaggedTextAnalyzer from './tagged-text-analyzer';

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

    const analyzer = new TaggedTextAnalyzer(editor);
    analyzer.eventEmitter.on(
      TaggedTextAnalyzer.Events.foundTaggedElement,
      selectOnFoundTaggedElement);

    analyzer.execute();
  }

};

function selectOnFoundTaggedElement(element) {
  console.log(element);
  // TODO: Stop the analyzer.
}
