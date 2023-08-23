# [Import Reflection][proposal-import-reflection]

> **Warning**
> This proposal has been superseded by [Source Phase Imports](../experimental/source-phase-imports.md).
> 
## Imports

### ImportDeclaration

```js
extend interface ImportDeclaration {
    module: boolean;
}
```
When `module` is `true`, the `specifiers` must be a length-1 array including `ImportDefaultSpecifier`, and the `assertions` must be an empty array.

## Expressions

### ImportExpression

```js
extend interface ImportExpression {
    attributes: Expression | null;
}
```

The `attributes` property contains an `Expression` when import attributes presents, e.g., `{ reflect: "module" }` in `import(wasmModuleName, { reflect: "module" })`.

The import expression extension is also defined in [Import assertions](../stage3/import-assertions.md). It will be removed from this document when that proposal advances to stage 4.

[proposal-import-reflection]: https://github.com/tc39/proposal-source-phase-imports/tree/c8974b05773568c708bdc0055dd97fe6780570d7
