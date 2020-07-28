- [Node](#node)
- [Identifier](#identifier)
- [Literal](#literal)
  - [RegExpLiteral](#regexpliteral)
- [Program](#program)
- [Function](#function)
- [Statement](#statement)
  - [ExpressionStatement](#expressionstatement)
  - [Directive](#directive)
  - [BlockStatement](#blockstatement)
  - [FunctionBody](#functionbody)
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
- [Declaration](#declaration)
  - [FunctionDeclaration](#functiondeclaration)
  - [VariableDeclaration](#variabledeclaration)
    - [VariableDeclarator](#variabledeclarator)
- [Expression](#expression)
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
- [Pattern](#pattern)

# Node

```jsx
interface Node {
    type: string;
    loc: SourceLocation | null;
}
```

ESTree AST nodes are represented as `Node` objects, which may have any prototype inheritance but which implement this interface.

Docs for `type`: A string representing the AST variant type.
Each subtype of `Node` is documented below with the specific string of its `type` field.
You can use this field to determine which interface a node implements.

Docs for `loc`: The source location information of the node.
If the node contains no information about the source location, the field is `null`.

```jsx
interface SourceLocation {
    source: string | null;
    start: Position;
    end: Position;
}
```

Docs for `start`: The position of the first character of the parsed source region

Docs for `end`: The position of the first character after the parsed source region

```jsx
interface Position {
    line: number;
    column: number;
}
```

Docs for `line`: Line number (1-indexed)

Docs for `column`: Column number (0-indexed)

# Identifier

```jsx
interface Identifier <: Expression, Pattern {
    type: "Identifier";
    name: string;
}
```

An identifier. Note that an identifier may be an expression or a destructuring pattern.

# Literal

```jsx
interface Literal <: Expression {
    type: "Literal";
    value: string | boolean | null | number | RegExp;
}
```

A literal token. Note that a literal can be an expression.

## RegExpLiteral

```jsx
interface RegExpLiteral <: Literal {
    regex: {
        pattern: string;
        flags: string;
    };
}
```

Docs for `regex`: The `regex` property allows regexes to be represented in environments that don’t
support certain flags such as `y` or `u`. In environments that don't support
these flags `value` will be `null` as the regex can't be represented natively.

# Program

```jsx
interface Program <: Node {
    type: "Program";
    body: [ Directive | Statement ];
}
```

A complete program source tree.

# Function

```jsx
interface Function <: Node {
    id: Identifier | null;
    params: [ Pattern ];
    body: FunctionBody;
}
```

A function [declaration](#functiondeclaration) or [expression](#functionexpression).

# Statement

```jsx
interface Statement <: Node { }
```

Any statement.

## ExpressionStatement

```jsx
interface ExpressionStatement <: Statement {
    type: "ExpressionStatement";
    expression: Expression;
}
```

An expression statement, i.e., a statement consisting of a single expression.

## Directive

```jsx
interface Directive <: Node {
    type: "ExpressionStatement";
    expression: Literal;
    directive: string;
}
```

A directive from the directive prologue of a script or function.
The `directive` property is the raw string source of the directive without quotes.

## BlockStatement

```jsx
interface BlockStatement <: Statement {
    type: "BlockStatement";
    body: [ Statement ];
}
```

A block statement, i.e., a sequence of statements surrounded by braces.

## FunctionBody

```jsx
interface FunctionBody <: BlockStatement {
    body: [ Directive | Statement ];
}
```

The body of a function, which is a block statement that may begin with directives.

## EmptyStatement

```jsx
interface EmptyStatement <: Statement {
    type: "EmptyStatement";
}
```

An empty statement, i.e., a solitary semicolon.

## DebuggerStatement

```jsx
interface DebuggerStatement <: Statement {
    type: "DebuggerStatement";
}
```

A `debugger` statement.

## WithStatement

```jsx
interface WithStatement <: Statement {
    type: "WithStatement";
    object: Expression;
    body: Statement;
}
```

A `with` statement.

## Control flow

### ReturnStatement

```jsx
interface ReturnStatement <: Statement {
    type: "ReturnStatement";
    argument: Expression | null;
}
```

A `return` statement.

### LabeledStatement

```jsx
interface LabeledStatement <: Statement {
    type: "LabeledStatement";
    label: Identifier;
    body: Statement;
}
```

A labeled statement, i.e., a statement prefixed by a `break`/`continue` label.

### BreakStatement

```jsx
interface BreakStatement <: Statement {
    type: "BreakStatement";
    label: Identifier | null;
}
```

A `break` statement.

### ContinueStatement

```jsx
interface ContinueStatement <: Statement {
    type: "ContinueStatement";
    label: Identifier | null;
}
```

A `continue` statement.

## Choice

### IfStatement

```jsx
interface IfStatement <: Statement {
    type: "IfStatement";
    test: Expression;
    consequent: Statement;
    alternate: Statement | null;
}
```

An `if` statement.

### SwitchStatement

```jsx
interface SwitchStatement <: Statement {
    type: "SwitchStatement";
    discriminant: Expression;
    cases: [ SwitchCase ];
}
```

A `switch` statement.

#### SwitchCase

```jsx
interface SwitchCase <: Node {
    type: "SwitchCase";
    test: Expression | null;
    consequent: [ Statement ];
}
```

A `case` (if `test` is an `Expression`) or `default` (if `test === null`) clause in the body of a `switch` statement.

## Exceptions

### ThrowStatement

```jsx
interface ThrowStatement <: Statement {
    type: "ThrowStatement";
    argument: Expression;
}
```

A `throw` statement.

### TryStatement

```jsx
interface TryStatement <: Statement {
    type: "TryStatement";
    block: BlockStatement;
    handler: CatchClause | null;
    finalizer: BlockStatement | null;
}
```

A `try` statement. If `handler` is `null` then `finalizer` must be a `BlockStatement`.

#### CatchClause

```jsx
interface CatchClause <: Node {
    type: "CatchClause";
    param: Pattern;
    body: BlockStatement;
}
```

A `catch` clause following a `try` block.

Docs for `param`:  `null` if the `catch` binding is omitted. E.g., `try { foo() } catch { bar() }`

## Loops

### WhileStatement

```jsx
interface WhileStatement <: Statement {
    type: "WhileStatement";
    test: Expression;
    body: Statement;
}
```

A `while` statement.

### DoWhileStatement

```jsx
interface DoWhileStatement <: Statement {
    type: "DoWhileStatement";
    body: Statement;
    test: Expression;
}
```

A `do`/`while` statement.

### ForStatement

```jsx
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

```jsx
interface ForInStatement <: Statement {
    type: "ForInStatement";
    left: VariableDeclaration | Pattern;
    right: Expression;
    body: Statement;
}
```

A `for`/`in` statement.

# Declaration

```jsx
interface Declaration <: Statement { }
```

Any declaration node. Note that declarations are considered statements; this is because declarations can appear in any statement context.

## FunctionDeclaration

```jsx
interface FunctionDeclaration <: Declaration, Function {
    type: "FunctionDeclaration";
    id: Identifier;
}
```

A function declaration. Note that unlike in the parent interface `Function`, the `id` cannot be `null`.

## VariableDeclaration

```jsx
interface VariableDeclaration <: Declaration {
    type: "VariableDeclaration";
    declarations: [ VariableDeclarator ];
    kind: "var";
}
```

A variable declaration.

### VariableDeclarator

```jsx
interface VariableDeclarator <: Node {
    type: "VariableDeclarator";
    id: Pattern;
    init: Expression | null;
}
```

A variable declarator.

# Expression

```jsx
interface Expression <: Node { }
```

Any expression node. Since the left-hand side of an assignment may be any expression in general, an expression can also be a pattern.

## ThisExpression

```jsx
interface ThisExpression <: Expression {
    type: "ThisExpression";
}
```

A `this` expression.

## ArrayExpression

```jsx
interface ArrayExpression <: Expression {
    type: "ArrayExpression";
    elements: [ Expression | null ];
}
```

An array expression. An element might be `null` if it represents a hole in a sparse array. E.g. `[1,,2]`.

## ObjectExpression

```jsx
interface ObjectExpression <: Expression {
    type: "ObjectExpression";
    properties: [ Property ];
}
```

An object expression.

### Property

```jsx
interface Property <: Node {
    type: "Property";
    key: Literal | Identifier;
    value: Expression;
    kind: "init" | "get" | "set";
}
```

A literal property in an object expression can have either a string or number as its `value`. Ordinary property initializers have a `kind` value `"init"`; getters and setters have the kind values `"get"` and `"set"`, respectively.

## FunctionExpression

```jsx
interface FunctionExpression <: Expression, Function {
    type: "FunctionExpression";
}
```

A `function` expression.

## Unary operations

### UnaryExpression

```jsx
interface UnaryExpression <: Expression {
    type: "UnaryExpression";
    operator: UnaryOperator;
    prefix: boolean;
    argument: Expression;
}
```

A unary operator expression.

#### UnaryOperator

```jsx
enum UnaryOperator {
    "-" | "+" | "!" | "~" | "typeof" | "void" | "delete"
}
```

A unary operator token.

### UpdateExpression

```jsx
interface UpdateExpression <: Expression {
    type: "UpdateExpression";
    operator: UpdateOperator;
    argument: Expression;
    prefix: boolean;
}
```

An update (increment or decrement) operator expression.

#### UpdateOperator

```jsx
enum UpdateOperator {
    "++" | "--"
}
```

An update (increment or decrement) operator token.

## Binary operations

### BinaryExpression

```jsx
interface BinaryExpression <: Expression {
    type: "BinaryExpression";
    operator: BinaryOperator;
    left: Expression;
    right: Expression;
}
```

A binary operator expression.

#### BinaryOperator

```jsx
enum BinaryOperator {
    "==" | "!=" | "===" | "!==" | "<" | "<=" | ">" | ">=" | "<<" | ">>" | ">>>" | "+" | "-" | "*" | "/" | "%" | "|" | "^" | "&" | "in" | "instanceof"
}
```

A binary operator token.

### AssignmentExpression

```jsx
interface AssignmentExpression <: Expression {
    type: "AssignmentExpression";
    operator: AssignmentOperator;
    left: Pattern | Expression;
    right: Expression;
}
```

An assignment operator expression.

#### AssignmentOperator

```jsx
enum AssignmentOperator {
    "=" | "+=" | "-=" | "*=" | "/=" | "%=" | "<<=" | ">>=" | ">>>=" | "|=" | "^=" | "&="
}
```

An assignment operator token.

### LogicalExpression

```jsx
interface LogicalExpression <: Expression {
    type: "LogicalExpression";
    operator: LogicalOperator;
    left: Expression;
    right: Expression;
}
```

A logical operator expression.

#### LogicalOperator

```jsx
enum LogicalOperator {
    "||" | "&&"
}
```

A logical operator token.

### MemberExpression

```jsx
interface MemberExpression <: Expression, Pattern {
    type: "MemberExpression";
    object: Expression;
    property: Expression;
    computed: boolean;
}
```

A member expression. If `computed` is `true`, the node corresponds to a computed (`a[b]`) member expression and `property` is an `Expression`. If `computed` is `false`, the node corresponds to a static (`a.b`) member expression and `property` is an `Identifier`.

## ConditionalExpression

```jsx
interface ConditionalExpression <: Expression {
    type: "ConditionalExpression";
    test: Expression;
    alternate: Expression;
    consequent: Expression;
}
```

A conditional expression, i.e., a ternary `?`/`:` expression.

## CallExpression

```jsx
interface CallExpression <: Expression {
    type: "CallExpression";
    callee: Expression;
    arguments: [ Expression ];
}
```

A function or method call expression.

## NewExpression

```jsx
interface NewExpression <: Expression {
    type: "NewExpression";
    callee: Expression;
    arguments: [ Expression ];
}
```

A `new` expression.

## SequenceExpression

```jsx
interface SequenceExpression <: Expression {
    type: "SequenceExpression";
    expressions: [ Expression ];
}
```

A sequence expression, i.e., a comma-separated sequence of expressions.

# Pattern

```jsx
interface Pattern <: Node { }
```

Destructuring binding and assignment are not part of ES5, but all binding positions accept `Pattern` to allow for destructuring in ES6. Nevertheless, for ES5, the only `Pattern` subtype is [`Identifier`](#identifier).