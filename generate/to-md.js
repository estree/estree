import { indentation, indent } from './indent.js';

function makeToc(section) {
  let result =
    indentation +
    `- [${section.name}](#${section.name
      .toLowerCase()
      .replace(/[^\w]/g, '-')})\n`;
  indent(() => {
    for (const child of section.content) {
      if (child.kind === 'section') {
        result += makeToc(child);
      }
    }
  });
  return result;
}

const entryProcessors = {
  section: (section, maxVersion, depth = 1) =>
    [`${'#'.repeat(depth)} ${section.name}`]
      .concat(section.content.map((e) => print(e, maxVersion, depth + 1)))
      .join('\n\n'),
  content(entry, maxVersion) {
    const def = entry.value;
    if (def.kind === 'interface') {
      const legalBases = def.bases
        .filter((base) => !base.added || base.added <= maxVersion)
        .map((base) => (base.added ? base.name : base));

      const bases = def.bases.length ? ' <: ' + legalBases.join(', ') : '';

      let { doc } = def;
      const propDocs = Object.values(def.props)
        .filter((p) => p.doc && (!p.added || p.added <= maxVersion))
        .map((p) => `Docs for \`${p.name}\`: ${p.doc}`)
        .join('\n\n');

      if (propDocs) {
        if (doc) doc += '\n\n' + propDocs;
        else doc = propDocs;
      }

      return (
        '```jsx\ninterface ' +
        def.name +
        bases +
        ' ' +
        typeProcessors.object({ items: def.props }, maxVersion) +
        '\n```' +
        (doc ? '\n\n' + doc : '')
      );
    } else if (def.kind === 'enum') {
      return (
        '```jsx\nenum ' +
        def.name +
        ' {\n    ' +
        def.values
          .filter((v) => !v.added || v.added <= maxVersion)
          .map(typeProcessors.literal)
          .join(' | ') +
        '\n}\n```' +
        (def.doc ? '\n\n' + def.doc : '')
      );
    } else {
      throw new TypeError('Unknown declaration type ' + def.kind);
    }
  },
};

const typeProcessors = {
  literal: ({ value }) =>
    value === null
      ? 'null'
      : typeof value === 'string'
      ? `"${value}"`
      : String(value),

  reference: ({ name }) => name,

  array: ({ base }, maxVersion) => `[ ${processType(base, maxVersion)} ]`,

  union: ({ types }, maxVersion) =>
    types
      .filter((type) => type.added == null || type.added <= maxVersion)
      .map((type) => processType(type, maxVersion))
      .join(' | ') || 'any',

  object: ({ items }, maxVersion) => {
    const allowed = Object.values(items).filter(
      (v) => !v.added || v.added <= maxVersion
    );
    if (allowed.length === 0) return '{ }';
    let result = '{\n';
    indent(() => {
      for (const prop of allowed) {
        // result += prop.doc ? indentation + printDoc(prop.doc) : '';
        result +=
          indentation +
          `${prop.name}: ${processType(prop.type, maxVersion)};\n`;
      }
    }, ' '.repeat(4));
    result += indentation + '}';
    return result;
  },
};

function print(entry, maxVersion, depth) {
  const processor = entryProcessors[entry.kind];
  if (!processor) throw new TypeError('Unknown entry type ' + entry.kind);
  return processor(entry, maxVersion, depth);
}

function processType(type, maxVersion) {
  const processor = typeProcessors[type.kind];
  if (!processor) {
    throw new ReferenceError(
      `Processor for ${type.kind} types doesn't exist. ${JSON.stringify(type)}`
    );
  }
  return processor(type, maxVersion);
}

export default function toMarkdown(spec, maxVersion = Infinity) {
  const root = [];

  function addEntry(path, def, current = root) {
    for (const section of current) {
      if (section.name === path[0]) {
        if (path.length === 1) {
          section.content.push(def);
        } else {
          addEntry(path.slice(1), def, section.content);
        }
        return;
      }
    }
    if (path.length > 1) throw new Error(path.join(' -> '));
    current.push({
      kind: 'section',
      name: path[0],
      content: [def],
    });
  }

  for (const def of spec) {
    if (def.added && def.added > maxVersion) continue;
    const sectionName = def.section
      ? def.section
      : def.bases[0]
      ? [def.bases[0]]
      : ['<root>'];

    if (sectionName[0] === '<root>') {
      root.push({
        kind: 'section',
        name: def.name,
        content: [{ kind: 'content', value: def }],
      });
    } else {
      addEntry(
        sectionName,
        def.headerless
          ? { kind: 'content', value: def }
          : {
              kind: 'section',
              name: def.name,
              content: [{ kind: 'content', value: def }],
            }
      );
    }
  }

  return (
    root.map(makeToc).join('') +
    '\n' +
    root.map((sec) => print(sec, maxVersion, 1)).join('\n\n')
  );
}
