This document specifies the extensions to the core ESTree AST types to support the ES6 grammar.

# Functions

```js
extend interface Function {
    defaults: [ Expression ];
    rest: Identifier | null;
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

## ArrowExpression

**FIXME:** This describes the SpiderMonkey behavior, which is not currently aligned with the Esprima and Acorn behaviors. See [SpiderMonkey bug 913617](https://bugzilla.mozilla.org/show_bug.cgi?id=913617).

```js
interface ArrowExpression <: Function, Expression {
    type: "ArrowExpression";
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
    kind: "" | "get" | "set";
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

**FIXME:** Esprima's behavior differs from Acorn's and SpiderMonkey's behavior in that `source` is of type `ModuleSpecifier`, but is otherwise a `Literal`.

```js
interface ImportDeclaration <: Declaration {
    specifiers: [ ImportSpecifier ];
    source: Literal; // Or ModuleSpecifier? (Esprima deviation)
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

An imported variable binding, e.g., `{foo}` in `import {foo} from "mod"` or `{foo as bar}` in `import {foo as bar} from "mod"`. The `imported` field represents the imported name from the module. The `local` field represents the bindings imported into the module's global scope. If it is a basic named import, such as in `import {foo} from "mod"`, both `imported` and `local` are equivalent `Identifier` nodes; in this case an `Identifier` node representing `foo`. If it is an aliased import, such as in `import {foo as bar} from "mod"`, the `imported` field is an `Identifier` node representing `foo`, and the `local` field is an `Identifier` node representing `bar`.

## ImportDefaultSpecifier

```js
interface ImportDefaultSpecifier {
    imported: null;
    local: Identifier;
}
```

A default import specifier, e.g., `foo` in `import foo from "mod.js"`.

## ImportNamespaceSpecifier

```js
interface ImportNamespaceSpecifier {
    imported: null;
    local: Identifier;
}
```

A namespace import specifier, e.g., `* as foo` in `import * as foo from "mod.js"`.
