# [Import Conditions][proposal-import-conditions]

## Imports

### ImportDeclaration

```js
extend interface ImportDeclaration {
    conditions: [ ImportAttribute ];
}
```

The `conditions` is non-empty when import conditions present, e.g., `import foo from "./foo.json" if { type: "json" }`

### ModuleAttribute

```js
interface ModuleAttribute <: Node {
    key: Identifier;
    value: Literal;
}
```

### ImportAttribute

```js
interface ImportAttribute <: ModuleAttribute {
    type: "ImportAttribute";
}
```

An import attribute is an object-like key value pair, e.g. `type: "json"` in `import foo from "./foo.json" if { type: "json" }`. The `value` must be a string literal, that said, `value.value` is always `string`-type.

## Exports

### ExportNamedDeclaration

```js
extend interface ExportNamedDeclaration {
    conditions: [ ExportAttribute ];
}
```
- `conditions` must be an empty array when `source` is `null`.

### ExportAllDeclaration

```js
extend interface ExportAllDeclaration {
    conditions: [ ExportAttribute ];
}
```
- `conditions` must be an empty array when `source` is `null`.

### ExportAttribute

```js
interface ExportAttribute <: ModuleAttribute {
    type: "ExportAttribute";
}
```

An export attirbute is similar to import attribute, e.g. `type: "json"` in `export { version } from "./package.json" if { type: "json" }`.

## Expressions

### ImportExpression

```js
extend interface ImportExpression {
    attributes: Expression | null;
}
```

The `attributes` property contains an `Expression` when import attributes presents, e.g., `{ if: { type: "json" } }` in `import(jsonModuleName, { if: { type: "json" } })`.

[proposal-import-conditions]: https://github.com/tc39/proposal-import-conditions

