# [Import Assertions][proposal-import-assertions]

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
    attributes: Expression | null;
}
```

The `attributes` property contains an `Expression` when import attributes presents, e.g., `{ assert: { type: "json" } }` in `import(jsonModuleName, { assert: { type: "json" } })`.

[proposal-import-assertions]: https://github.com/tc39/proposal-import-assertions

