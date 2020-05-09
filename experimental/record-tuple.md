# [Record & Tuple][proposal-record-tuple]

## Expressions

### RecordExpression

```js
interface RecordExpression <: Expression {
    type: "RecordExpression";
    properties: [ Property | SpreadElement ];
}
```

A record expression defines an immutable object, e.g. `#{a: 1}`.

For each element _p_ of `properties`, if _p_ is a `Property`, `p.method` must be `false` and  `p.kind` must be `"init"`.

### TupleExpression
```js
interface TupleExpression <: Expression {
    type: "TupleExpression";
    elements: [ Expression | SpreadElement ];
}
```

A tuple expression defines an immutable array, e.g. `#[1, 2]`. Holes are disallowed in tuple expressions.

[proposal-record-tuple]: https://github.com/tc39/proposal-record-tuple
