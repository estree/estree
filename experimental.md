This document specifies extensions to the core ESTree AST types to support ES proposals that are at least [stage 0 or above](https://github.com/tc39/ecma262).

**NOTE:** This document may change at anytime and **should not** be seen as stable.

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
    all: boolean;
}
```
