# [Import Attributes][proposal-import-attributes]

## Imports

### ImportDeclaration

```js
extend interface ImportDeclaration {
    attributes: [ ImportAttribute ];
}
```

The `attributes` is non-empty when import attributes present, e.g., `import foo from "./foo.json" with { type: "json" }`.

Note: While the spec also supports `assert { type: "json" }`, it was considered legacy and thus not covered here. If you want to support the legacy syntax, please use [Import Assertions](../stage3/import-assertions.md) instead.

### ImportAttribute

```js
interface ImportAttribute <: Node {
    type: "ImportAttribute";
    key: Identifier | Literal;
    value: Literal;
}
```

An import attribute is an object-like key value pair, e.g. `type: "json"` in `import foo from "./foo.json" with { type: "json" }`. The `value` must be a string literal, that said, `value.value` is always `string`-type. If `key` is a `Literal`, it must be a string literal.

## Exports

### ExportNamedDeclaration

```js
extend interface ExportNamedDeclaration {
    attributes: [ ImportAttribute ];
}
```
- `attributes` must be an empty array when `source` is `null`.

### ExportAllDeclaration

```js
extend interface ExportAllDeclaration {
    attributes: [ ImportAttribute ];
}
```
- `attributes` must be an empty array when `source` is `null`.

## Expressions

### ImportExpression

```js
extend interface ImportExpression {
    options: Expression | null;
}
```

The `options` property contains an `Expression` when import attributes presents, e.g., `{ with: { type: "json" } }` in `import(jsonModuleName, { with: { type: "json" } })`.

[proposal-import-attributes]: https://github.com/tc39/proposal-import-attributes

