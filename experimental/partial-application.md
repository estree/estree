# [Partial Application](proposal-partial-application)

# Expressions

```js
interface ArgumentPlaceholder <: Node {
    type: "ArgumentPlaceholder";
    ordinal: Literal | null;
}

interface RestPlaceholder <: Node {
    type: "RestPlaceholder";
}
```

## PartialCallExpression

```js
interface PartialCallExpression <: ChainElement {
    type: "PartialCallExpression";
    callee: Expression;
    arguments: [ Expression | SpreadElement | ArgumentPlaceholder | RestPlaceholder ];
}
```

## PartialNewExpression

```js
interface PartialNewExpression <: Node {
    type: "PartialNewExpression";
    callee: Expression;
    arguments: [ Expression | SpreadElement | ArgumentPlaceholder | RestPlaceholder ];
}
```

[proposal-partial-application]: https://github.com/tc39/proposal-partial-application