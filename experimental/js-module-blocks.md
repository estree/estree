# [JS Module Blocks][proposal-js-module-blocks]

## Expressions

### ModuleExpression

```js
interface ModuleExpression <: Expression {
    type: "ModuleExpression";
    body: Program;
}
```

[proposal-js-module-blocks]: https://github.com/tc39/proposal-js-module-blocks
