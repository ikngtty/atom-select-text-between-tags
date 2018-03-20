'use babel';

import Logger from './logger';

const logger = new Logger();

logger.log = function(obj) {
  console.log(obj);
};

logger.logTag = function(tag) {
  this.log(`${tag.kind} of <${tag.tagName}> in ${tag.range.toString()}`);
};

logger.logTaggedElement = function(taggedElement) {
  this.log(`<${taggedElement.tagName}> in ${taggedElement.range.toString()}`);
};

export default logger;
