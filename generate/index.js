import {readFile, writeFile} from './fs.js';
import parser from './grammar.cjs';
// import toTypeScriptDef from './to-dts.js';
import toMarkdown from './to-md.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));

function writeSpec(name, spec, maxVersion = parseInt(name.slice(2))) {
  return spec.then(spec => Promise.all([
    // writeFile(
    //   `${rootDir}/formal-data/typescript/${name}.d.ts`,
    //   toTypeScriptDef(spec, maxVersion)
    // ),
    writeFile(
      `${rootDir}/${name}.md`,
      toMarkdown(spec, maxVersion)
    ),
    // writeFile(
    //   `${rootDir}/formal-data/${name}.json`,
    //   JSON.stringify(spec, null, 2)
    // )
  ]));
};

(async () => {
  const spec = parser.parse(await readFile(`${rootDir}/spec.estree`, 'utf8'))
  writeFile(join(rootDir, 'es5.md'), toMarkdown(spec, 5))
  writeFile(join(rootDir, 'latest.md'), toMarkdown(spec))
})()
