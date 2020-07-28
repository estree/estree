import {readFile, writeFile} from 'fs';
import {promisify} from 'util';

var readFileAsync = promisify(readFile);
var writeFileAsync = promisify(writeFile);

export {readFileAsync as readFile, writeFileAsync as writeFile};
