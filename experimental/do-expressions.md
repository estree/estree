# [Do expressions][proposal-do-expressions]

## Expressions

### DoExpression

```js
interface DoExpression <: Expression {
    type: "DoExpression";
    body: BlockStatement;
}
```

[proposal-do-expressions]: https://github.com/tc39/proposal-do-expressions
