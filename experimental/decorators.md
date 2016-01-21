# [Decorators](https://github.com/wycats/javascript-decorators)

## Decorator

```js
interface Decorator <: Node {
    type: "Decorator";
    expression: Expression;
}
```

## Used

```js
extend interface MethodDefinition {
    decorators: [ Decorator ];
}

extend interface Property {
    decorators: [ Decorator ];
}

extend interface Class {
    decorators: [ Decorator ];
}
```
