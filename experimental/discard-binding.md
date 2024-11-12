# [`void` Discard Bindings for ECMAScript](proposal-discard-binding)

# Patterns
```js
interface VoidPattern <: Pattern {
    type: "VoidPattern";
}
```

- The `left` of an `AssignmentPattern` must not be `VoidPattern`
- The `argument` of a `RestElement` must not be `VoidPattern`
- If the `id` of a `VariableDeclarator` is `VoidPattern`, the `kind` of the encompassing `VariableDeclaration` must be either `using` or `await using` defined in the [Explicit Resource Management Proposal].

[Explicit Resource Management Proposal]: ../stage3/explicit-resource-management.md
[proposal-discard-biding]: https://github.com/tc39/proposal-discard-binding