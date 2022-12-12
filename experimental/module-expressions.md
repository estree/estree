# [Module Expressions][proposal-module-expressions]

## Module block

```js
interface ModuleBlock <: Node {
    type: "ModuleBlock";
    sourceType: "module";
    body: [ Directive | Statement | ImportOrExportDeclaration ];
}
```

## Expressions

### ModuleExpression

```js
interface ModuleExpression <: Expression {
    type: "ModuleExpression";
    body: ModuleBlock;
}
```

[proposal-module-expressions]: https://github.com/tc39/proposal-module-expressions
