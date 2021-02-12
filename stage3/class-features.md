# Classes

These language extensions cover three class features proposals:
[Class Fields], [Static Class Features] and [Private Methods].

## ClassBody

```js
extend interface ClassBody {
    body: [ MethodDefinition | PropertyDefinition ];
}
```

## PropertyDefinition

```js
interface PropertyDefinition <: Node {
    type: "PropertyDefinition";
    key: Expression | PrivateIdentifier;
    value: Expression | null;
    computed: boolean;
    static: boolean;
}
```

- When `key` is a `PrivateIdentifier`, `computed` must be `false`.

## MethodDefinition

```js
extend interface MethodDefinition {
    key: Expression | PrivateIdentifier;
}
```

- When `key` is a `PrivateIdentifier`, `computed` must be `false` and `kind` can not be `"constructor"`.

### PrivateIdentifier

```js
interface PrivateIdentifier <: Node {
    type: "PrivateIdentifier";
    name: string;
}
```

A private identifier refers to private class elements. For a private name `#a`, its `name` is `a`.

```js
extend interface MemberExpression {
    property: Expression | PrivateIdentifier;
}
```

- When `property` is a `PrivateIdentifier`, `computed` must be `false`.
- When `object` is a `Super`, `property` can not be a `PrivateIdentifier`.

[Class Fields]: https://github.com/tc39/proposal-class-fields
[Static Class Features]: https://github.com/tc39/proposal-static-class-features/
[Private Methods]: https://github.com/tc39/proposal-private-methods
