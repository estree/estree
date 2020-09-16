# [class property access expressions][proposal-class-access-expressions]

## ClassObject

```js
interface ClassObject <: Node {
    type: "ClassObject";
}
```

A `class` pseudo-expression, e.g. `class.foo`.

## MemberExpression

```js
extend interface MemberExpression {
    object: Expression | Super | ClassObject;
}
```

When `object` is a `ClassObject`, `optional` must be `false`.

[proposal-class-access-expressions]: https://github.com/tc39/proposal-class-access-expressions
