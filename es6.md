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
interface ObjectPattern <: Pattern {
    type: "ObjectPattern";
    properties: [ { key: Literal | Identifier, value: Pattern } ];
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
