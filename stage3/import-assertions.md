# [Import Assertions][proposal-import-assertions]

> **Warning**
> This proposal has been superseded by [Import Attributes](./import-attributes.md).

## Imports

### ImportDeclaration

```js
extend interface ImportDeclaration {
    assertions: [ ImportAttribute ];
}
```

The `assertions` is non-empty when import assertions present, e.g., `import foo from "./foo.json" assert { type: "json" }`

### ImportAttribute

```js
interface ImportAttribute <: Node {
    type: "ImportAttribute";
    key: Identifier | Literal;
    value: Literal;
}
```

An import attribute is an object-like key value pair, e.g. `type: "json"` in `import foo from "./foo.json" assert { type: "json" }`. The `value` must be a string literal, that said, `value.value` is always `string`-type. If `key` is a `Literal`, it must be a string literal.

## Exports

### ExportNamedDeclaration

```js
extend interface ExportNamedDeclaration {
    assertions: [ ImportAttribute ];
}
```
- `assertions` must be an empty array when `source` is `null`.

### ExportAllDeclaration

```js
extend interface ExportAllDeclaration {
    assertions: [ ImportAttribute ];
}
```
- `assertions` must be an empty array when `source` is `null`.

## Expressions

### ImportExpression

```js
extend interface ImportExpression {
    options: Expression | null;
}
```

The `options` property contains an `Expression` when import attributes presents, e.g., `{ assert: { type: "json" } }` in `import(jsonModuleName, { assert: { type: "json" } })`.

[proposal-import-assertions]: https://github.com/tc39/proposal-import-attributes/tree/f5ad402cd3d3f82f28b1d1be2bfd567cd26336af
