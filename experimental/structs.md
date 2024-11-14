# [JavaScript Structs: Fixed Layout Objects and Some Synchronization Primitives](proposal-structs)

# Structs

```js
interface Struct <: Node {
    shared: boolean;
    id: Identifier | null;
    superClass: Expression | null;
    body: StructBody;
}
```

## StructDeclaration
```js
interface StructDeclaration <: Struct, Declaration {
    type: "StructDeclaration";
    id: Identifier;
}
```

## StructBody

```js
interface StructBody <: Node {
    type: "StructBody";
    body: [ MethodDefinition | PropertyDefinition | StaticBlock ]
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
interface AnonymousDefaultExportedStructDeclaration <: Struct {
    type: "StructDeclaration";
    id: null;
}

extend interface ExportDefaultDeclaration {
    declaration: AnonymousDefaultExportedFunctionDeclaration | FunctionDeclaration | AnonymousDefaultExportedClassDeclaration | ClassDeclaration | AnonymousDefaultExportedStructDeclaration | StructDeclaration | Expression
}
```

[proposal-structs]: https://github.com/tc39/proposal-structs