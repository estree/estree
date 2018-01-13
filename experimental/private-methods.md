[Private class instance methods, getters and setters](https://github.com/tc39/proposal-private-methods)

```js
interface PrivateName <: Node {
    type: "PrivateName";
    name: string;
}

extend interface MethodDefinition {
    key: Expression | PrivateName;
}
```

Private methods cannot be static or have computed names.

```js
interface PrivateMemberExpression <: Expression, Pattern {
    type: "MemberExpression";
    object: Expression;
    property: PrivateName;
}
```
