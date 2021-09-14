import { indentation, indent, docsForDef, printJSDoc } from './util.js';

function unique(value, index, self) {
  return self.indexOf(value) === index;
}

// Processors for top-level definitons.
const topProcessors = {
  enum({ name, values }, maxVersion) {
    // TypeScript doesn't allow enums of literals, so we need to create type union instead.
    const types = values
      .filter(({ added }) => added == null || added.year <= maxVersion)
      .map(({ value }) => (typeof value === 'string' ? `"${value}"` : value))
      .join(' | ');
    return `type ${name} = ${types};`;
  },

  interface(node, maxVersion) {
    const { name, bases, props } = node;
    let result = '';
    const doc = docsForDef(node);
    if (doc) {
      result += printJSDoc(doc);
      result += indentation;
    }
    result += `interface ${name} `;
    const legalBases = bases
      .filter((base) => !base.added || base.added.year <= maxVersion)
      .map((base) => (base.added ? base.name : base));
    if (legalBases.length) {
      result += `extends ${legalBases.join(', ')} `;
    }
    const items = Object.create(null);
    let hasItems = false;
    for (let prop in props) {
      if (props[prop].added && props[prop].added.year > maxVersion) continue;
      // Filter out useless "type: string" from desdendant types.
      if (name === 'Node' || prop !== 'type') {
        items[prop] = props[prop];
        hasItems = true;
      }
    }
    return (
      result + (hasItems ? typeProcessors.object({ items }, maxVersion) : '{}')
    );
  },
};

// Processors (code generators) for specific types.
const typeProcessors = {
  literal: ({ value }) => (value === null ? 'any' : typeof value),

  reference: ({ name }) => name,

  array: ({ base }, maxVersion) => `Array<${processType(base, maxVersion)}>`,

  union: ({ types }, maxVersion) =>
    types
      .filter((type) => type.added == null || type.added.year <= maxVersion)
      .map((type) => processType(type, maxVersion))
      .filter(unique)
      .filter((type) => type !== 'any')
      .join(' | ') || 'any',

  object: ({ items }, maxVersion) => {
    let result = '{\n';
    indent(() => {
      for (let propName in items) {
        let prop = items[propName];
        const docs = docsForDef(prop);
        result += docs ? indentation + printJSDoc(docs) : '';
        if (
          prop.type.kind === 'union' &&
          prop.type.types.some(
            ({ kind, value, added }) =>
              (added == null || added.year <= maxVersion) &&
              kind === 'literal' &&
              value === null
          )
        ) {
          propName += '?';
        }
        result +=
          indentation + `${propName}: ${processType(prop.type, maxVersion)};\n`;
      }
    });
    result += indentation + '}';
    return result;
  },
};

function processType(type, maxVersion) {
  const processor = typeProcessors[type.kind];
  if (!processor) {
    throw new ReferenceError(
      `Processor for ${type.kind} types doesn't exist. ${JSON.stringify(type)}`
    );
  }
  return processor(type, maxVersion);
}

export default function toTypeScriptDef(spec, maxVersion = Infinity) {
  const result = [];
  indent(() => {
    for (let def of spec) {
      if (def.added && def.added.year > maxVersion) continue;
      result.push(indentation + topProcessors[def.kind](def, maxVersion));
    }
  });
  return `declare module ESTree {
${result.join('\n\n')}
}`;
}