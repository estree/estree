# [Decorators](https://github.com/wycats/javascript-decorators)

## Decorator

```ts
interface Decorator <: Node {
    type: "Decorator";
    expression: Expression;
}
```

## Used

```ts
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
