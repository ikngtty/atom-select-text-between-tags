'use babel';

import Tag from '../models/tag';

/**
 * Scan tags in atom's text editor, calling the given iterator function
 * on each tag.
 */
export default class TagScanner {
  /**
   * @param {TextEditor} textEditor - Of atom.
   * @param {Logger} logger
   */
  constructor(textEditor, logger) {
    this._textEditor = textEditor;
    this._logger = logger;
  }

  get textEditor() { return this._textEditor; }
  get logger() { return this._logger; }

  /**
   * @callback scan~iterator
   * @param {TagScanCallbackArgument} arg
   */
  /**
   * @param  {scan~iterator} iterator
   * @return {undefined}
   */
  scan(iterator) {
    this.textEditor.scan(Tag.getRegExp(), (textScanArg) => {
      // Create an argument.
      const tag = Tag.fromAtomSearchResult(textScanArg);
      this.logger.log('Found a tag.')
      this.logger.logTag(tag);
      const tagScanArg = new TagScanCallbackArgument();
      tagScanArg.tag = tag;

      // Execute.
      iterator(tagScanArg);

      // Stop scanning.
      if (tagScanArg.isScanStopped) {
        textScanArg.stop();
      }
    })
  }
}

class TagScanCallbackArgument {
  constructor() {
    this._isScanStopped = false;
  }

  get tag() { return this._tag; }
  set tag(val) { this._tag = val; }

  get isScanStopped() { return this._isScanStopped; }
  stopScan() {
    this._isScanStopped = true;
  }
}
