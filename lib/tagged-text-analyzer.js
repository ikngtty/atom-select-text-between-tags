'use babel';

import events from 'events';
import Tag from './tag'
import TaggedElement from './tagged-element'

// NOTE: All events should be listed here to make knowledge explicit.
// To remember to list one and use this, symbol is used
// for each event identifier.
const Events = {

  /**
   * @event TaggedTextAnalyzer#foundTag
   * @param {Tag} tag - A found tag.
   */
  foundTag: Symbol('foundTag'),

  /**
  * @event TaggedTextAnalyzer#foundTaggedElement
  * @param {TaggedElement} taggedElement - A found tagged element.
   */
  foundTaggedElement: Symbol('foundTaggedElement')

};

/**
 * NOTE: Depends on Atom's interface.
 */
export default class TaggedTextAnalyzer {
  static Events = Events;

  /**
   * @param {TextEditor} textEditor - Of Atom.
   */
  constructor(textEditor) {
    // NOTE: Member vaiables' names start with "_" not to conflict
    // with properties'.
    this._eventEmitter = new events.EventEmitter();
    this._textEditor = textEditor;
    this._tags = [];
    this._taggedElements = [];
  }

  get eventEmitter() { return this._eventEmitter; }
  get tags() { return this._tags; }
  get taggedElements() { return this._taggedElements; }

  execute() {
    this.eventEmitter.emit(
      this.constructor.Events.foundTag,
      new Tag());
    this.eventEmitter.emit(
      this.constructor.Events.foundTaggedElement,
      new TaggedElement());

    const tagReg = /<(\/?)([^\s>]+)[^>]*>/g;
    editor.scan(tagReg, (m) => {
      console.log(m.matchText + '->' + m.match[2]);
    });
  }
}
