# [Rest/Spread Properties](https://github.com/sebmarkbage/ecmascript-rest-spread)

## RestProperty

```js
interface RestProperty <: Node {
    type: "RestProperty";
    argument: Expression;
}
```

## SpreadProperty

```js
interface SpreadProperty <: Node {
    type: "SpreadProperty";
    argument: Expression;
}
```

## Used

```js
extend interface ObjectPattern <: Pattern {
    type: "ObjectPattern";
    properties: [ AssignmentProperty | RestProperty ];
}

extend interface ObjectExpression <: Expression {
    type: "ObjectExpression";
    properties: [ Property | SpreadProperty ];
}
```
