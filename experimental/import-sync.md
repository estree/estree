# [Import Sync][proposal-import-sync]

## Expressions

### ImportExpression

```js
extend interface ImportExpression {
    phase: "sync" | null;
}
```

`phase` is `"sync"` when representing a dynamic import in the form `import.sync("X")`.

[proposal-import-sync]: https://github.com/tc39/proposal-import-sync
