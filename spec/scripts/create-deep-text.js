'use babel';

import createText from './create-text';
import FixturesPath from '../constants/fixtures-path';
import CommonHelpers from '../../lib/helpers/common-helpers';

/**
 * @return {Promise.<undefined>} - To create a file.
 */
export default async function createDeepText() {
  const createdPath = FixturesPath.deepTextPath;
  return createText(createdPath, writeContents);
}

/**
 * @param {WriteStream} ws - A write stream.
 * @return {undefined}
 */
function writeContents(ws) {
  CommonHelpers.times(4, () => {
    const depth = 1000;

    CommonHelpers.times(depth, () =>{
      ws.write("<div class='foo'>\r\n");
    });
    ws.write("<span class='bar'>This is contents.</span>\r\n");
    CommonHelpers.times(depth, () =>{
      ws.write('</div>\r\n');
    });
  });
}
