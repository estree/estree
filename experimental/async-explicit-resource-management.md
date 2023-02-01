# [Async Explicit Resource Management][proposal-async-explicit-resource-management]

# Declarations

## VariableDeclaration

```js
extend interface VariableDeclaration {
    kind: "usingAwait";
}
```

If `kind` is `"usingAwait"`, for every declarator `d` of `declarations`, `d.id` must be an Identifier. If the variable declaration is the `left` of a ForOfStatement, `d.init` must be `null`, otherwise `d.init` must be an Expression.

[proposal-async-explicit-resource-management]: https://github.com/tc39/proposal-async-explicit-resource-management