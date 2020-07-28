import extend from 'object-assign';
import Promise from 'bluebird';
import {install as installSourceMaps} from 'source-map-support';
import {readFile, writeFile} from './fs';
import {parse as parseSpec} from './grammar';
import toTypeScriptDef from './to-dts';
import toMarkdown from './to-md';

installSourceMaps();

var rootDir = `${__dirname}/..`;

function merge(...objects) {
	return extend(Object.create(null), ...objects);
}

function resolveExtends(extension, base) {
	var result = merge(base);
	for (let name in extension) {
		let item = extension[name];
		if (item.kind === 'interface' && !item.base) {
			let baseItem = base[name];
			result[name] = merge(baseItem, {
				props: merge(baseItem.props, item.props)
			});
		} else {
			result[name] = item;
		}
	}
	return result;
}

function writeSpec(name, spec) {
	return spec.then(spec => Promise.all([
		writeFile(
			`${rootDir}/formal-data/typescript/${name}.d.ts`,
			toTypeScriptDef(spec, 5)
		),
		writeFile(
			`${rootDir}/estree/${name}.md`,
			toMarkdown(spec, 5)
		),
		writeFile(
			`${rootDir}/formal-data/${name}.json`,
			JSON.stringify(spec, null, 2)
		)
	]));
};


writeSpec('es5',
	readFile(`${rootDir}/estree/spec.estree`, 'utf8')
		.then(parseSpec)
)
