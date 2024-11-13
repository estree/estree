# [JavaScript Structs: Fixed Layout Objects and Some Synchronization Primitives](proposal-structs)

# Declarations

## StructDeclaration
```js
interface StructDeclaration <: Class, Declaration {
    type: "StructDeclaration";
    id: Identifier;
    shared: boolean;
}
```

# Statements

## UnsafeBlockStatement

```js
interface UnsafeBlockStatement <: BlockStatement {
    type: "UnsafeBlockStatement";
}
```

# Modules

## Exports

### ExportDefaultDeclaration
```js
interface AnonymousDefaultExportedStructDeclaration <: Class {
    type: "StructDeclaration";
    id: null;
}

extend interface ExportDefaultDeclaration {
    declaration: AnonymousDefaultExportedFunctionDeclaration | FunctionDeclaration | AnonymousDefaultExportedClassDeclaration | ClassDeclaration | AnonymousDefaultExportedStructDeclaration | StructDeclaration | Expression
}
```

[proposal-structs]: https://github.com/tc39/proposal-structs