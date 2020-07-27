<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
This document specifies the core ESTree AST node types that support the ES5 grammar.

- [Node objects](#node-objects)
- [Identifier](#identifier)
- [Literal](#literal)
  - [RegExpLiteral](#regexpliteral)
- [Programs](#programs)
- [Functions](#functions)
- [Statements](#statements)
  - [ExpressionStatement](#expressionstatement)
  - [BlockStatement](#blockstatement)
  - [EmptyStatement](#emptystatement)
  - [DebuggerStatement](#debuggerstatement)
  - [WithStatement](#withstatement)
  - [Control flow](#control-flow)
    - [ReturnStatement](#returnstatement)
    - [LabeledStatement](#labeledstatement)
    - [BreakStatement](#breakstatement)
    - [ContinueStatement](#continuestatement)
  - [Choice](#choice)
    - [IfStatement](#ifstatement)
    - [SwitchStatement](#switchstatement)
      - [SwitchCase](#switchcase)
  - [Exceptions](#exceptions)
    - [ThrowStatement](#throwstatement)
    - [TryStatement](#trystatement)
      - [CatchClause](#catchclause)
  - [Loops](#loops)
    - [WhileStatement](#whilestatement)
    - [DoWhileStatement](#dowhilestatement)
    - [ForStatement](#forstatement)
    - [ForInStatement](#forinstatement)
- [Declarations](#declarations)
  - [FunctionDeclaration](#functiondeclaration)
  - [VariableDeclaration](#variabledeclaration)
    - [VariableDeclarator](#variabledeclarator)
- [Expressions](#expressions)
  - [ThisExpression](#thisexpression)
  - [ArrayExpression](#arrayexpression)
  - [ObjectExpression](#objectexpression)
    - [Property](#property)
  - [FunctionExpression](#functionexpression)
  - [Unary operations](#unary-operations)
    - [UnaryExpression](#unaryexpression)
      - [UnaryOperator](#unaryoperator)
    - [UpdateExpression](#updateexpression)
      - [UpdateOperator](#updateoperator)
  - [Binary operations](#binary-operations)
    - [BinaryExpression](#binaryexpression)
      - [BinaryOperator](#binaryoperator)
    - [AssignmentExpression](#assignmentexpression)
      - [AssignmentOperator](#assignmentoperator)
    - [LogicalExpression](#logicalexpression)
      - [LogicalOperator](#logicaloperator)
    - [MemberExpression](#memberexpression)
  - [ConditionalExpression](#conditionalexpression)
  - [CallExpression](#callexpression)
  - [NewExpression](#newexpression)
  - [SequenceExpression](#sequenceexpression)
- [Patterns](#patterns)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Node objects

ESTree AST nodes are represented as `Node` objects, which may have any prototype inheritance but which implement the following interface:

```js
interface Node {
    type: string;
    loc: SourceLocation | null;
}
```

The `type` field is a string representing the AST variant type. Each subtype of `Node` is documented below with the specific string of its `type` field. You can use this field to determine which interface a node implements.

The `loc` field represents the source location information of the node. If the node contains no information about the source location, the field is `null`; otherwise it is an object consisting of a start position (the position of the first character of the parsed source region) and an end position (the position of the first character after the parsed source region):

```js
interface SourceLocation {
    source: string | null;
    start: Position;
    end: Position;
}
```

Each `Position` object consists of a `line` number (1-indexed) and a `column` number (0-indexed):

```js
interface Position {
    line: number; // >= 1
    column: number; // >= 0
}
```

# Identifier

```js
interface Identifier <: Expression, Pattern {
    type: "Identifier";
    name: string;
}
```

An identifier. Note that an identifier may be an expression or a destructuring pattern.

# Literal

```js
interface Literal <: Expression {
    type: "Literal";
    value: string | boolean | null | number | RegExp | bigint;
}
```

A literal token. Note that a literal can be an expression. The `value` property
can be a `BigInt` value to represent `BigInt` literals such as `100n`.


## RegExpLiteral

```js
interface RegExpLiteral <: Literal {
  regex: {
    pattern: string;
    flags: string;
  };
}
```

The `regex` property allows regexes to be represented in environments that don’t
support certain flags such as `y` or `u`. In environments that don't support
these flags `value` will be `null` as the regex can't be represented natively.

## BigIntLiteral

```js
interface BigIntLiteral <: Literal {
  bigint: string;
}
```

- `bigint` property is the string representation of the `BigInt` value.
  It doesn't include the suffix `n`.
- In environments that don't support `BigInt` values, `value` property will be
  `null` as the `BigInt` value can't be represented natively.

# Programs

```js
interface Program <: Node {
    type: "Program";
    sourceType: "script" | "module";
    body: [ Statement | ModuleDeclaration ];
}
```

A complete program source tree. Parsers must specify `sourceType` as `"module"` if the source has been parsed as an ES6 module. Otherwise, `sourceType` must be `"script"`.


# Functions

```js
interface Function <: Node {
    async: boolean;
    generator: boolean;
    id: Identifier | null;
    params: [ Pattern ];
    body: FunctionBody;
}
```

A function [declaration](#functiondeclaration) or [expression](#functionexpression).

# Statements

```js
interface Statement <: Node { }
```

Any statement.

## ExpressionStatement

```js
interface ExpressionStatement <: Statement {
    type: "ExpressionStatement";
    expression: Expression;
}
```

An expression statement, i.e., a statement consisting of a single expression.

## Directive

```js
interface Directive <: Node {
    type: "ExpressionStatement";
    expression: Literal;
    directive: string;
}
```

A directive from the directive prologue of a script or function.
The `directive` property is the raw string source of the directive without quotes.

## BlockStatement

```js
interface BlockStatement <: Statement {
    type: "BlockStatement";
    body: [ Statement ];
}
```

A block statement, i.e., a sequence of statements surrounded by braces.

## FunctionBody

```js
interface FunctionBody <: BlockStatement {
    body: [ Directive | Statement ];
}
```

The body of a function, which is a block statement that may begin with directives.

## EmptyStatement

```js
interface EmptyStatement <: Statement {
    type: "EmptyStatement";
}
```

An empty statement, i.e., a solitary semicolon.

## DebuggerStatement

```js
interface DebuggerStatement <: Statement {
    type: "DebuggerStatement";
}
```

A `debugger` statement.

## WithStatement

```js
interface WithStatement <: Statement {
    type: "WithStatement";
    object: Expression;
    body: Statement;
}
```

A `with` statement.

## Control flow

### ReturnStatement

```js
interface ReturnStatement <: Statement {
    type: "ReturnStatement";
    argument: Expression | null;
}
```

A `return` statement.

### LabeledStatement

```js
interface LabeledStatement <: Statement {
    type: "LabeledStatement";
    label: Identifier;
    body: Statement;
}
```

A labeled statement, i.e., a statement prefixed by a `break`/`continue` label.

### BreakStatement

```js
interface BreakStatement <: Statement {
    type: "BreakStatement";
    label: Identifier | null;
}
```

A `break` statement.

### ContinueStatement

```js
interface ContinueStatement <: Statement {
    type: "ContinueStatement";
    label: Identifier | null;
}
```

A `continue` statement.

## Choice

### IfStatement

```js
interface IfStatement <: Statement {
    type: "IfStatement";
    test: Expression;
    consequent: Statement;
    alternate: Statement | null;
}
```

An `if` statement.

### SwitchStatement

```js
interface SwitchStatement <: Statement {
    type: "SwitchStatement";
    discriminant: Expression;
    cases: [ SwitchCase ];
}
```

A `switch` statement.

#### SwitchCase

```js
interface SwitchCase <: Node {
    type: "SwitchCase";
    test: Expression | null;
    consequent: [ Statement ];
}
```

A `case` (if `test` is an `Expression`) or `default` (if `test === null`) clause in the body of a `switch` statement.

## Exceptions

### ThrowStatement

```js
interface ThrowStatement <: Statement {
    type: "ThrowStatement";
    argument: Expression;
}
```

A `throw` statement.

### TryStatement

```js
interface TryStatement <: Statement {
    type: "TryStatement";
    block: BlockStatement;
    handler: CatchClause | null;
    finalizer: BlockStatement | null;
}
```

A `try` statement. If `handler` is `null` then `finalizer` must be a `BlockStatement`.

#### CatchClause

```js
interface CatchClause <: Node {
    type: "CatchClause";
    param: Pattern | null;
    body: BlockStatement;
}
```

A `catch` clause following a `try` block. The `param` is `null` if the `catch`
binding is omitted. E.g., `try { foo() } catch { bar() }`


## Loops

### WhileStatement

```js
interface WhileStatement <: Statement {
    type: "WhileStatement";
    test: Expression;
    body: Statement;
}
```

A `while` statement.

### DoWhileStatement

```js
interface DoWhileStatement <: Statement {
    type: "DoWhileStatement";
    body: Statement;
    test: Expression;
}
```

A `do`/`while` statement.

### ForStatement

```js
interface ForStatement <: Statement {
    type: "ForStatement";
    init: VariableDeclaration | Expression | null;
    test: Expression | null;
    update: Expression | null;
    body: Statement;
}
```

A `for` statement.

### ForInStatement

```js
interface ForInStatement <: Statement {
    type: "ForInStatement";
    left: VariableDeclaration |  Pattern;
    right: Expression;
    body: Statement;
}
```

A `for`/`in` statement.

### ForOfStatement

```js
interface ForOfStatement <: ForInStatement {
    type: "ForOfStatement";
    await: boolean;
}
```

A `for`/`of` statement. `await` is true in `for-await-of` statements, e.g.,
`for await (const x of xs) {`.


# Declarations

```js
interface Declaration <: Statement { }
```

Any declaration node. Note that declarations are considered statements; this is because declarations can appear in any statement context.

## FunctionDeclaration

```js
interface FunctionDeclaration <: Function, Declaration {
    type: "FunctionDeclaration";
    id: Identifier;
}
```

A function declaration. Note that unlike in the parent interface `Function`, the `id` cannot be `null`.

## VariableDeclaration

```js
interface VariableDeclaration <: Declaration {
    type: "VariableDeclaration";
    declarations: [ VariableDeclarator ];
    kind: "var" | "let" | "const";
}
```

A variable declaration.

### VariableDeclarator

```js
interface VariableDeclarator <: Node {
    type: "VariableDeclarator";
    id: Pattern;
    init: Expression | null;
}
```

A variable declarator.

# Expressions

```js
interface Expression <: Node { }
```

Any expression node. Since the left-hand side of an assignment may be any expression in general, an expression can also be a pattern.

## ChainExpression

```js
interface ChainExpression <: Expression {
  type: "ChainExpression"
  expression: ChainElement
}
interface ChainElement <: Node {
  optional: boolean
}
extend interface CallExpression <: ChainElement {}
extend interface MemberExpression <: ChainElement {}
```

- The `ChainExpression` node is the root of optional chaining.
- The `ChainExpression` node contains one or more `ChainElement` nodes that are `optional:true`. On the other hand, `ChainElement` nodes that are `optional:true` belong to a `ChainExpression` node.
- For backward compatibility, if all `ChainElement` nodes of a chain are `optional:false`, the `ChainExpression` node isn't inserted as the root of the chain.
- Evaluation:
  - The `ChainExpression` node is evaluated to the result of the `expression` property's node.
  - If the `callee|object` property is evaluated to nullish and the `optional` property is `true`, then the node and ancestor nodes are skipped until the closest `ChainExpression` node, and the result of the `ChainExpression` node becomes `undefined`.

<details><summary>For Examples:</summary>

```jsonc
// obj.aaa.bbb
{
  "type": "MemberExpression",
  "optional": false,
  "object": {
    "type": "MemberExpression",
    "optional": false,
    "object": { "type": "Identifier", "name": "obj" },
    "property": { "type": "Identifier", "name": "aaa" }
  },
  "property": { "type": "Identifier", "name": "bbb" }
}
```

```jsonc
// obj.aaa?.bbb
{
  "type": "ChainExpression",
  "expression": {
    "type": "MemberExpression",
    "optional": true,
    "object": {
      "type": "MemberExpression",
      "optional": false,
      "object": { "type": "Identifier", "name": "obj" },
      "property": { "type": "Identifier", "name": "aaa" }
    },
    "property": { "type": "Identifier", "name": "bbb" }
  }
}
```

```jsonc
// obj?.aaa.bbb
{
  "type": "ChainExpression",
  "expression": {
    "type": "MemberExpression",
    "optional": false,
    "object": {
      "type": "MemberExpression",
      "optional": true,
      "object": { "type": "Identifier", "name": "obj" },
      "property": { "type": "Identifier", "name": "aaa" }
    },
    "property": { "type": "Identifier", "name": "bbb" }
  }
}
```

```jsonc
// obj?.aaa?.bbb
{
  "type": "ChainExpression",
  "expression": {
    "type": "MemberExpression",
    "optional": true,
    "object": {
      "type": "MemberExpression",
      "optional": true,
      "object": { "type": "Identifier", "name": "obj" },
      "property": { "type": "Identifier", "name": "aaa" }
    },
    "property": { "type": "Identifier", "name": "bbb" }
  }
}
```

```jsonc
// (obj.aaa).bbb
{
  "type": "MemberExpression",
  "optional": false,
  "object": {
    "type": "MemberExpression",
    "optional": false,
    "object": { "type": "Identifier", "name": "obj" },
    "property": { "type": "Identifier", "name": "aaa" }
  },
  "property": { "type": "Identifier", "name": "bbb" }
}
```

```jsonc
// (obj.aaa)?.bbb
{
  "type": "ChainExpression",
  "expression": {
    "type": "MemberExpression",
    "optional": true,
    "object": {
      "type": "MemberExpression",
      "optional": false,
      "object": { "type": "Identifier", "name": "obj" },
      "property": { "type": "Identifier", "name": "aaa" }
    },
    "property": { "type": "Identifier", "name": "bbb" }
  }
}
```

```jsonc
// (obj?.aaa).bbb
{
  "type": "MemberExpression",
  "optional": false,
  "object": {
    "type": "ChainExpression",
    "expression": {
      "type": "MemberExpression",
      "optional": true,
      "object": { "type": "Identifier", "name": "obj" },
      "property": { "type": "Identifier", "name": "aaa" }
    }
  },
  "property": { "type": "Identifier", "name": "bbb" }
}
```

```jsonc
// (obj?.aaa)?.bbb
{
  "type": "ChainExpression",
  "expression": {
    "type": "MemberExpression",
    "optional": true,
    "object": {
      "type": "ChainExpression",
      "expression": {
        "type": "MemberExpression",
        "optional": true,
        "object": { "type": "Identifier", "name": "obj" },
        "property": { "type": "Identifier", "name": "aaa" }
      }
    },
    "property": { "type": "Identifier", "name": "bbb" }
  }
}
```

</details>


## ThisExpression

```js
interface ThisExpression <: Expression {
    type: "ThisExpression";
}
```

A `this` expression.

## Super

```js
interface Super <: Node {
    type: "Super";
}
```
A `super` pseudo-expression.

## ImportExpression

```js
interface ImportExpression <: Expression {
  type: "ImportExpression";
  source: Expression;
}
```

- `ImportExpression` node represents Dynamic Imports such as `import(source)`.
  The `source` property is the importing source as in the
  [ImportDeclaration](#importdeclaration) node, but it can be an arbitrary
  expression node.

## SpreadElement

```js
interface SpreadElement <: Node {
    type: "SpreadElement";
    argument: Expression;
}
```

Spread expression, e.g., `[head, ...iter, tail]`, `f(head, ...iter, ...tail)`.

## ArrayExpression

```js
interface ArrayExpression <: Expression {
    type: "ArrayExpression";
    elements: [ Expression | SpreadElement | null ];
}
```

An array expression. An element might be `null` if it represents a hole in a sparse array. E.g. `[1,,2]`.

## ObjectExpression

```js
interface ObjectExpression <: Expression {
    type: "ObjectExpression";
    properties: [ Property | SpreadElement ];
}
```

An object expression.

### Property

```js
interface Property <: Node {
    type: "Property";
    key: Expression;
    value: Expression;
    kind: "init" | "get" | "set";
    method: boolean;
    shorthand: boolean;
    computed: boolean;
}
```

A literal property in an object expression can have either a string or number as its `value`. Ordinary property initializers have a `kind` value `"init"`; getters and setters have the kind values `"get"` and `"set"`, respectively.

## FunctionExpression

```js
interface FunctionExpression <: Function, Expression {
    type: "FunctionExpression";
}
```

A `function` expression.

## ArrowFunctionExpression

```js
interface ArrowFunctionExpression <: Function, Expression {
    type: "ArrowFunctionExpression";
    body: FunctionBody | Expression;
    expression: boolean;
}
```

A fat arrow function expression, e.g., `let foo = (bar) => { /* body */ }`.

## Unary operations

### UnaryExpression

```js
interface UnaryExpression <: Expression {
    type: "UnaryExpression";
    operator: UnaryOperator;
    prefix: boolean;
    argument: Expression;
}
```

A unary operator expression.

#### UnaryOperator

```js
enum UnaryOperator {
    "-" | "+" | "!" | "~" | "typeof" | "void" | "delete"
}
```

A unary operator token.

### UpdateExpression

```js
interface UpdateExpression <: Expression {
    type: "UpdateExpression";
    operator: UpdateOperator;
    argument: Expression;
    prefix: boolean;
}
```

An update (increment or decrement) operator expression.

#### UpdateOperator

```js
enum UpdateOperator {
    "++" | "--"
}
```

An update (increment or decrement) operator token.

## Binary operations

### BinaryExpression

```js
interface BinaryExpression <: Expression {
    type: "BinaryExpression";
    operator: BinaryOperator;
    left: Expression;
    right: Expression;
}
```

A binary operator expression.

#### BinaryOperator

```js
enum BinaryOperator {
    "==" | "!=" | "===" | "!=="
         | "<" | "<=" | ">" | ">="
         | "<<" | ">>" | ">>>"
         | "+" | "-" | "*" | "/" | "%" | "**"
         | "|" | "^" | "&" | "in"
         | "instanceof"
}
```

A binary operator token.

### AssignmentExpression

```js
interface AssignmentExpression <: Expression {
    type: "AssignmentExpression";
    operator: AssignmentOperator;
    left: Pattern;
    right: Expression;
}
```

An assignment operator expression.

Note that pre-ES6 code was allowed [to pass references around](https://github.com/estree/estree/pull/20#issuecomment-74584758) and so `left` was much more liberal; an implementation might choose to continue using [old definition](https://github.com/estree/estree/blob/master/es5.md#assignmentexpression) if it needs to support such legacy code.

#### AssignmentOperator

```js
enum AssignmentOperator {
    "=" | "+=" | "-=" | "*=" | "/=" | "%=" | "**="
        | "<<=" | ">>=" | ">>>="
        | "|=" | "^=" | "&="
}
```

An assignment operator token.

### LogicalExpression

```js
interface LogicalExpression <: Expression {
    type: "LogicalExpression";
    operator: LogicalOperator;
    left: Expression;
    right: Expression;
}
```

A logical operator expression.

#### LogicalOperator

```js
enum LogicalOperator {
    "||" | "&&" | "??"
}
```

A logical operator token. The `operator` property of the `LogicalExpression` node can be `"??"` to represent [Nullish Coalescing] syntax.

[Nullish Coalescing]: https://github.com/tc39/proposal-nullish-coalescing

### MemberExpression

```js
interface MemberExpression <: Expression, Pattern {
    type: "MemberExpression";
    object: Expression | Super;
    property: Expression;
    computed: boolean;
}
```

A member expression. If `computed` is `true`, the node corresponds to a computed (`a[b]`) member expression and `property` is an `Expression`. If `computed` is `false`, the node corresponds to a static (`a.b`) member expression and `property` is an `Identifier`.

## ConditionalExpression

```js
interface ConditionalExpression <: Expression {
    type: "ConditionalExpression";
    test: Expression;
    alternate: Expression;
    consequent: Expression;
}
```

A conditional expression, i.e., a ternary `?`/`:` expression.

## CallExpression

```js
interface CallExpression <: Expression {
    type: "CallExpression";
    callee: Expression | Super;
    arguments: [ Expression | SpreadElement ];
}
```

A function or method call expression.

## NewExpression

```js
interface NewExpression <: Expression {
    type: "NewExpression";
    callee: Expression;
    arguments: [ Expression | SpreadElement ];
}
```

A `new` expression.

## SequenceExpression

```js
interface SequenceExpression <: Expression {
    type: "SequenceExpression";
    expressions: [ Expression ];
}
```

A sequence expression, i.e., a comma-separated sequence of expressions.


## YieldExpression

```js
interface YieldExpression <: Expression {
    type: "YieldExpression";
    argument: Expression | null;
    delegate: boolean;
}
```

A `yield` expression.

## AwaitExpression

```js
interface AwaitExpression <: Expression {
    type: "AwaitExpression";
    argument: Expression;
}
```

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
        cooked: string | null;
        raw: string;
    };
}
```

If the template literal is tagged and the text has an invalid escape, `cooked` will be `null`, e.g., ``tag`\unicode and \u{55}` ``

# Patterns

Destructuring binding and assignment are not part of ES5, but all binding positions accept `Pattern` to allow for destructuring in ES6. Nevertheless, for ES5, the only `Pattern` subtype is [`Identifier`](#identifier).

```js
interface Pattern <: Node { }
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
    properties: [ AssignmentProperty | RestElement ];
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
    type: "RestElement";
    argument: Pattern;
}
```

## AssignmentPattern

```js
interface AssignmentPattern <: Pattern {
    type: "AssignmentPattern";
    left: Pattern;
    right: Expression;
}
```

# Classes

```js
interface Class <: Node {
    id: Identifier | null;
    superClass: Expression | null;
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
    key: Expression;
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

## MetaProperty

```js
interface MetaProperty <: Expression {
    type: "MetaProperty";
    meta: Identifier;
    property: Identifier;
}
```

- In ES2015+, `MetaProperty` represents the `new.target` meta property.
- In ES2020+, `MetaProperty` also represents `import.meta`.

# Modules

## ModuleDeclaration

```js
interface ModuleDeclaration <: Node { }
```

A module `import` or `export` declaration.

## ModuleSpecifier

```js
interface ModuleSpecifier <: Node {
    local: Identifier;
}
```

A specifier in an import or export declaration.

## Imports

### ImportDeclaration

```js
interface ImportDeclaration <: ModuleDeclaration {
    type: "ImportDeclaration";
    specifiers: [ ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier ];
    source: Literal;
}
```

An import declaration, e.g., `import foo from "mod";`.

### ImportSpecifier

```js
interface ImportSpecifier <: ModuleSpecifier {
    type: "ImportSpecifier";
    imported: Identifier;
}
```

An imported variable binding, e.g., `{foo}` in `import {foo} from "mod"` or `{foo as bar}` in `import {foo as bar} from "mod"`. The `imported` field refers to the name of the export imported from the module. The `local` field refers to the binding imported into the local module scope. If it is a basic named import, such as in `import {foo} from "mod"`, both `imported` and `local` are equivalent `Identifier` nodes; in this case an `Identifier` node representing `foo`. If it is an aliased import, such as in `import {foo as bar} from "mod"`, the `imported` field is an `Identifier` node representing `foo`, and the `local` field is an `Identifier` node representing `bar`.

### ImportDefaultSpecifier

```js
interface ImportDefaultSpecifier <: ModuleSpecifier {
    type: "ImportDefaultSpecifier";
}
```

A default import specifier, e.g., `foo` in `import foo from "mod.js"`.

### ImportNamespaceSpecifier

```js
interface ImportNamespaceSpecifier <: ModuleSpecifier {
    type: "ImportNamespaceSpecifier";
}
```

A namespace import specifier, e.g., `* as foo` in `import * as foo from "mod.js"`.

## Exports

### ExportNamedDeclaration

```js
interface ExportNamedDeclaration <: ModuleDeclaration {
    type: "ExportNamedDeclaration";
    declaration: Declaration | null;
    specifiers: [ ExportSpecifier ];
    source: Literal | null;
}
```

An export named declaration, e.g., `export {foo, bar};`, `export {foo} from "mod";` or `export var foo = 1;`.

_Note: Having `declaration` populated with non-empty `specifiers` or non-null `source` results in an invalid state._

### ExportSpecifier

```js
interface ExportSpecifier <: ModuleSpecifier {
    type: "ExportSpecifier";
    exported: Identifier;
}
```

An exported variable binding, e.g., `{foo}` in `export {foo}` or `{bar as foo}` in `export {bar as foo}`. The `exported` field refers to the name exported in the module. The `local` field refers to the binding into the local module scope. If it is a basic named export, such as in `export {foo}`, both `exported` and `local` are equivalent `Identifier` nodes; in this case an `Identifier` node representing `foo`. If it is an aliased export, such as in `export {bar as foo}`, the `exported` field is an `Identifier` node representing `foo`, and the `local` field is an `Identifier` node representing `bar`.

### ExportDefaultDeclaration

```js
interface AnonymousDefaultExportedFunctionDeclaration <: Function {
    type: "FunctionDeclaration";
    id: null;
}

interface AnonymousDefaultExportedClassDeclaration <: Class {
    type: "ClassDeclaration";
    id: null;
}

interface ExportDefaultDeclaration <: ModuleDeclaration {
    type: "ExportDefaultDeclaration";
    declaration: AnonymousDefaultExportedFunctionDeclaration | FunctionDeclaration | AnonymousDefaultExportedClassDeclaration | ClassDeclaration | Expression;
}
```

An export default declaration, e.g., `export default function () {};` or `export default 1;`.

### ExportAllDeclaration

```js
interface ExportAllDeclaration <: ModuleDeclaration {
    type: "ExportAllDeclaration";
    source: Literal;
    exported: Identifier | null;
}
```

The `exported` property contains an `Identifier` when a different exported name is specified using `as`, e.g., `export * as foo from "mod";`.

An export batch declaration, e.g., `export * from "mod";`.
