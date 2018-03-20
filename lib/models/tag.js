'use babel';

/**
 * e.g. "<foo id='bar'>", "</foo>", "<foo id='bar' />"
 * NOTE: Depends on Atom's interface.
 */
export default class Tag {
  /**
   * A tag kind.
   * e.g. "<foo>":start, "</foo>":end, "<foo/>":start-and-end,
   * @enum {string}
   */
  static Kind = {
    START: 'start',
    END: 'end',
    START_AND_END: 'start-and-end'
  }

  /**
   * Gets a regular expression with which tags are found and analyzed.
   * Capturing results are as below:
   * "<foo id='bar'>"   -> [1] ""  [2] "foo" [3] ""
   * "</foo>"           -> [1] "/" [2] "foo" [3] ""
   * "<foo id='bar' />" -> [1] ""  [2] "foo" [3] "/"
   * @return {RegExp}
   */
  static getRegExp() { return /<(\/?)([^\s\/>]+)[^\/>]*(\/?)>/g; }

  /**
   * @typedef {Object} MultiLineSearchCallbackArgument
   * @property {string[]} match
   * @property {string} matchText
   * @property {Range} range - Of atom.
   * @function stop
   */
  /**
   * Creates a tag object from a search result object of atom's text editor.
   * It is expected that {@link Tag#getRegExp} is used in the search.
   * @param  {MultiLineSearchCallbackArgument} searchResult
   * @return {Tag}
   */
  static fromAtomSearchResult(searchResult) {
    const endPart = searchResult.match[1];
    const namePart = searchResult.match[2];
    const startAndEndPart = searchResult.match[3];

    let kind;
    if (startAndEndPart === '/') {
      kind = this.Kind.START_AND_END;
    } else if (endPart === '/') {
      kind = this.Kind.END;
    } else {
      kind = this.Kind.START;
    }

    const tag = new Tag();
    tag.range = searchResult.range;
    tag.kind = kind;
    tag.tagName = namePart;
    return tag;
  }

  get range() { return this._range; }
  set range(val) { this._range = val; }

  get kind() { return this._kind; }
  set kind(val) { this._kind = val; }

  get tagName() { return this._tagName; }
  set tagName(val) { this._tagName = val; }

}
