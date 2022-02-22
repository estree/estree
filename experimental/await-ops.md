# [Await.ops](https://github.com/tc39/proposal-await.ops)

## AwaitExpression

```ts
extend interface AwaitExpression {
    operation: Identifier | null // operation.name should be one of the following : 'all', 'race', 'allSettled' and 'any'
}
```

eg :

```ts
async function fn() {
    await [];
    await.all [];
    await.race [];
    await.allSettled [];
}
```
