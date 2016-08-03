This document specifies the extensions to the core ESTree AST types to support the ES8/ES2017 grammar.

## Function

```js
extend interface Function {
    async: boolean;
}
```

## AwaitExpression

```js
interface AwaitExpression <: Expression {
    type: "AwaitExpression";
    argument: Expression;
}
```
