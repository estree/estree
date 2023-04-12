# [Decorators for Class Method and Constructor Parameters][proposal-class-method-parameter-decorators]

## Decorator

```js
interface Decorator <: Node {
    type: "Decorator";
    expression: Expression;
}
```

## FunctionExpression

```js
extend interface FunctionExpression {
    params: [ Pattern | Parameter ];
}
```

If `params` contains a `Parameter` node, its parent must be a `MethodDefinition`.

## Parameter

```js
interface Parameter <: Node {
    type: "Parameter";
    parameter: Pattern;
    decorators: [ Decorator ];
}
```

[proposal-class-method-parameter-decorators]: https://github.com/tc39/proposal-class-method-parameter-decorators