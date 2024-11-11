# [`void` Discard Bindings for ECMAScript](proposal-discard-binding)

# Patterns
```js
interface Void <: Pattern {
    type: "Void";
}
```

- The `left` of an `AssignmentPattern` must not be `Void`
- The `argument` of a `RestElement` must not be `Void`
- If the `id` of a `VariableDeclarator` is `Void`, the kind of the encompassing `VariableDeclaration` must be either `using` or `await using` defined in the [Explicit Resource Managemenr Proposal].

[Explicit Resource Managemenr Proposal]: ../stage3/explicit-resource-management.md
[proposal-discard-biding]: https://github.com/tc39/proposal-discard-binding