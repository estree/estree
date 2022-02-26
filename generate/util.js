export let indentation = '';

export function indent(callback, amount = '  ') {
  var old = indentation;
  indentation += amount;
  var result = callback();
  indentation = old;
  return result;
}

export function docsForDef(def) {
  let docs = [def.doc];

  if (def.added && def.added.year !== 2015) {
    docs.push(
      `Original proposal: ${
        def.added.proposal.includes('/')
          ? `https://${def.added.proposal}`
          : `https://github.com/tc39/proposal-${def.added.proposal}`
      }`
    );
  }

  return docs.filter(Boolean).join('\n\n');
}

export function printDoc(doc, collapse = true) {
  if (!doc) return '';
  let result = '';
  for (const line of doc.split('\n').filter(collapse ? Boolean : () => true)) {
    if (result) result += indentation;
    result += line ? `// ${line}\n` : '//\n';
  }
  return result;
}

export function printJSDoc(doc) {
  if (!doc.includes('\n')) {
    return `/** ${doc} */\n`;
  }
  let result = '/**\n';
  for (const line of doc.split('\n')) {
    result += indentation + ` * ${line.replace('*/', '*\u{200b}/')}\n`;
  }
  result += indentation + ' */\n';
  return result;
}
