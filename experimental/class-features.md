
# Class Features

This experimental extension covers three class features proposals: 
[Class Fields], [Static Class Features] and [Private Methods].

## ClassBody

```js
extend interface ClassBody <: Node {
    body: [ MethodDefinition | PropertyDefinition ];
}
```

## PropertyDefinition

```js
interface PropertyDefinition <: Node {
    type: "PropertyDefinition";
    key: Expression | PrivateName;
    value: Expression | null;
    computed: boolean;
    static: boolean;
    private: boolean;
}
```

- When `private` is `true`, `computed` must be `false` and `key` must be a `PrivateName`.
- When `private` is `false`, `key` must be an `Expression` and can not be a `PrivateName`.

## MethodDefinition

```js
extend interface MethodDefinition <: Node {
    key: Expression | PrivateName;
    static: boolean;
    private: boolean;
}
```

- When `private` is `true`, `computed` must be `false`, `key` must be a `PrivateName`, `kind` can not be `constructor`.
- When `private` is `false`, `key` must be an `Expression` and can not be a `PrivateName`.

### PrivateName

```js
interface PrivateName <: Node {
    type: "PrivateName";
    name: string;
}
```

```js
extend interface MemberExpression <: ChainElement {
    private: boolean;
    property: Expression | PrivateName;
}
```

A private name refers to private class elements. For a private name `#a`, its `name` is `a`.

- When `private` is `true`, `property` must be a `PrivateName`, `computed` must be `false`.
- When `object` is a `Super`, `private` must be `false`.

[Class Fields]: https://github.com/tc39/proposal-class-fields
[Static Class Features]: https://github.com/tc39/proposal-static-class-features/
[Private Methods]: https://github.com/tc39/proposal-private-methods