# [Dynamic Import Expression](https://github.com/domenic/proposal-dynamic-import)

## Import

```js
interface Import <: Node {
    type: "Import";
}

interface CallExpression <: Expression {
  callee: Expression | Super | Import;
}
```
