'use babel';

import fs from 'fs-plus';

/**
 * @callback writeContentsCallback
 * @param {WriteStream} writeStream
 * @return {undefined}
 */
/**
 * Common process to create text.
 * @param {string} createdPath
 * @param {writeContentsCallback} writeContents
 * @return {Promise.<undefined>} - To create a file.
 */
export default async function(createdPath, writeContents) {

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

    writeContents(ws);

    ws.end();

  });
}
