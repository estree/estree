# [Optional catch bindings](https://github.com/tc39/proposal-optional-catch-binding)

#### CatchClause

```js
interface CatchClause <: Node {
    type: "CatchClause";
    param: Pattern | null;
    body: BlockStatement;
}
```
