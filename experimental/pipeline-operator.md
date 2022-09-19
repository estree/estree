# [Pipe Operator (`|>`) for JavaScript][proposal-pipeline-operator]

## Binary operations

### BinaryExpression

#### BinaryOperator

```js
extend enum BinaryOperator {
    "|>"
}
```

# Topic Reference

```js
interface TopicReference <: Expression {
    type: "TopicReference";
}
```

<details><summary>For Example:</summary>

```jsonc
// value |> foo(%)
{
  "type": "BinaryExpression",
  "operator": "|>",
  "left": { "type": "Identifier", "name": "value" },
  "right": {
    "type": "CallExpression",
    "callee": { "type": "Identifier", "name": "foo" },
    "arguments": [{ "type": "TopicReference" }]
  }
}
```

[proposal-pipeline-operator]: https://github.com/tc39/proposal-pipeline-operator