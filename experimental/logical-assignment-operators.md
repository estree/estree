# [Logical Assignment Operators][proposal-logical-assignment]

## Expressions

### LogicalAssignmentExpression

```js
interface LogicalAssignmentExpression <: Expression {
    type: "LogicalAssignmentExpression";
    operator: LogicalAssignmentOperator;
    left: Identifier | MemberExpression;
    right: Expression;
}
```

- The relationship of `AssignmentExpression` and `LogicalAssignmentExpression`
  is similar to the relationship of `BinaryExpression` and `LogicalExpression`.
  The `LogicalAssignmentExpression` node has short-circuit behavior -- it skips
  the evaluation of the `right` property by the evaluated value of the `left`
  property.

### LogicalAssignmentOperator

```js
enum LogicalAssignmentOperator {
    "||=" | "&&=" | "??="
}
```

[proposal-logical-assignment]: https://github.com/tc39/proposal-logical-assignment
