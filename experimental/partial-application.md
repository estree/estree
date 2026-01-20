# [Partial Application](proposal-partial-application)

# Expressions

```js
interface PartialElement <: Node {
    partial: boolean;
    arguments: [ Expression | SpreadElement | ArgumentPlaceholder | RestPlaceholder ];
}

interface ArgumentPlaceholder <: Node {
    type: "ArgumentPlaceholder";
    ordinal: Literal | null;
}

interface RestPlaceholder <: Node {
    type: "RestPlaceholder";
}

extend interface CallExpression <: PartialElement {}

extend interface NewExpression <: PartialElement {}
```

When `partial` is `true`, the `callee` must not be a `Super` node.

When `partial` is `false`, the `arguments` must be `[ Expression | SpreadElement ]`.

[proposal-partial-application]: https://github.com/tc39/proposal-partial-application