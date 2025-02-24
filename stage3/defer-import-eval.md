# [Deferring Module Evaluation][proposal-defer-import-eval]

## Imports

### ImportDeclaration

```js
extend interface ImportDeclaration {
    phase: "defer" | null;
}
```

`phase` is `"defer"` when representing an import in the form `import defer * as X from "X"`.

When `phase` is `"defer"`, the `specifiers` must be a length-1 array including `ImportNamespaceSpecifier`.

## Expressions

### ImportExpression

```js
extend interface ImportExpression {
    phase: "defer" | null;
}
```

`phase` is `"defer"` when representing a dynamic import in the form `import.defer("X")`.

[proposal-defer-import-eval]: https://github.com/tc39/proposal-defer-import-eval
