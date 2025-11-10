# [Deferred re-exports][proposal-deferred-reexports]

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

`phase` is `"defer"` when representing an export in the form `export defer * from "X"`.

[proposal-deferred-reexports]: https://github.com/tc39/proposal-deferred-reexports
