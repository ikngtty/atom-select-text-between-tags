'use babel';

import Tag from './tag';
import TaggedElement from './tagged-element';

/**
 * Analyzes tagged text (e.g. html, xml) in Atom's text editor
 * and represents its structure.
 * NOTE: Depends on Atom's interface.
 */
export default class TaggedTextStructure {

  /**
   * @param {TextEditor} textEditor - Of Atom.
   */
  constructor(textEditor) {
    // NOTE: Member vaiables' names start with "_" not to conflict
    // with properties'.
    this._textEditor = textEditor;
  }

  get textEditor() { return this._textEditor; }


  * getTagsLazy() {
    this.textEditor.scan(Tag.getRegExp(), (result) => {
      // yield Tag.fromAtomSearchResult(result);
      console.log(Tag.fromAtomSearchResult(result));
    });
  }


  * getTaggedTextElementsLazy() {
    console.log('point1');
    yield new TaggedElement([[2, 0], [5, 0]]);
    console.log('point2');
    yield new TaggedElement([[8, 0], [10, 0]]);
    console.log('point3');
    yield new TaggedElement([[12, 0], [15, 0]]);
    console.log('point4');
    yield new TaggedElement([[18, 0], [25, 0]]);
    console.log('point5');
  }
}
