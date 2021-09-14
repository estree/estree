export let indentation = '';

export function indent(callback, amount = '  ') {
  var old = indentation;
  indentation += amount;
  var result = callback();
  indentation = old;
  return result;
}

export function docsForDef(def, maxVersion) {
  let docs = [def.doc];

  if (def.kind === 'interface') {
    const propDocs = Object.values(def.props)
      .filter((p) => p.doc && (!p.added || p.added.year <= maxVersion))
      .map((p) => `Docs for \`${p.name}\`: ${p.doc}`)
      .join('\n\n');

    docs.push(propDocs);
  }

  if (def.added && def.added.year !== 2015) {
    docs.push(
      `Original proposal: https://github.com/tc39/proposal-${def.added.proposal}`
    );
  }
  return docs.filter(Boolean).join('\n\n');
}
