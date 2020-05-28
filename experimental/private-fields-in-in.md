# [Ergonomic brand checks for Private Fields][proposal-private-fields-in-in]

## Expressions

### BinaryExpression

```js
extend interface BinaryExpression <: Expression {
    left: Expression | PrivateName;
}
```

- `left` can be a private name (e.g. `#foo`) when `operator` is `"in"`.

[proposal-private-fields-in-in]: https://github.com/tc39/proposal-private-fields-in-in
