'use babel';

import path from 'path';

const fixtureDirectoryPath = path.resolve(__dirname, '../fixtures');

function absolutify(relativeFixturePath) {
   return path.resolve(fixtureDirectoryPath, relativeFixturePath);
}

export default class {

  static getPathSample() {
    return absolutify('sample.html');
  }

  static getPathLarge() {
    return absolutify('auto-generated/large.html');
  }

  static getPathDeep() {
    return absolutify('auto-generated/deep.html');
  }

}
