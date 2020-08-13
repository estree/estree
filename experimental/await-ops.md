# [Await.ops](https://github.com/tc39/proposal-await.ops)

## AwaitExpression

```js
interface AwaitExpression <: Expression {
    type: "AwaitExpression";
    argument: Expression;
    operation: Identifier | null
}
```

eg :

```js
async function fn() {
    await [];
    await.all [];
    await.race [];
    await.allSettled [];
}
```
