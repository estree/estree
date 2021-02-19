# [Ergonomic brand checks for Private Fields][proposal-private-fields-in-in]

This feature depends on [Classes feature].

## Expressions

### BinaryExpression

```js
extend interface BinaryExpression <: Expression {
    left: Expression | PrivateIdentifier;
}
```

- `left` can be a private identifier (e.g. `#foo`) when `operator` is `"in"`.

[proposal-private-fields-in-in]: https://github.com/tc39/proposal-private-fields-in-in
[classes feature]: ./class-features.md
