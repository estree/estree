This document specifies the extensions to the core ESTree AST types to support the ES6 grammar.

# Functions

```js
extend interface Function {
    generator: boolean;
}
```

# Statements

## ForOfStatement

```js
interface ForOfStatement <: ForInStatement {
    type: "ForOfStatement";
}
```

# Declarations

## VariableDeclaration

```js
extend interface VariableDeclaration {
    kind: "var" | "let" | "const";
}
```

# Expressions

```js
extend interface AssignmentExpression {
    left: Pattern | Expression;
}

extend interface Property {
    key: Expression;
    method: boolean;
    shorthand: boolean;
    computed: boolean;
}
```

## ArrowFunctionExpression

**FIXME:** This describes the Esprima and Acorn behaviors, which is not currently aligned with the SpiderMonkey behavior. See [SpiderMonkey bug 913617](https://bugzilla.mozilla.org/show_bug.cgi?id=913617).

```js
interface ArrowFunctionExpression <: Function, Expression {
    type: "ArrowFunctionExpression";
    body: BlockStatement | Expression;
    expression: boolean;
}
```

A fat arrow function expression, e.g., `let foo = (bar) => { /* body */ }`.

## YieldExpression

```js
interface YieldExpression <: Expression {
    type: "YieldExpression";
    argument: Expression | null;
}
```

A `yield` expression.

# Template Literals

## TemplateLiteral

```js
interface TemplateLiteral <: Expression {
    type: "TemplateLiteral";
    quasis: [ TemplateElement ];
    expressions: [ Expression ];
}
```

## TaggedTemplateExpression

```js
interface TaggedTemplateExpression <: Expression {
    type: "TaggedTemplateExpression";
    tag: Expression;
    quasi: TemplateLiteral;
}
```

## TemplateElement

```js
interface TemplateElement <: Node {
    type: "TemplateElement";
    tail: boolean;
    value: {
        cooked: string;
        value: string;
    }
}
```

# Patterns

## ObjectPattern

```js
interface AssignmentProperty <: Property {
    type: "Property"; // inherited
    value: Pattern;
    kind: "init";
    method: false;
}

interface ObjectPattern <: Pattern {
    type: "ObjectPattern";
    properties: [ AssignmentProperty ];
}
```

## ArrayPattern

```js
interface ArrayPattern <: Pattern {
    type: "ArrayPattern";
    elements: [ Pattern | null ];
}
```

## RestElement

```js
interface RestElement <: Pattern {
    argument: Pattern;
}
```

## AssignmentPattern

```js
interface AssignmentPattern <: Pattern {
    left: Pattern;
    right: Expression;
}
```

# Classes

```js
interface Class <: Node {
    id: Identifier | null;
    superClass: Expression;
    body: ClassBody;
}
```

## ClassBody

```js
interface ClassBody <: Node {
    type: "ClassBody";
    body: [ MethodDefinition ];
}
```

## MethodDefinition

```js
interface MethodDefinition <: Node {
    type: "MethodDefinition";
    key: Identifier;
    value: FunctionExpression;
    kind: "constructor" | "method" | "get" | "set";
    computed: boolean;
    static: boolean;
}
```

## ClassDeclaration

```js
interface ClassDeclaration <: Class, Declaration {
    type: "ClassDeclaration";
    id: Identifier;
}
```

## ClassExpression

```js
interface ClassExpression <: Class, Expression {
    type: "ClassExpression";
}
```

# Modules

## ImportDeclaration

```js
interface ImportDeclaration <: Node {
    specifiers: [ ImportSpecifier ];
    source: Literal;
}
```

An import declaration, e.g., `import foo from "mod";`.

## ImportSpecifier

```js
interface ImportSpecifier {
    imported: Identifier;
    local: Identifier;
}
```

An imported variable binding, e.g., `{foo}` in `import {foo} from "mod"` or `{foo as bar}` in `import {foo as bar} from "mod"`. The `imported` field refers to the name of the export imported from the module. The `local` field refers to the binding imported into the local module scope. If it is a basic named import, such as in `import {foo} from "mod"`, both `imported` and `local` are equivalent `Identifier` nodes; in this case an `Identifier` node representing `foo`. If it is an aliased import, such as in `import {foo as bar} from "mod"`, the `imported` field is an `Identifier` node representing `foo`, and the `local` field is an `Identifier` node representing `bar`.

## ImportDefaultSpecifier

```js
interface ImportDefaultSpecifier {
    local: Identifier;
}
```

A default import specifier, e.g., `foo` in `import foo from "mod.js"`.

## ImportNamespaceSpecifier

```js
interface ImportNamespaceSpecifier {
    local: Identifier;
}
```

A namespace import specifier, e.g., `* as foo` in `import * as foo from "mod.js"`.

## ExportNamedDeclaration

```js
interface ExportNamedDeclaration <: Node {
    declaration: Declaration | null;
    specifiers: [ ExportSpecifier ];
    source: Literal | null;
}
```

An export named declaration, e.g., `export {foo, bar};`, `export {foo} from "mod";` or `export var foo = 1;`.

_Note: Having `declaration` populated with non-empty `specifiers` or non-null `source` results in an invalid state._

## ExportSpecifier

```js
interface ExportSpecifier {
    exported: Identifier;
    local: Identifier;
}
```

An exported variable binding, e.g., `{foo}` in `export {foo}` or `{bar as foo}` in `export {bar as foo}`. The `exported` field refers to the name exported in the module. The `local` field refers to the binding into the local module scope. If it is a basic named export, such as in `export {foo}`, both `exported` and `local` are equivalent `Identifier` nodes; in this case an `Identifier` node representing `foo`. If it is an aliased export, such as in `export {bar as foo}`, the `exported` field is an `Identifier` node representing `foo`, and the `local` field is an `Identifier` node representing `bar`.

## ExportDefaultDeclaration

```js
interface ExportDefaultDeclaration <: Node {
    declaration: Declaration | Expression;
}
```

An export default declaration, e.g., `export default function () {};` or `export default 1;`.

## ExportAllDeclaration

```js
interface ExportAllDeclaration <: Node {
    source: Literal;
}
```

An export batch declaration, e.g., `export * from "mod";`.
