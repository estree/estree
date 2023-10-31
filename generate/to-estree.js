import { indentation, indent, printDoc } from './util.js';

function printAdded(added, isDeclaration = false) {
  if (!added) return '';

  const { year, proposal } = added;
  if (year === 2015) return '@es6 ';
  return `@added(${year}, ${proposal})` + (isDeclaration ? '\n' : ' ');
}

const entryProcessors = {
  interface(def, maxVersion) {
    const bases = def.bases.length
      ? ' <: ' +
        def.bases
          .map((base) =>
            base.added ? printAdded(base.added, false) + base.name : base
          )
          .join(', ')
      : '';

    return (
      printAdded(def.added, true) +
      'interface ' +
      def.name +
      bases +
      ' ' +
      typeProcessors.object({ items: def.props }, maxVersion)
    );
  },
  enum(def) {
    return (
      'enum ' +
      def.name +
      ' {\n    ' +
      def.lines
        .map((values) =>
          values
            .map(
              (value) =>
                printAdded(value.added, false) + typeProcessors.literal(value)
            )
            .join(' | ')
        )
        .join('\n' + '    | ') +
      '\n}'
    );
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
      .filter((type) => type.added == null || type.added.year <= maxVersion)
      .map(
        (type) => printAdded(type.added, false) + processType(type, maxVersion)
      )
      .join(' | ') || 'any',

  object: ({ items }, maxVersion) => {
    if (Object.values(items).length === 0) return '{ }';
    let result = '{\n';
    indent(() => {
      for (const prop of Object.values(items)) {
        result += prop.doc ? indentation + printDoc(prop.doc, false) : '';
        result +=
          indentation +
          printAdded(prop.added, false) +
          `${prop.name}: ${processType(prop.type, maxVersion)};\n`;
      }
    }, ' '.repeat(4));
    result += indentation + '}';
    return result;
  },
};

function printSectionInfo(entry) {
  let line = [];
  if (entry.section) {
    if (entry.section == '<root>') {
      line.push('@at-root');
    } else {
      line.push(`@section(${entry.section.join(' > ')})`);
    }
  }
  if (entry.headerless) line.push('@headerless');
  return line.length ? line.join(' ') + '\n' : '';
}

function print(entry, maxVersion, depth) {
  const processor = entryProcessors[entry.kind];
  if (!processor) throw new TypeError('Unknown declaration type ' + entry.kind);
  return (
    printDoc(entry.doc, false) +
    printSectionInfo(entry) +
    processor(entry, maxVersion, depth)
  );
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

export default function toESTree(spec, maxVersion = Infinity) {
  return spec.map((sec) => print(sec, maxVersion, 1)).join('\n\n') + '\n';
}
