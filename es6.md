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

## RestElement

```js
interface RestElement <: Pattern {
    argument: Pattern
}
```

## AssignmentPattern

```js
interface AssignmentPattern <: Pattern {
    left: Pattern,
    right: Expression
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
