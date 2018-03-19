'use babel';

import createText from './create-text';
import FixturesPath from '../constants/fixtures-path';
import CommonHelpers from '../../lib/helpers/common-helpers';

/**
 * @return {Promise.<undefined>} - To create a file.
 */
export default async function createLargeText() {
  const createdPath = FixturesPath.largeTextPath;
  return createText(createdPath, writeContents);
}

/**
 * @param {WriteStream} ws - A write stream.
 * @return {undefined}
 */
function writeContents(ws) {
  CommonHelpers.times(10000, () => {
    ws.write("<div class='foo'>This is contents.</div>\r\n");
  });
}
