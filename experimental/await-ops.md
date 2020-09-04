# [Await.ops](https://github.com/tc39/proposal-await.ops)

## AwaitExpression

```js
extend interface AwaitExpression {
    operation: Identifier | null // operation.name should be one of the following : 'all', 'race', 'allSettled' and 'any'
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
