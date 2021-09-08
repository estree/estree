# [Grouped Accessors and Auto-Accessors][proposal-grouped-and-auto-accessors]

## ClassBody

```js
extend interface ClassBody {
    body: [ MethodDefinition | PropertyDefinition | StaticBlock | ClassAccessor ];
}
```

## ObjectExpression

```js
extend interface ObjectExpression {
    properties: [ Property | ObjectAccessor ];
}
```

## ClassAccessor

```js
interface ClassAccessor <: PropertyDefinition {
    type: "ClassAccessor";
    get: GetAccessorStub | GetAccessorMethod | null;
    set: SetAccessorStub | SetAccessorMethod | null;
}
```

If `set.private` is `true`, `key` must be an `Identifier` and `computed` must be `false`.

## ObjectAccessor

```js
interface ObjectAccessor <: Property {
    type: "ObjectAccessor";
    get: GetAccessorStub | GetAccessorMethod | null;
    set: SetAccessorStub | SetAccessorMethod | null;
}
```

### GetAccessorStub

```js
interface GetAccessorStub <: Node {
    type: "GetAccessorStub";
}
```

A get accessor stub is a simplified version of grouped accessor. E.g. `class C { accessor c { get; } }`.

### GetAccessorMethod

```js
interface GetAccessorMethod <: Node {
    type: "GetAccessorMethod";
    params: [];
    body: FunctionBody;
}
```

### SetAccessorStub

```js
interface SetAccessorStub <: Node {
    type: "SetAccessorStub";
    private: boolean;
}
```

A set accessor stub is a simplified version of grouped accessor. E.g. `class C { accessor c { set; } }`.

### SetAccessorMethod

```js
interface SetAccessorMethod <: Node {
    type: "SetAccessorMethod";
    private: boolean;
    params: [ Pattern ];
    body: FunctionBody;
}
```

The `params` of a `SetAccessorMethod` must include only one element, which must not be a `RestElement`.

[proposal-grouped-and-auto-accessors]: https://github.com/tc39/proposal-grouped-and-auto-accessors
