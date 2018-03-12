'use babel';

import fs from 'fs-plus';
import CommonHelpers from '../../lib/common-helpers';
import FixturesPath from '../constants/fixtures-path';

const createdPath = FixturesPath.getPathLarge();

export default function() {

  // Delete an old file.
  if (fs.existsSync(createdPath)) {
    fs.removeSync(createdPath);
  }

  // Create.
  const text = CommonHelpers.range(9999)
    .map((e) => "<div class='foo'>This is contents.</div>\r\n")
    .reduce((sum, e) => sum + e);
  fs.writeFileSync(createdPath, text);

  // HACK: Decrease memory comsumption.
  // To use write stream, asyncronony should be resolved.
  //
  // const ws = fs.createWriteStream(createdPath);
  //
  // CommonHelpers.times(10000, () => {
  //   ws.write("<div class='foo'>This is contents.</div>\r\n");
  // })
  //
  // ws.end();

}
