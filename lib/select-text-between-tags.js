'use babel';

import SelectTextBetweenTagsView from './select-text-between-tags-view';
import { CompositeDisposable } from 'atom';

export default {

  selectTextBetweenTagsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.selectTextBetweenTagsView = new SelectTextBetweenTagsView(state.selectTextBetweenTagsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.selectTextBetweenTagsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'select-text-between-tags:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.selectTextBetweenTagsView.destroy();
  },

  serialize() {
    return {
      selectTextBetweenTagsViewState: this.selectTextBetweenTagsView.serialize()
    };
  },

  toggle() {
    console.log('SelectTextBetweenTags was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
