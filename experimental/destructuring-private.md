# [A proposal integrates private fields and destructuring][proposal-destructuring-private]

## ObjectPattern

```js
extend interface AssignmentProperty {
    key: Expression | PrivateIdentifier;
}
```

When `key` is a `PrivateIdentifier`, `computed` and `shorthand` must be `false`.

[proposal-destructuring-private]: https://github.com/tc39-transfer/proposal-destructuring-private
