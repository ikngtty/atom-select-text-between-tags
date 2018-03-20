'use babel';

import TagScanner from './tag-scanner';
import Tag from '../models/tag';
import TaggedElement from '../models/tagged-element';
import CommonHelpers from '../helpers/common-helpers';

/**
 * Scan tagged elements in atom's text editor, calling the given iterator
 * function on each elements.
 */
export default class TaggedElementScanner {
  /**
   * @param {TextEditor} textEditor - Of atom.
   * @param {Logger} logger
   */
  constructor(textEditor, logger) {
    this._textEditor = textEditor;
    this._logger = logger;
    this._tagScanner = new TagScanner(textEditor, logger);
  }

  get textEditor() { return this._textEditor; }
  get logger() { return this._logger; }
  get tagScanner() { return this._tagScanner; }

  /**
   * @callback scan~iterator
   * @param {TaggedElementScanCallbackArgument} arg
   */
  /**
   * @param  {scan~iterator} iterator
   * @return {undefined}
   */
  scan(iterator) {
    const scannedTagStack = [];
    this.tagScanner.scan((tagScanArg) => {
      const tag = tagScanArg.tag;
      // Try to create an element object from a scanned tag.
      // A tag not to use is stacked.
      // TODO: Fill up left out end tags by creating virtual tags.
      const element = (() => {
        switch (tag.kind) {
          case Tag.Kind.START:
            scannedTagStack.push(tag);
            break;
          case Tag.Kind.START_AND_END:
            return new TaggedElement(tag);
            break;
          case Tag.Kind.END:
            let startTag;
            while ((startTag = scannedTagStack.pop()) != null) {
              if (startTag.tagName === tag.tagName)
                return new TaggedElement(startTag, tag);
            }
            break;
        }
      })();
      if (!element) return;
      this.logger.log('Found a tagged element.');
      this.logger.logTaggedElement(element);

      // Create an argument.
      const elementScanArg = new TaggedElementScanCallbackArgument();
      elementScanArg.taggedElement = element;

      // Execute.
      iterator(elementScanArg);

      // Stop scanning.
      if (elementScanArg.isScanStopped) {
        tagScanArg.stopScan();
      }
    })
  }
}

class TaggedElementScanCallbackArgument {
  constructor() {
    this._isScanStopped = false;
  }

  get taggedElement() { return this._taggedElement; }
  set taggedElement(val) { this._taggedElement = val; }

  get isScanStopped() { return this._isScanStopped; }
  stopScan() {
    this._isScanStopped = true;
  }
}
