import Promise from 'bluebird';

import {readFile, writeFile} from 'fs';

var readFileAsync = Promise.promisify(readFile);
var writeFileAsync = Promise.promisify(writeFile);

export {readFileAsync as readFile, writeFileAsync as writeFile};