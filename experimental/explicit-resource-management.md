# [Explicit Resource Management][proposal-explicit-resource-management]

# Declarations

## VariableDeclaration

```js
extend interface VariableDeclaration {
    kind: "using";
}
```

If `kind` is `"using"`, for every declarator `d` of `declarations`, `d.id` must be an Identifier. If the variable declaration is the `left` of a ForInStatement / ForOfStatement, `d.init` must be `null`, otherwise `d.init` must be an Expression.

[proposal-explicit-resource-management]: https://github.com/tc39/proposal-explicit-resource-management