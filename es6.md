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
interface ForOfStatement <: Statement {
    type: "ForOfStatement";
    left: VariableDeclaration |  Expression;
    right: Expression;
    body: Statement;
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
    params: [ Pattern ];
    defaults: [ Expression ];
    rest: Identifier | null;
    body: BlockStatement | Expression;
    generator: boolean;
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
interface PatternProperty <: Property {
    type: "Property"; // inherited
    value: Pattern;
    kind: "init";
    method: false;
}

interface ObjectPattern <: Pattern {
    type: "ObjectPattern";
    properties: [ PatternProperty ];
}
```

## ArrayPattern

```js
interface ArrayPattern <: Pattern {
    type: "ArrayPattern";
    elements: [ Pattern | null ];
}
```
