# [Deferred re-exports][proposal-deferred-reexports]

## Imports

### ImportNamespaceSpecifier

```js
extend interface ImportNamespaceSpecifier <: ModuleSpecifier {
    exportsFilter: [ Identifier | Literal ] | null;
}
```

When `exportsFilter` is specified, it represents an `import { x, "y" } as ns from "mod.js"` import, where `x` and `"y"` are the  element of `exportsFilter`.
Note that an empty `exportsFilter` list represents `{} as ns`, while a `null` one represents `* as ns`.

## Exports

### ExportNamedDeclaration

```js
extend interface ExportNamedDeclaration {
    phase: "defer" | null;
}
```

`phase` is `"defer"` when representing an export in the form `export defer { foo } from "X"`.

When `phase` is `"defer"`, the `declaration` must be `null`, the `source` must be a `Literal`.

### ExportAllDeclaration

```js
extend interface ExportAllDeclaration {
    phase: "defer" | null;
}
```

`phase` is `"defer"` when representing an export in the form `export defer * as ns from "X"`.

[proposal-deferred-reexports]: https://github.com/tc39/proposal-deferred-reexports
