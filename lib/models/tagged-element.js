'use babel';

import { Range } from 'atom';

/**
 * e.g. "<foo>bar</foo>", "<foo/>"
 */
export default class TaggedElement {
  /**
   * @param {Tag[]} tags - A start-and-end tag or a pair of a start tag and
   * an end one.
   */
  constructor(...tags) {
    this._tags = tags;
  }

  get tags() { return this._tags; }
  get tagName() { return this.tags[0].tagName; }

  /**
   * A boolean whether this element consists of one tag, which is
   * a start-and-end tag. If it is false, this class should consist of
   * a pair of a start tag and an end one.
   * @return {boolean}
   */
  get consistsOfOneTag() { return this.tags.length === 1; }

  /**
   * This element's whole range.
   * @return {Range} - Of atom.
   */
  get range() {
    return this.consistsOfOneTag ?
      this.tags[0].range :
      new Range(this.tags[0].range.start, this.tags[1].range.end);
  }

  /**
   * This element's content's range.
   * e.g. In "<foo>bar</foo>", "bar" is content.
   * @return {Range} - Of atom.
   */
  get contentRange() {
    return this.consistsOfOneTag ?
      null :
      new Range(this.tags[0].range.end, this.tags[1].range.start);
  }
}
