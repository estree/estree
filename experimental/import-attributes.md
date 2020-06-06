# [Import Attributes][proposal-import-attributes]

## Imports

### ImportDeclaration

```js
extend interface ImportDeclaration {
    attributes: [ ImportAttribute ];
}
```

The `attributes` is non-empty when import attributes present, e.g., `import foo from "./foo.json" with type: "json"`

### ImportAttribute

```js
interface ImportAttribute <: Node {
    type: "ImportAttribute";
    key: Identifier;
    value: Literal;
}
```

An import attribute is an object-like key value pair, e.g., `type: "json"` in `import foo from "./foo.json" with type: "json"`. The `value` must be a string literal, that said, `value.value` is always `string`-type.


## Expressions

### ImportExpression

```js
extend interface ImportExpression {
    attributes: Expression | null;
}
```

The `attributes` property contains an `Expression` when import attributes presents, e.g., `import(jsonModuleName, { type: "json" })`.

[proposal-import-attributes]: https://github.com/tc39/proposal-import-attributes

