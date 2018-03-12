'use babel';

import fs from 'fs-plus';
import CommonHelpers from '../../lib/common-helpers';
import FixturesPath from '../constants/fixtures-path';

const createdPath = FixturesPath.getPathDeep();

/**
 * @return {Promise} - To create a file.
 */
export default async function() {

  // Delete an old file.
  if (fs.existsSync(createdPath)) {
    fs.removeSync(createdPath);
  }

  // Return a promise to create a file.
  return new Promise((resolve) => {

    // NOTE: Use a write stream cuz of small memory usage.
    const ws = fs.createWriteStream(createdPath);
    // The promise is resolved when a write stream is closed.
    ws.on('close', () => resolve());

    CommonHelpers.times(4, () => {
      CommonHelpers.times(1000, () =>{
        ws.write("<div class='foo'>\r\n");
      });
      ws.write("<span class='bar'>This is contents.</span>\r\n");
      CommonHelpers.times(1000, () =>{
        ws.write('</div>\r\n');
      });
    });

    ws.end();

  });
}
