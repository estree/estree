# [Decimal][proposal-decimal]

# Literal

```js
extend interface Literal <: Expression {
  type: "Literal";
  value: string | boolean | null | number | RegExp | bigint | bigdecimal
}
```

- `value` property can be a `bigdecimal` value to represent decimal literals, e.g. `2.718m`.

## DecimalLiteral

```js
interface DecimalLiteral <: Literal {
  decimal: string;
}
```

- `decimal` property is the string representation of the `bigdecimal` value. It doesn't include the suffix `m`.
- In environments that don't support `bigdecimal` values, `value` property will be `null` as the `bigdecimal` value can't be represented natively.

[proposal-decimal]: https://github.com/tc39/proposal-decimal
