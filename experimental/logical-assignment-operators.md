# [Logical Assignment Operators][proposal-logical-assignment]

## Expressions

### AssignmentOperator

```js
extend enum AssignmentOperator {
    "||=" | "&&=" | "??="
}
```

- [AssignmentExpression] node has short-circuiting behavior if the `operator`
  property is any of `"||="`,`"&&="`, and `"??="`.

[proposal-logical-assignment]: https://github.com/tc39/proposal-logical-assignment
[AssignmentExpression]: ../es5.md#AssignmentExpression
