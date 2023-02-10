# [JavaScript Module Declarations][proposal-module-declarations]

## Module block

```js
interface ModuleBlock <: Node {
    type: "ModuleBlock";
    sourceType: "module";
    body: [ Directive | Statement | ImportOrExportDeclaration ];
}
```

## Declarations

### ModuleDeclarations

```js
interface ModuleDeclaration <: Declaration {
    type: "ModuleDeclaration";
    id: Identifier;
    body: ModuleBlock;
}
```

The `sourceType` of the `body` must be `"module"`.

## Imports

### ImportDeclaration

```js
extend interface ImportDeclaration {
    source: Literal | Identifier;
}
```

## Exports

### ExportDefaultDeclaration

```js
interface AnonymousDefaultExportedModuleDeclaration <: ModuleDeclaration {
    type: "ModuleDeclaration";
    id: null;
}

extend interface ExportDefaultDeclaration {
    declaration: AnonymousDefaultExportedModuleDeclaration | ModuleDeclaration | AnonymousDefaultExportedFunctionDeclaration | FunctionDeclaration | AnonymousDefaultExportedClassDeclaration | ClassDeclaration | Expression;
}
```

### ExportAllDeclaration

```js
extend interface ExportAllDeclaration {
    source: Literal | Identifier;
}
```

### ExportNamedDeclaration

```js
extend interface ExportNamedDeclaration {
    source: Literal | Identifier | null;
}
```

[proposal-module-declarations]: https://github.com/tc39/proposal-module-declarations
