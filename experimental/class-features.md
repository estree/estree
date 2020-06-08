
# Class Features

This experimental extension covers three class features proposals: 
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
    private: boolean;
}
```

- When `private` is `true`, `computed` must be `false` and `key` must be a `PrivateIdentifier`.
- When `private` is `false`, `key` must be an `Expression` and can not be a `PrivateIdentifier`.

## MethodDefinition

```js
extend interface MethodDefinition {
    key: Expression | PrivateIdentifier;
    private: boolean;
}
```

- When `private` is `true`, `computed` must be `false`, `key` must be a `PrivateIdentifier`, `kind` can not be `"constructor"`.
- When `private` is `false`, `key` must be an `Expression` and can not be a `PrivateIdentifier`.

### PrivateIdentifier

```js
interface PrivateIdentifier <: Node {
    type: "PrivateIdentifier";
    name: string;
}
```

A private name refers to private class elements. For a private name `#a`, its `name` is `a`.

```js
extend interface MemberExpression {
    private: boolean;
    property: Expression | PrivateIdentifier;
}
```

- When `private` is `true`, `property` must be a `PrivateIdentifier`, `computed` must be `false`.
- When `private` is `false`, `property` must be an `Expression` and can not be a `PrivateIdentifier`.
- When `object` is a `Super`, `private` must be `false`.

[Class Fields]: https://github.com/tc39/proposal-class-fields
[Static Class Features]: https://github.com/tc39/proposal-static-class-features/
[Private Methods]: https://github.com/tc39/proposal-private-methods
