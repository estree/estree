# [Source Phase Imports][proposal-source-phase-imports]

## Imports

### ImportDeclaration

```js
extend interface ImportDeclaration {
    phase: "source" | null;
}
```

`phase` is `"source"` when representing an import in the form `import source X from "X"`.

When `phase` is `"source"`, the `specifiers` must be a length-1 array including `ImportDefaultSpecifier`.

## Expressions

### ImportExpression

```js
extend interface ImportExpression {
    phase: "source" | null;
}
```

`phase` is `"source"` when representing a dynamic import in the form `import.source("X")`.

[proposal-source-phase-imports]: https://github.com/tc39/proposal-source-phase-imports
