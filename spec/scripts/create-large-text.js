'use babel';

import CommonHelpers from '../../lib/common-helpers';
import FixturesPath from '../constants/fixtures-path';
import createText from './create-text';

/**
 * @return {Promise.<undefined>} - To create a file.
 */
export default async function() {
  const createdPath = FixturesPath.getPathLarge();
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
