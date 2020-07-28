# [Slice notation][proposal-slice-notation]

## SliceExpression

```js
interface SliceExpression <: ChainElement, Expression {
    type: "SliceExpression";
    object: Expression;
    lower: Expression | null;
    upper: Expression | null;
}
```

A slice expression, e.g. `arr[0:1]`.

[proposal-slice-notation]: https://github.com/tc39/proposal-slice-notation
