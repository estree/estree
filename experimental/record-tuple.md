# [Record & Tuple][proposal-record-tuple]

## Expressions

### RecordExpression

```js
interface RecordExpression <: Expression {
    type: "RecordExpression";
    properties: [ RecordProperty | SpreadElement ];
}
```

A record expression defines an immutable object, e.g. `#{a: 1}`.

#### RecordProperty
```js
interface RecordProperty <: Node {
    type: "RecordProperty";
    key: Expression;
    value: Expression;
    shorthand: boolean;
    computed: boolean;
}
```

### TupleExpression
```js
interface TupleExpression <: Expression {
    type: "TupleExpression";
    elements: [ Expression | SpreadElement ];
}
```

A tuple expression defines an immutable array, e.g. `#[1, 2]`. Holes are disallowed in tuple expressions.

[proposal-record-tuple]: https://github.com/tc39/proposal-record-tuple
