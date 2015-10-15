# [Async Functions](https://github.com/lukehoban/ecmascript-asyncawait)

## Function

```js
extend interface Function {
    async: false;
}
```

## AwaitExpression

```js
interface AwaitExpression <: Expression {
    type: "AwaitExpression";
    argument: Expression | null;
}
```
