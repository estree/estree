# [Decorators](https://github.com/tc39/proposal-decorators)

## Decorator

```js
interface Decorator <: Node {
    type: "Decorator";
    expression: Expression;
}
```

## AccessorProperty
```js
interface AccessorProperty <: Node {
    type: "AccessorProperty";
    key: Expression | PrivateIdentifier;
    value: Expression | null;
    computed: boolean;
    static: boolean;
    decorators: [ Decorator ];
}
```

## Class
```js
extend interface Class {
    decorators: [ Decorator ];
}
```

## ClassBody

```js
extend interface ClassBody {
    body: [ MethodDefinition | PropertyDefinition | StaticBlock | AccessorProperty ];
}
```

## MethodDefinition
```js
extend interface MethodDefinition {
    decorators: [ Decorator ];
}
```

## PropertyDefinition

```js
extend interface PropertyDefinition {
    decorators: [ Decorator ];
}
```
