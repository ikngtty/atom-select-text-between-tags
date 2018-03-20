'use babel';

import fs from 'fs-plus';
import FixturesPath from '../constants/fixtures-path';

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
export default async function createText(createdPath, writeContents) {

  if (fs.existsSync(createdPath)) {
    // Delete an old file.
    fs.removeSync(createdPath);

  } else if (!fs.existsSync(FixturesPath.DIRECTORY_FOR_AUTO_GENERATED_PATH)) {
    // Create a directory for auto generated files.
    fs.mkdirSync(FixturesPath.DIRECTORY_FOR_AUTO_GENERATED_PATH);
  }

  // Return a promise to create a file.
  return new Promise((resolve) => {
    // NOTE: Use a write stream cuz of small memory usage.
    const ws = fs.createWriteStream(createdPath);
    // The promise is resolved when a write stream is closed.
    ws.on('close', resolve);
    writeContents(ws);
    ws.end();
  });
}
