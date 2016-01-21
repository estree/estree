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
extend interface ObjectPattern {
    properties: [ AssignmentProperty | RestProperty ];
}

extend interface ObjectExpression {
    properties: [ Property | SpreadProperty ];
}
```
