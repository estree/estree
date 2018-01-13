[Public and private class instance fields](https://github.com/tc39/proposal-class-fields)

```js
interface PrivateName <: Node {
    type: "PrivateName";
    name: string;
}

interface FieldDefinition <: Node {
    type: "FieldDefinition";
    key: PrivateName | Expression;
    value: Expression | null;
    computed: boolean;
}
```

Private fields cannot have computed names.

```js
extend interface ClassBody {
    body: [ MethodDefinition | FieldDefinition ];
}

interface PrivateMemberExpression <: Expression, Pattern {
    type: "MemberExpression";
    object: Expression;
    property: PrivateName;
}
```
