'use babel';

import { Range } from 'atom';

/**
 * e.g. "<foo>bar</foo>", "<foo/>"
 */
export default class TaggedElement {

  constructor(range) {
    this._range = Range.fromObject(range);
  }

  get range() { return this._range; }

}
