'use babel';

import Tag from './tag';
import TaggedElement from './tagged-element';
import TagScanner from './tag-scanner';

import CommonHelpers from './common-helpers';

/**
 * Scan tagged elements in atom's text editor, calling the given iterator
 * function on each elements.
 */
export default class TaggedElementScanner {

  /**
   * @param {TextEditor} textEditor - Of atom.
   */
  constructor(textEditor) {
    this._textEditor = textEditor;
    this._tagScanner = new TagScanner(textEditor);
  }

  get textEditor() { return this._textEditor; }
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
      // TODO: Skip empty tags.
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
              if (startTag.tagName === tag.tagName) {
                return new TaggedElement(startTag, tag);
              }
            }
            break;
        }
      })();
      if (!element) return;

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
