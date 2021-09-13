import { readFile, writeFile } from 'fs/promises';
import parser from './grammar.cjs';
import toTypeScriptDef from './to-dts.js';
import toMarkdown from './to-md.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));

(async () => {
  const spec = parser.parse(await readFile(`${rootDir}/spec.estree`, 'utf8'));
  writeFile(join(rootDir, 'es5.md'), toMarkdown(spec, 5));
  writeFile(join(rootDir, 'latest.md'), toMarkdown(spec));
  writeFile(join(rootDir, 'latest.d.ts'), toTypeScriptDef(spec));
})();
