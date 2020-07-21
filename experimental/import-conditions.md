# [Import Conditions][proposal-import-conditions]

## Imports

### ImportDeclaration

```js
extend interface ImportDeclaration {
    conditions: [ ImportAttribute ];
}
```

The `conditions` is non-empty when import conditions present, e.g., `import foo from "./foo.json" if { type: "json" }`

### ImportAttribute

```js
interface ImportAttribute <: Node {
    type: "ImportAttribute";
    key: Identifier;
    value: Literal;
}
```

An import attribute is an object-like key value pair, e.g. `type: "json"` in `import foo from "./foo.json" if { type: "json" }`. The `value` must be a string literal, that said, `value.value` is always `string`-type.

## Exports

### ExportNamedDeclaration

```js
extend interface ExportNamedDeclaration {
    conditions: [ ImportAttribute ];
}
```
- `conditions` must be an empty array when `source` is `null`.

### ExportAllDeclaration

```js
extend interface ExportAllDeclaration {
    conditions: [ ImportAttribute ];
}
```
- `conditions` must be an empty array when `source` is `null`.

## Expressions

### ImportExpression

```js
extend interface ImportExpression {
    attributes: Expression | null;
}
```

The `attributes` property contains an `Expression` when import attributes presents, e.g., `{ if: { type: "json" } }` in `import(jsonModuleName, { if: { type: "json" } })`.

[proposal-import-conditions]: https://github.com/tc39/proposal-import-conditions

