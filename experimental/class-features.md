
# Class Features

This experimental extension covers three class features proposals: 
[Class Fields], [Static Class Features] and [Private Methods].

## PropertyDefinition

```js
interface PropertyDefinition <: Node {
    type: "PropertyDefinition";
    key: Expression;
    value: Expression;
    computed: boolean;
    static: boolean;
}
```

## PrivatePropertyDefinition

```js
interface PrivatePropertyDefinition <: Node {
    type: "PrivatePropertyDefinition";
    key: PrivateName;
    value: Expression;
    static: boolean;
}
```

## PrivateMethodDefinition

```js
interface PrivateMethodDefinition <: Node {
    type: "PrivateMethodDefinition";
    key: PrivateName;
    value: FunctionExpression;
    kind: "method" | "get" | "set";
    static: boolean;
}
```

### PrivateName

```js
interface PrivateName <: Node {
    type: "PrivateName";
    id: Identifier;
}

extend interface MemberExpression {
    property: Expression | PrivateName
}
```

A private name refers to private class elements. For a private name `#a`, its `id.name` is `a`.

When the property of a member expression is a private name, its `computed` is always `false`.

[Class Fields]: https://github.com/tc39/proposal-class-fields
[Static Class Features]: https://github.com/tc39/proposal-static-class-features/
[Private Methods]: https://github.com/tc39/proposal-private-methods